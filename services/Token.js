import jwt from 'jsonwebtoken';
import models from '../models';

//Sirve para revalidar el token pasado el tiempo expiracion, para que el 
//usuario no tenga que volver a cargar password y mail
async function checkToken (token){
    //Se declara variable __id iniciada en null
    let __id = null;
    try {
        //Hacemos el decode del token que cheaquemos , buscando solamente el _id
        const {_id} = jwt.decode(token);
        //En caso de que no haya saltado ninguna Exception le asignaremos el valor de _id a __id
        __id = _id;
    } catch (e) {
        //Si se atrapo un Exception retornamos un false , lo cual indicaria que no es un token expirado sino una erroneo o invalido
        return false;
    }
    //Buscamos en MongoDB el usuario en base al __id , que es igual al _id que obtuvimos del token
    const user = await models.UsuarioModel.findOne({_id:__id,estado:1});
    //preguntamos si existe un usuario tras realizar la busqueda en la DB
    if (user) {
        //En caso de que si se haya obtenido un usuario registrado en la DB, vamos a validar el Token
        const token =  jwt.sign({_id:__id},'claveSecretaParaGenerarElToken',{expiresIn:'1d'});
        //retornamos en este caso el token junto con el Rol del usuario
        return {token,role:user.rol};
    } else {
        //Si no se obtuvo ningun usuario registrado, significa que ese usuario ya no existe o esta desactivado,
        //Por lo que retornaremos false ....
        return false;
    }
}

export default {
    encode: async (_id) => {
        //Metodo sing de jwt esperara 3 parametros
        //primer parametro ,un id con el que hara la referencia
        //Segundo parametro,una clave secreta con la que se generara el token
        //El tercer parametro sera el tiempo de duracion del token 
        const token = jwt.sign({_id:_id},'claveSecretaParaGenerarElToken',{expiresIn:'1d'});
        return token;
    },

    decode: async (token) => {
        try {
            //Se declara la constante entre llaves porque de esta forma espesificamos que lo unico a lo que va a igualar va a ser 
            //a la propiedad _id del objeto y no a todo el objeto, 'const  _id=token' impleca que _id es igual a todo el token
            //mientras que con '{_id}= token' indicamos que solo sera asignado la propieddad {_id}=token._id ..........
            const {_id} =  await jwt.verify(token,'claveSecretaParaGenerarElToken');
            const user = await models.UsuarioModel.findOne({_id,estado:1});
            if (user) {
                return user;
            }else{
                return false;
            }
        } catch (e) {
            //En caso de atrapar una Excepcion veremos si se puede revalidar el token en caso de que haya expirado
            // con la function checkToken, a la que le pasaremos el token con el no pudimos ingresar
            const newToken = await checkToken(token);
            //retornamos el resultado del chequeo del toquen, que puede ser un 'false' o el toque expirado revalidado
            return newToken;
        }
    }

}