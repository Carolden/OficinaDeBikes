// 2. Tabela de Ordens de Serviço:
//    - OrdemServicoID (Chave Primária)
//    - ClienteID (Chave Estrangeira para a tabela de Clientes)
//    - Data de criação
//    - Descrição do serviço
//    - Status da ordem de serviço (aberta, em andamento, concluída, cancelada, etc.)
//    - Data de início do serviço
//    - Data de conclusão do serviço
//    - Outros campos relacionados às informações da ordem de serviço


import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from './Cliente';
  
  @Entity('ordem')
  export class OrdemServico {
    @PrimaryGeneratedColumn()
    OrdemServicoID: number;
  
    @Column()
    dataCriacao: Date;
  
    @Column()
    descricaoServico: string;
  
    @Column()
    statusOrdemServico: string;
  
    @Column()
    dataInicioServico: Date;
  
    @Column()
    dataConclusaoServico: Date;

    @Column()
    bicicletaModelo: string;

    @Column()
    bicicletaMarca: string;

    @Column()
    valor: number;
  
    @ManyToOne(() => Cliente, (cliente) => cliente.ordensServico)
    @JoinColumn({ name: 'id' })
    cliente: Cliente;
  }
  
