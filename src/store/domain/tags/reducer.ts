import { Reducer } from 'redux';

import { Tag, TagsState, TagActionTypes, GetTagsApiResponse, TagsSuccessApiResponse, TagsFailureApiResponse } from './types';

const initialState: TagsState = {
  failure: null,
  tags: []
}

interface TagsFailureResponse {
  message: string
}

//TODO: should we type-cast here?
export const tagsReducer: Reducer<TagsState, GetTagsApiResponse> = (state = initialState, action: GetTagsApiResponse) => {
  switch (action.type) {

    case TagActionTypes.GET_TAGS_SUCCESS:
      const successResponse = action as TagsSuccessApiResponse;
      tagsSort(successResponse.tags);

      return {
        failure: null,
        tags: successResponse.tags
      };

    case TagActionTypes.PUT_TAGS_SUCCESS:
      return {
        failure: null,
        tags: state.tags.concat((action as TagsSuccessApiResponse).tags)
      };

    case TagActionTypes.GET_TAGS_FAILURE:
    case TagActionTypes.PUT_TAGS_FAILURE:
      const failureResponse = action as TagsFailureApiResponse;
      const failureJson = failureResponse.json as TagsFailureResponse;

      return {
        failure: failureJson.message,
        tags: []
      };

    default:
      return state;
  }
};

const tagsSort = (tags: Tag[]) =>
  tags.sort((a, b) => a.name.localeCompare(b.name));