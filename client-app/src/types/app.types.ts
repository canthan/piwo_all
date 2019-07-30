import { StashesState, SummaryState } from './../../../client/src/types/storage.types';
import { Batch, Stash, BatchesState } from './storage.types';
import { Omit } from './common.types';

export interface AppState {
	user: Omit<User, 'password'>
	loaded: boolean;
  loggedIn: boolean;
  error: string | null;
}

export type State = Partial<{ app: AppState } & { batches: BatchesState } & { stashes: StashesState } & { summary: SummaryState }>;

export interface User {
	email: string;
	userId: string;
	password: string;
	registrationDate?: string;
	firstname?: string;
	surname?: string;
	username?: string;
}

export type UserProfileFields = Partial<User>

export interface UserData extends User {
	batches: Batch[];
	stashes: Stash[];
}

export interface UserLoginActionPayload {
  user: Omit<User, 'password'>
  loaded: boolean;
	loggedIn: boolean;
}


