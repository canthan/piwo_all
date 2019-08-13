import { Batch, Stash } from '../../types/storage.types';
import { HALF_LITER } from '../../types/storage.constants';


export const getStashesFromBatch = (batches: Batch[], batchId: string): Stash[] => {
  const stashes = batches.find(batch => batch.batchId === batchId);

  return stashes ? stashes.stashes : [];
}

export const getLitres = (stashes: Stash[]): number => stashes.reduce(
  (acc, stash) => acc + stash.items.reduce(
    (litres, item) => litres + (item.amount * item.volume),
    0),
  0);


export const getHalfLiterBottleAmount = (stashes: Stash[]): number => stashes.reduce(
  (acc, stash) => acc + stash.items.reduce(
    (bottles, item) => bottles + (item.volume === HALF_LITER ? item.amount : 0),
    0),
  0);

export const getSmallBottleAmount = (stashes: Stash[]): number => stashes.reduce(
  (acc, stash) => acc + stash.items.reduce(
    (bottles, item) => bottles + (item.volume !== HALF_LITER ? item.amount : 0),
    0),
  0);
