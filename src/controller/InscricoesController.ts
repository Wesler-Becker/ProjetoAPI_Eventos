import { Inscricoes } from "../models/Inscricoes";
import { Usuario } from "../models/Usuario";
import { Evento } from "../models/Eventos";
import { Request, Response } from "express";

export class InscricoesController {

  async list(req: Request, res: Response): Promise<Response> {
    try {
      let nome = req.query.nome;

      let inscricoes: Inscricoes[] = await Inscricoes.find({
        where: { status: true },
      });
      return res.status(200).json(inscricoes);
    } catch (error) {
      console.error("Erro ao listar inscricao:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      let body = req.body;
      console.log(body);

      let usuarioId = body.usuario_id;
      let eventoId = body.evento_id;
      let status = body.status;
      let checkin = body.checkin;

      let usuario = await Usuario.findOneBy({ id: usuarioId });
      let evento = await Evento.findOneBy({ id: eventoId });

      if (!usuario) {
        return res.status(400).json({ mensagem: "Cliente não encontrado" });
      }

      if (!evento) {
        return res.status(400).json({ mensagem: "Cliente não encontrado" });
      }

      let inscricoes: Inscricoes = await Inscricoes.create({
        usuarios: usuario,
        eventos: evento,
        status: status,
        checkin: checkin
      }).save();
      console.log(inscricoes.usuario_id, inscricoes.evento_id, inscricoes.status, inscricoes.checkin)
      return res.status(200).json(inscricoes);
    } catch (error) {
      console.error("Erro ao criar inscricao:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const inscricaoId = parseInt(req.params.id); // Converte o ID da inscrição para número
      if (isNaN(inscricaoId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de inscrição inválido" }); // Retorna um erro 400 se o ID for inválido
      }
      let body = req.body;

      const inscricao = await Inscricoes.findOne({ where: { id: inscricaoId } }); // Busca a inscrição pelo ID no banco de dados

      if (!inscricao) { // Verifica se a inscrição foi encontrada
        return res.status(404).json({ error: "Inscrição não encontrada" }); // Retorna um erro 404 se a inscrição não for encontrada
      }

      let usuarioId = body.usuario_id;
      let eventoId = body.evento_id;

      let usuario = await Usuario.findOneBy({ id: usuarioId });
      let evento = await Evento.findOneBy({ id: eventoId });

      if (!usuario) {
        return res.status(400).json({ mensagem: "Usuarios não encontrado" });
      }
      if (!evento) {
        return res.status(400).json({ mensagem: "Evento não encontrado" });
      }
      inscricao.usuarios = usuario;
      inscricao.eventos = evento;
      inscricao.status = body.status;
      inscricao.checkin = body.checkin;

      await inscricao.save();

      return res.status(200).json(inscricao);
    } catch (error) {
      console.error("Erro ao alterar inscricao:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const inscricaoId = parseInt(req.params.id); // Converte o ID da inscrição para número
      if (isNaN(inscricaoId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de inscrição inválido" }); // Retorna um erro 400 se o ID for inválido
      }

      const inscricao = await Inscricoes.findOne({ where: { id: inscricaoId } }); // Busca a inscrição pelo ID no banco de dados

      if (!inscricao) { // Verifica se a inscrição foi encontrada
        return res.status(404).json({ error: "Inscrição não encontrada" }); // Retorna um erro 404 se a inscrição não for encontrada
      }

      // Define o status da inscrição como false
      inscricao.status = false;

      // Salva as alterações no banco de dados
      await inscricao.save();

      return res.status(200).json(inscricao); // Retorna a inscrição atualizada
    } catch (error) {
      console.error("Erro ao deletar inscrição:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }


  async find(req: Request, res: Response): Promise<Response> {
    try {
      const inscricaoId = parseInt(req.params.id); // Converte o ID da inscrição para número
      if (isNaN(inscricaoId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de inscrição inválido" }); // Retorna um erro 400 se o ID for inválido
      }

      const inscricao = await Inscricoes.findOne({ where: { id: inscricaoId } }); // Busca a inscrição pelo ID no banco de dados

      if (!inscricao) { // Verifica se a inscrição foi encontrada
        return res.status(404).json({ error: "Inscrição não encontrada" }); // Retorna um erro 404 se a inscrição não for encontrada
      }
      return res.status(200).json(inscricao); // Retorna a inscrição
    } catch (error) {
      console.error("Erro ao encontrar inscricao:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

}
