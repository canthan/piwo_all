import { Document, model, Schema, Model } from 'mongoose';
import * as uuid from 'uuid';

import { Batch } from '../types/types';

export type BatchModel = Document & Batch;

export const BatchSchema = new Schema({
    batchId: { type: String, default: uuid.v4 },
    userId: { type: String, required: true },
    batchNumber: { type: String, required: false },
    batchName: { type: String, required: true },
    quantityLitres: { type: Number, required: false, default: 0 },
    quantityBottles: { type: Number, required: false, default: 0 },
    quantityCrates: { type: Number, required: false, default: 0 },
    bottledOn: { type: Date, required: true },
});

export const BatchModel: Model<BatchModel> = model<BatchModel>('batches', BatchSchema);
