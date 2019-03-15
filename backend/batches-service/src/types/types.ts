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
