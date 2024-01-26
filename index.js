const express = require('express');
const cors    = require('cors');
const bcrypt  = require('bcrypt');
const dal     = require('./dal');

const app  = express();
const port = 80;

app.use(cors());
app.use(express.json());
app.use(express.static('../client/build'));

//crearting a new account
app.post('/create', async (req,res) => {
    const {userName, email, password} = req.body;
    const hashedPAssword = await bcrypt.hash(password, 10);
    try{
       const isExistingUser = await dal.find(email);
       if(isExistingUser){
        return res.status(409).json({error: "user already exist"});
       } else {
        dal.create({userName, email, password : hashedPAssword});
        res.status(201).json({ message: 'User created successfully.' });
        console.log('User created successfully.');
       }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }     
        });

// Login to existing account
app.post('/login', async (req, res) => {
    const userData = { email: req.body.email, password: req.body.password }; 
    try {
      const user = await dal.find(userData.email);
      console.log(user + ' Found in Express');
  
      if (!user.email) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const passwordMatch = await bcrypt.compare(userData.password, user.password);
  
      if (passwordMatch) {
        res.json({ message: 'User logged in!' });
      } else {
        res.status(401).json({ error: 'Incorrect password.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }); 
    
    //handling deposit request 
    app.post('/deposit', async (req,res) => {
        const amount = Number(req.body.deposit);
        const accountNumber = req.body.accountNumber;
        try{
          await dal.deposit(accountNumber, amount)
          .then((response) => {
            console.log(response)
            res.json(response)
        })
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }    
    });
    //handling withdrawal request
    app.post('/withdraw', async (req, res) => {
        const amount = Number(req.body.withdraw);
        const accountNumber = req.body.accountNumber;
        try{
          await dal.withdraw(accountNumber, amount)
          .then((response) => {
              console.log(response)
              res.json(response)
          })
        }catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }          
    });
    //still under-development
    app.post('/transfer', (req, res) => {
        const amount = Number(req.body.transfer);
        const accountNumber = req.body.accountNumber;
        dal.transfer(accountNumber, amount)
        .then((response) => {
            console.log(response)
            res.json(response)
        })
    });
//getting all data stored in mongodb
app.get('/all', async (req,res) => {
    const data = await dal.all();
    res.send(data);
});
//finding first match document
app.get('/findaccount', async (req,res) => {
  const data = await dal.findAccount();
  res.send(data);
});

//listening on localhost port
app.listen(port, console.log('Running on port ' + port))
