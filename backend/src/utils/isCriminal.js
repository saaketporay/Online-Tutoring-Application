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
    const criminalExists = criminal_data.criminals.some(criminal => criminal.firstName.toLowerCase() === first_name.toLowerCase() 
    && criminal.lastName.toLowerCase() === last_name.toLowerCase());

    return criminalExists;
  };
  
  