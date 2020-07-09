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
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;

    h3 {
      font-size: 1.3rem;
      margin: 1rem 1rem 1rem 0;
    }

    a {
      flex-shrink: 0;
    }
  }

  section:nth-of-type(1) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin: 1rem 0 2rem;

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

  section:nth-of-type(2) {
    box-shadow: 0 5px 20px 0 rgba(0,0,0,0.2);
    border-radius: 8px;
    box-sizing: border-box;
    background: #fff;
    padding: 2rem 1.5rem;

    h4 {
      font-size: 1.1rem;
      margin: 0 0 1.5rem;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
  
      li {
        margin: 0 0 0.5rem;
        line-height: 1.5rem;
        cursor: pointer;

        div {
          display: inline-block;
          background: #f1f7f7;
          border-radius: 50px;
          padding: 0.5rem 0.75rem;
        }
      }
  
      .strikethrough {
        div {
          color: #6c757d;
          text-decoration: line-through;
        }
      }
    }
  }

  &.blur {
    * {
      filter: blur(0.3rem);
    }

    h3:before {
      content: 'Recipe is loading';
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
        <div>
          {recipeIngredient.quantity}
          {' '}
          {recipeIngredient.quantity === 1 ?
            recipeIngredient.unitSingularName.toLowerCase() :
            recipeIngredient.unitPluralName.toLowerCase()
          }
          {' '}
          {recipeIngredient.ingredientName.toLowerCase()}
        </div>
      </li>
    );

  return (
    !props.isLoading && (!props.day || !props.day.recipe) ?
      <NegativeBox message='We could not find a recipe associated to this day' /> :
      <StyledDay
        image={props.day?.recipe.image}
        className={props.isLoading ? 'spinner spinning blur' : 'spinner'}
      >
        <header>
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
        </header>
        <section>
          <div>
            <RouterLink to='/recipes' onClick={() => props.setSelectingDay(props.day.date)} >
              Change
            </RouterLink>
            <RouterLink $reset to='/' onClick={() => props.putDay({ date: props.day.date })} >
              Reset
            </RouterLink>
          </div>
          <figure />
        </section>
        <section>
          <h4>Recipe Ingredients</h4>
          <ul>
            {createRecipeIngredients(props.day?.recipe.ingredients || [])}
          </ul>
        </section>
      </StyledDay >
  );
};

export default Day;