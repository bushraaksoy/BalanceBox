import prisma from '../db/db.config.js';

export const requireAdmin = async (req, res, next) => {
    try {
        const userId = req.headers['user-id'];
        if (!userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user?.isAdmin) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.userId = userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
