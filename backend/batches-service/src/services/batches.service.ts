import { getLogger } from 'log4js';

import Exceptions from '../common/exceptions/exceptions';

import { mapBatchOutDTO } from './mapper.service';
import { BatchModel } from './../models/batches.model';

import { getLitres, getHalfLiterBottleAmount, getSmallBottleAmount, BOTTLES_IN_CRATE } from '../utils/common';
import { Batch, Stash } from '../types/types';

const logger = getLogger();

export class BatchesService {

  public static async getBatchByUserId(userId: string) {
    const userBatches = await BatchModel.find({ userId }).exec();

    if (!userBatches.length) {
      throw new Exceptions.NotFoundException(`There are no batches for user with id: ${userId}`);
    }

    return userBatches;
  }

  public static async addBatch(newBatch: Batch) {
    const newBatchModel: BatchModel = await BatchModel.create(newBatch);

    return newBatchModel.save()
      .then((response: BatchModel) => {
        const savedBatch: BatchModel = response.toObject();

        return mapBatchOutDTO(savedBatch);
      });
  }

  public static async getAllBatches() {
    const returnedBatches = await BatchModel.find().exec();

    if (!returnedBatches.length) {
      throw new Exceptions.NotFoundException(`There are no batches!`);
    }

    return returnedBatches;
  }

  public static async editBatch(updatedBatch: Batch) {
    const { batchId, name, batchNo, bottledOn } = updatedBatch;
    const updatedBatchModel = await BatchModel.findOne({ batchId }).exec();
    if (!updatedBatchModel) {
      throw new Exceptions.NotFoundException(`Can't find batch with id: ${batchId}`);
    }
    const updated = await BatchModel.update(
      { batchId },
      {
        ...updatedBatch,
        name,
        batchNo,
        bottledOn,
      }
    ).exec();

    if (!updated.ok) {
      throw new Error('Something went wrong during updating batch');
    }

    const updatedBatchResponse = await BatchModel.findOne({ batchId }).exec() as BatchModel;

    return mapBatchOutDTO(updatedBatchResponse);
  }

  public static async updateQuantities(batchId: string, stashes: Stash[]) {
    const updatedBatchModel = await BatchModel.findOne({ batchId }).exec();

    if (!updatedBatchModel) {
      throw new Exceptions.NotFoundException(`Can't find batch with id: ${batchId}`);
    }

    const quantityLitres = getLitres(stashes);
    const quantityBottles = getHalfLiterBottleAmount(stashes);
    const quantityBottlesSmall = getSmallBottleAmount(stashes);
    const quantityCrates = quantityBottles / BOTTLES_IN_CRATE;

    const updated = await BatchModel.updateOne(
      { batchId },
      { quantityLitres, quantityBottles, quantityBottlesSmall, quantityCrates }
    ).exec();

    if (!updated.ok) {
      throw new Error('Something went wrong during updating batch');
    }

    const updatedBatchResponse = await BatchModel.findOne({ batchId }).exec() as BatchModel;

    return mapBatchOutDTO(updatedBatchResponse);
  }

  public static async removeBatch(batchId: string): Promise<string> {
    const removedBatch = await BatchModel.deleteOne({ batchId }).exec();

    if (!removedBatch.ok) {
      throw new Exceptions.NotFoundException(`Can't find batch with id: ${batchId}`);
    }

    return batchId;
  }
}
