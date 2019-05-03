import { Stash } from '../types/types';
import config, { AppConfig } from '../common/utils/config.loader';

import axiosInstance from '../utils/axios';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { StashModel } from '../models/stashes.model';
import { mapStashOutDTO } from './mapper.service';

export class StashesService {
  public async getStashesByUserId(userId: string): Promise<Stash[]> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/user/${userId}`;
      const response = await axiosInstance.get<{ data: StashModel[] }>(
        requestUrl,
        {
          data: { userId },
        }
      );
      const stashes = response.data.data.map(stash => mapStashOutDTO(stash));

      return stashes;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }
}
