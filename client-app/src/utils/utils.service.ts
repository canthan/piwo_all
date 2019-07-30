import { BOTTLE_VOL_CODE, VOLUME_DIVIDER } from '../types/storage.constants';

export class UtilsService {
  public static decodeVolume(encodedVolume: string) {
    return new RegExp(BOTTLE_VOL_CODE).test(encodedVolume)
      ? +encodedVolume.slice(1) / VOLUME_DIVIDER
      : null;
  }

  public static sortByNumber<T, K extends keyof T>(array: T[], value: K): T[] {
    return array.sort((a, b) => (+a[value] - +b[value]));
  }
}

export const isObjectEmpty = (obj: object): boolean => !Object.entries(obj).length;
