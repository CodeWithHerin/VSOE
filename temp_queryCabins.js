// Temporary script to list distinct cabin types
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const cabins = await prisma.cabin.findMany({ select: { type: true } });
  const types = [...new Set(cabins.map(c => c.type))];
  console.log('Distinct cabin types in DB:', types);
  await prisma.$disconnect();
})();
