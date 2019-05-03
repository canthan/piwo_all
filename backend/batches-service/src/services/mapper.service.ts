import { StashModel } from '../models/stashes.model';
import { Stash, Batch } from '../types/types';
import { BatchModel } from '../models/batches.model';

export const mapStashOutDTO = (stashModel: StashModel): Stash => {
  const { name, batchId, stashId, userId, items } = stashModel;

  return {
    name,
    batchId,
    stashId,
    userId,
    items,
  }
}

export const mapBatchOutDTO = (batchModel: BatchModel): Batch => {
  const { name, batchId, batchNo, userId, bottledOn, quantityLitres, quantityBottles, quantityCrates } = batchModel;

  return {
    name,
    batchId,
    batchNo,
    userId,
    bottledOn, 
    quantityLitres, 
    quantityBottles, 
    quantityCrates,
  }
}
