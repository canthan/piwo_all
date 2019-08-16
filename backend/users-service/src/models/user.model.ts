import { Document, model, Schema } from 'mongoose';
import * as timestamps from 'mongoose-timestamp';
import * as uuid from 'uuid';

import { User, StashConfig } from '../types/types';

export type UserModel = Document & Omit<User, 'stashConfig'> & {stashConfig: StashConfigModel[]};
export type StashConfigModel = Document & StashConfig;

export const StashConfigSchema = new Schema({
  name: { type: String, required: true },
  cratesTotal: { type: Number, default: 0 },
})

export const UserSchema = new Schema({
  userId: { type: String, default: uuid.v4 },
  username: { type: String, required: false },
  firstname: { type: String, required: false },
  surname: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: new Date() },
  stashConfig: { type: [StashConfigSchema], default: [] },
});

UserSchema.plugin(timestamps);

export default model<UserModel>('users', UserSchema);
