import React from 'react';

import styled from 'styled-components';
import Stars from '../Stars';
import UnknownImage from '../UnknownImage';

interface DayCardProps {
  day: string,
  dayNotSet?: boolean,
  title: string,
  description?: string,
  rating: number,
  imageUrl: string,
  imageAlt: string
};

const DayCard = styled.li`
  cursor: pointer;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  max-height: 350px;
  max-width: 450px;
  overflow: hidden;
  position: relative;

  > span {
    position: absolute;
    border-left: 90px solid transparent;
    border-right: 90px solid transparent;
    border-bottom: 90px solid rgb(74, 202, 168);
    transform: rotate(-45deg);
    z-index: 50;
    left: -62px;
    top: -17px;
  }

  > h3 {
    position: absolute;
    font-size: 1.2rem;
    width: 120px;
    text-align: center;
    margin: 0;
    color: white;
    transform: rotate(-45deg);
    z-index: 50;
    top: 34px;
    left: -14px;
  }
`

const DayRecipe = styled.figure`
  margin: 0;

  > img {
    width: 100%;
    height: 100%;
  }

  > figcaption {
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    width: 100%;

    > h3 {
      color: white;
      padding: 1.5rem .5rem .2rem .5rem;
      margin: 0;
    }
  }
`

export default (props: DayCardProps) => (
  <DayCard>
    <span />
    <h3>{props.day}</h3>
    {props.dayNotSet ?
      <UnknownImage /> :
      <DayRecipe>
        <img src={props.imageUrl} alt={props.imageAlt}></img>
        <figcaption>
          <h3>{props.title}</h3>
          <Stars rating={props.rating} />
        </figcaption>
      </DayRecipe>
    }
  </DayCard>
);