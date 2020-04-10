import React, { FunctionComponent } from 'react';
import moment from 'moment';

import styled from 'styled-components';

import { Day } from '../../../store/domain/days/types';
import Stars from '../../Stars';
import UnknownImage from '../../UnknownImage';

interface DayCardProps {
  dayNotSet?: boolean,
  dateFormat: string,
  day: Day
};

const StyledDayCard = styled.li`
  cursor: pointer;
  margin: 2rem 0;
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

const DayCard: FunctionComponent<DayCardProps> = (props: DayCardProps) => {
  const today: string = moment().format(props.dateFormat);
  const isTonight: boolean = moment(today).isSame(props.day.date);
  const isTomorrow: boolean = moment(today).add(1, 'd').isSame(props.day.date);
  const day: string = isTonight ? 'Tonight' : isTomorrow ? 'Tomorrow' : moment(props.day.date).format('dddd');

  return (
    <StyledDayCard>
      <span />
      <h3>{day}</h3>
      {props.dayNotSet ?
        <UnknownImage /> :
        <DayRecipe>
          <img src={props.day.recipe.image} alt={props.day.recipe.title}></img>
          <figcaption>
            <h3>{props.day.recipe.title}</h3>
            <Stars rating={props.day.recipe.rating} />
          </figcaption>
        </DayRecipe>
      }
    </StyledDayCard>
  );
};

export default DayCard;