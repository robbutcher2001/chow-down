import React, { FunctionComponent, useState, useEffect, MouseEvent } from 'react';

import styled, { css } from 'styled-components';
import { xsmall, small, medium } from '../../../themes/breakpoints';
import Stars from '../../Stars';
import placeholderImg from '../../../themes/placeholder.svg';

import { Recipe } from '../../../store/domain/recipes/types';
import { Tag, PutTagApiRequest } from '../../../store/domain/tags/types';

import HorizontalScroller from '../../HorizontalScroller';
import { Button, TagButton } from '../../Clickable';
import TagComponent from '../../Tags/Tag';
import { NegativeBox } from '../../MessageBox';

interface RecipeDetailProps {
  recipe: Recipe;
  tag: {
    loading: boolean;
    tags: Tag[];
  };
  updateRecipe: (recipe: Recipe) => void //PutTagApiRequest; needs to be update recipe, which is PUT verb on recipe
};

const largeBackgroundMixin = (image: string) => css`
  background-image: ${props => props.theme.isDark ?
    `radial-gradient(
      farthest-corner at 50% 55%,
      ${props.theme.colour.darkGrey}00 30%,
      ${props.theme.colour.darkGrey}ff 65%
    ), url(${image});` :
    `radial-gradient(
      farthest-corner at 50% 55%,
      ${props.theme.colour.white}00 30%,
      ${props.theme.colour.white}ff 65%
    ), url(${image});`
  };
`

const smallBackgroundMixin = (image: string) => css`
  background-image: ${props => props.theme.isDark ?
    `radial-gradient(
      farthest-corner at 35% 55%,
      ${props.theme.colour.darkGrey}00 30%,
      ${props.theme.colour.darkGrey}ff 65%
    ), url(${image});` :
    `radial-gradient(
      farthest-corner at 35% 55%,
      ${props.theme.colour.white}00 30%,
      ${props.theme.colour.white}ff 65%
    ), url(${image});`
  };
`

const RecipeDetail = styled.span<{ image: string }>`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 0;

  > div {
    min-height: 500px;
    width: 100%;
    max-width: 768px;
    ${props => largeBackgroundMixin(props.image)}
    background-size: cover;
    background-position: 75% 35%;
    position: relative;

    ${props => small`
      ${smallBackgroundMixin(props.image)}
    `}

    ${xsmall`
      background-position: 75%;
    `}

    &:before {
      content: '';
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
      color: ${props => props.theme.isDark ?
        props.theme.colour.lightestGrey :
        props.theme.colour.black
      };
      margin: 0;
      padding: 1rem;
      text-align: right;
    }

    > .tags {
      position: absolute;
      right: 1rem;
      max-width: 50%;

      ${medium`
        max-width: 75%;
      `}

      &.edit {
        max-width: 70%;

        ${medium`
          max-width: unset;
          margin-left: 1rem;
        `}
      }

      > .selector {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        border: none;
        background: transparent;
        padding: 0;
        cursor: copy;

        > * {
          margin: 0 0 4px 10px;
  
          ${medium`
            margin: 0 0 4px 4px;
          `}
        }
      }
    }

    > section {
      box-shadow: 0 5px 20px 0 rgba(0,0,0,0.2);
      border-radius: 8px;
      box-sizing: border-box;
      background: ${props => props.theme.isDark ?
        props.theme.colour.lightGrey :
        props.theme.colour.white
      };
      color: ${props => props.theme.isDark ?
        props.theme.colour.lightestGrey :
        props.theme.colour.black
      };
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
        background: ${props => props.theme.isDark ?
          props.theme.colour.lightGrey :
          props.theme.colour.white
        };
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

const RecipeComponent: FunctionComponent<RecipeDetailProps> = (props: RecipeDetailProps) => {
  const [editTags, setEditTags] = useState<boolean>(false);
  const [recipeTags, setRecipeTags] = useState<Tag[]>([]);

  useEffect(() => {
    props.recipe && props.recipe.tags && setRecipeTags(props.recipe.tags);
  }, [props.recipe]);

  const stopPropagation = (event: MouseEvent<any>) => event.stopPropagation();

  const editMode = (event: MouseEvent<any>) => {
    setEditTags(true);
    stopPropagation(event);
  };

  const readMode = () => setEditTags(false);

  const updateRecipeTags = (newTag: Tag) => {
    const remove = recipeTags.map(recipeTag => recipeTag.id).includes(newTag.id);

    const newRecipeTags = remove ?
      recipeTags.filter(recipeTag => recipeTag.id !== newTag.id) :
      [...recipeTags, newTag];

    setRecipeTags(newRecipeTags);
    updateRecipe(newRecipeTags);
  };

  const updateRecipe = (tags: Tag[]) =>
    props.updateRecipe({
      id: props.recipe.id,
      tags,
    });

  const fakeLoadingTags = () => [0, 1, 2, 3, 4].map(index =>
    <TagButton
      key={index}
      loading={true}>
      Tags loading..
    </TagButton>
  );

  return (
    props.recipe ?
      <RecipeDetail image={props.recipe.image} onClick={readMode} >
        <div>
          <h3>{props.recipe.title}</h3>
          <div className={editTags ? 'tags edit' : 'tags'} >
            {editTags ?
              <div onClick={stopPropagation} >
                <HorizontalScroller small>
                  {props.tag.loading ?
                    fakeLoadingTags() :
                    props.tag.tags.map(tag =>
                      <TagButton
                        key={tag.id}
                        colour={tag.colours.background}
                        selected={props.recipe.tags && props.recipe.tags.map(tag => tag.id).includes(tag.id)}
                        onClick={() => updateRecipeTags(tag)}>
                        {tag.name}
                      </TagButton>
                    )
                  }
                </HorizontalScroller>
              </div> :
              props.recipe.tags ?
                <button className='selector' onClick={editMode} >
                  {props.recipe.tags.map((tag, index) =>
                    <TagComponent
                      key={index}
                      $colour={tag.colours.background}>
                      {tag.name}
                    </TagComponent>
                  )}
                </button> :
                <Button
                  $bold
                  $inline
                  $xsmallFont
                  onClick={editMode}
                >
                  Add tags
                </Button>
            }
          </div>
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
      <NegativeBox message='Direct recipe retrieval not implemented yet.' />
  );
};

export default RecipeComponent;