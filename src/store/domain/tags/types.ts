import { Action } from 'redux';

export enum TagActionTypes {
  GET_TAGS_REQUEST = '@@tags/GET_REQUEST',
  GET_TAGS_SUCCESS = '@@tags/GET_SUCCESS',
  GET_TAGS_FAILURE = '@@tags/GET_FAILURE',
  PUT_TAGS_REQUEST = '@@tags/PUT_REQUEST',
  PUT_TAGS_SUCCESS = '@@tags/PUT_SUCCESS',
  PUT_TAGS_FAILURE = '@@tags/PUT_FAILURE'
}

interface TagColour {
  background: string,
  text: string
}

export interface Tag {
  id: string,
  name: string,
  colours: TagColour
}

export interface TagsState {
  readonly failure: string,
  readonly tags: Tag[]
}

export interface GetTagsApiRequest extends Action {
  type: TagActionTypes
}

export interface PutTagApiRequest extends Action {
  type: TagActionTypes,
  tag: Tag
}

export interface TagsSuccessApiResponse extends Action {
  type: TagActionTypes,
  tags: Tag[]
}

export interface TagsFailureApiResponse extends Action {
  type: TagActionTypes,
  code: number,
  json: object
}

export type GetTagsApiResponse = TagsSuccessApiResponse | TagsFailureApiResponse;