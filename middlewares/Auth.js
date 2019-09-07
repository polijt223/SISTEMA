import TokenService from '../services/Token';
//Esta clase funciona como filtro, para revisar los tokens cada ves que el usuario realice una accion
//verificara si el usuario esta loguado correctamente y si tiene permisos para realizar dicha accion
export default{

    verifyUsuario: async (req,res,next) => {
        //Verificamos que el token que no llega sea valido y exista
        if (!req.headers.token) {
            return res.status(404).send({
                mensaje: 'No existe token / No esta logueado'
            });
        }
        //Decodificamos el token para obtener el rol
        const response = await TokenService.decode(req.headers.token);
        if (response.rol == 'Administrador' || response.rol == 'Almacenero' || response.rol == 'Vendedor') {
            //En caso de ser un de los roles permitidos utilizamos next para permitir que el programa siga su ejecucion
            next();
        }else{
            return res.status(403).send({
                //Si no es ningunos de los roles admitidos simplemente retornamos un mensaje donde diremos que no esta autorizado
                mensaje: 'No Autorizado'
            });
        }
    }, 

    verifyUsuarioAdministrador: async (req,res,next) => {
        //Verificamos que el token que no llega sea valido y exista
        if (!req.headers.token) {
            return res.status(404).send({
                mensaje: 'No existe token / No esta logueado'
            });
        }
        //Decodificamos el token para obtener el rol
        const response = await TokenService.decode(req.headers.token);
        if (response.rol == 'Administrador') {
            //En caso de ser rol Administrador usamos next para permitir que el programa siga su ejecucion
            next();
        }else{
            return res.status(403).send({
                //Si no es ningunos de los roles admitidos simplemente retornamos un mensaje donde diremos que no esta autorizado
                mensaje: 'No Autorizado'
            });
        }
    },

    verifyUsuarioAlmacenero: async (req,res,next) => {
        //Verificamos que el token que no llega sea valido y exista
        if (!req.headers.token) {
            return res.status(404).send({
                mensaje: 'No existe token / No esta logueado'
            });
        }
        //Decodificamos el token para obtener el rol
        const response = await TokenService.decode(req.headers.token);
        if (response.rol == 'Almacenero' || response.rol == 'Administrador') {
            //En caso de ser rol Almacenero o Administrador usamos next para permitir que el programa siga su ejecucion
            next();
        }else{
            return res.status(403).send({
                //Si no es ningunos de los roles admitidos simplemente retornamos un mensaje donde diremos que no esta autorizado
                mensaje: 'No Autorizado'
            });
        }
    },

    verifyUsuarioVendedor: async (req,res,next) => {
        //Verificamos que el token que no llega sea valido y exista
        if (!req.headers.token) {
            res.status(404).send({
                mensaje: 'No existe token / No esta logueado'
            });
        }
        //Decodificamos el token para obtener el rol
        const response = await TokenService.decode(req.headers.token);
        if (response.rol == 'Vendedor' || response.rol == 'Administrador') {
            //En caso de ser rol Vendedor o Administrador usamos next para permitir que el programa siga su ejecucion
            next();
        }else{
            res.status(403).send({
                //Si no es ningunos de los roles admitidos simplemente retornamos un mensaje donde diremos que no esta autorizado
                mensaje: 'No Autorizado'
            });
        }
    }

}