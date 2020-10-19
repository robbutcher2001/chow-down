import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { GlobalState } from '../store';
import { Day } from '../store/domain/days/types';

import Main from '../components/Main';
import { NegativeBox } from '../components/MessageBox';
import ShoppingList from '../components/ShoppingList';

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
      get: string[],
      put: string[]
    }
  }
};

const ShoppingListPage: FunctionComponent<StateProps> = (props: StateProps) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => setLoading([...props.ui.pending.get, ...props.ui.pending.put].length > 0));

  return (
    <Main title='Your shopping list'>
      {props.error ?
        <NegativeBox message={props.error} /> :
        !!Object.keys(props.failures).length ?
          <NegativeBox message='One or more week days failed to return' /> :
          <ShoppingList isLoading={isLoading} days={props.days} />
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error.message,
  failures: domain.day.failures,
  days: domain.day.days,
  ui: {
    pending: {
      get: ui.day.getPending,
      put: ui.day.putPending
    }
  }
});

export default connect<StateProps, null, null, GlobalState>
  (mapStateToProps)(ShoppingListPage);