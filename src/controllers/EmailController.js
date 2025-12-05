import { EmailService } from '../services/EmailService.js';
export class EmailController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    // POST /webhook/inbound-email
    async handleInboundWebhook(req, res) {
        // Implementação da Validação de Segurança do Mailgun AQUI
        try {
            const result = await this.emailService.processInboundEmail(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error('Erro no webhook:', error);
            return res.status(500).json({ error: 'Falha interna.' });
        }
    }
    // GET /emails/pendentes (Tela 2)
    async listPendingEmails(req, res) {
        try {
            const emails = await this.emailService.getPendingEmails();
            return res.status(200).json(emails);
        }
        catch (error) {
            console.error('Erro ao listar pendentes:', error);
            return res.status(500).json({ error: 'Falha ao buscar e-mails pendentes.' });
        }
    }
    async getAllEmails(req, res) {
        try {
            const emails = await this.emailService.getAllEmails();
            return res.status(200).json(emails);
        }
        catch (error) {
            console.error("Erro ao listar emails:", error);
            return res.status(500).json({ error: "Falha ao buscar emails" });
        }
    }
    async getEmailById(req, res) {
        const { id } = req.params;
        try {
            const email = await this.emailService.findEmailById(id);
            return res.status(200).json(email);
        }
        catch (error) {
            if (error.message.includes("não encontrado")) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Falha ao classificar e-mail." });
        }
    }
    // PUT /emails/:id/classificar (Tela 2 - Ação de Salvar)
    async updateClassification(req, res) {
        const { id } = req.params;
        const { estado, municipio } = req.body;
        try {
            const updatedEmail = await this.emailService.classifyEmail(id, { estado, municipio });
            return res.status(200).json(updatedEmail);
        }
        catch (error) {
            // Tratamento de erro de validação (ex: falta de campo)
            if (error.message.includes('obrigatórios')) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Falha ao classificar e-mail.' });
        }
    }
}
//# sourceMappingURL=EmailController.js.map