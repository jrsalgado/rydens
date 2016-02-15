module.exports = mocks;
function mocks() {
  var myMocks = {};

  myMocks.users={
    good:[{
          name: "laurita",
          lastName: "garza",
          age: 24
        },{
          name: "chalino",
          lastName: "sanchez",
          age: 70
        }],
   missing:{
          name: "popeye",
          lastName: "marino"
   }
  };
  
  return myMocks;
};