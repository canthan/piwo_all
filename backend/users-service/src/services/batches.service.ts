import { Batch } from '../types/types';
import config, { AppConfig } from '../common/utils/config.loader';

import axiosInstance from '../utils/axios';
import { NotFoundException } from '../common/exceptions/not-found.exception';


export class BatchesService {
  public async getBatchesByUserId(userId: string): Promise<Batch[]> {
    try {
      const requestUrl = `${config.get(AppConfig.BATCHES_SERVICE_URI)}/${userId}`;
      const response = await axiosInstance.get<{ data: Batch[] }>(
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