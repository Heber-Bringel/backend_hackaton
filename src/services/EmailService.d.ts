import type { Email } from '../../generated/prisma/client.js';
import type { InboundEmailData } from '../types/emailTypes/InboundEmailData.js';
import type { ClassificationData } from '../types/emailTypes/ClassificationData.js';
export declare class EmailService {
    private emailRepository;
    constructor();
    processInboundEmail(data: InboundEmailData): Promise<Email>;
    getAllEmails(): Promise<Email[]>;
    findEmailById(id: string): Promise<Email | null>;
    getPendingEmails(): Promise<Email[]>;
    classifyEmail(id: string, data: ClassificationData): Promise<Email>;
}
//# sourceMappingURL=EmailService.d.ts.map