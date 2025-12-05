import { prisma } from "../../lib/prisma.js";
export class EmailRepository {
    // SALVA E-MAIL CAPTURADO (POST - Webhook)
    async createInboundEmail(data) {
        const emailToSave = {
            remetente: data.from,
            destinatario: data.To,
            assunto: data.subject,
            corpoMensagem: data['body-plain'],
            dataEnvio: new Date(parseInt(data.timestamp) * 1000),
        };
        return await prisma.email.create({ data: emailToSave }); // Usa a instância importada
    }
    async findAllEmails() {
        return await prisma.email.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }
    async findEmailById(id) {
        const email = await prisma.email.findUnique({
            where: {
                id: id,
            }
        });
        return email;
    }
    // LISTA E-MAILS PENDENTES (GET - Tela 2)
    async findPendingEmails() {
        return await prisma.email.findMany({
            where: {
                status: 'PENDENTE',
            },
            orderBy: {
                dataEnvio: 'asc',
            }
        });
    }
    // ATUALIZA/CLASSIFICA E-MAIL (PUT - Tela 2)
    async classifyEmail(id, data) {
        return await prisma.email.update({
            where: { id },
            data: {
                estado: data.estado,
                municipio: data.municipio,
                status: 'CLASSIFICADO',
            },
        });
    }
}
//# sourceMappingURL=EmailRepository.js.map