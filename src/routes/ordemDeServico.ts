import { NextFunction, Request, Response, Router } from 'express';
import { OrdemDeServicoController } from '../controllers/OrdemDeServicoController';
import * as yup from 'yup';
import { Usuario } from '../models/Usuarios';
import { Not } from 'typeorm';
import { OrdemServico } from '../models/OrdemDeServico';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
      descricaoServico: yup.string().min(3).max(255).required(),
      bicicletaModelo: yup.string().min(3).max(255).required(),
      bicicletaMarca: yup.string().min(3).max(255).required(),
      valor: yup.number(),
      cliente_id: yup.number(),
  });

  let payload = req.body;

  try {
      req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true});
      return next();
  } catch(error){
      if (error instanceof yup.ValidationError) {
          return res.status(422).json({erros: error.errors});
      }
      return res.status(500).json({error: 'Ops! Algo deu errado!'});
  }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let id = Number (req.params.id);
  let OrdemDeServico: OrdemServico|null = await OrdemServico.findOneBy ({ ordemid: id });
  if ( ! OrdemDeServico) {
      return res.status(422).json({error: 'Ordem de serviço não encontrada!' });
  } else {
      res.locals.OrdemDeServico = OrdemDeServico;
  }

  return next();
}


let router: Router = Router();

let ordemDeServicoController: OrdemDeServicoController = new OrdemDeServicoController();

router.post('/ordem', ordemDeServicoController.create);

router.get('/ordem', ordemDeServicoController.list);


router.get('/ordem/:id', validarSeExiste, ordemDeServicoController.find);

router.put('/ordem/:id', ordemDeServicoController.update);

router.delete('/ordem/:id', validarSeExiste, ordemDeServicoController.delete);

router.get("/ordemPDF", ordemDeServicoController.downloadPdf);

router.get("/ordemCSV", ordemDeServicoController.exportCsv);

export default router;
