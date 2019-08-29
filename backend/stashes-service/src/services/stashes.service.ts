import { getLogger } from 'log4js';

import { StashModel } from './../models/stashes.model';
import { Stash, StashOutDTO } from '../types/types';
import Exceptions from '../common/exceptions/exceptions';
import { mapStashOutDTO } from './mapper.service';

const logger = getLogger();

export class StashesService {

  public static async getStashesByUserId(userId: string): Promise<StashModel[]> {
    const userStashes = await StashModel.find({ userId }).exec();

    if (!userStashes.length) {
      throw new Exceptions.NotFoundException(`There are no stashes for user with id: ${userId}`);
    }

    return userStashes;
  }

  public static async getStashesByBatchId(batchId: string): Promise<StashModel[]> {
    const stashes = await StashModel.find({ batchId }).exec();

    return stashes.length ? stashes : [];
  }

  public static async getStashById(stashId: string): Promise<StashModel> {
    const stash = await StashModel.findOne({ stashId }).exec();

    if (!stash) {
      throw new Exceptions.NotFoundException(`Stash with id: ${stashId} does not exist`);
    }

    return stash;
  }

  public static async getStashByName(name: string): Promise<StashModel[]> {
    const stashes = await StashModel.find({
      name: {
        $regex: `^${name}$`,
        $options: 'i',
      },
    }).exec();

    if (!stashes) {
      throw new Exceptions.NotFoundException(`Stash with name: ${name} does not exist`);
    }

    return stashes;
  }

  public static async addStash(newStash: StashOutDTO): Promise<Stash> {
    const newStashModel: StashModel = await StashModel.create(newStash);

    return newStashModel.save()
      .then((response: StashModel) => {
        const savedStash: StashModel = response.toObject();
        const mappedStash = mapStashOutDTO(savedStash);

        return mappedStash;
      });
  }

  public static async getAllStashes(): Promise<StashModel[]> {
    const returnedStashes = await StashModel.find().exec();

    if (!returnedStashes.length) {
      throw new Exceptions.NotFoundException(`There are no stashes!`);
    }

    return returnedStashes;
  }

  public static async editStash(updatedStash: Stash): Promise<StashModel> {
    const { stashId } = updatedStash;
    const updatedStashModel = await StashModel.findOne({ stashId }).exec();

    if (!updatedStashModel) {
      throw new Exceptions.NotFoundException(`Can't find stash with id: ${stashId}`);
    }

    const updatedStashResponse = await StashModel.update(
      { stashId },
      { items: updatedStash.items }
    ).exec();

    if (!updatedStashResponse.ok) {
      throw new Error('Something went wrong during updating stash');
    }

    return await StashModel.findOne({ stashId }).exec() as StashModel;
  }

  public static async deleteStashById(stashId: number): Promise<number> {
    const deletedStash = await StashModel.deleteOne({ stashId }).exec();

    if (!deletedStash.ok) {
      throw new Exceptions.NotFoundException(`Can't find stash with id: ${stashId}`);
    }

    return stashId;
  }

  public static async deleteStashesByName(name: string): Promise<number> {
    const deletedStashes = await StashModel.deleteMany({
      name: {
        $regex: `^${name}$`,
        $options: 'i',
      },
    }).exec();

    if (!deletedStashes.ok) {
      throw new Exceptions.NotFoundException(`Can't find any stash with name: ${name}`);
    }

    return deletedStashes.n || 0;
  }

  public static async editStashName(newName: string, oldName: string): Promise<number> {
    const editedStashes = await StashModel.updateMany(
      {
        name: {
          $regex: `^${oldName}$`,
          $options: 'i',
        },
      },
      { name: newName }
    ).exec();

    if (!editedStashes.ok) {
      throw new Exceptions.NotFoundException(`Can't find any stash with name: ${oldName}`);
    }

    return editedStashes.n || 0;
  }
}
