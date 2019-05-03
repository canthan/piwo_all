export type AnyFunction = (...args: unknown[]) => unknown;
export type AsyncFunction = (...args: unknown[]) => Promise<unknown>;

export interface BatchOutDTO {
	userId: string;
	batchNo: string;
	name: string;
	bottledOn: Date;
	quantityLitres: number;
	quantityBottles: number;
	quantityCrates: number;
}

export type EmptyBatch = Pick<BatchOutDTO, 'batchNo' | 'name' | 'bottledOn'>

export interface Batch extends BatchOutDTO {
  batchId: number;
}

export interface DeletedRecords {
  batchIds: string[];
  stashIds: string[];
}

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
