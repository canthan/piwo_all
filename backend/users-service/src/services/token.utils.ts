import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';

import { CONFIG, AppConfig } from '../types/config';
import config from '../common/utils/config.loader';

export const generateJwt = (userId: string): string => jwt.sign({userId}, config.get(AppConfig.JWT_SECRET), {expiresIn: CONFIG.tokenExpiration});
export const generateRefresh = (): string => uuid.v4();