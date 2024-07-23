import { Usuario } from "../models/Usuario";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export class UsuarioController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      let nome = req.query.nome;

      let usuario: Usuario[] = await Usuario.find({
        where: { status: true },
      });
      return res.status(200).json(usuario);
    } catch (error) {
      console.error("Erro ao listar usuario:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      let body = req.body;
      let senha = await bcrypt.hash(body.senha, 10);
      let usuario: Usuario = await Usuario.create({
        nome: body.nome,
        email: body.email,
        senha: senha,
        telefone: body.telefone,
        status: true,
        admin: false,
      }).save(); //cria o usuario

      let { senha: s, ...usuarioSemSenha } = usuario;

      return res.status(200).json(usuarioSemSenha); //retorna o usuario criado e o status que deu certo

    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const usuarioId = parseInt(req.params.id); // Converte o ID da usuário para número
      if (isNaN(usuarioId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de usuário inválido" }); // Retorna um erro 400 se o ID for inválido
      }
      let body = req.body;

      const usuario = await Usuario.findOne({ where: { id: usuarioId } }); // Busca a usuário pelo ID no banco de dados

      if (!usuario) { // Verifica se a usuário foi encontrada
        return res.status(404).json({ error: "Usuário não encontrado" }); // Retorna um erro 404 se a usuário não for encontrada
      }

      if (!usuario) {
        return res.status(400).json({ mensagem: "Usuários não encontrado" });
      }

      let senha = await bcrypt.hash(body.senha, 10);

      usuario.nome = body.nome;
      usuario.email = body.email;
      usuario.senha = senha;
      usuario.telefone = body.telefone;
      usuario.status = body.status;
      usuario.admin = body.admin;

      await usuario.save();

      return res.status(200).json(usuario);
    } catch (error) {
      console.error("Erro ao alterar usuario:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const usuarioId = parseInt(req.params.id); // Converte o ID do usuario para número
      if (isNaN(usuarioId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de usuário inválido" }); // Retorna um erro 400 se o ID for inválido
      }

      const usuario = await Usuario.findOne({ where: { id: usuarioId } }); // Busca a usuario pelo ID no banco de dados

      if (!usuario) { // Verifica se a usuario foi encontrada
        return res.status(404).json({ error: "Usuário não encontrado" }); // Retorna um erro 404 se a usuario não for encontrado
      }

      // Define o status da usuario como false
      usuario.status = false;

      // Salva as alterações no banco de dados
      await usuario.save();

      return res.status(200).json(usuario); // Retorna o usuario atualizada
    } catch (error) {
      console.error("Erro ao deletar usuario:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const usuarioId = parseInt(req.params.id); // Converte o ID da usuário para número
      if (isNaN(usuarioId)) { // Verifica se o ID é um número válido
        return res.status(400).json({ error: "ID de usuário inválido" }); // Retorna um erro 400 se o ID for inválido
      }
      let body = req.body;

      const usuario = await Usuario.findOne({ where: { id: usuarioId } }); // Busca a usuário pelo ID no banco de dados

      if (!usuario) { // Verifica se a usuário foi encontrada
        return res.status(404).json({ error: "Usuário não encontrado" }); // Retorna um erro 404 se a usuário não for encontrada
      }
      return res.status(200).json(usuario); // Retorna o usuario
    } catch (error) {
      console.error("Erro ao encontrar usuario:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

}
