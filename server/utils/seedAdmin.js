import bcrypt from 'bcrypt';
import prisma from '../db/db.config.js';

export const seedAdmin = async () => {
    const username = process.env.ADMIN_USERNAME?.trim();
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        console.log('ADMIN_USERNAME or ADMIN_PASSWORD is missing, skipping admin seed');
        return;
    }

    const hash = await bcrypt.hash(password, 10);
    await prisma.user.upsert({
        where: { username },
        update: { password: hash, isAdmin: true },
        create: {
            username,
            password: hash,
            isAdmin: true,
        },
    });
    console.log('Admin account ready');
};
