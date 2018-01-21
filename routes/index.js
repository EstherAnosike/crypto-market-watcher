import express from 'express';

const router = express.Router();
/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Crypto Market Watcher'
  });
});

router.get('/login', (req, res) =>{
	res.render('login',{
		title: 'Login to Crypto'
	});
});

router.get('/signup', (req, res) =>{
  res.render('signup',{
    title: 'SignUp to Crypto'
  });
});

router.post('/', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
  
    const r = await req.pool.query("SELECT * FROM users WHERE email = $1", [email]);

    console.log(r);

    if(r.rows.length < 1){
        console.log(r);
        res.render('login', {
          title: 'No user!!'
        });
    }
  
    console.log(r);
    res.render('login', {
      title: 'Crypto sale logged in'
    });
});

router.post('/submit-form', async (req, res) => {
  var pg = require("pg");
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password[1];

  const r = await req.pool.query("INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)", [firstname, lastname, email, password]);

  console.log(r);
  res.render('login', {
    title: 'Crypto sale'
  });
});

// router.get('/', (req, res) => {
//     res.render('dashboard', {
//       title: 'Crypto Sale'
//     });
// });

export default router;
