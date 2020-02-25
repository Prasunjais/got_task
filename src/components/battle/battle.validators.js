// base joi 
const BaseJoi = require('joi');
// joi date extension 
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
// handling the joi response 
const Response = require('../../responses/response');

// add joi schema 
const schemas = {
  getLocations: Joi.object().keys({
    query: {
      limit: Joi.number().integer().label('limit').required().max(50).min(1),
      skip: Joi.number().integer().label('skip').required().min(0)
    },
  }),

};

const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true
    }
  }
};

module.exports = {
  // exports validate admin signin 
  getLocations: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.getLocations;
    let option = options.basic;

    // validating the schema 
    schema.validate({ query: req.query }, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      let error = [];
      err.details.forEach(element => {
        error.push(element.message);
      });

      // returning the response 
      Response.joierrors(req, res, err);
    });
  },

}
