// Responses & others utils 
const Response = require('../responses/response');
const StatusCodes = require('../facades/response');
const MessageTypes = require('../responses/types');
const Exceptions = require('../exceptions/Handler');
const {
  error,
  info
} = require('../utils').logging;
const csv = require('csvtojson');
const mime = require('mime-types');

// exporting the hooks 
module.exports = async (req, res, next) => {
  try {
    // checking the extension of the file 
    info('Converting the csv to json');

    let ext = mime.extension(req.file.mimetype); // 'csv'
    info(`Checking the file type which is : ${ext}`);
    let valid_ext = ['csv', 'xls'];

    // checking the file buffer and converting to string 
    if (req.file.buffer.toString('utf-8').length > 0) {
      if (valid_ext.indexOf(ext) >= 0) {
        info('Valid File');
        // converting the csv buffer to string of utf-8
        let csvString = req.file.buffer.toString('utf-8');
        // getting the json array from csvString
        const battleArray = await csv().fromString(csvString).subscribe(async (json) => {
          new Promise((resolve, reject) => {
            // creating new column name as per DMI 
            Object.defineProperty(json, 'battleNumber', Object.getOwnPropertyDescriptor(json, 'battle_number'));
            Object.defineProperty(json, 'attackerKing', Object.getOwnPropertyDescriptor(json, 'attacker_king'));
            Object.defineProperty(json, 'defenderKing', Object.getOwnPropertyDescriptor(json, 'defender_king'));
            Object.defineProperty(json, 'attackerOutcome', Object.getOwnPropertyDescriptor(json, 'attacker_outcome'));
            Object.defineProperty(json, 'battleType', Object.getOwnPropertyDescriptor(json, 'battle_type'));
            Object.defineProperty(json, 'majorDeath', Object.getOwnPropertyDescriptor(json, 'major_death'));
            Object.defineProperty(json, 'majorCapture', Object.getOwnPropertyDescriptor(json, 'major_capture'));
            Object.defineProperty(json, 'attackerSize', Object.getOwnPropertyDescriptor(json, 'attacker_size'));
            Object.defineProperty(json, 'defenderSize', Object.getOwnPropertyDescriptor(json, 'defender_size'));
            Object.defineProperty(json, 'attackerCommander', Object.getOwnPropertyDescriptor(json, 'attacker_commander'));
            Object.defineProperty(json, 'defenderCommander', Object.getOwnPropertyDescriptor(json, 'defender_commander'));

            // deleting the existing column name
            delete json['battle_number'];
            delete json['attacker_king'];
            delete json['defender_king'];
            delete json['attacker_outcome'];
            delete json['battle_type'];
            delete json['major_death'];
            delete json['major_capture'];
            delete json['attacker_size'];
            delete json['defender_size'];
            delete json['attacker_commander'];
            delete json['defender_commander'];
            return resolve(json);
          });
        });
        // injecting the payment array in the hook
        req.body.battleArray = battleArray;
      } else Response.errors(req, res, StatusCodes.HTTP_CONFLICT, MessageTypes.battle.unableToFetchFromCsv);
    } else Response.errors(req, res, StatusCodes.HTTP_CONFLICT, MessageTypes.battle.unableToFetchFromCsv);

    // move on to the next hook
    next();
    // catch any runtime error 
  } catch (e) {
    error(e);
    Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, Exceptions.internalServerErr(req, e));
  }
};
