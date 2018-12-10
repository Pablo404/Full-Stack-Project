
const crypt=require('../crypt');
const requestJson=require('request-json');
const mlabBaseURL="https://api.mlab.com/api/1/databases/proyectotechu/collections/";
const mlabAPIKey="apiKey="+process.env.MLAB_API_KEY;


function login (req,res){
  console.log("POST /proyectotechu/login");
  console.log(req.body.email);
  console.log(req.body.password);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");
  var query='q={"email":"'+req.body.email+'"}';
  console.log(query);

  httpClient.get("user?"+query+"&"+mlabAPIKey,
    function(err,resMlab,body) {
      if(err){
        console.log("Error al iniciar sesión");
        res.status(500);
        res.send({"msg":"Error al iniciar sesión"});
      }else{
        if(body.length>0){
          console.log(body);
          console.log(body[0].password);
          console.log(req.body.password);
          if (crypt.checkpassword(req.body.password,body[0].password)) {
            console.log("contraseña correcta");
            var putBody= '{"$set":{"logged":true}}';
            httpClient.put("user?"+query+"&"+mlabAPIKey, JSON.parse(putBody),
              function(errPUT,resMlabPUT,bodyPUT) {
                console.log("Sesión iniciada con éxito");
                res.status(200);
                var response ={
                  "msg":"Sesión iniciada con exito",
                  "DNI":body[0].DNI
                }
                res.send(response);
              }
            )
          }else{
            console.log("Contraseña incorrecta");
            res.status(401);
            res.send({"msg":"Login incorrecto, revise su email y/o contraseña"});
          }
        }else{
          console.log("No se encuentra el usuario");
          res.status(404);
          res.send({"msg":"Login incorrecto, revise su email y/o contraseña"});
        }
      }
    }
  )
}


function logout (req,res){
  console.log("POST /proyectotechu/logout");

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");
  var query='q={"DNI":"'+req.body.DNI+'"}';
  console.log(query);

  httpClient.get("user?"+query+"&"+mlabAPIKey,
  function(err,resMlab,body) {
    if(err){
      console.log("Error al cerrar sesión");
      res.send({"msg":"Error al cerrar sesión"});
      res.status(500);
    }else{
        var response=body;
        console.log(body);
        console.log(response);
        console.log(response[0].logged);
        var putBody='{"$unset":{"logged":""}}';
        httpClient.put("user?"+query+"&"+mlabAPIKey, JSON.parse(putBody),
        function(err,resMlab,body) {
          console.log("Usuario deslogeado con éxito");
          res.status(200);
          res.send({"msg":"Usuario deslogeado con éxito"});
        }
        )
      }
    }
  )
}


module.exports.login=login;
module.exports.logout=logout;
