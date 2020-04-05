import React from 'react';

import { Recipe } from '../../../store/domain/recipes/types';

import styled from 'styled-components';
import Stars from '../../Stars';

interface RecipeCardProps {
  recipe: Recipe
};

const RecipeCard = styled.li`
  -webkit-box-shadow: 0 1px 0.25rem rgba(0, 0, 0, .08);
  box-shadow: 0 1px 0.25rem rgba(0, 0, 0, .08);
  border: 1px solid rgba(0,0,0,.04);
  border-radius: 0.5rem;
  cursor: pointer;

  > figure {
    max-height: 220px;
    overflow: hidden;
    margin: 0;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    position: relative;

    > img {
      width: 100%;
    }

    > figcaption {
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, .7);
      width: 100%;

      > h3 {
        color: white;
        padding: .5rem;
        margin: 0;
      }
    }
  }

  > p {
    color: #888;
    padding: 0 .5rem 1.5rem 0.5rem;
    margin: 0;
  }
`

export default (props: RecipeCardProps) => (
  <RecipeCard>
    <figure>
      <img src={props.recipe.image} alt={props.recipe.title}></img>
      <figcaption>
        <h3>{props.recipe.title}</h3>
      </figcaption>
    </figure>
    <Stars rating={props.recipe.rating} />
    <p>{props.recipe.description}</p>
  </RecipeCard>
);