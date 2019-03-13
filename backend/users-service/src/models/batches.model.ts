import { Document, model, Schema } from 'mongoose';
import * as uuid from 'uuid';

import { Batch } from '../types/types';

export type BatchModel = Document & Batch;

export const BatchSchema = new Schema({
    batchId: { type: String, default: uuid.v4 },
    batchUserId: { type: String, required: true },
    batchNumber: { type: String, required: false },
    batchName: { type: String, required: true },
    quantityLitres: { type: Number, required: true },
    quantityBottles: { type: Number, required: true },
    quantityCrates: { type: Number, required: true },
    bottledOn: { type: Date, required: true },
});

export default model<BatchModel>('batches', BatchSchema);