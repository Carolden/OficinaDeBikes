import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import route from "./routes/usuarios";
import autenticacao from './routes/autenticacao';
import ordemDeServico from './routes/ordemDeServico';
import cliente from './routes/cliente';
// import cidadesRoutes from './routes/cidades';
// import itensRoutes from './routes/itens';
// import movimentacoesRoutes from './routes/movimentacoes';

let server: Express = express();

server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
  console.log('[' + (new Date()) + '] ' + req.method + ' ' + req.url);
  next();
});

server.use(route);
server.use(autenticacao);
server.use(ordemDeServico);
server.use(cliente);
// server.use(cidadesRoutes);
// server.use(itensRoutes);
// server.use(movimentacoesRoutes);


export default {
  start () {
    server.listen(3000, () => {
      console.log('Server started!');
    });
  }
};
