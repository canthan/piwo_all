import { AxiosResponse } from 'axios';

import { NotFoundException } from '../common/exceptions/not-found.exception';
import config, { AppConfig } from '../common/utils/config.loader';

import { mapStashOutDTO } from './mapper.service';
import axiosInstance from '../utils/axios';
import { StashModel } from '../models/stashes.model';
import { Stash } from '../types/types';

export class StashesService {
  public async getStashesByUserId(userId: string): Promise<Stash[]> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/user/${userId}`;
      const response: AxiosResponse<{ stashes: StashModel[] }> = await axiosInstance.get(
        requestUrl,
        {
          data: { userId },
        }
      );
      const stashes = response.data.stashes.map(stash => mapStashOutDTO(stash));

      return stashes;
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }

  public async removeStashesByName(stashName: string): Promise<number> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/stashByName/${stashName}`;
      const response: AxiosResponse<{ removedStashesNo: number }> = await axiosInstance.delete(
        requestUrl,
        {
          data: { stashName },
        }
      )

      return response.data.removedStashesNo;

    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }

  public async updateStashName(newName: string, oldName: string): Promise<number> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/stashByName`;
      const response: AxiosResponse<{ editedStashesNo: number }> = await axiosInstance.patch(
        requestUrl,
        { newName, oldName }
      )

      return response.data.editedStashesNo;

    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }
}
