export type AnyFunction = (...args: unknown[]) => unknown;
export type AsyncFunction = (...args: unknown[]) => Promise<unknown>;

export interface StashOutDTO {
  name: string;
  items: Bottles[];
  batchId: string;
  userId: string;
}

export interface Stash extends StashOutDTO {
  stashId: string;
}

export interface Bottles {
  volume: number,
  amount: number,
}

export const initialBottles: Bottles[] = [
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
  items: initialBottles,
  batchId: '',
  userId: '',
}
