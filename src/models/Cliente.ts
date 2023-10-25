import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdemServico } from "./OrdemDeServico";

@Entity('clientes')
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public endereco: string;

  @Column()
  public email: string;

  @Column()
  public telefone: string;

  @OneToMany(() => OrdemServico, (ordemServico) => ordemServico.cliente)
  ordensServico: OrdemServico[];
}
