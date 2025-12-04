import { prisma } from "./lib/prisma.js";

async function getEmails() {
    const emails = await prisma.email.findMany();
    console.log(emails);
}

getEmails();