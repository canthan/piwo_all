import { getLogger } from 'log4js';

import { BatchModel } from './../models/batches.model';
import Exceptions from '../common/exceptions/exceptions';
import { Batch } from '../types/types';

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
    // to be tested
    const newBatchModel: BatchModel = await BatchModel.create(newBatch);

    return newBatchModel.save()
      .then((response: BatchModel) => {
        const savedBatch: BatchModel = response.toObject();
        // const mappedSavedGroupOrder: GroupOrderOutDtoInterface = mapToGroupOrderOutDto([savedGroupOrder])[0];

        return savedBatch;
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
    const { batchId } = updatedBatch;
    const updatedBatchModel = await BatchModel.findOne({ batchId }).exec();
    if (!updatedBatchModel) {
      throw new Exceptions.NotFoundException(`Can't find batch with id: ${batchId}`);
    }
    const updatedBatchResponse = await BatchModel.update(
      { batchId },
      { updatedBatch }
    ).exec();

    if (!updatedBatchResponse.ok) {
      throw new Error('Something went wrong during updating batch');
    }

    return await BatchModel.findOne({ batchId }).exec() as BatchModel;

    // return mapToGroupOrderOutDto([updatedGroupOrder])[0];
  }





}
