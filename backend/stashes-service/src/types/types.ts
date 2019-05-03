export type AnyFunction = (...args: unknown[]) => unknown;
export type AsyncFunction = (...args: unknown[]) => Promise<unknown>;

export interface StashOutDTO {
  name: string;
  items: Bottles;
  batchId: string;
  userId: string;
}

export interface Stash extends StashOutDTO {
  stashId: string;
}

export interface Bottles {
  b050: number;
  b040: number;
  b033: number;
  [size: string]: number;
}

export const initialBottles: Bottles = {
  b033: 0,
  b040: 0,
  b050: 0,
}

export const initialStash: StashOutDTO = {
  name: '',
  items: initialBottles,
  batchId: '',
  userId: '',
}
