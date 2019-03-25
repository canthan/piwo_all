// tslint:disable max-classes-per-file
// tslint:disable no-any

export type AnyFunction = (...args: any[]) => any;
export type AsyncFunction = (...args: any[]) => Promise<any>;

export class Stash {
	public stashId: string;
	public batchId: string;
	public userId: string;
	public stashName: string;
	public items: Bottles;
	// [key: string]: number | string | Bottles;
	constructor(stashName: string, batchId: string, userId: string) {
		this.stashId = "";
		this.items = new Bottles();
		this.batchId = batchId;
		this.userId = userId;
		this.stashName = stashName;
	}
}

export class Bottles {
	constructor(b033 = 0, b040 = 0, b050 = 0) {
		this.b033 = b033;
		this.b040 = b040;
		this.b050 = b050;
	}
	[bottleSize: string]: number;
}
