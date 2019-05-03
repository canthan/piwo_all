import { Stash } from '../types/types';
import config, { AppConfig } from '../common/utils/config.loader';

import axiosInstance from '../utils/axios';
import { StashModel } from '../models/stashes.model';
import { mapStashOutDTO } from './mapper.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';

export class StashesService {
  public static async removeStash(stashId: string): Promise<Stash[]> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/${stashId}`;
      const response = await axiosInstance.delete(requestUrl);

      return response.data;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }

  public static async getStashesByBatchId(batchId: string): Promise<Stash[]> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/batch/${batchId}`;
      const response = await axiosInstance.get<{ data: StashModel[] }>(
        requestUrl,
        {
          data: { batchId },
        }
      );

      return response.data.data
        ? response.data.data.map(stash => mapStashOutDTO(stash))
        : [];
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }
}
