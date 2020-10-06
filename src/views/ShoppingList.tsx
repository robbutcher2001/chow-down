import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { GlobalState } from '../store';
import { Day, RecipeIngredient } from '../store/domain/days/types';

import Main from '../components/Main';

interface StateProps {
  error: string,
  failures: {
    [date: string]: string
  },
  days: {
    [date: string]: Day
  },
  ui: {
    pending: {
      get: string[]
    }
  }
};

const ShoppingList: FunctionComponent<StateProps> = (props: StateProps) => {
  const isLoading = () => props.ui.pending.get.length > 0;

  const combineRecipeIngredients = (): RecipeIngredient[] =>
    Object.keys(props.days).reduce((ingredients: RecipeIngredient[][], dayKey: string) => {
      const day: Day = props.days[dayKey];
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

  //TODO: use flat or flatMap here
  const flatten = (ingredients: any) =>
    Object.entries(ingredients).flatMap(([_key, ingredient]) =>
      Object.entries(ingredient).map(([_key, unit]) => unit));

  return (
    <Main title='Shopping List'>
      {isLoading() ?
        <div>loading</div> :
        <>
          {flatten(aggregate(combineRecipeIngredients())).sort((a, b) => a.unit.localeCompare(b.unit)).map((ingredient: any, index: number) =>
            <div key={index}>
              {ingredient.quantity} {ingredient.unit} of {ingredient.name}
            </div>)}
        </>
      }
    </Main>
  )
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error.message,
  failures: domain.day.failures,
  days: domain.day.days,
  ui: {
    pending: {
      get: ui.day.getPending
    }
  }
});

export default connect<StateProps, null, null, GlobalState>
  (mapStateToProps)(ShoppingList);