import { Evento } from "../models/Eventos";
import { Request, Response } from "express";

export class EventosController {

  async list(req: Request, res: Response): Promise<Response> {
    try {
      let nome = req.query.nome;

      let eventos: Evento[] = await Evento.find({
        where: { status: true },
      });
      return res.status(200).json(eventos);
    } catch (error) {
      console.error("Erro ao listar evento:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      let body = req.body;
      console.log(body);

      let evento: Evento = await Evento.create({
        nome: body.nome,
        dataInicio: body.dataInicio,
        dataFim: body.dataFim,
        hora: body.hora,
        local: body.local,
        status: true,
        descricao: body.descricao,
        teste: false,
      }).save();

      return res.status(200).json(evento);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const eventosId = parseInt(req.params.id); // Converte o ID da evento para número
      if (isNaN(eventosId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de evento inválido" }); // Retorna um erro 400 se o ID for inválido
      }
      let body = req.body;

      const eventos = await Evento.findOne({ where: { id: eventosId } }); // Busca a evento pelo ID no banco de dados

      if (!eventos) { // Verifica se a evento foi encontrada
        return res.status(404).json({ error: "Evento não encontrado" }); // Retorna um erro 404 se a evento não for encontrada
      }

      if (!eventos) {
        return res.status(400).json({ mensagem: "Evento não encontrado" });
      }

      eventos.nome = body.nome;
      eventos.dataInicio = body.dataInicio;
      eventos.dataFim = body.dataFim;
      eventos.hora = body.hora;
      eventos.local = body.local;
      eventos.descricao = body.descricao;
      eventos.status = body.status

      await eventos.save();

      return res.status(200).json(eventos);
    } catch (error) {
      console.error("Erro ao alterar evento:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }


  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const eventosId = parseInt(req.params.id); // Converte o ID do eventos para número
      if (isNaN(eventosId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de eventos inválido" }); // Retorna um erro 400 se o ID for inválido
      }

      const eventos = await Evento.findOne({ where: { id: eventosId } }); // Busca a eventos pelo ID no banco de dados

      if (!eventos) { // Verifica se a eventos foi encontrada
        return res.status(404).json({ error: "eventos não encontrado" }); // Retorna um erro 404 se a eventos não for encontrado
      }

      // Define o status da eventos como false
      eventos.status = false;

      // Salva as alterações no banco de dados
      await eventos.save();

      return res.status(200).json(eventos); // Retorna o eventos atualizada
    } catch (error) {
      console.error("Erro ao deletar eventos:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }


  async find(req: Request, res: Response): Promise<Response> {
    try {
      const eventosId = parseInt(req.params.id); // Converte o ID do eventos para número
      if (isNaN(eventosId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de eventos inválido" }); // Retorna um erro 400 se o ID for inválido
      }

      const eventos = await Evento.findOne({ where: { id: eventosId } }); // Busca a eventos pelo ID no banco de dados

      if (!eventos) { // Verifica se a eventos foi encontrada
        return res.status(404).json({ error: "eventos não encontrado" }); // Retorna um erro 404 se a eventos não for encontrado
      }
      return res.status(200).json(eventos); // Retorna o eventos
    } catch (error) {
      console.error("Erro ao encontrar evento:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
