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

  public async removeStashesByName(stashName: string): Promise<number> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/stashByName/${stashName}`;
      const response: AxiosResponse<{ data: { removedStashes: number } }> = await axiosInstance.delete(
        requestUrl,
        {
          data: { stashName },
        }
      )

      return response.data.data.removedStashes;

    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }

  public async updateStashName(newName: string, oldName: string): Promise<number> {
    try {
      const requestUrl = `${config.get(AppConfig.STASHES_SERVICE_URI)}/stashByName`;
      const response: AxiosResponse<{ data: { editedStashesNo: number } }> = await axiosInstance.patch(
        requestUrl,
        { newName, oldName }
      )

      return response.data.data.editedStashesNo;

    } catch (error) {
      throw new NotFoundException(error.response.data.message);
    }
  }
}
