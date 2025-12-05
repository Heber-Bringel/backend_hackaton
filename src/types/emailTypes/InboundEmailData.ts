export type InboundEmailData = {
    sender: string;
    recipient: string;
    subject: string;
    'body-plain': string;
    timestamp: string;
    signature?: string;
    token?: string;
}