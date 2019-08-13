import dayjs from 'dayjs';

import { Bottle, StashSummary, EmptyBatch, BatchOutDTO, StashOutDTO } from './storage.types';

export const BOTTLES_IN_CRATE = 20;
export const HALF_LITER = 0.5;
export const MILISEC_PER_DAY = 86400000;
export const MILISEC_PER_WEEK = 604800000;

export const VOLUME_DIVIDER = 100;

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";

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
  bottledOn: dayjs().format(DEFAULT_DATE_FORMAT),
  name: 'aaa',
  batchNo: '1',
}

export const initialBottles: Bottle[] = [
  {
    volume: 0.5,
    amount: 0,
  },
  {
    volume: 0.4,
    amount: 0,
  },
  {
    volume: 0.33,
    amount: 0,
  },
]

export const initialStash: StashOutDTO = {
  name: '',
  key: null,
  items: initialBottles,
}

export enum OptionsButtons {
  Edit = 'Edit',
  Save = 'Save',
  Delete = 'Delete',
  Mode = 'Mode',
  AddStorage = 'Add Storage'
}

// tslint:disable-next-line no-magic-numbers
export const INCREMENT_BUTTONS = [1, 3, 5];
export const DECREMENT_BUTTONS = [-1, -3, -5];
