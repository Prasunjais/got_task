// user controller 
const ctrl = require('./battle.controller');
// custom joi validation
const {
  joiLogInValidate
} = require('./battle.validators');

// exporting the user routes 
function userRoutes() {
  return (open, closed, appOpen, appClosed) => {
    open.route('/index').post([joiLogInValidate], ctrl.doSomething);
    closed.route('/index').get(ctrl.doSomethingElse);
  };
}

module.exports = userRoutes();
