import dotenv from 'dotenv';

dotenv.config();

export const config = {
    MONGO : process.env.MONGO,
    JWT: process.env.JWT_SECRET,
    PORT: process.env.PORT || 3000,
}