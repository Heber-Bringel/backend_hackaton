import { prisma } from "../../lib/prisma.js"
import type { Email } from '../../generated/prisma/client.js'; 
import type { InboundEmailData } from "../types/emailTypes/InboundEmailData.js";
import type { ClassificationData } from "../types/emailTypes/ClassificationData.js"


export class EmailRepository {
    // SALVA E-MAIL CAPTURADO (POST - Webhook)
    public async createInboundEmail(data: InboundEmailData): Promise<Email> {
        const timestampMs = parseInt(data.timestamp) * 1000;

        const emailToSave = {
            remetente: data.sender,
            destinatario: data.to,
            assunto: data.subject,
            corpoMensagem: data.body,
            dataEnvio: new Date(timestampMs), 
        };

        if (isNaN(timestampMs) || timestampMs === 0) {
            throw new Error("Dados de data inválidos recebidos do webhook.");
        }

        return await prisma.email.create({ data: emailToSave });
    }

    public async findAllEmails(): Promise<Email[]> {
        return await prisma.email.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    public async findEmailById(id: string): Promise<Email | null> {
        const email = await prisma.email.findUnique({
            where: {
                id: id,
            }
        });
        
        return email;
    }

    // LISTA E-MAILS PENDENTES (GET - Tela 2)
    public async findPendingEmails(): Promise<Email[]> {
        return await prisma.email.findMany({ // Usa a instância importada
            where: {
                status: 'PENDENTE',
            },
            orderBy: {
                dataEnvio: 'asc',
            }
        });
    }

    // ATUALIZA/CLASSIFICA E-MAIL (PUT - Tela 2)
    public async classifyEmail(id: string, data: ClassificationData): Promise<Email> {
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