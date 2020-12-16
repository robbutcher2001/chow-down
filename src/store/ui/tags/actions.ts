import { TagActionTypes, TagsUiChange } from './types';

export const pendingGetTags = (): TagsUiChange => ({
  type: TagActionTypes.GET_TAGS_PENDING
});

export const clearPendingGetTags = (): TagsUiChange => ({
  type: TagActionTypes.CLEAR_GET_TAGS_PENDING
});

export const pendingPutTags = (): TagsUiChange => ({
  type: TagActionTypes.PUT_TAGS_PENDING
});

export const clearPendingPutTags = (): TagsUiChange => ({
  type: TagActionTypes.CLEAR_PUT_TAGS_PENDING
});