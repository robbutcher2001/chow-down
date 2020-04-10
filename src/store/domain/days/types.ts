import { Action } from 'redux';

export enum DayActionTypes {
    GET_DAYS_REQUEST = '@@days/GET_REQUEST',
    GET_DAYS_SUCCESS = '@@days/GET_SUCCESS',
    GET_DAYS_FAILURE = '@@days/GET_FAILURE',
    POST_DAYS_REQUEST = '@@days/POST_REQUEST',
    POST_DAYS_SUCCESS = '@@days/POST_SUCCESS',
    POST_DAYS_FAILURE = '@@days/POST_FAILURE'
}

//TODO: maybe combine these with ~/store/domain/recipes
interface RecipeIngredient {
  quantity: number,
  unitSingularName: string,
  unitPluralName: string,
  ingredientName: string
}

interface Recipe {
  title: string,
  rating: number,
  image: string,
  ingredients: RecipeIngredient[]
}

export interface Day {
    date: string,
    recipe: Recipe
}

export interface DaysState {
    readonly failure: string,
    readonly days: Day[]
}

export interface GetDaysApiRequest extends Action {
    type: DayActionTypes
}

export interface PostDayApiRequest extends Action {
    type: DayActionTypes,
    day: Day
}

export interface DaysSuccessApiResponse extends Action {
    type: DayActionTypes,
    days: Day[]
}

export interface DaysFailureApiResponse extends Action {
    type: DayActionTypes,
    code: number,
    json: object
}

export type GetDaysApiResponse = DaysSuccessApiResponse | DaysFailureApiResponse;