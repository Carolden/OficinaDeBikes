import { Request, Response } from 'express';
import { OrdemServico } from '../models/OrdemDeServico';
import { ILike } from 'typeorm';
import { Cliente } from '../models/Cliente';

export class OrdemDeServicoController {
  // async list (req: Request, res: Response): Promise<Response> {
  //   let nome = req.query.nome;

  //   let cliente: OrdemServico[] = await OrdemServico.findBy({
  //     nome: nome ? ILike(`%${nome}%`) : undefined
  //   });

  //   return res.status(200).json(cliente);
  // }

  // async find (req: Request, res: Response): Promise<Response> {
  //   let cliente: OrdemServico = res.locals.cliente;

  //   return res.status(200).json(cliente);
  // }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        dataCriacao,
        descricaoServico,
        statusOrdemServico,
        dataInicioServico,
        dataConclusaoServico,
        bicicletaModelo,
        bicicletaMarca,
        valor,
        clienteId, 
      } = req.body;
  
      const ordem = new OrdemServico();
      ordem.dataCriacao = dataCriacao;
      ordem.descricaoServico = descricaoServico;
      ordem.statusOrdemServico = statusOrdemServico;
      ordem.dataInicioServico = dataInicioServico;
      ordem.dataConclusaoServico = dataConclusaoServico;
      ordem.bicicletaModelo = bicicletaModelo;
      ordem.bicicletaMarca = bicicletaMarca;
      ordem.valor = valor;
  
      const cliente = await Cliente.findOneBy(clienteId);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
      }
  
      ordem.cliente = cliente;
  
      await ordem.save();      
  
      return res.status(201).json(ordem); 
    } catch (error) {
      console.error('Erro ao criar a ordem de serviço', error);
      return res.status(500).json({ message: 'Erro ao criar a ordem de serviço' });
    }
  }

  async update (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let cliente: Cliente = res.locals.cliente;

    cliente.nome = body.nome;
    cliente.endereco = body.endereco;
    cliente.email = body.email;
    cliente.telefone = body.telefone;
    await cliente.save();

    return res.status(200).json(cliente);
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let cliente: Cliente = res.locals.cliente;

    cliente.remove();

    return res.status(200).json();
  }
  
  }

