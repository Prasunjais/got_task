// user controller 
const ctrl = require('./battle.controller');
// custom joi validation
const multer = require('multer');
const multipartMiddleware = multer();
const {

} = require('./battle.validators');
const {
  readCsvForBattles
} = require('../../hooks');

// exporting the user routes 
function userRoutes() {
  return (open, closed, appOpen, appClosed) => {
    closed.route('/battle/upload-csv').post(
      multipartMiddleware.single('file'), // multer middleware
      readCsvForBattles, // fetch the data from the csv file
      ctrl.uploadTheBattleFromCsv, // controller function
    );
  };
}

module.exports = userRoutes();
