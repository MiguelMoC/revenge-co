import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";
const prisma = new PrismaClient();

async function main() {
	await prisma.account.deleteMany();
	await prisma.session.deleteMany();
	await prisma.verificationToken.deleteMany();
	await prisma.user.deleteMany();
	await prisma.product.deleteMany();
	await prisma.product.createMany({ data: sampleData.products });
	await prisma.user.createMany({ data: sampleData.Users });
	console.log("🚀 ~ DATABASE ~ Seeded succesfully bro!");
}

main();
