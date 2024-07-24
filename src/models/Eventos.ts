import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
} from "typeorm";
import { Inscricoes } from "./Inscricoes";

@Entity("eventos")
export class Evento extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 255 })
	nome: string;

	@Column({ length: 255 })
	dataInicio: string;

	@Column({ length: 255 })
	dataFim: string;

	@Column({ length: 255 })
	hora: string;

	@Column({ length: 255 })
	local: string;

	@Column()
	status: boolean;

	@Column({ length: 255 })
	descricao: string;

	@Column({ type: "timestamp", default: "now()" })
	dataCriacao: string;

	@OneToMany(() => Inscricoes, (inscricoes) => inscricoes.evento_id)
	inscricoesRealizadas: Inscricoes[];
}
