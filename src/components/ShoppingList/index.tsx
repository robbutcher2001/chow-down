import React, { FunctionComponent, MouseEvent, useState, useEffect } from 'react';

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

const StyledShoppingList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 2rem 0 0 0;
  list-style-type: none;
  min-height: 120px;
  color: ${props => props.theme.isDark ?
    props.theme.colour.lightestGrey :
    props.theme.colour.black
  };

  li {
    margin: 0 0 0.5rem;
    line-height: 1.5rem;
    cursor: pointer;
    background: ${props => props.theme.colour.lightGrey};
    border-top-left-radius: 50px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 50px;
    padding: 0.5rem 0.75rem 0.5rem 0.5rem;
    box-shadow: 0px 2px 2px 0 rgba(0,0,0,0.2);
    box-sizing: border-box;
    animation: fadein 0.5s;

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    mark {
      border-radius: 50px;
      padding: 4px 8px;
      margin-right: 8px;
      font-size: 16px;
      ${props => !props.theme.isDark &&
        'opacity: 0.2;'
      };
      background-color: ${props => props.theme.colour.darkGrey};
      color: ${props => props.theme.colour.darkGrey};
    }
  }

  .strikethrough {
    span {
      color: ${props => props.theme.colour.grey};
      text-decoration: line-through;
    }

    mark {
      ${props => !props.theme.isDark &&
        'opacity: 1;'
      };
      background-color: ${props => props.theme.colour.semantic.theme};
      color: ${props => props.theme.isDark ?
        props.theme.colour.black :
        props.theme.colour.white
      };
    }
  }
`

const ShoppingList: FunctionComponent<ShoppingListProps> = (props: ShoppingListProps) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [strikethroughIndexes, setStrikethroughIndex] = useState([]);

  const toggleStrikethrough = ({ currentTarget }: MouseEvent<HTMLLIElement>): void =>
    strikethroughIndexes.includes(currentTarget.dataset.ingredient) ?
    setStrikethroughIndex(strikethroughIndexes.filter(index => index !== currentTarget.dataset.ingredient)) :
    setStrikethroughIndex([...strikethroughIndexes, currentTarget.dataset.ingredient]);

  useEffect(() => setShoppingList(aggregate(props.days).sort((a: any, b: any) => a.unit.plural.localeCompare(b.unit.plural))), [props.days]);

  return (
    !props.isLoading && !!!shoppingList.length ?
      <NegativeBox message='We could not find any recipes associated to this week' /> :
      <StyledShoppingList className={props.isLoading ? 'spinner spinning blur' : 'spinner'} >
        {/* TODO: type the any */}
        {shoppingList.map((ingredient: any, index: number) =>
          <li
            key={index}
            data-ingredient={index}
            onClick={toggleStrikethrough}
            className={strikethroughIndexes.includes(index.toString()) ? 'strikethrough' : ''}
          >
            <mark>&#10003;</mark>
            <span>{`${ingredient.quantity} ${ingredient.quantity === 1 ? ingredient.unit.singular : ingredient.unit.plural} ${ingredient.name}`}</span>
          </li>
        )}
      </StyledShoppingList >
  );
};

export default ShoppingList;