import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import aggregate from '../services/ShoppingListService';

import { GlobalState } from '../store';
import { Day } from '../store/domain/days/types';

import Main from '../components/Main';

interface StateProps {
  error: string,
  failures: {
    [date: string]: string
  },
  days: {
    [date: string]: Day
  },
  ui: {
    pending: {
      get: string[]
    }
  }
};

const ShoppingList: FunctionComponent<StateProps> = (props: StateProps) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => setLoading(props.ui.pending.get.length > 0));

  return (
    <Main title='Shopping List'>
      {isLoading ?
        <div>loading</div> :
        <>
          {/* TODO: type the any */}
          {aggregate(props.days).sort((a: any, b: any) => a.unit.localeCompare(b.unit)).map((ingredient: any, index: number) =>
            <div key={index}>
              {ingredient.quantity} {ingredient.unit} of {ingredient.name}
            </div>)}
        </>
      }
    </Main>
  )
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error.message,
  failures: domain.day.failures,
  days: domain.day.days,
  ui: {
    pending: {
      get: ui.day.getPending
    }
  }
});

export default connect<StateProps, null, null, GlobalState>
  (mapStateToProps)(ShoppingList);