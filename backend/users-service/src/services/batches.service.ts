import { AxiosResponse } from 'axios';

import axiosInstance from '../utils/axios';
import config, { AppConfig } from '../common/utils/config.loader';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { Batch } from '../types/types';

export class BatchesService {
  public async getBatchesByUserId(userId: string): Promise<Batch[]> {
    try {
      const requestUrl = `${config.get(AppConfig.BATCHES_SERVICE_URI)}/${userId}`;
      const response: AxiosResponse<{ batches: Batch[] }> = await axiosInstance.get(
        requestUrl,
        {
          data: { userId },
        }
      );

      return response.data.batches;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }

}