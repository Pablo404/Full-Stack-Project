const bcrypt=require('bcrypt');

function hash(data) {
  console.log("Hashing data");

  return bcrypt.hashSync(data,10);
  // datos y numero de pasadas que va a hacer para el hasheado
  // al poner Sync hacemos la funcion sincrona, para que el codigo tenga que
  //esperar a que se encripte la contraseña, ya que este proceso tarda más
}

function checkpassword(sentPassword, userHashPassword) {
console.log("Checking password");

return bcrypt.compareSync(sentPassword, userHashPassword);
//compara la contraseña mandada en plano y la encriptada que esta en la base de
//datos y devuelve true o false
}

module.exports.hash=hash;
module.exports.checkpassword=checkpassword;
