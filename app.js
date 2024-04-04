//imports
const mysql = require('mysql2')
const express = require('express')
const bcrypt = require('bcrypt'); //encryption
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const secretKey = 'secret'; 

let app = express();
app.listen(5003, () => {
    console.log('Server is running on port 5003');
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
       secure: false,
       maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
       }
  }));
//Parser middleware
app.use(express.urlencoded({ extended: true }));

//Database Connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'yeab1234',
    database: 'car_rental',
})

connection.connect((err)=>{
    if(err)
        console.log(err);
    else
        console.log('connected');
});


// Set up Express to serve static files from the 'public' directory
app.use(express.static('public'));
app.use(cookieParser());

app.set("view engine", "ejs");


function checkLoggedIn(req, res, next) {
    var loggedIn = false;
    const sessionCookies = req.cookies['Token'];

    if (sessionCookies) {
            loggedIn = true;    
        } 
    req.loggedIn = loggedIn;
    next();
}

app.get('/', checkLoggedIn, (req, res) => {
    res.render('index', { loggedIn: req.loggedIn, activePage: '' });
  });

app.get("/Registration", (req, res) => {
    res.render("Register");
});
app.get("/cars",checkLoggedIn, (req, res) => {
    res.render('cars', { loggedIn: req.loggedIn, activePage: 'cars' });
});

app.get('/book',checkLoggedIn, (req, res) => {
    if (!req.loggedIn) {
        return res.redirect('/');
    }
    res.render('booking',{ loggedIn: req.loggedIn, activePage: 'book' });
});

app.get("/articles",checkLoggedIn, (req, res) => {
    res.render("articles" , { loggedIn: req.loggedIn, activePage: 'articles' });
});

app.get('/logout', (req, res) => {
    res.clearCookie('Token');
    res.redirect('/');
});

//Register from form 
app.post("/register", (req, res) => {
    
    //Create Users Table
       let createUser = `CREATE TABLE if not exists Clients(
         user_id int auto_increment,
         User_name varchar(255) not null,
         email varchar(255) not null,
         password varchar(255) not null,
         PRIMARY KEY (user_id)
      )`;
 
      connection.query(createUser, (err, result) => {
       if(err)console.log(err);   
     })

   //Retrieve data from form using body parser
    let userName = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let selectUser = `SELECT * FROM Clients WHERE email = '${email}' or User_name = '${userName}'`;

    connection.query(selectUser, function (err, result) {
      if (err) throw err;
      console.log(result);

      if (result.length > 0) {
       return res.send(`
        <script>
          alert('Email or Username already exists!');
      window.location.href = 'http://127.0.0.1:5003/Registration'; // Redirect to login page
        </script>
      `);
      }

      let salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);

      let addUser = `INSERT INTO Clients(User_name, email, password) VALUES(
        '${userName}','${email}', '${hashedPassword}')`;
        connection.query(addUser, function (err, result) {
          if (err) throw err;
          console.log("1 user inserted");
      
        res.send(`
        <script>
          alert('Successfully Registered! Please Login!');
          window.location.href = 'http://127.0.0.1:5003';
        </script>
      `);
      });
    });

})

//Login
app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

    // Retrieve hashed password from the database for the given username
    let getUserQuery = `SELECT * FROM clients WHERE User_name = ?`;
    connection.query(getUserQuery, [username], function (err, result) {
    if (err) {
        console.error('Error:', err);
        res.status(500).send('Internal server error');
    }
    else {
       if (result.length === 0) {
        res.send(`
            <script>
                alert('Invalid Username or Password!');
                window.location.href = 'http://127.0.0.1:5003/Registration';
            </script>
        `);
        } 
        else {
            const hashedPassword = result[0].password; 

            // Compare hashed password from the database with the entered password
            bcrypt.compare(password, hashedPassword, function(err, passwordMatch) {
                if (err) {
                    console.error('Error:', err);
                    res.status(500).send('Internal server error');
                } else {
                    if (passwordMatch) {
                        // Passwords match, successful login

                        // Generate a JWT token
                        
                        const username = result[0].User_name;

                        const token = jwt.sign({ username }, secretKey, {expiresIn: '1d'});
                        // Set token cookie
                        res.cookie('Token', token, { httpOnly: true, secure: false, maxAge : 2 * 24 * 60 * 60 * 1000})
                        req.session.loggedIn = true;
                       res.redirect('/');

                        
                    } else {
                        // Passwords don't match, invalid credentials
                        res.send(`
                            <script>
                                alert('Invalid Username or Password!');
                                window.location.href = 'http://127.0.0.1:5003/Registration';
                            </script>
                        `);
                    }
                }
            });
        }
    }
    });
});


