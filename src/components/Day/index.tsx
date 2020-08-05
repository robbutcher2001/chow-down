import React, { FunctionComponent, useState, useEffect } from 'react';

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
      font-size: ${props =>
        props.theme.typography.fontSize.xlarge
      };
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
    margin: 1rem 0;

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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    h4 {
      font-size: ${props =>
        props.theme.typography.fontSize.large
      };
      margin: 1.5rem 0;
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
          color: ${props =>
            props.theme.colour.grey
          };
          text-decoration: line-through;
        }
      }
    }

    .ingredients {
      flex: 1 1 15rem;
      position: sticky;
      top: 3rem;
      background: #fff;

      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        transition: margin 2s cubic-bezier(0, 1, 0, 1);
      }

      li {
        flex-basis: 100%;
        transition: flex-basis, margin, font-size, line-height 2s cubic-bezier(0, 1, 0, 1);

        div {
          transition: padding 0.5s ease-in;
        }
      }
    }

    .fixed {
      h4 {
        margin: 1rem 0;
      }

      ul {
        margin: 0;
      }

      li {
        flex-basis: 48%;
        margin: 0 0.2rem 0.5rem 0;
        font-size: ${props =>
          props.theme.typography.fontSize.small
        };
        line-height: 1rem;

        div {
          padding: 0.25rem 1rem;
        }
      }
    }

    .method {
      flex: 2 2 20rem;
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
  const [ingredientsFixed, setIngredientsFixed] = useState(false);

  const setSelectingDay = () => props.setSelectingDay(props.day.date);

  const putDay = () => props.putDay({ date: props.day.date });

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

  useEffect(() => {
    const onScroll = (event: any) => {
      event.preventDefault();
      if (event.target.documentElement.scrollTop > 225) {
        setIngredientsFixed(true);
      } else if (event.target.documentElement.scrollTop < 100) {
        setIngredientsFixed(false);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            <RouterLink to='/recipes' onClick={setSelectingDay} >
              Change
            </RouterLink>
            <RouterLink $reset to='/' onClick={putDay} >
              Reset
            </RouterLink>
          </div>
          <figure />
        </section>
        <section>
          <div className={ingredientsFixed ? 'ingredients fixed' : 'ingredients'}>
            <h4>Recipe Ingredients</h4>
            <ul>
              {createRecipeIngredients(props.day?.recipe.ingredients || [])}
            </ul>
          </div>
          <div className='method'>
            <h4>Recipe Method</h4>
            <ul>
              <li>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </li>
              <li>
                <p>
                  Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </li>
              <li>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </li>
            </ul>
          </div>
        </section>
      </StyledDay >
  );
};

export default Day;