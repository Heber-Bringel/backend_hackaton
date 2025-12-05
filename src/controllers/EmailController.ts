import type { Request, Response } from 'express';
import { EmailService } from '../services/EmailService.js';

export class EmailController {
    private emailService: EmailService;

    constructor(emailService: EmailService) {
        this.emailService = emailService;
    }

    // POST /webhook/inbound-email
    public async handleInboundWebhook(req: Request, res: Response) {
        const corpoMensagem = req.body["body-plain"] ?? "";

        try {
            const payload = {
                remetente: req.body.From,
                destinatario: req.body.To,
                assunto: req.body.subject,
                corpoMensagem: corpoMensagem,
                dataEnvio: req.body.timestamp,
                status: req.body.status
            };

            const result = await this.emailService.processInboundEmail(payload);
            return res.status(200).json(result);
            
        } catch (error: any) {
            console.error('Erro no webhook:', error);
            return res.status(500).json({ error: 'Falha interna.' });
        }
    }

    // GET /emails/pendentes (Tela 2)
    public async listPendingEmails(req: Request, res: Response) {
        try {
            const emails = await this.emailService.getPendingEmails();
            return res.status(200).json(emails);
        } catch (error: any) {
            console.error('Erro ao listar pendentes:', error);
            return res.status(500).json({ error: 'Falha ao buscar e-mails pendentes.' });
        }
    }

    public async getAllEmails(req: Request, res: Response) {
        try {
            const emails = await this.emailService.getAllEmails();
            return res.status(200).json(emails);
        } catch (error: any) {
            console.error("Erro ao listar emails:", error);
            return res.status(500).json({ error: "Falha ao buscar emails" });
        }
    }

    public async getEmailById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const email = await this.emailService.findEmailById(id!);
            return res.status(200).json(email);
        } catch (error: any) {
            if (error.message.includes("não encontrado")) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Falha ao buscar o e-mail." });
        }
    }

    // PUT /emails/:id/classificar (Tela 2 - Ação de Salvar)
    public async updateClassification(req: Request, res: Response) {
        const { id } = req.params;
        const { estado, municipio } = req.body;

        try {
            const updatedEmail = await this.emailService.classifyEmail(id!, { estado, municipio });
            return res.status(200).json(updatedEmail);
        } catch (error: any) {
            // Tratamento de erro de validação (ex: falta de campo)
            if (error.message.includes('obrigatórios')) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Falha ao classificar e-mail.' });
        }
    }
}