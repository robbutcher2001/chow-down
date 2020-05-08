import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Day, RecipeIngredient, PutDayApiRequest } from '../../store/domain/days/types';
import { UserAction } from '../../store/app/user/types';
import { ErrorBox } from '../MessageBox';

interface DayProps {
  isLoading: boolean,
  day: Day,
  setSelectingDay: (day: string) => UserAction,
  putDay: (day: Day) => PutDayApiRequest
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
        margin-right: 1rem !important;
      }

      a[class=link] {
        display: inline-block;
        //TODO: make button component with bold prop
        font-weight: 400;
        color: #df3034;
        text-decoration: underline;
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
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      padding: 0.5rem 0.75rem;
      line-height: 1.5rem;
      cursor: pointer;

      &:nth-child(odd) {
        background: #f1f7f7;
      }
    }

    .strikethrough {
      color: #6c757d;
      text-decoration: line-through;
    }
  }

  .button {
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

  .link {
    border: none;
    background: none;
    margin: 1rem 0;
    padding: 0;
    font-size: 1rem;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    color: #005ea5;
    cursor: pointer;
    text-decoration: none;
  }
`

const Day: FunctionComponent<DayProps> = (props: DayProps) => {
  const [strikethroughIndexes, setStrikethroughIndex] = useState([]);

  const setStrikethrough = (strikethroughIndex: number) =>
    !strikethroughIndexes.includes(strikethroughIndex) &&
    setStrikethroughIndex(strikethroughIndexes.concat(strikethroughIndex));

  const createRecipeIngredients = (recipeIngredients: RecipeIngredient[]) =>
    recipeIngredients.map((recipeIngredient, index) =>
      <li
        key={index}
        className={strikethroughIndexes.includes(index) ? 'strikethrough' : ''}
        onClick={() => setStrikethrough(index)}
      >
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
    !props.isLoading && (!props.day || !props.day.recipe) ?
      <ErrorBox message='We could not find a recipe associated to this day' /> :
      <StyledDay className={props.isLoading ? 'spinner spinning' : 'spinner'} >
        <header>
          <div>
            <Link className='button' to='/recipes' onClick={() => props.setSelectingDay(props.day.date)}>
              Change
            </Link>
            <Link className='link' to='/' onClick={() => props.putDay({ date: props.day.date })}>
              Reset
            </Link>
          </div>
          <img src={props.day?.recipe.image} alt={props.day?.recipe.title}></img>
        </header>
        <section>
          <h3>{props.day?.recipe.title}</h3>
          {props.day &&
            <a className='link' href={props.day.recipe.url} target='_blank' rel='external noreferrer'>
              Web link &gt;
            </a>
          }
        </section>
        <ul>
          {createRecipeIngredients(props.day?.recipe.ingredients || [])}
        </ul>
      </StyledDay >
  );
};

export default Day;