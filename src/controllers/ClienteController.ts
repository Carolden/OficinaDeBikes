import { Request, Response } from 'express';
import { Usuario } from '../models/Usuarios';
import { ILike } from 'typeorm';
import bcrypt from 'bcrypt';
import { Cliente } from '../models/Cliente';

export class ClienteController {
    async list (req: Request, res: Response): Promise<Response> {
        let nome = req.query.nome;
    
        let cliente: Cliente[] = await Cliente.findBy({
          nome: nome ? ILike(`%${nome}%`) : undefined
        });
    
        return res.status(200).json(cliente);
      }
    
      async find (req: Request, res: Response): Promise<Response> {
        let cliente: Cliente = res.locals.cliente;
    
        return res.status(200).json(cliente);
      }
    
      async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
    
        // let senha = await bcrypt.hash(body.senha, 10);
    
        let cliente: Cliente = await Cliente.create({
          nome: body.nome,
          endereco: body.endereco,
          email: body.email,
          telefone: body.telefone,
        }).save();
    
        // let { senha: s, ...usuarioSemSenha } = cliente;
    
        return res.status(200).json(cliente);
      }
    
      async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cliente: Cliente = res.locals.cliente;
    
        // let senha = await bcrypt.hash(body.senha, 10);
    
        cliente.nome = body.nome;
        cliente.endereco = body.endereco;
        cliente.email = body.email;
        cliente.telefone = body.telefone;
        await cliente.save();
    
        // let { senha: s, ...usuarioSemSenha } = cliente;
    
        return res.status(200).json(cliente);
      }
    
      async delete (req: Request, res: Response): Promise<Response> {
        let cliente: Cliente = res.locals.cliente;
    
        cliente.remove();
    
        return res.status(200).json();
      }
          

}