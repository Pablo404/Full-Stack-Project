
const express=require('express');
const app=express();
app.use(express.json());
require('dotenv').config();

var enableCORS = function(req, res, next) {
 res.set("Access-Control-Allow-Origin", "*");
 res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
 res.set("Access-Control-Allow-Headers", "Content-Type");
 next();
}
app.use(enableCORS);

const userController=require('./controllers/UserController');
const authController=require('./controllers/AuthController');
const accountController=require('./controllers/AccountController');
const transactionController=require('./controllers/TransactionController')
const port=process.env.PORT||3000;
app.listen(port);
console.log("API escuchando en el puerto "+port);


app.get("/proyectotechu/hello",
  function(req,res){
    console.log("GET /proyectotechu/hello");
    res.send({"msg":"Hola desde Proyecto TechU!"});
  }
);
app.get("/proyectotechu/users", userController.getUsers);
app.get("/proyectotechu/users/:dni", userController.getUsersByDni);
app.get("/proyectotechu/accounts/:DNI", accountController.getAccountsByDni);
app.get("/proyectotechu/account/:IBAN",accountController.getAccountByIban);
app.get("/proyectotechu/transactionsbyiban/:IBAN", transactionController.getTransactionsByIban);
app.get("/proyectotechu/transactionsbyiban1/:IBAN", transactionController.getTransactionsByIban1);
app.get("/proyectotechu/transactionsbyiban2/:IBAN", transactionController.getTransactionsByIban2);
app.get("/proyectotechu/transactions/:DNI", transactionController.getTransactionsByDni);
app.get("/proyectotechu/transactionsbydni1/:DNI", transactionController.getTransactionsByDni1);
app.get("/proyectotechu/transactionsbydni2/:DNI", transactionController.getTransactionsByDni2);
app.post("/proyectotechu/users",userController.createUser);
app.post("/proyectotechu/accounts",accountController.createAccount);
app.put("/proyectotechu/accounts",accountController.modifyAccount);
app.post("/proyectotechu/transaction",transactionController.createTransaction);
app.post("/proyectotechu/login",authController.login);
app.post("/proyectotechu/logout",authController.logout);
