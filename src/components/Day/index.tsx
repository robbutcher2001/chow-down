import React, { FunctionComponent, useState } from 'react';

import styled from 'styled-components';

import { Day, RecipeIngredient, PutDayApiRequest } from '../../store/domain/days/types';
import { UserAction } from '../../store/app/user/types';
import { NegativeBox } from '../MessageBox';
import { RouterLink, RawLink } from '../Clickable';

interface DayProps {
  isLoading: boolean,
  day: Day,
  setSelectingDay: (day: string) => UserAction,
  putDay: (day: Day) => PutDayApiRequest
};

const StyledDay = styled.section<{ image: string }>`
  margin: 2rem 0;

  > header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    > div {
      flex-grow: 2;
      justify-content: flex-start;

      a {
        display: inline-block;
        margin: 0 1rem 1rem 0;
      }
    }

    > figure {
      width: 150px;
      height: 150px;
      margin: 0;
      border-radius: 12px;

      ${props => props.image && `
        background-image: url(${props.image});
        background-size: cover;
        background-position: 50%;
      `}
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
      <NegativeBox message='We could not find a recipe associated to this day' /> :
      <StyledDay
        image={props.day?.recipe.image}
        className={props.isLoading ? 'spinner spinning' : 'spinner'}
      >
        <header>
          <div>
            <RouterLink to='/recipes' onClick={() => props.setSelectingDay(props.day.date)} >
              Change
            </RouterLink>
            <RouterLink $reset to='/' onClick={() => props.putDay({ date: props.day.date })} >
              Reset
            </RouterLink>
          </div>
          <figure />
        </header>
        <section>
          <h3>{props.day?.recipe.title}</h3>
          {props.day &&
            <RawLink
              $bold
              $inline
              href={props.day.recipe.url}
              target='_blank'
              rel='external noreferrer' >
              Web link &gt;
            </RawLink>
          }
        </section>
        <ul>
          {createRecipeIngredients(props.day?.recipe.ingredients || [])}
        </ul>
      </StyledDay >
  );
};

export default Day;