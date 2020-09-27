import { Action } from 'redux';

export enum DayActionTypes {
  GET_DAY_REQUEST = '@@days/GET_REQUEST',
  GET_DAY_SUCCESS = '@@days/GET_SUCCESS',
  GET_DAY_FAILURE = '@@days/GET_FAILURE',
  PUT_DAY_REQUEST = '@@days/PUT_REQUEST',
  PUT_DAY_SUCCESS = '@@days/PUT_SUCCESS',
  PUT_DAY_FAILURE = '@@days/PUT_FAILURE'
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
  alternateDay?: string,
  recipe?: Recipe
}

export interface DaysState {
  readonly failures: {
    [date: string]: string
  },
  readonly days: {
    [date: string]: Day
  }
}

export interface GetDayApiRequest extends Action {
  type: DayActionTypes,
  date: string
}

export interface PutDayApiRequest extends Action {
  type: DayActionTypes,
  day: Day
}

export interface GetDaySuccessApiResponse extends Action {
  type: DayActionTypes,
  date: string,
  day: Day
}

export interface PutDaySuccessApiResponse extends Action {
  type: DayActionTypes,
  day: Day
}

export interface DayFailureApiResponse extends Action {
  type: DayActionTypes,
  code: number,
  failedDay: string,
  json: object
}

export type GetDayApiResponse = GetDaySuccessApiResponse | PutDaySuccessApiResponse | DayFailureApiResponse;