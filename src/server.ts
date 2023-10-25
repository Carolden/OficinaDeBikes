import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import route from "./routes/usuarios";
import autenticacao from './routes/autenticacao';
// import beneficiariosRoutes from './routes/beneficiarios';
// import cdsRoutes from './routes/cds';
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
// server.use(beneficiariosRoutes);
// server.use(cdsRoutes);
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
