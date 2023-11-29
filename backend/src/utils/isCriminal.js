const criminal_data = {
    "criminals": [
      {
        "firstName": "Lil",
        "lastName": "Uzi"
      },
      {
        "firstName": "Juice",
        "lastName": "Wrld"
      },
      {
        "firstName": "Kendrick",
        "lastName": "Lamar"
      },
      {
        "firstName": "Kanye",
        "lastName": "West"
      }
    ]
  };
// function to check if given user is in the criminal database (json above)

const checkCriminalDB = async (first_name, last_name) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const foundCriminal = criminal_data.criminals.some(criminal => 
        criminal.firstName.toLowerCase() === first_name.toLowerCase() && 
        criminal.lastName.toLowerCase() === last_name.toLowerCase()
      );
        console.log(foundCriminal);
      resolve(foundCriminal);
    }, 1000); // Simulating an asynchronous operation (e.g., API call)
  });
};
  
  module.exports = {
    checkCriminalDB
  }