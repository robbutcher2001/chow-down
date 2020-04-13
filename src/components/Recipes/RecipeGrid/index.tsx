import React from 'react';
import moment from 'moment';

import styled from 'styled-components';

import { Recipe } from '../../../store/domain/recipes/types';
import { Day, PutDayApiRequest } from '../../../store/domain/days/types';
import RecipeCard from '../RecipeCard';
import { NegativeBox } from '../../MessageBox';

interface RecipeGridProps {
  recipes: Recipe[],
  selectedDay?: string,
  putDay?: (day: Day) => PutDayApiRequest
};

const UserInstruction = styled.div`
  margin: 1rem 0 2rem;
  font-size: 1.2rem;
`

const RecipeGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem 2em;
  margin: 0;
  padding: 1rem 0rem 0rem 0rem;
  list-style: none;
`

export default (props: RecipeGridProps) =>
  props.recipes && props.recipes.length > 0 ?
    <>
      {props.selectedDay &&
        <UserInstruction>
          Select something for {moment(props.selectedDay).format('dddd')}
        </UserInstruction>
      }
      <RecipeGrid>
        {props.recipes.map((recipe, i) =>
          <RecipeCard
            key={i}
            recipe={recipe}
            selectedDay={props.selectedDay}
            putDay={props.putDay}
          />
        )}
      </RecipeGrid>
    </> :
    <NegativeBox message='No recipes yet!' />;