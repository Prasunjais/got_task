// user controller 
const ctrl = require('./battle.controller');
// custom joi validation
const multer = require('multer');
const multipartMiddleware = multer();
const {
  getLocations,
  searchBattle
} = require('./battle.validators');
const {
  readCsvForBattles
} = require('../../hooks');

// exporting the user routes 
function userRoutes() {
  return (open, closed, appOpen, appClosed) => {
    // upload csv
    closed.route('/battle/upload-csv').post(
      multipartMiddleware.single('file'), // multer middleware
      readCsvForBattles, // fetch the data from the csv file
      ctrl.uploadTheBattleFromCsv, // controller function
    );

    // get all the locations
    closed.route('/battle/list').get(
      getLocations, // joi validation
      ctrl.getAllLocationsOfBattle, // controller function
    );

    // get total number of battle occured
    closed.route('/battle/count').get(
      ctrl.getTotalNumberOfBattleOccured, // controller function
    );

    // search the king
    closed.route('/battle/search').get(
      searchBattle, // joi validation
      ctrl.searchBattle, // controller function
    );
  };
}

module.exports = userRoutes();
