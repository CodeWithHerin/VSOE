// Test Supabase connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  try {
    // Simple query to test connection
    const count = await prisma.cabin.count();
    console.log('✅ Connection SUCCESS! Cabin count:', count);
    
    const types = await prisma.cabin.findMany({ select: { type: true }, distinct: ['type'] });
    console.log('Cabin types:', types.map(t => t.type));
  } catch (err) {
    console.log('❌ Connection FAILED:', err.message);
  } finally {
    await prisma.$disconnect();
  }
})();
