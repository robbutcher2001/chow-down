import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import styled from 'styled-components';

import { Day } from '../../../store/domain/days/types';
import { UserAction } from '../../../store/app/user/types';
import Stars from '../../Stars';
import UnknownImage from '../../UnknownImage';

interface DayCardProps {
  dateFormat: string,
  date: string,
  day?: Day,
  setSelectingDay?: (day: string) => UserAction
};

const StyledDayCard = styled.li`
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

  a {
    color: black;
    text-decoration: none;
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
  const isTonight: boolean = moment(today).isSame(props.date);
  const isTomorrow: boolean = moment(today).add(1, 'd').isSame(props.date);
  const displayDay: string = isTonight ? 'Tonight' : isTomorrow ? 'Tomorrow' : moment(props.date).format('dddd');

  return (
    <StyledDayCard>
      <span />
      <h3>{displayDay}</h3>
      {!props.day ?
        <Link to='/recipes' onClick={() => props.setSelectingDay(props.date)}>
          <UnknownImage />
        </Link> :
        <Link to={`/days/${props.date}`}>
          <DayRecipe>
            <img src={props.day.recipe.image} alt={props.day.recipe.title}></img>
            <figcaption>
              <h3>{props.day.recipe.title}</h3>
              <Stars rating={props.day.recipe.rating} />
            </figcaption>
          </DayRecipe>
        </Link>
      }
    </StyledDayCard>
  );
};

export default DayCard;