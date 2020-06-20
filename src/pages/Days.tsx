import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import { GlobalState } from '../store';
import { Day, GetDaysApiRequest } from '../store/domain/days/types';
import { UserAction } from '../store/app/user/types';
import { getDaysRequest } from '../store/domain/days/actions';
import { setUserIsSelectingDay } from '../store/app/user/actions';

import Main, { CallToAction } from '../components/Main';
import DayGrid from '../components/Days/DayGrid';
import { NegativeBox } from '../components/MessageBox';

const cta: CallToAction = {
  text: 'Get week\'s ingredients',
  link: '/ingredients/week/this'
};

interface StateProps {
  error: string,
  failure: string,
  days: Day[]
  ui: {
    pending: {
      get: boolean,
      put: boolean
    }
  }
};

interface DispatchProps {
  getDays: (from: string, to: string) => GetDaysApiRequest,
  setSelectingDay: (day: string) => UserAction
};

interface OwnState {
  dateFormat: string,
  seekDays: number
};

type CombinedProps = StateProps & DispatchProps;

//TODO: convert to FunctionComponent and useEffect()
class DaysPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      dateFormat: 'YYYYMMDD',
      seekDays: 7
    }
  };

  componentDidMount = () => !this.props.ui.pending.put && this.props.getDays(
    moment().format(this.state.dateFormat),
    moment().add(this.state.seekDays - 1, 'd').format(this.state.dateFormat)
  );

  render = () => (
    <Main title='Your week' >
      {this.props.failure &&
        <NegativeBox message={this.props.failure} />
      }
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <DayGrid
          dateFormat={this.state.dateFormat}
          seekDays={this.state.seekDays}
          isLoading={this.props.ui.pending.get || this.props.ui.pending.put}
          days={this.props.days}
          setSelectingDay={this.props.setSelectingDay}
        />
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error.message,
  failure: domain.day.failure,
  days: domain.day.days,
  ui: {
    pending: {
      get: ui.day.getPending,
      put: ui.day.putPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getDays: (from: string, to: string) => dispatch(getDaysRequest(from, to)),
  setSelectingDay: (day: string) => dispatch(setUserIsSelectingDay(day))
});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, mapDispatchToProps)(DaysPage);