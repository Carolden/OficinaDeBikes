import { Usuario } from "../models/Usuarios";
let md5 = require('md5');

export class LoginController{

    public usuario: Usuario;

    constructor(){
        this.usuario = new Usuario();
    }

    async procurarUsuario(email: string, senha: string): Promise<Usuario | null>{
        senha = md5(senha);
        let usuarioLogin = await Usuario.findOneBy({email: email,senha: senha});

        //Retorna o usuário autenticado para ser utilizado mais tarde caso necessário
        return usuarioLogin;
    }
}
