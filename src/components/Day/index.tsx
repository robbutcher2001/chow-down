import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Day, RecipeIngredient } from '../../store/domain/days/types';
import { UserAction } from '../../store/app/user/types';

interface DayProps {
  day: Day,
  setSelectingDay: (day: string) => UserAction
};

const StyledDay = styled.section`
  margin: 2rem 0;

  > header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    > div {
      flex-grow: 2;
      justify-content: flex-start;

      a {
        border: none;
        border-radius: 5px;
        padding: .5rem 1.5em;
        height: 2.5rem;
        font-size: 1rem;
        line-height: 2.5rem;
        color: white;
        background-color: #4acaa8;
        text-decoration: none;
      }
    }

    > img {
      width: 150px;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-position: inside;

    span {
      margin: 0 2px;
    }
  }
`

const Day: FunctionComponent<DayProps> = (props: DayProps) => {

  const createRecipeIngredients = (recipeIngredients: RecipeIngredient[]) =>
    recipeIngredients.map((recipeIngredient, index) =>
      <li key={index}>
        <span>{recipeIngredient.quantity}</span>
        {recipeIngredient.quantity === 1 ?
          <span>{recipeIngredient.unitSingularName.toLowerCase()}</span> :
          <span>{recipeIngredient.unitPluralName.toLowerCase()}</span>
        }
        <span>{recipeIngredient.ingredientName.toLowerCase()}</span>
      </li>
    );

  return (
    <StyledDay>
      <header>
        <div>
          <Link to='/recipes' onClick={() => props.setSelectingDay(props.day.date)}>
            Change
          </Link>
        </div>
        <img src={props.day.recipe.image} alt={props.day.recipe.title}></img>
      </header>
      <h3>{props.day.recipe.title}</h3>
      <ul>
        {createRecipeIngredients(props.day.recipe.ingredients)}
      </ul>
    </StyledDay >
  );
};

export default Day;