import prisma from "../lib/prisma"

async function main() {
    const user = await prisma.user.upsert({
        where: { email: "test@test.com" },
        update: {},
        create: {
            name: "test",
            email: "test@test.com",
            password: "test",
        }
    })
    console.log({user})
}
main()
    .then(async () => {await prisma.$disconnect()})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })