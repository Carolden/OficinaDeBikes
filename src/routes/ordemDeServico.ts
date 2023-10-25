import { NextFunction, Request, Response, Router } from 'express';
import { OrdemDeServicoController } from '../controllers/OrdemDeServicoController';
import * as yup from 'yup';
import { Usuario } from '../models/Usuarios';
import { Not } from 'typeorm';

let router: Router = Router();

let ordemDeServicoController: OrdemDeServicoController = new OrdemDeServicoController();

router.post('/ordem', usuariosController.list);

// router.get('/usuarios/:id', validarSeExiste, usuariosController.find);

// router.post('/usuarios', validarPayload, validarSeEmailExiste, usuariosController.create);

// router.put('/usuarios/:id', validarSeExiste, validarPayload, validarSeEmailExiste, usuariosController.update);

// router.delete('/usuarios/:id', validarSeExiste, usuariosController.delete);

export default router;