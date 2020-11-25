import React, { FunctionComponent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import styled from 'styled-components';
import { xsmall } from '../../../themes/breakpoints';
import placeholderImg from '../../../themes/placeholder.svg';

import { Day, GetDayApiRequest } from '../../../store/domain/days/types';
import { UserAction } from '../../../store/app/user/types';
import { NegativeBox } from '../../MessageBox';
import Stars from '../../Stars';
import UnknownImage from '../../UnknownImage';
import AlternateDay from '../../AlternateDay';
import Tag from '../../Tag';

interface DayCardProps {
  failed?: string,
  isLoading: boolean,
  dateFormat: string,
  date: string,
  day?: Day,
  getDay: (date: string) => GetDayApiRequest,
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
  box-shadow: 4px 4px 12px 2px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;

  ${xsmall`
    margin: 1rem 0;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.6);
  `}

  > span {
    position: absolute;
    border-left: 90px solid transparent;
    border-right: 90px solid transparent;
    border-bottom-width: 90px;
    border-bottom-style: solid;
    border-bottom-color: ${props =>
      props.theme.colour.turquoise
    };
    transform: rotate(-45deg);
    z-index: 50;
    left: -62px;
    top: -17px;
  }

  > h3 {
    position: absolute;
    font-size: ${props =>
      props.theme.typography.fontSize.large
    };
    width: 120px;
    text-align: center;
    margin: 0;
    color: ${props =>
      props.theme.colour.white
    };
    transform: rotate(-45deg);
    z-index: 50;
    top: 34px;
    left: -14px;
  }

  .failed {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    > section {
      margin: 1rem;
    }
  }

  a {
    color: ${props =>
      props.theme.colour.black
    };
    text-decoration: none;
  }
`

const DayRecipe = styled.figure`
  height: 100%;
  margin: 0;
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
      padding: 0.5rem 0.5rem 0;
      margin: 0;
    }
  }
`

const DayCard: FunctionComponent<DayCardProps> = (props: DayCardProps) => {
  const today: string = moment().format(props.dateFormat);
  const isTonight: boolean = moment(today).isSame(props.date);
  const isTomorrow: boolean = moment(today).add(1, 'd').isSame(props.date);
  const displayDay: string = isTonight ? 'Tonight' : isTomorrow ? 'Tomorrow' : moment(props.date).format('dddd');

  const setSelectingDay = () => props.setSelectingDay(props.date);

  useEffect(() => void (!props.isLoading && props.getDay(props.date)), []);

  return (
    <StyledDayCard className={props.isLoading ? 'spinner spinning' : 'spinner'} >
      <span />
      <h3>{displayDay}</h3>
      {props.failed ?
        <div className='failed' >
          <Link to='/recipes' onClick={setSelectingDay}>
            <NegativeBox message={props.failed} />
          </Link>
        </div> :
        !props.day ?
          <Link to='/recipes' onClick={setSelectingDay}>
            <UnknownImage />
          </Link> :
          props.day.alternateDay ?
            <Link to='/recipes' onClick={setSelectingDay}>
              <AlternateDay title={props.day.alternateDay} />
            </Link> :
            <Link to={`/days/${props.date}`}>
              <DayRecipe>
                <img src={props.day.recipe.image} alt={`${props.day.recipe.title} image`} />
                <div>
                  <Tag label='Under 20 mins' $colour='#6f42c1' />
                  <Tag label='Slimming world' $colour='#d73a49' />
                  <Tag label='Chicken' $colour='#009688' />
                  <Tag label='Beef' $colour='#ca4a6c' />
                  <Tag label='Vegetables' $colour='#005ea5' />
                </div>
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