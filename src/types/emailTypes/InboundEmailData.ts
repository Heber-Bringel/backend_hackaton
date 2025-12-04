export type InboundEmailData = {
    from: string;
    To: string; // O Mailgun usa 'To' com letra maiúscula
    subject: string;
    'body-plain': string; // O corpo da mensagem (texto puro)
    timestamp: string; // Timestamp em formato string (segundos)
    // Campos de segurança (opcional, mas bom ter para o Service)
    signature?: string;
    token?: string;
}