export type PrismaDatabaseSeeder = (prisma: PrismaClient) => Promise<void>;

export type PrismaDatabaseSeederCollection = PrismaDatabaseSeeder[];