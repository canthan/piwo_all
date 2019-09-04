import { Stash } from '../types/types';

const HALF_LITER = 0.5;
export const BOTTLES_IN_CRATE = 20;

export const getLitres = (stashes: Stash[]): number => stashes.reduce(
  (acc, stash) => acc + stash.items.reduce(
    (litres, item) => litres + (item.amount * item.volume),
    0),
  0);

export const getHalfLiterBottleAmount = (stashes: Stash[]): number => stashes.reduce(
  (acc, stash) => acc + stash.items.reduce(
    (bottles, item) => bottles + (item.volume === HALF_LITER ? item.amount : 0),
    0),
  0);

export const getSmallBottleAmount = (stashes: Stash[]): number => stashes.reduce(
  (acc, stash) => acc + stash.items.reduce(
    (bottles, item) => bottles + (item.volume !== HALF_LITER ? item.amount : 0),
    0),
  0);