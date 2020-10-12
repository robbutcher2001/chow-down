import React, { FunctionComponent, useState, useEffect } from 'react';

import styled from 'styled-components';

import aggregate from '../../services/ShoppingListService';

import { Day } from '../../store/domain/days/types';
import { NegativeBox } from '../MessageBox';

interface ShoppingListProps {
  isLoading: boolean,
  days: {
    [date: string]: Day
  }
};

const StyledShoppingList = styled.section`
  min-height: 120px;
  color: ${props => props.theme.isDark ?
    props.theme.colour.lightestGrey :
    props.theme.colour.black
  };

  * {
    animation: fadein 0.5s;

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`

const ShoppingList: FunctionComponent<ShoppingListProps> = (props: ShoppingListProps) => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => setShoppingList(aggregate(props.days).sort((a: any, b: any) => a.unit.localeCompare(b.unit))), [props.days]);

  return (
    !props.isLoading && !!!shoppingList.length ?
      <NegativeBox message='We could not find any recipes associated to this week' /> :
      <StyledShoppingList className={props.isLoading ? 'spinner spinning blur' : 'spinner'} >
        {/* TODO: type the any */}
        {shoppingList.map((ingredient: any, index: number) =>
          <div key={index}>
            {`${ingredient.quantity} ${ingredient.quantity === 1 ? ingredient.unit : ingredient.unit} of ${ingredient.name}`}
          </div>)
        }
      </StyledShoppingList >
  );
};

export default ShoppingList;