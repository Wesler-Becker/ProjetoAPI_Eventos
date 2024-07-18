import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Inscricoes } from "./Inscricoes";

@Entity("usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ unique: true }) // usuario unico
  email: string;

  @Column({ select: false }) //nenhuma consulta ira retornar a senha
  senha: string;

  @Column({ length: 20 })
  telefone: string;

  @Column({})
  status: boolean;

  @Column({ nullable: true })
  admin: boolean;

  @OneToMany(() => Inscricoes, (inscricoes) => inscricoes.usuario_id)
  usuarios: Inscricoes[];
}
