import { Document, model, Schema, SchemaTypeOpts } from 'mongoose';
import * as timestamps from 'mongoose-timestamp';
import * as uuid from 'uuid';

import { User } from '../types/types';

export type UserModel = Document & User;

export const UserSchema = new Schema({
    userId: { type: String, default: uuid.v4 },
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    registrationDate: Date,
}
    // { collection: 'users' }
);

UserSchema.plugin(timestamps);

export default model<UserModel>('users', UserSchema);
