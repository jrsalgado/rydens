'use strict';
module.exports = driversRouter;
driversRouter.$inject = ['express', 'validator', 'expressJoi', 'model.user'];

function driversRouter(express, validator, expressJoi, User){
  var router = express.Router();
  //TODO: Test All
  router.get('/', function fetchAllDrivers(req, res) {
    User.find({ driver: true }, function (err, drivers) {
      if (!!err) { res.status(400).send(err); }
      res.send(drivers);
    });
  });

  router.get('/:driver', function getDriverbyId(req, res) {
    User.findOne({ _id: req.params.driver, driver: true }, function (err, driver) {
      if (!!err) { res.status(400).send(err); }
      res.send(driver);
    });
  });

  router.patch('/set/:user', expressJoi.joiValidate(validator.drivers.set), function setUserAsDriver(req, res) {
    User.update({ _id: req.params.user }, { driver: true }, function (err, result) {
      if (!!err) { res.status(400).send(err); }
      res.send(result);
    });
  });

  router.patch('/unset/:user', expressJoi.joiValidate(validator.drivers.unset),function unsetUserAsDriver(req, res) {
    User.update({ _id: req.params.user }, { driver: false }, function (err, result) {
      if (!!err) { res.status(400).send(err); }
      res.send(result);
    });
  });

  router.get('/:driver/location', function getDriverLocation(req, res) {
    User.findOne({ _id: req.params.driver, driver: true }, function (err, driver) {
      if (!!err) { res.status(400).send(err); }
      //TODO: send full info or just location?
      res.send(driver);
    });
  });

  router.patch('/:driver/location', expressJoi.joiValidate(validator.drivers.setLocation),function setDriverLocation(req, res) {
    var newLocation = req.body.location;
    User.update({ _id: req.params.driver }, { "location.coordinates": [newLocation.latitude,newLocation.longitude] }, function (err, result) {
      if (!!err) { res.status(400).send(err); }
      res.send(result);
    });
  });
  return router;
}
