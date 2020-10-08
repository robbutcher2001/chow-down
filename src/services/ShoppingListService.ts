import { Day, RecipeIngredient } from '../store/domain/days/types';

const combineRecipeIngredients = (days: {
  [date: string]: Day
}): RecipeIngredient[] =>
  Object.keys(days).reduce((ingredients: RecipeIngredient[][], dayKey: string) => {
    const day: Day = days[dayKey];
    if (!day.alternateDay) {
      ingredients.push(day.recipe.ingredients);
    }
    return ingredients;
  }, []).flat();

//TODO: move to service
const aggregate = (ingredients: RecipeIngredient[]) =>
  ingredients.reduce((aggregation: any, ingredient: any) => {
    //TODO: function now knows about data structure
    const ingredientId = ingredient.ingredient.id;
    const unitId = ingredient.unit.id;
    aggregation[ingredientId] = {
      ...aggregation[ingredientId],
      [unitId]: {
        quantity:
          aggregation[ingredientId] && aggregation[ingredientId][unitId]
            ? (aggregation[ingredientId][unitId].quantity += ingredient.quantity)
            : ingredient.quantity,
        unit: ingredient.unit.singular,
        name: ingredient.ingredient.name
      }
    };

    return aggregation;
  }, {});

//TODO: use flat or flatMap here and strongly type
const flatten = (ingredients: any) =>
  Object.entries(ingredients).flatMap(([_key, ingredient]) =>
    Object.entries(ingredient).map(([_key, unit]) => unit));

const compose = (a: Function, b: Function, c: Function) => (days: {
  [date: string]: Day
}) => a(b(c(days)));

export default (days: {
  [date: string]: Day
}) => compose(flatten, aggregate, combineRecipeIngredients)(days);