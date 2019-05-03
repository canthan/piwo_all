import { Bottles, StashSummary, EmptyBatch, BatchOutDTO, StashOutDTO } from './storage.types';

export const BOTTLES_IN_CRATE = 20;
export const HALF_LITER = 0.5;
export const MILISEC_PER_DAY = 86400000;
export const MILISEC_PER_WEEK = 604800000;

export const initialStashSummary: StashSummary = {
  name: '',
  crates: {
    overall: 0,
    full: 0,
    empty: 0,
  },
  litres: 0,
  bottles: {
    small: 0,
    halfLiter: 0,
  },
}

export const initialBatch: BatchOutDTO = {
  bottledOn: new Date(),
  name: 'aaa',
  batchNo: '1',
  litres: 0,
  bottles: 0,
  crates: 0,
  stashes: [],
}

export const initialEmptyBatch: EmptyBatch = {
  bottledOn: new Date(),
  name: 'aaa',
  batchNo: '1',
}

export const initialBottles: Bottles = {
  b033: 0,
  b040: 0,
  b050: 0,
}

export const initialStash: StashOutDTO = { 
  name: '',
  key: null,
  items: initialBottles,
}
