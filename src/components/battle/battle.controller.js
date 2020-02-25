const BaseController = require('../baseController');
const Model = require('./models/battle.model');
const {
  error,
  info
} = require('../../utils').logging;

// getting the model 
class userController extends BaseController {
  // constructor 
  constructor() {
    super();
    this.messageTypes = this.messageTypes.battle;
  }

  // do something 
  uploadTheBattleFromCsv = async (req, res) => {
    try {
      info('Uploading the CSV into the database !');

      // pushing the attackers and defenders into a single array of names
      for (let i = 0; i < req.body.battleArray.length; i++) {
        let attackerArray = [], defenderArray = [];
        if (req.body.battleArray[i].attacker_1 !== '') attackerArray.push({
          name: req.body.battleArray[i].attacker_1
        });
        if (req.body.battleArray[i].attacker_2 !== '') attackerArray.push({
          name: req.body.battleArray[i].attacker_2
        });
        if (req.body.battleArray[i].attacker_3 !== '') attackerArray.push({
          name: req.body.battleArray[i].attacker_3
        });
        if (req.body.battleArray[i].attacker_4 !== '') attackerArray.push({
          name: req.body.battleArray[i].attacker_4
        });
        // defenders
        if (req.body.battleArray[i].defender_1 !== '') defenderArray.push({
          name: req.body.battleArray[i].defender_1
        });
        if (req.body.battleArray[i].defender_2 !== '') defenderArray.push({
          name: req.body.battleArray[i].defender_2
        });
        if (req.body.battleArray[i].defender_3 !== '') defenderArray.push({
          name: req.body.battleArray[i].defender_3
        });
        if (req.body.battleArray[i].defender_4 !== '') defenderArray.push({
          name: req.body.battleArray[i].defender_4
        });

        // initializing the boolean variable
        if (req.body.battleArray[i].summer == 0) req.body.battleArray[i].summer = false
        else req.body.battleArray[i].summer = true

        // attacker outcome
        if (req.body.battleArray[i].attackerOutcome == '') req.body.battleArray[i].attackerOutcome = 'loss';

        // injecting into the array of object
        req.body.battleArray[i].attackers = attackerArray;
        req.body.battleArray[i].defenders = defenderArray;
      }

      // inserting into the database
      let battlesCreated = await Model.insertMany(req.body.battleArray);

      // success response 
      return this.success(req, res, this.status.HTTP_OK, battlesCreated, this.messageTypes.battlesCreatedSuccessfully);

      // catch any runtime error 
    } catch (e) {
      error(e);
      this.errors(req, res, this.status.HTTP_INTERNAL_SERVER_ERROR, this.exceptions.internalServerErr(req, e));
    }
  }

  // do something else 
  doSomethingElse = async (req, res) => {
    try {
      const resp = {
        status: 200,
        message: 'Its working'
      };

      // success response 
      return this.success(req, res, this.status.HTTP_OK, resp);

      // catch any runtime error 
    } catch (e) {
      error(e);
      this.errors(req, res, this.status.HTTP_INTERNAL_SERVER_ERROR, this.exceptions.internalServerErr(req, err));
    }
  }
}

// exporting the modules 
module.exports = new userController();
