import { Document, model, Schema, Model } from 'mongoose';
import * as uuid from 'uuid';

import { Stash } from '../types/types';

export type StashModel = Document & Stash;

export const StashSchema = new Schema({
  stashId: { type: String, default: uuid.v4 },
  batchId: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: false },
  items: {
    b050: {
      type: Number,
      default: 0,
    },
    b040: {
      type: Number,
      default: 0,
    },
    b033: {
      type: Number,
      default: 0,
    },
  },
});

export const StashModel: Model<StashModel> = model<StashModel>('stashes', StashSchema);