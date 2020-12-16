import { Reducer } from 'redux';

import { TagsUiState, TagActionTypes, TagsUiChange } from './types';

const initialState: TagsUiState = {
  getPending: false,
  putPending: false
}

export const tagsUiReducer: Reducer<TagsUiState, TagsUiChange> = (state = initialState, action: TagsUiChange) => {
  switch (action.type) {

    case TagActionTypes.GET_TAGS_PENDING:
      return {
        ...state,
        getPending: true
      };

    case TagActionTypes.PUT_TAGS_PENDING:
      return {
        ...state,
        putPending: true
      };

    case TagActionTypes.CLEAR_GET_TAGS_PENDING:
      return {
        ...state,
        getPending: false
      };

    case TagActionTypes.CLEAR_PUT_TAGS_PENDING:
      return {
        ...state,
        putPending: false
      };

    default:
      return state;
  }
};