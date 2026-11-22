import jwt from 'jsonwebtoken';
import prisma from '../db/db.config.js';

export const authenticateJWT = (req, res, next) => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export const authenticateUserId = async (req, res, next) => {
    try {
        const userId = req.headers['user-id'];

        if (!userId) {
            return res.status(400).send({ message: 'user-id is missing!' });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res
                .status(404)
                .send({ message: 'Invalid user-id. User not found.' });
        }
        req.userId = userId;
        const seen = user.lastSeenAt ? new Date(user.lastSeenAt).getTime() : 0;
        if (Date.now() - seen > 15 * 60 * 1000) {
            prisma.user
                .update({
                    where: { id: userId },
                    data: { lastSeenAt: new Date() },
                })
                .catch((updateError) => console.log(updateError));
        }
        next();
    } catch (error) {
        console.log(error);
    }
};
