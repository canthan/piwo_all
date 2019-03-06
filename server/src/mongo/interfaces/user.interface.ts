import { Document } from 'mongoose';

export interface User extends Document {
    id: string;
    username: string;
    firstname: string;
    surname: string;
    password: string;
}
