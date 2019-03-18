import { getLogger } from 'log4js';

import { StashModel } from './../models/stashes.model';
import { Stash } from '../types/types';
import Exceptions from '../common/exceptions/exceptions';

const logger = getLogger();

export class StashesService {

  public static async getStashesByUserId(userId: string) {
    const userStashes = await StashModel.find({ userId }).exec();

    if (!userStashes.length) {
      throw new Exceptions.NotFoundException(`There are no stashes for user with id: ${userId}`);
    }

    return userStashes;
  }

  public static async getStashesByBatchId(batchId: string) {
    const stashes = await StashModel.find({ batchId }).exec();

    if (!stashes.length) {
      throw new Exceptions.NotFoundException(`There are no stashes for batch with id: ${stashes}`);
    }

    return stashes;
  }

  public static async getStashById(stashId: string) {
    const stash = await StashModel.findOne({ stashId }).exec();

    if (!stash) {
      throw new Exceptions.NotFoundException(`Stash with id: ${stashId} does not exist`);
    }

    return stash;
  }

  public static async addStash(newStash: Stash) {
    // to be tested
    const newStashModel: StashModel = await StashModel.create(newStash);

    return newStashModel.save()
      .then((response: StashModel) => {
        const savedStash: StashModel = response.toObject();
        // const mappedSavedGroupOrder: GroupOrderOutDtoInterface = mapToGroupOrderOutDto([savedGroupOrder])[0];

        return savedStash;
      });
  }

  public static async getAllStashes() {
    const returnedStashes = await StashModel.find().exec();

    if (!returnedStashes.length) {
      throw new Exceptions.NotFoundException(`There are no stashes!`);
    }

    return returnedStashes;
  }

  public static async editStash(updatedStash: Stash) {
    // to be tested
    const { stashId } = updatedStash;
    const updatedStashModel = await StashModel.findOne({ stashId }).exec();

    if (!updatedStashModel) {
      throw new Exceptions.NotFoundException(`Can't find stash with id: ${stashId}`);
    }
    const updatedStashResponse = await StashModel.update(
      { stashId },
      { updatedStash }
    ).exec();

    if (!updatedStashResponse.ok) {
      throw new Error('Something went wrong during updating stash');
    }

    return await StashModel.findOne({ stashId }).exec() as StashModel;

    // return mapToGroupOrderOutDto([updatedGroupOrder])[0];
  }
}
