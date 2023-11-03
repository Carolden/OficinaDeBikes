import { Request, Response } from 'express';
import { OrdemServico } from '../models/OrdemDeServico';
import { ILike } from 'typeorm';
import { Cliente } from '../models/Cliente';
import AppDataSource from '../db';
import db from '../db';

export class OrdemDeServicoController {

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

  async list (req: Request, res: Response): Promise<Response> {
      let ordem: OrdemServico[] = await OrdemServico.find();

    return res.status(200).json(ordem)
}

async update(req: Request, res: Response): Promise<Response> {
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

    const ordemId = Number(req.params.id);
    
    const ordem = await OrdemServico.findOneBy({ordemid: ordemId});
        
    if (!ordem) {
      return res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
    }

    ordem.dataCriacao = dataCriacao;    
    ordem.descricaoServico = descricaoServico;
    ordem.statusOrdemServico = statusOrdemServico;
    ordem.dataInicioServico = dataInicioServico;
    ordem.dataConclusaoServico = dataConclusaoServico;
    ordem.bicicletaModelo = bicicletaModelo;
    ordem.bicicletaMarca = bicicletaMarca;
    ordem.valor = valor;

    const cliente = await Cliente.findOneBy({id: clienteId});

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    ordem.cliente = cliente;

    await OrdemServico.save(ordem);

    return res.status(200).json(ordem);
  } catch (error) {
    console.error('Erro ao atualizar a ordem de serviço', error);
    return res.status(500).json({ message: 'Erro ao atualizar a ordem de serviço' });
  }
}


async delete(req: Request, res: Response): Promise<Response> {
  try {
    const ordemId = Number(req.params.id);

    const ordem = await OrdemServico.findOneBy({ordemid: ordemId});

    if (!ordem) {
      return res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
    }

    await ordem.remove();

    return res.status(204).send(); 
  } catch (error) {
    console.error('Erro ao excluir a ordem de serviço', error);
    return res.status(500).json({ message: 'Erro ao excluir a ordem de serviço' });
  }
}
}
