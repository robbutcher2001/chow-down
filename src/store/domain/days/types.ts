import { Action } from 'redux';

export enum DayActionTypes {
  GET_DAYS_REQUEST = '@@days/GET_REQUEST',
  GET_DAYS_SUCCESS = '@@days/GET_SUCCESS',
  GET_DAYS_FAILURE = '@@days/GET_FAILURE',
  PUT_DAYS_REQUEST = '@@days/PUT_REQUEST',
  PUT_DAYS_SUCCESS = '@@days/PUT_SUCCESS',
  PUT_DAYS_FAILURE = '@@days/PUT_FAILURE'
}

//TODO: maybe combine these with ~/store/domain/recipes
export interface RecipeIngredient {
  quantity: number,
  unitSingularName: string,
  unitPluralName: string,
  ingredientName: string
}

interface Recipe {
  title: string,
  rating: number,
  image: string,
  url: string,
  ingredients: RecipeIngredient[]
}

export interface Day {
  date: string,
  recipeId?: string,
  recipe?: Recipe
}

export interface DaysState {
  readonly failure: string,
  readonly days: Day[]
}

export interface GetDaysApiRequest extends Action {
  type: DayActionTypes,
  from: string,
  to: string
}

export interface PutDayApiRequest extends Action {
  type: DayActionTypes,
  day: Day
}

export interface GetDaysSuccessApiResponse extends Action {
  type: DayActionTypes,
  days: Day[]
}

export interface PutDaySuccessApiResponse extends Action {
  type: DayActionTypes,
  day: Day
}

export interface DaysFailureApiResponse extends Action {
  type: DayActionTypes,
  code: number,
  json: object
}

export type GetDaysApiResponse = GetDaysSuccessApiResponse | PutDaySuccessApiResponse | DaysFailureApiResponse;