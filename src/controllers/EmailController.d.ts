import type { Request, Response } from 'express';
import { EmailService } from '../services/EmailService.js';
export declare class EmailController {
    private emailService;
    constructor(emailService: EmailService);
    handleInboundWebhook(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listPendingEmails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllEmails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getEmailById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateClassification(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=EmailController.d.ts.map