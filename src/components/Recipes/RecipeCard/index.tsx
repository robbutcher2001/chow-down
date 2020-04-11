import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Recipe } from '../../../store/domain/recipes/types';
import { Day, PutDayApiRequest } from '../../../store/domain/days/types';
import Stars from '../../Stars';

interface RecipeCardProps {
  recipe: Recipe,
  selectedDay?: string,
  putDay?: (day: Day) => PutDayApiRequest
};

const ContentContainer = styled.span`
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

const RecipeCard = styled.li`
  -webkit-box-shadow: 0 1px 0.25rem rgba(0, 0, 0, .08);
  box-shadow: 0 1px 0.25rem rgba(0, 0, 0, .08);
  border: 1px solid rgba(0,0,0,.04);
  border-radius: 0.5rem;

  a {
    color: black;
    text-decoration: none;
  }
`

const RecipeCardContents = (props: RecipeCardProps) => (
  <ContentContainer>
    <figure>
      <img src={props.recipe.image} alt={props.recipe.title}></img>
      <figcaption>
        <h3>{props.recipe.title}</h3>
      </figcaption>
    </figure>
    <Stars rating={props.recipe.rating} />
    <p>{props.recipe.description}</p>
  </ContentContainer>
);

export default (props: RecipeCardProps) =>
  props.selectedDay ?
    <RecipeCard>
      <Link to='/' onClick={() => props.putDay({
        date: props.selectedDay,
        recipeId: props.recipe.id
      })}>
        <RecipeCardContents {...props} />
      </Link>
    </RecipeCard> :
    <RecipeCard>
      <RecipeCardContents {...props} />
    </RecipeCard>;