import dayjs from 'dayjs';

import { DEFAULT_DATE_FORMAT } from './../types/storage.constants';

export class UtilsService {
  public static sortByNumber<T, K extends keyof T>(array: T[], value: K): T[] {
    return array.sort((a, b) => (+a[value] - +b[value]));
  }
}

export const isObjectEmpty = (obj: object): boolean => !Object.entries(obj).length;

export const getCurrentDate = (): Date => dayjs().toDate();
export const dateInStandardFormat = (date: Date):string => dayjs(date).format(DEFAULT_DATE_FORMAT);
