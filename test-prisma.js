const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({})

async function main() {
    console.log('Prisma Client initialized successfully')
    const count = await prisma.journey.count()
    console.log('Journey count:', count)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
