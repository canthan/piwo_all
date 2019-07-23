import { Stash, BatchWithStashes } from '../types/types';

export class OutputService {

  public fetchStashesToBatches(batches: BatchWithStashes[], stashes: Stash[]) {
    batches.forEach(batch => {
      batch.stashes = [];
      stashes.forEach(stash => {
        if (batch.batchId === stash.batchId && !!batch.stashes) {
          batch.stashes.push(stash);
        }
      });
    });

    return batches;
  }
}
