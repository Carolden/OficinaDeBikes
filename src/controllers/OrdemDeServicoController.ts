import { Request, Response } from 'express';
import { OrdemServico } from '../models/OrdemDeServico';
import { Cliente } from '../models/Cliente';
import puppeteer from 'puppeteer';
import NodeMailer from 'nodemailer'

export class OrdemDeServicoController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
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
      ordem.dataCriacao = new Date;
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

      ordem.cliente = clienteId;

      await ordem.save();

      return res.status(201).json(ordem);
    } catch (error) {
      console.error('Erro ao criar a ordem de serviço', error);
      return res.status(500).json({ message: 'Erro ao criar a ordem de serviço' });
    }
  }


  async find (req: Request, res: Response): Promise<Response> {
    let os: OrdemServico = res.locals.OrdemDeServico;

    return res.status(200).json(os);
  }


  async list(req: Request, res: Response): Promise<Response> {
    let ordem: OrdemServico[] = await OrdemServico.find();

    return res.status(200).json(ordem)
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const ordemId = Number(req.params.id);

      const ordem = await OrdemServico.findOneBy({ ordemid: ordemId });

      if (!ordem) {
        return res.status(404).json({ message: 'Ordem de serviço não encontrada.' });
      }

      let statusAnterior = ordem.statusOrdemServico + "";

      const {
        descricaoServico,
        statusOrdemServico,
        dataInicioServico,
        dataConclusaoServico,
        bicicletaModelo,
        bicicletaMarca,
        valor,
        clienteId,
      } = req.body;

      if (descricaoServico !== undefined) {
        ordem.descricaoServico = descricaoServico;
      }

      if (statusOrdemServico !== undefined) {
        ordem.statusOrdemServico = statusOrdemServico;
      }

      if (dataInicioServico !== undefined) {
        ordem.dataInicioServico = dataInicioServico;
      }

      if (dataConclusaoServico !== undefined) {
        ordem.dataConclusaoServico = dataConclusaoServico;
      }

      if (bicicletaModelo !== undefined) {
        ordem.bicicletaModelo = bicicletaModelo;
      }

      if (bicicletaMarca !== undefined) {
        ordem.bicicletaMarca = bicicletaMarca;
      }

      if (valor !== undefined) {
        ordem.valor = valor;
      }

      if (clienteId !== undefined) {
        const cliente = await Cliente.findOneBy({ id: clienteId });

        if (!cliente) {
          return res.status(404).json({ message: 'Cliente não encontrado.' });
        }

        ordem.cliente = cliente;
      }

      await OrdemServico.save(ordem);
      if (ordem.statusOrdemServico == "Concluído" && statusAnterior != "Concluído" && ordem.cliente.email) {
        const transporter = NodeMailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "0d8806f20441bb",
            pass: "b9a56c5d12dc11"
          }
        });

        await transporter.sendMail({
          from: '"Oficina do Seu João" <oficinajoao@gmail.com>',
          to: `"${ordem.cliente.nome}" <${ordem.cliente.email}>`,
          subject: "Seu serviço foi concluído.",
          text: "O serviço solicitado foi concluído e está pronto para retirada."
        });
      }

      return res.status(200).json(ordem);
    } catch (error) {
      console.error('Erro ao atualizar a ordem de serviço', error);
      return res.status(500).json({ message: 'Erro ao atualizar a ordem de serviço' });
    }
  }



  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const ordemId = Number(req.params.id);

      const ordem = await OrdemServico.findOneBy({ ordemid: ordemId });

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

  async downloadPdf(req: Request, res: Response) {
    let nome = req.query.nome;
    let html: string = `<style>
  *{
    font-family: "Arial";
  }
  table{
    width:100%;
    text-align: left;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  table td{
    padding: 10px
  }
  table th{
    padding: 10px
  }
  </style>
  <h1>Lista de ordens de serviço</h1>
<table border="1">`;

    let ordens: OrdemServico[] = await OrdemServico.findBy({
      // nome: nome ? ILike(`${nome}`) : undefined,
    });
    html += "<tr><th>ID</th> <th>Status</th> <th>Modelo Bicicleta</th> <th>Marca Bicicleta</th> <th>Valor</th></tr>";
    ordens.forEach((element) => {
      html += `<tr><td>${element.ordemid}</td> <td>${element.statusOrdemServico}</td> <td>${element.bicicletaModelo}</td> <td>${element.bicicletaMarca}</td> <td>${element.valor}</td></tr>\r`;
    });
    html += "</table>";
    let today = new Date(Date.now());
    let data = today.toLocaleString(); // "30/1/2022"
    html += `<div>Gerado por: às ${data}</div>`;

    let pdfBuffer = await OrdemDeServicoController.pdf(html);

    res.append("Content-Type", "application/x-pdf");
    res.append("Content-Disposition", 'attachment; filename="ListaClientes.pdf"');
    res.send(pdfBuffer);
  }

  static async pdf(html: string) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setContent(html);

    const pdfBuffer = await page.pdf();
    await page.close();
    await browser.close();

    return pdfBuffer;
  }

  async exportCsv(req: Request, res: Response): Promise<Response> {
    // let nome = req.query.nome;

    let ordens: OrdemServico[] = await OrdemServico.findBy({
      // nome: nome ? ILike(`${nome}`) : undefined,
    });

    let header = '"ID";"Status";"ModeloBicicleta";"MarcaBicicleta";"Valor"\n';
    let csv = header;

    ordens.forEach((element) => {
      csv += `"${element.ordemid}";"${element.statusOrdemServico}";"${element.bicicletaMarca}";"${element.bicicletaMarca}";"${element.valor}"\r`;
    });

    res.append("Content-Type", "text/csv");
    res.attachment("ListaOrdens.csv");
    return res.status(200).send(csv);
  }

}
