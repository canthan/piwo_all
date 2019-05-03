import { StashModel } from '../models/stashes.model';
import { Stash } from '../types/types';

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
