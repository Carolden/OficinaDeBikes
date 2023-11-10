import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from './Cliente';

  @Entity('ordem')
  export class OrdemServico extends BaseEntity {
    @PrimaryGeneratedColumn()
    ordemid: number;

    @Column()
    dataCriacao: Date;

    @Column()
    descricaoServico: string;

    @Column()
    statusOrdemServico: string;

    @Column({ nullable: true })
    dataInicioServico: Date;

    @Column({ nullable: true })
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

