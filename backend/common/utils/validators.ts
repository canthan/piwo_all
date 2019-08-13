import { SchemaTypeOpts } from 'mongoose';

import { isObject } from './isObject';

export const nonEmptyArrayValidator: SchemaTypeOpts.ValidateOpts = {
  validator: value => value.length > 0,
  msg: 'Array cannot be empty!',
};

export const objectValidator: SchemaTypeOpts.ValidateOpts = {
  validator: value => value.every(isObject),
  msg: 'Dish should be an object!',
};