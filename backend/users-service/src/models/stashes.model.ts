import { Document, model, Schema, Model } from 'mongoose';
import * as uuid from 'uuid';

import { Stash } from '../types/types';

export type StashModel = Document & Stash;

const BottlesSchema = new Schema({
  volume: { type: Number, default: 0.5 },
  amount: { type: Number, defalut: 0 },
});

export const StashSchema = new Schema({
  stashId: { type: String, default: uuid.v4 },
  batchId: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: false },
  items: { type: [BottlesSchema], default: [] },
});

export const StashModel: Model<StashModel> = model<StashModel>('stashes', StashSchema);
