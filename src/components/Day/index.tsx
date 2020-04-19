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
      height: 150px;
    }
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;

    h3 {
      margin: 1rem 1rem 1rem 0;
    }

    a {
      flex-shrink: 0;
      border: none;
      background: none;
      margin: 1rem 0;
      padding: 0;
      font-size: 1rem;
      font-family: 'Lato', sans-serif;
      font-weight: 700;
      color: #1d70b8;
      cursor: pointer;
      text-decoration: none;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      padding: 0.5rem 0.75rem;
      line-height: 1.5rem;

      &:nth-child(odd) {
        background: #f1f7f7;
      }
    }
  }
`

const Day: FunctionComponent<DayProps> = (props: DayProps) => {

  const createRecipeIngredients = (recipeIngredients: RecipeIngredient[]) =>
    recipeIngredients.map((recipeIngredient, index) =>
      <li key={index}>
        <span>
          {recipeIngredient.quantity}
          {' '}
          {recipeIngredient.quantity === 1 ?
            recipeIngredient.unitSingularName.toLowerCase() :
            recipeIngredient.unitPluralName.toLowerCase()
          }
          {' '}
          {recipeIngredient.ingredientName.toLowerCase()}
        </span>
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
      <section>
        <h3>{props.day.recipe.title}</h3>
        <a href={props.day.recipe.url} target='_blank' rel='external noreferrer'>
          Web link &gt;
        </a>
      </section>
      <ul>
        {createRecipeIngredients(props.day.recipe.ingredients)}
      </ul>
    </StyledDay >
  );
};

export default Day;