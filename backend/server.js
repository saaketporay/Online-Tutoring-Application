const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/EmailSignIn.tsx');
})

app.post('/register', encodeUrl, (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

  confirm.connect(function(err) {
    if (err)
    {
      console.log(err);
    }

    // check if already registered
    con.query(`SELECT * FROM users WHERE email = '${email}'`, function(err, result)
    {
      if (err)
      {
        console.log(err);
      }
      else
      {
        // redirect to success page
        function toSuccessRegister()
        {
          req.session.user = {
            user_id: user_id,
            email: email,
            firstname: firstName,
            lastname: lastName,
            password: password,
            user_type: user_type,
            total_tutoring_hours: total_tutoring_hours
          };

        }

        var new_user_SQL = `INSERT INTO users (user_id, email, firstname, lastname, password, user_type, total_tutoring_hours) VALUES ('${user_id}', '${email}', '${firstName}', '${lastName}', '${password}', '${user_type}', '${total_tutoring_hours}')`;
        con.query(sql, function(err, result)
        {
          if (err)
          {
            console.log(err);
          }
          else
          {
            toSuccessRegister();
          }
        })
      }
    })
  })
});

app.post('/login', function(request, response, next)
{
  var user_email = request.body.email;
  var user_password = request.body.password;

  if (user_email && user_password)
  {
    query = `SELECT * FROM users WHERE email = "${user_email}"`;
    con.query(express.query, function(err, data)
    {
      if (data.length > 0)
      {
        for (var c = 0; c < data.length; c++)
        {
          if (data[c].password == user_password)
          {
            // TO DO: login user if data is correct
          }
          else
          {
            response.send("Incorrect Login")
          }
        }
      }
    })
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
