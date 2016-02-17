module.exports = mocks;
function mocks() {
  var myMocks = {};

  myMocks.users = {
    good: [{
      name: "laurita",
      lastName: "garza",
      age: 24
    }, {
        name: "chalino",
        lastName: "sanchez",
        age: 70
      }],
    full: [{
      name: "laurita",
      lastName: "garza",
      age: 24,
      driver: true
    }, {
        name: "chalino",
        lastName: "sanchez",
        age: 70,
        driver: true
      }],
    missing: {
      name: "popeye",
      lastName: "marino"
    }
  };

  return myMocks;
};