const { MongoClient } = require('mongodb');
const url = 'mongodb://mongo:27017/users'; 
const client = new MongoClient(url);

var db = client.db('testing');
var collection = db.collection('users');

async function main () {
    await client.connect();
    console.log('Connected to Database!');
   
}
main().catch(error => console.error(error));

//function to create and stored account data 
//plus it generates 10 digits account number
async function create ({userName, email, password}) {
    const generateNumber = Math.floor(Math.random()*1000000);
    const accountNumber  = "0000" + generateNumber;
    const doc = {accountNumber,userName,email,password,balance:0};
    try{
        const result = await collection.insertOne(doc);
        console.log(result); 
    } 
    catch (error) {console.error(error)};    
};

//function to find email value stored in mongodb
async function find(userEmail) {
    const result = await collection.findOne({email : userEmail});
    if(result){
        console.log(`User found in Mongodb ${userEmail}`);
        return result
    }
    else{
        console.log('User does not exist in Mongodb');
    } 
};

//matching the account number coming from client side 
//this function will update the (balance) value
async function deposit(userAccount, amount) {
   
    const result = await collection.findOneAndUpdate(
        {accountNumber: userAccount},
        {$inc : {balance: amount}},
        {returnNewDocument : true}
    )
    .catch(err => console.log(err))
    console.log(result)
};

//matching the account number coming from client side 
//this function will update the (balance) value
async function withdraw (userAccount, amount) {
    const result = await collection.findOneAndUpdate(
        {accountNumber: userAccount},
        {$inc : {balance: -amount}},
        {returnNewDocument: true}
    )
    .catch(err => console.log(err))
    console.log(result);
};
//this is still a test function to make transfer between accounts
async function transfer (ac, amount) {
    const result = await collection.findOneAndUpdate(
        {accountNumber: ac},
        {$inc : {balance: amount}},
        {returnNewDocument: true}
    )
    .catch(err => console.log(err))
    console.log(result);
};

//finding all documents stored in mongodb
async function all () {
    const result = await collection.find({}).toArray();
    return JSON.stringify(result);
};

//find first document stored in mongodb
async function findAccount () {
    const result = await collection.findOne();
    return JSON.stringify(result);
};

//exporting functions as modules.
module.exports = {create, find, all, deposit, withdraw, transfer, findAccount };
