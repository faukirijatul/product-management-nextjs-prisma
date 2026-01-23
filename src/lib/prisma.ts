import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import os from 'os';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  prisma = globalForPrisma.prisma;
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

function createPrismaClient(): PrismaClient {
  let databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set in environment variables');
  }

  if (process.env.NODE_ENV === 'production' && process.env.AIVEN_CA_BASE64) {
    const caFileName = 'aiven-ca.pem';
    const caPath = path.join(os.tmpdir(), caFileName);

    if (!fs.existsSync(caPath)) {
      try {
        const caContent = Buffer.from(process.env.AIVEN_CA_BASE64, 'base64').toString('utf-8');
        fs.writeFileSync(caPath, caContent);
        console.log(`[Prisma] Aiven CA certificate written to: ${caPath}`);
      } catch (error) {
        console.error('[Prisma] Failed to write Aiven CA cert:', error);
      }
    }

    const sslParams = fs.existsSync(caPath)
      ? `&sslcert=${encodeURIComponent(caPath)}&sslaccept=strict`
      : '&sslaccept=accept_invalid_certs';

    databaseUrl += sslParams;
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}

export default prisma;