import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
    secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  };