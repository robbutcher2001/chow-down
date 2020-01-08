import React, { ReactNode } from 'react';

import styled from 'styled-components';

export interface IngredientCardProps {
  title: string,
  description: string,
  rating: number,
  imageUrl: string,
  imageAlt: string
};

const IngredientCard = styled.li`
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

  > section {
    display: flex;
    flex-direction: row;
    justify-content: left;
    font-size: 1.2rem;
    padding: 0.5rem;

    > mark {
      color: #4acaa8;
      background-color: white;
    }
  }
`

export default (props: IngredientCardProps) => (
  <IngredientCard>
    <figure>
      <img src={props.imageUrl} alt={props.imageAlt}></img>
      <figcaption>
        <h3>{props.title}</h3>
      </figcaption>
    </figure>
    <section>
      { function() {
        const rating: ReactNode[] = [];
        for (let i = 0; i < props.rating; i++) {
          rating.push(<mark key={i} >&#9733;</mark>);
        }
        return rating;
      }() }
    </section>
    <p>{props.description}</p>
  </IngredientCard>
);