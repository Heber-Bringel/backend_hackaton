import { EmailRepository } from '../repositories/EmailRepository.js';
export class EmailService {
    emailRepository;
    constructor() {
        this.emailRepository = new EmailRepository();
    }
    async processInboundEmail(data) {
        return this.emailRepository.createInboundEmail(data);
    }
    async getAllEmails() {
        return this.emailRepository.findAllEmails();
    }
    async findEmailById(id) {
        const email = await this.emailRepository.findEmailById(id);
        if (!email) {
            throw new Error('Email não encontrado.');
        }
        return email;
    }
    async getPendingEmails() {
        return this.emailRepository.findPendingEmails();
    }
    async classifyEmail(id, data) {
        if (!data.estado || !data.municipio) {
            throw new Error('Estado e Município são obrigatórios para classificação.');
        }
        return this.emailRepository.classifyEmail(id, data);
    }
}
//# sourceMappingURL=EmailService.js.map