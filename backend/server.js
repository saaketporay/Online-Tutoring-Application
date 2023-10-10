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
  var userName = req.body.userName;
  var password = req.body.password;

  confirm.connect(function(err) {
    if (err)
    {
      console.log(err);
    }

    // check if already registered
    con.query(`SELECT * FROM users WHERE username = '${userName}'`, function(err, result)
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
            username: userName,
            password: password,
            user_type: user_type,
            total_tutoring_hours: total_tutoring_hours
          };

        }

        var new_user_SQL = `INSERT INTO users (user_id, email, username, password, user_type, total_tutoring_hours) VALUES ('${user_id}', '${email}', '${userName}', '${password}', '${user_type}', '${total_tutoring_hours}')`;
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

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
