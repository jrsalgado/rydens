module.exports = mocks;
function mocks() {
  var myMocks = {};

  myMocks.users={
    good:{
          name: "laurita",
          lastName: "garza",
          age: 24
        },
   missing:{
          name: "popeye",
          lastName: "marino"
   }
  };
  
  return myMocks;
};