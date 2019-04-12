import { Document, model, Schema, Model } from 'mongoose';
import * as uuid from 'uuid';

import { Stash, Bottles } from '../types/types';

export type StashModel = Document & Stash;

export const StashSchema = new Schema({
  stashId: { type: String, default: uuid.v4 },
  batchId: { type: String, required: true },
  userId: { type: String, required: true },
  stashName: { type: String, required: false },
  items: {
    b050: {
      type: Number,
      required: false,
    },
    b040: {
      type: Number,
      required: false,
    },
    b033: {
      type: Number,
      required: false,
    },
  },
});

export const StashModel: Model<StashModel> = model<StashModel>('stashes', StashSchema);
