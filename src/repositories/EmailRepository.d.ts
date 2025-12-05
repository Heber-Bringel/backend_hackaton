import type { Email } from '../../generated/prisma/client.js';
import type { InboundEmailData } from "../types/emailTypes/InboundEmailData.js";
import type { ClassificationData } from "../types/emailTypes/ClassificationData.js";
export declare class EmailRepository {
    createInboundEmail(data: InboundEmailData): Promise<Email>;
    findAllEmails(): Promise<Email[]>;
    findEmailById(id: string): Promise<Email | null>;
    findPendingEmails(): Promise<Email[]>;
    classifyEmail(id: string, data: ClassificationData): Promise<Email>;
}
//# sourceMappingURL=EmailRepository.d.ts.map