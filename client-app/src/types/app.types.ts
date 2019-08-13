import { Batch, Stash, BatchesState, StashesState, SummaryState } from './storage.types';
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
  stashConfig: StashConfig[];
	registrationDate?: string;
	firstname?: string;
	surname?: string;
	username?: string;
}

export interface StashConfig {
  name: string;
  cratesTotal: number;
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


