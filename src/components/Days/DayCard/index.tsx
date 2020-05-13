import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import styled from 'styled-components';
import { xsmall } from '../../../breakpoints';
import placeholderImg from '../../../placeholder.svg';

import { Day } from '../../../store/domain/days/types';
import { UserAction } from '../../../store/app/user/types';
import Stars from '../../Stars';
import UnknownImage from '../../UnknownImage';
import AlternateDay from '../../AlternateDay';

interface DayCardProps {
  dateFormat: string,
  date: string,
  day?: Day,
  setSelectingDay?: (day: string) => UserAction
};

const StyledDayCard = styled.li`
  margin: 2rem 1rem;
  width: 100%;
  max-width: 420px;
  height: 320px;
  min-height: 320px;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  box-shadow: 2px 4px 12px 2px rgba(0,0,0,0.6);
  box-sizing: border-box;

  ${xsmall`
    margin: 0.8rem 0;
    box-shadow: 0 4px 12px 4px rgba(0,0,0,0.6);
  `}

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

const DayRecipe = styled.figure<{ url: string }>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: 50%;
  margin: 0;
  height: 100%;

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
      padding: .5rem .5rem 0;
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
        props.day.alternateDay ?
          <Link to='/recipes' onClick={() => props.setSelectingDay(props.date)}>
            <AlternateDay title={props.day.alternateDay} />
          </Link> :
          <Link to={`/days/${props.date}`}>
            <DayRecipe url={props.day.recipe.image} >
              <aside />
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