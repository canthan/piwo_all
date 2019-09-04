import { Batch, Stash, BatchOutDTO, StashOutDTO } from './../types/storage.types';

export class MapperService {
  public MapBatchOutDTO = (batch: Batch): BatchOutDTO => {
    const { batchNo, name, bottledOn, quantityBottles, quantityLitres, quantityCrates, stashes, quantityBottlesSmall } = batch;

    return { batchNo, name, bottledOn, quantityBottles, quantityLitres, quantityCrates, stashes, quantityBottlesSmall }
  }

  public MapStashOutDTO = (stash: Stash): StashOutDTO => {
    const { items, name, key } = stash;

    return { items, name, key }
  }
}