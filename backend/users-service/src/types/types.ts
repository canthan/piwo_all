// tslint:disable max-classes-per-file
// tslint:disable no-any

export type AnyFunction = (...args: unknown[]) => unknown;
export type AsyncFunction = (...args: unknown[]) => Promise<unknown>;

export class Batch {
  public batchId?: number;
  public userId: number;
  public batchNo?: string;
  public name: string;
  public bottledOn: string;
  public quantityLitres: number;
  public quantityBottles: number;
  public quantityCrates: number;
  public stashes?: Stash[];

  constructor(
    userId = 0,
    bottledOn = '',
    name = '',
    litres = 0,
    bottles = 0,
    crates = 0
  ) {
    this.userId = userId;
    this.name = name;
    this.bottledOn = bottledOn;
    this.quantityLitres = litres;
    this.quantityBottles = bottles;
    this.quantityCrates = crates;
  }
}

export class Stash {
  public stashId: number;
  public batchId: number;
  public name: string;
  public items: Bottles;
  [key: string]: number | string | Bottles;
  constructor(name: string, batchId: number) {
    this.stashId = 0;
    this.items = new Bottles();
    this.batchId = batchId;
    this.name = name;
  }
}

export interface User {
  email: string;
  firstname: string;
  password: string;
  registrationDate: string;
  surname: string;
  userId: number;
  username: string;
}

export interface UserData extends User {
  batches: Batch[];
  stashes: Stash[];
}

export class Bottles {
  constructor(b033 = 0, b040 = 0, b050 = 0) {
    this.b033 = b033;
    this.b040 = b040;
    this.b050 = b050;
  }
  [bottleSize: string]: number | string | Bottles;
}

export interface DeletedRecords {
  batches: Batch[];
  stashes: Stash[];
}
