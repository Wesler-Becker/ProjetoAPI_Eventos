import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Evento } from "./Eventos";
import { Usuario } from "./Usuario";

@Entity("inscricoes")
export class Inscricoes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: "now()" })
  dataHora: string;

  @Column()
  status: boolean;

  @Column({})
  checkin: boolean;
  
 
  evento_id: number;

  @ManyToOne(() => Evento, (evento) => evento.inscricoesRealizadas, {
    eager: true,
  })
  @JoinColumn({ name: "evento_id" })
  eventos: Evento;
  
  
  usuario_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarios, { eager: true })
  @JoinColumn({ name: "usuario_id" })
  usuarios: Usuario;
}
