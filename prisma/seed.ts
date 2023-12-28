import { hash } from "bcrypt"
import prisma from "../lib/prisma"


async function main() {
    const password = await hash("test", 12)
    console.log(password)
    const user = await prisma.user.upsert({
        where: { email: "test@test.com" },
        update: {},
        create: {
            username: "test",
            email: "test@test.com",
            password: password
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