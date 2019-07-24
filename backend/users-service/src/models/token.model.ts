import { Document, model, Schema } from 'mongoose';
import * as timestamps from 'mongoose-timestamp';
import * as uuid from 'uuid';
import * as dayjs from 'dayjs';

import { getCurrentDate } from '../utils/common';
import { Token } from '../types/types';
import { CONFIG } from '../types/config';

export type TokenModel = Document & Token;

function getExpirationDate(): Date {
  const expirationDate: Date = dayjs().toDate();
  const expirationTime: number = expirationDate.getTime() + CONFIG.tokenExpiration;

  expirationDate.setTime(expirationTime);

  return expirationDate;
}

export const TokenSchema = new Schema({
    userId: { type: String, required: true},
    token: { type: String, default: uuid.v4 },
    expirationDate: { type: Date, default: getExpirationDate() },
    creationDate: { type: Date, default: getCurrentDate() },
});

TokenSchema.plugin(timestamps);

export default model<TokenModel>('tokens', TokenSchema);