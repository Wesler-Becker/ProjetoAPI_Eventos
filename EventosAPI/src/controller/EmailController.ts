import nodemailer from 'nodemailer';
import { Usuario } from '../models/Usuario';
import { Request, Response } from 'express';

export class EmailController {
    async enviarEmail(req: Request, res: Response): Promise<Response> {
        try {
            const usuarioId = parseInt(req.params.id);
            if (isNaN(usuarioId)) {
                return res.status(400).json({ error: "ID de usuário inválido" });
            }

            const usuario = await Usuario.findOne({ where: { id: usuarioId } });
            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            const body = req.body;
            const email = usuario.email;
            const titulo = body.titulo;
            const mensagem = body.mensagem;

            // Configurações do Mailtrap com as novas credenciais
            const mailtrapConfig = {
                host: 'sandbox.smtp.mailtrap.io',
                port: 587, // Você pode escolher entre 25, 465, 587 ou 2525
                auth: {
                    user: 'd61490788a9d09',
                    pass: '73c9e879a3afe6',
                },
                tls: {
                    rejectUnauthorized: false
                }
            };

            // Opções do e-mail
            const mailOptions = {
                from: 'codimog675@picdv.com', // Use um e-mail do seu domínio ou um genérico
                to: email,
                subject: titulo,
                html: mensagem,
            };

            // Criação do transporte Nodemailer
            const transporter = nodemailer.createTransport(mailtrapConfig);

            // Envio do e-mail
            await transporter.sendMail(mailOptions);

            return res.status(200).json({ mensagem: 'E-mail enviado com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).json({ erro: 'Erro ao enviar e-mail.' });
        }
    }
}
