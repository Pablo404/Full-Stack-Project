
const express=require('express');
const app=express();
app.use(express.json());

require('dotenv').config();

var enableCORS = function(req, res, next) {
 // No producción!!!11!!!11one!!1!
 res.set("Access-Control-Allow-Origin", "*");
 res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
 res.set("Access-Control-Allow-Headers", "Content-Type");

 next();
}
app.use(enableCORS);


const userController=require('./controllers/UserController');
//const authController=require('./controllers/AuthController');
const accountController=require('./controllers/AccountController');

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
//app.get("/apitechu/v2/users/:id", userController.getUserByIdV2);
app.get("/proyectotechu/accounts/:email", accountController.getAccountByUserEmail);
app.get("/proyectotechu/IBAN", accountController.getIBAN);
app.post("/proyectotechu/users",userController.createUser);
//app.delete("/apitechu/v1/users/:id", userController.deleteUserV1);


//funciones del 09/10

/*app.delete("/apitechu/v1/users/:id",
function (req, res) {
  console.log("DELETE /apitechu/v1/users/:id");
  console.log("La id enviada es: "+ req.params.id);



  var users=require("./usuarios.json");

for (var i=0; i<users.length;i++){
  if (users[i].id==req.params.id){
   users.splice(i,1);

   console.log("id encontrado= "+req.params.id);
   break;
  }
  console.log(users[i]);
}

  //users.splice(req.params.id - 1,1);
  writeUserDataToFile(users);
  console.log("Usuario borrado");
  res.send(users);
}
)*/









//funciones del 09/10

app.post("/apitechu/v1/monstruo/:p1/:p2",
function(req,res){
  console.log("POST /apitechu/v1/monstruo/:p1/:p2");

  console.log("Parametros");
  console.log(req.params);

  console.log("Query String");
  console.log(req.query);

  console.log("Headers");
  console.log(req.headers);

  console.log("Body");
  console.log(req.body);
}
);
/*

app.post("/apitechu/v1/login",
function(req,res){
  console.log("POST /apitechu/v1/login");

  console.log("Body");
  console.log(req.body);
  var loginemail=false;
  var loginpassword=false;
  var users=require('./prueba.json');

  for (user of users){
    console.log("comparando ("+user.email+") con ("+req.body.email+")");
    if(user.email==req.body.email){
      console.log("existe el email");
      loginemail=true;
      if (user.password==req.body.password){
        console.log("contraseña correcta");
        loginpassword=true;
        user.logged=true;
        var idUsuario=user.id;
        break;
      }else{
        console.log("contraseña incorrecta");
        break;
      }


    }
  }

  if (loginemail&&loginpassword) {
    writeUserDataToFileLogin(users);
    res.send({"mensaje":"Login correcto","idUsuario":idUsuario});
  }else{
    res.send({"mensaje":"Login incorrecto"});
  }






}
);

app.post("/apitechu/v1/logout/",
function(req,res){
  console.log("POST /apitechu/v1/logout/");

  console.log("Body");
  console.log(req.body);
  var logoutemail=false;
  var logintrue=false;
  var users=require('./prueba.json');

  for (user of users){
    console.log("buscando el id: "+req.body.id);
    if(user.id==req.body.id){
      console.log("encontrado el id: "+req.body.id);
      logoutemail=true;
      if (user.logged){
        console.log("el usuario sí estaba logeado");
        logintrue=true;
        delete user.logged;
        break;
      }else{
        console.log("el usuario no estaba logeado");
        break;
      }


    }
  }

  if (logoutemail&&logintrue) {
    writeUserDataToFileLogin(users);
    res.send({"mensaje":"Logout correcto","idUsuario":req.body.id});
  }else{
    res.send({"mensaje":"Logout incorrecto"});
  }






}
);

hasta aqui es el codigo que entregue en la practica, mas abajo es el 10/10 */

//app.post("/apitechu/v1/login", authController.loginV1);
//app.post("/apitechu/v1/logout/", authController.logoutV1);

//practica del 17/10

//app.post("/apitechu/v2/login", authController.loginV2);
//app.post("/apitechu/v2/logout/:id", authController.logoutV2);
