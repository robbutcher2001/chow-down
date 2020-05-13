import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import placeholderImg from '../../../placeholder.svg';

import { Recipe } from '../../../store/domain/recipes/types';
import { Day, PutDayApiRequest } from '../../../store/domain/days/types';
import Stars from '../../Stars';

interface RecipeCardProps {
  recipe: Recipe,
  selectedDay?: string,
  putDay?: (day: Day) => PutDayApiRequest
};

const RecipeCard = styled.li<{ url: string }>`
  box-shadow: 0 1px 4px rgba(0, 0, 0, .08);
  border: 1px solid rgba(0,0,0,.04);
  border-radius: 12px;

  > a {
    color: black;
    text-decoration: none;
  }

  > figure, > a > figure {
    height: 220px;
    background-image: url(${props => props.url});
    background-size: cover;
    background-position: 50%;
    margin: 0;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    position: relative;

    > aside {
      background-image: url(${placeholderImg});
      background-size: cover;
      background-position: 50%;
      position: absolute;
      opacity: 0.5;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -50;
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
    padding: 0 0.5rem 1.5rem;
    margin: 0;
  }
`

const RecipeCardContents = (props: RecipeCardProps) => (
  <>
    <figure>
      <aside />
      <figcaption>
        <h3>{props.recipe.title}</h3>
      </figcaption>
    </figure>
    <Stars rating={props.recipe.rating} />
    <p>{props.recipe.description}</p>
  </>
);

export default (props: RecipeCardProps) =>
  props.selectedDay ?
    <RecipeCard url={props.recipe.image}>
      <Link to='/' onClick={() => props.putDay({
        date: props.selectedDay,
        recipeId: props.recipe.id
      })}>
        <RecipeCardContents {...props} />
      </Link>
    </RecipeCard> :
    <RecipeCard url={props.recipe.image}>
      <RecipeCardContents {...props} />
    </RecipeCard>;