import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Day, GetDayApiRequest } from '../store/domain/days/types';
import { UserAction } from '../store/app/user/types';
import { getDayRequest } from '../store/domain/days/actions';
import { setUserIsSelectingDay } from '../store/app/user/actions';

import Main, { CallToAction } from '../components/Main';
import DayGrid from '../components/Days/DayGrid';
import { NegativeBox } from '../components/MessageBox';

const cta: CallToAction = {
  text: 'Shopping List',
  link: '/shopping/ingredients'
};

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

interface DispatchProps {
  getDay: (date: string) => GetDayApiRequest,
  setSelectingDay: (day: string) => UserAction
};

type CombinedProps = StateProps & DispatchProps;

const DaysPage: FunctionComponent<CombinedProps> = (props: CombinedProps) =>
  <Main title='Your week' cta={cta} >
    {props.error ?
      <NegativeBox message={props.error} /> :
      <DayGrid
        loading={props.ui.pending.get.concat(props.ui.pending.put)}
        failures={props.failures}
        days={props.days}
        getDay={props.getDay}
        setSelectingDay={props.setSelectingDay}
      />
    }
  </Main>;

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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getDay: (date: string) => dispatch(getDayRequest(date)),
  setSelectingDay: (day: string) => dispatch(setUserIsSelectingDay(day))
});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, mapDispatchToProps)(DaysPage);