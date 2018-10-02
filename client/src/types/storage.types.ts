import { AnyFunction } from './app.types';

// tslint:disable max-classes-per-file

const BOTTLES_IN_CRATE = 20;

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

export class StashSummary {
	public stashName: string;
	public crates: {
		overall: number;
		full: number;
		empty: number;
	};
	public litres: number;
	public bottles: {
		small: number;
		halfLiter: number;
	};
	constructor(stashName = '', bottlesHalfLiter = 0, bottlesSmall = 0) {
		this.stashName = stashName;
		this.crates = {
			overall: 0,
			full: bottlesHalfLiter / BOTTLES_IN_CRATE,
			empty: 0,
		};
		this.litres = 0;
		this.bottles = {
			small: bottlesSmall,
			halfLiter: bottlesHalfLiter,
		};
	}
}

export class Batch {
	// public batchId?: number;
	public batchNumber: string;
	public batchName: string;
	public bottledOn: string;
	public quantityLitres: number;
	public quantityBottles: number;
	public quantityCrates: number;
	public stashes: Stash[];
	constructor(
		bottledOn = '',
		// batchId = 0,
		batchName = '',
		batchNumber = '',
		litres = 0,
		bottles = 0,
		crates = 0
	) {
		// this.batchId = batchId;
		this.batchNumber = batchNumber;
		this.batchName = batchName;
		this.bottledOn = bottledOn;
		this.quantityLitres = litres;
		this.quantityBottles = bottles;
		this.quantityCrates = crates;
		this.stashes = [];
	}
}

export class BatchInDto extends Batch {
	public batchId: number;
	constructor(batchId = 0) {
		super();
		this.batchId = batchId;
	}
}

export class EmptyBatch {
	public batchNumber?: string;
	public batchName: string;
	public bottledOn: string;
	constructor(bottledOn = '2018-04-03', batchNumber = '1', batchName = 'aaa') {
		this.batchNumber = batchNumber;
		this.batchName = batchName;
		this.bottledOn = bottledOn;
	}
}

export class Stash {
	public batchId: number;
	public stashId?: number;
	public stashUserId?: number;
	public stashName: string;
	public items: Bottles;
	public key?: number;
	constructor(stashName, batchId) {
		this.items = new Bottles();
		this.batchId = batchId;
		this.stashName = stashName;
	}
}

export interface SelectedStash {
	target: HTMLInputElement | undefined;
	name: string | undefined;
	stashKey: number | undefined;
}

export interface GrouppedStash {
	stashName: string;
	items: Bottles;
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
	onQuantityChange: AnyFunction;
	onQuantitySelection: AnyFunction;
}

export class Bottles {
	public b050: number;
	public b040: number;
	public b033: number;
	[bottleSize: string]: number;
	constructor(b033 = 0, b040 = 0, b050 = 0) {
		this.b033 = b033;
		this.b040 = b040;
		this.b050 = b050;
	}
}

export interface Buttons {
	increase: number[];
	decrease: number[];
	onQuantityChangeButton: object;
}

export interface Options {
	buttons: string[];
	functions: {
		[buttonFunction: string]: object;
	};
}
