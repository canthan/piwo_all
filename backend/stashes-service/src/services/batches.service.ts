import { AxiosResponse } from 'axios';

import axiosInstance from '../utils/axios';
import config, { AppConfig } from '../common/utils/config.loader';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { Stash } from '../types/types';

export class BatchesService {
  public static async updateBatchesQuantities(batchId: string, stashes: Stash[]): Promise<void> {
    try {
      const requestUrl = `${config.get(AppConfig.BATCHES_SERVICE_URI)}/${batchId}`;
      const response: AxiosResponse<void> = await axiosInstance.patch(
        requestUrl,
        { stashes }
      );

      return response.data;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }

}