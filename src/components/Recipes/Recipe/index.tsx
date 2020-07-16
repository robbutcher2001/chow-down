import React from 'react';

import styled from 'styled-components';
import { xsmall, small, medium } from '../../../breakpoints';
import Stars from '../../Stars';
import placeholderImg from '../../../placeholder.svg';

import { Recipe } from '../../../store/domain/recipes/types';

import { NegativeBox } from '../../MessageBox';

interface RecipeDetailProps {
  recipe: Recipe
};

const RecipeDetail = styled.span<{ image: string }>`
  display: flex;
  justify-content: center;

  > div {
    min-height: 500px;
    width: 100%;
    max-width: 768px;
    background-image: radial-gradient(
      farthest-corner at 50% 55%,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 1) 65%
    ), url(${props => props.image});
    background-size: cover;
    background-position: 75% 35%;
    position: relative;

    ${props => small`
      background-image: radial-gradient(
        farthest-corner at 35% 55%,
        rgba(255, 255, 255, 0) 30%,
        rgba(255, 255, 255, 1) 65%
      ), url(${props.image});
    `}

    ${xsmall`
      background-position: 75%;
    `}

    > aside {
      background-image: url(${placeholderImg});
      background-size: cover;
      background-position: 50%;
      position: absolute;
      opacity: 0.8;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -50;
    }

    > h3 {
      font-size: ${props =>
        props.theme.typography.fontSize.xlarge
      };
      margin: 0;
      padding: 1rem;
      text-align: right;
    }

    > section {
      box-shadow: 0 5px 20px 0 rgba(0,0,0,0.2);
      border-radius: 8px;
      box-sizing: border-box;
      background: #fff;
      padding: 2rem 1.5rem;
      position: absolute;
      z-index: 50;

      &.ingredients {
        width: 250px;
        height: 80%;
        left: -10%; top: 15%;

        ${medium`
          left: 15%; right: 15%; bottom: -10%; top: unset;
          width: unset;
          height: unset;
        `}

        ${small`
          left: 10%; right: 10%;
        `}

        ${xsmall`
          left: 5%; right: 5%;
        `}
      }

      &.method {
        min-height: 200px;
        left: 25%; right: 0; bottom: -20%;
        text-align: center;

        ${medium`
          display: none;
        `}
      }

      > span {
        box-shadow: 0 -10px 20px -14px rgba(0,0,0,0.2);
        border-radius: 50px;
        box-sizing: border-box;
        background: #fff;
        padding: 6px 16px;
        position: absolute;
        right: 5%;
        top: -4%;
  
        ${medium`
          top: -20%;
        `}

        > section {
          padding: 0;
        }
      }
    }
  }
`

export default (props: RecipeDetailProps) =>
  props.recipe ?
    <RecipeDetail image={props.recipe.image} >
      <div>
        <aside />
        <h3>{props.recipe.title}</h3>
        <section className='ingredients' >
          <div>Recipe ingredients coming soon!</div>
          {props.recipe.rating > 0 &&
            <span>
              <Stars rating={props.recipe.rating} />
            </span>
          }
        </section>
        <section className='method' >
          Recipe methods coming soon!
        </section>
      </div>
    </RecipeDetail> :
    <NegativeBox message='Direct recipe retrieval not implemented yet.' />;