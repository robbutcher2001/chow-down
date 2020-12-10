import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import placeholderImg from '../../../themes/placeholder.svg';

import { Recipe } from '../../../store/domain/recipes/types';
import { Day, PutDayApiRequest } from '../../../store/domain/days/types';

import Tag from '../../Tags/Tag';
import Stars from '../../Stars';

interface RecipeCardProps {
  recipe: Recipe,
  selectedDay?: string,
  putDay?: (day: Day) => PutDayApiRequest
};

const RecipeCard = styled.li`
  box-shadow: ${props => props.theme.isDark ?
    `0 2px 6px 2px ${props.theme.colour.lightBlack}` :
    '0 1px 4px 0 rgba(0, 0, 0, .08)'
  };
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.isDark ?
    props.theme.colour.lightBlack :
    'rgba(0, 0, 0, .04)'
  };
  border-radius: 8px;

  > a {
    color: ${props =>
      props.theme.colour.black
    };
    text-decoration: none;

    > figure {
      height: 220px;
      margin: 0;
      overflow: hidden;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      position: relative;
      z-index: 0;

      &:before {
        content: '';
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

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        &:after {
          content: attr(alt) ' missing';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          padding-top: 2rem;
          background-color: ${props => props.theme.isDark ?
            props.theme.colour.darkGrey :
            props.theme.colour.white
          };
          color: ${props => props.theme.isDark ?
            props.theme.colour.lightestGrey :
            props.theme.colour.black
          };
          text-align: center;
        }
      }

      > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        position: absolute;
        max-width: 70%;
        margin: 2px;
        top: 0;
        right: 0;

        > * {
          margin: 1px;
        }
      }

      > figcaption {
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, .7);
        width: 100%;

        > h3 {
          color: ${props =>
            props.theme.colour.white
          };
          padding: 0.5rem;
          margin: 0;
        }
      }
    }
  
    > p {
      color: ${props => props.theme.isDark ?
        props.theme.colour.lightestGrey :
        props.theme.colour.lightBlack
      };
      padding: 0 0.5rem 1.5rem;
      margin: 0;
    }
  }
`

const RecipeCardContents = (props: RecipeCardProps) => (
  <>
    <figure>
      <img src={props.recipe.image} alt={`${props.recipe.title} image`} />
      <div>
        {props.recipe.tags && props.recipe.tags.map((tag, index) =>
          <Tag
            key={index}
            $backgroundColour={tag.colours.background}
            $textColour={tag.colours.text}
          >
            {tag.name}
          </Tag>
        )}
      </div>
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
    <RecipeCard>
      <Link to='/' onClick={() => props.putDay({
        date: props.selectedDay,
        recipeId: props.recipe.id
      })}>
        <RecipeCardContents {...props} />
      </Link>
    </RecipeCard> :
    <RecipeCard>
      <Link to={`/recipe/${props.recipe.id}`}>
        <RecipeCardContents {...props} />
      </Link>
    </RecipeCard>;