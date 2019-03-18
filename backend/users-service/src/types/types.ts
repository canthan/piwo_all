// tslint:disable max-classes-per-file
// tslint:disable no-any

export type AnyFunction = (...args: any[]) => any;
export type AsyncFunction = (...args: any[]) => Promise<any>;

export class Batch {
  public batchId?: number;
  public batchUserId: number;
  public batchNumber?: string;
  public batchName: string;
  public bottledOn: string;
  public quantityLitres: number;
  public quantityBottles: number;
  public quantityCrates: number;
  public stashes?: Stash[];

  constructor(
    batchUserId = 0,
    bottledOn = '',
    batchName = '',
    litres = 0,
    bottles = 0,
    crates = 0
  ) {
    this.batchUserId = batchUserId;
    this.batchName = batchName;
    this.bottledOn = bottledOn;
    this.quantityLitres = litres;
    this.quantityBottles = bottles;
    this.quantityCrates = crates;
  }
}

export class Stash {
  public stashId: number;
  public batchId: number;
  public stashName: string;
  public items: Bottles;
  [key: string]: number | string | Bottles;
  constructor(stashName: string, batchId: number) {
    this.stashId = 0;
    this.items = new Bottles();
    this.batchId = batchId;
    this.stashName = stashName;
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
