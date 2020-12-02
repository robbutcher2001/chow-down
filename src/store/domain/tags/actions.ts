import { Tag, TagActionTypes, GetTagsApiRequest, PutTagApiRequest, TagsSuccessApiResponse, TagsFailureApiResponse } from './types';

export const getTagsRequest = (): GetTagsApiRequest => ({
  type: TagActionTypes.GET_TAGS_REQUEST
});

export const getTagsSuccess = (tags: Tag[]): TagsSuccessApiResponse => ({
  type: TagActionTypes.GET_TAGS_SUCCESS,
  tags
});

export const getTagsFailure = (code: number, json: object): TagsFailureApiResponse => ({
  type: TagActionTypes.GET_TAGS_FAILURE,
  code,
  json
});

export const putTagsRequest = (tag: Tag): PutTagApiRequest => ({
  type: TagActionTypes.PUT_TAGS_REQUEST,
  tag
});

export const putTagsSuccess = (tags: Tag[]): TagsSuccessApiResponse => ({
  type: TagActionTypes.PUT_TAGS_SUCCESS,
  tags
});

export const putTagsFailure = (code: number, json: object): TagsFailureApiResponse => ({
  type: TagActionTypes.PUT_TAGS_FAILURE,
  code,
  json
});