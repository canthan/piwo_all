import { Batch, Stash } from '../types/types';
import config, { AppConfig } from '../common/utils/config.loader';

import axiosInstance from '../utils/axios';
import { NotFoundException } from '../common/exceptions/not-found.exception';


export class StashesService {
  public async getStashesByUserId(userId: string): Promise<Stash[]> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/user/${userId}`;
      const response = await axiosInstance.get<{ data: Stash[] }>(
        requestUrl,
        {
          data: { userId },
        }
      );

      return response.data.data;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }

}