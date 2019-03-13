import { Document, model, Schema } from 'mongoose';
import * as uuid from 'uuid';

import { Stash } from '../types/types';

export type StashModel = Document & Stash;

export const StashSchema = new Schema({
    stashId: { type: String, default: uuid.v4 },
    batchId: { type: String, required: true },
    stashName: { type: String, required: true },
    b033: { type: Number, required: true },
    b040: { type: Number, required: true },
    b050: { type: Number, required: true },
});

export default model<StashModel>('stashes', StashSchema);