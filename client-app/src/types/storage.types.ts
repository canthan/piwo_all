import { AnyFunction } from './common.types';

export interface BatchesState {
  batches: Batch[];
}

export interface StashesState {
  stashes: Stash[];
}

export interface ItemState {
  stashes: Stash[];
  selected: SelectedStash;
}

export interface SummaryState {
  summary: StashSummary[];
}

export interface StashSummary {
  name: string;
  crates: StashCrates;
  litres: number;
  bottles: StashBottles
}

export const initialStashSummary: StashSummary = {
  name: '',
  crates: {
    overall: 0,
    full: 0,
    empty: 0,
  },
  litres: 0,
  bottles: {
    halfLiter: 0,
    small: 0,
  }
}

export interface StashBottles {
  small: number;
  halfLiter: number;
}

export interface StashCrates {
  overall: number;
  full: number;
  empty: number;
}

export interface BatchOutDTO {
  batchNo: string;
  name: string;
  bottledOn: Date | string;
  litres: number;
  bottles: number;
  crates: number;
  stashes: Stash[];
}

export type EmptyBatch = Pick<Batch, 'name' | 'batchNo' | 'bottledOn'>;

export interface Batch extends BatchOutDTO {
  batchId: string;
}

export interface StashOutDTO {
  name: string;
  items: Bottle[];
  key?: number | null;
}

export interface Stash extends StashOutDTO {
  batchId: string;
  stashId: string;
  userId: string;
}

export interface SelectedStash {
  target: HTMLInputElement | null;
  name: string | null;
  stashKey: number | null;
}

export interface GrouppedStash {
  name: string;
  items: Bottle[];
  cratesTotal: number;
}

export interface OverallQuantity {
  quantityBottles: number;
  quantityCrates: number;
  quantityLitres: number;
}

export interface QuantityStorage {
  stashKey: number;
  stash: Stash;
  onStashDelete: AnyFunction;
  onQuantityChange: AnyFunction;
  onQuantitySelection: AnyFunction;
}

export interface Bottle {
  volume: number;
  amount: number;
}

export interface ChangeCountButtons {
  values: number[];
  onQuantityChangeButton: AnyFunction;
}

export interface SingleChangeCountButtons {
  value: number;
  onQuantityChangeButton: AnyFunction;
}

export interface Options {
  buttons: string[];
  functions: {
    [buttonFunction: string]: AnyFunction;
  };
}

export interface DeletedRecords {
  batchIds: string[];
  stashIds: string[];
}
