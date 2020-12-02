import { Action } from 'redux';

export enum TagActionTypes {
  GET_TAGS_PENDING = '@@tags/GET_PENDING',
  PUT_TAGS_PENDING = '@@tags/PUT_PENDING',
  CLEAR_GET_TAGS_PENDING = '@@tags/CLEAR_GET_PENDING',
  CLEAR_PUT_TAGS_PENDING = '@@tags/CLEAR_PUT_PENDING'
}

export interface TagsUiState {
  readonly getPending: boolean,
  readonly putPending: boolean
}

export interface TagsUiChange extends Action {
  type: TagActionTypes
}