import { Batch, Stash } from '../../types/storage.types';

const BOTTLES_IN_CRATE = 20;
const DECIMAL = 2;
const DECODER_START = 1;
const DECODER_END = 3;
const DECODER_DIV = 10;

export class CommonStorageService {
  public static flattenItemsForRequest(stashes: Stash[]) {
    const flattened: Stash[] = [];
    const inputStashes: Stash[] = JSON.parse(JSON.stringify(stashes));
    // inputStashes.forEach((stash: Stash) => {
    // 	Object.keys(stash.items).forEach(key => {
    // 		stash[key] = stash.items[key];
    // 	});
    // 	delete stash.items;
    // 	flattened.push(stash);
    // });

    return { stashes: flattened };
  }

  public static addStashesToBatch(batches: Batch[], stash: Stash) {
    batches.map(
      batch =>
        batch.batchId === stash.batchId
          ? (batch.stashes = [...batch.stashes, stash])
          : batch
    );

    return batches;
  }

  public static updateStashesinBatch(batches: Batch[], stashes: Stash[]) {
    batches.forEach(batch => {
      if (batch.batchId === stashes[0].batchId) {
        batch.stashes = stashes;
      }
    });

    return batches;
  }

  public static getStashesFromBatch(
    batches: Batch[],
    batchId: string
  ): Stash[] {
    const stashes = batches.find(batch => batch.batchId === batchId);

    return stashes ? stashes.stashes : [];
  }

  public static getOverallQuantities(stashes: Stash[]) {
    let litres = 0;
    let bottles = 0;
    let bottlesSmall = 0;
    let crates = 0;
    stashes.forEach(stash => {
      Object.keys(stash.items).forEach(bottle => {
        bottles += bottle === 'b050' ? Number(stash.items[bottle]) : 0;
        bottlesSmall += bottle !== 'b050' ? Number(stash.items[bottle]) : 0;
        litres += this.decodeBottleVolume(bottle) * Number(stash.items[bottle]);
        crates +=
          bottle === 'b050'
            ? Number(stash.items[bottle]) / BOTTLES_IN_CRATE
            : 0;
      });
    });

    return {
      litres: `${litres.toFixed(DECIMAL)}`,
      crates: `${crates.toFixed(DECIMAL)}`,
      bottles: bottlesSmall ? `${bottles} + ${bottlesSmall}` : `${bottles}`,
    };
  }

  public static decodeBottleVolume(bottleVolumeString: string) {
    return this.checkBottleStringType(bottleVolumeString)
      ? Number(bottleVolumeString.slice(DECODER_START, DECODER_END)) /
      DECODER_DIV
      : 0;
  }

  public static formatDateForDisplay(batchesArray: Batch[]): Batch[] {
    batchesArray.forEach((batch, index) => {
      batch.bottledOn = new Date(batch.bottledOn);
      // batchesArray[index].bottledOn = batch.bottledOn.slice(
      // 	0,
      // 	batch.bottledOn.indexOf('T')
      // );
    });

    return batchesArray;
  }

  public static calculateQuantities(batches: Batch[]) {
    batches.forEach(batch => {
      const { litres, bottles, crates } = this.iterateThroughBatch(batch);
      batch.litres = litres;
      batch.bottles = bottles;
      batch.crates = crates;
    });
  }

  private static iterateThroughBatch(batch: Batch) {
    let litres = 0;
    let bottles = 0;
    let crates = 0;
    batch.stashes.forEach(stash => {
      Object.keys(stash.items).forEach(bottle => {
        bottles += Number(stash.items[bottle]);
        litres += this.decodeBottleVolume(bottle) * Number(stash.items[bottle]);
        crates +=
          bottle === 'b050'
            ? Number(stash.items[bottle]) / BOTTLES_IN_CRATE
            : 0;
      });
    });

    return { litres, bottles, crates };
  }

  private static checkBottleStringType(bottleVolumeString: string) {
    const stringType = /b\d{3}/;

    return stringType.exec(bottleVolumeString) ? true : false;
  }
}

export default CommonStorageService;
