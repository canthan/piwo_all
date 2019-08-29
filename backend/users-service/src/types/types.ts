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

export interface BatchWithStashes extends Batch {
  stashes: Stash[];
}

export interface Batch extends BatchOutDTO {
  batchId: string;
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

export interface UserOutDTO {
  email: string;
  password: string;
  registrationDate: string;
  stashConfig: StashConfig[];
  firstname?: string;
  surname?: string;
  username?: string;
}

export interface StashConfig {
  name: string;
  cratesTotal: number;
}

export interface StashConfigEdited extends StashConfig {
  deleted?: boolean;
  oldName?: string;
}

export interface StashConfigEditedName extends StashConfigEdited {
  oldName: string;
}

export interface EditedStashName {
  newName: string;
  oldName: string;
}

export interface User extends UserOutDTO {
  userId: string;
}

export type UserNoPassword = Omit<User, 'password'>;

export interface UserData extends UserNoPassword {
  batches: Batch[];
  stashes: Stash[];
}

export interface DeletedRecords {
  batches: Batch[];
  stashes: Stash[];
}

export interface Token {
  userId: string;
  token: string;
  expirationDate: Date;
  creationDate: Date;
}
