import { model, Schema } from 'mongoose';

import { User } from '../interfaces/user.interface';

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        firstname: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: Date,
    },
    { collection: 'users' }
);

export default model<User>('user', UserSchema);
