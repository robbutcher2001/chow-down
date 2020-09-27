import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import { GlobalState } from '../store';
import { Day, GetDayApiRequest, PutDayApiRequest } from '../store/domain/days/types';
import { UserAction } from '../store/app/user/types';
import { getDayRequest, putDayRequest } from '../store/domain/days/actions';
import { setUserIsSelectingDay } from '../store/app/user/actions';

import DayComponent from '../components/Day';
import Main from '../components/Main';
import { NegativeBox } from '../components/MessageBox';

interface StateProps {
  error: string,
  failure: {
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

interface DispatchProps {
  getDay: (date: string) => GetDayApiRequest,
  putDay: (day: Day) => PutDayApiRequest,
  setSelectingDay: (day: string) => UserAction
};

interface DayUrlParamProps {
  date: string
};

interface OwnState {
  date: string,
  displayDay: string,
  day: Day
};

type CombinedProps = StateProps & DispatchProps & RouteComponentProps<DayUrlParamProps>;

//TODO: convert to FunctionComponent and useEffect() and useParams
class DayPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      date: null,
      displayDay: null,
      day: null
    }
  }

  componentDidMount = () => {
    const { date } = this.props.match.params;
    const day: Day = this.props.days[date];

    this.setState({
      date,
      displayDay: moment(date).isValid() ? moment(date).format('dddd') : ''
    });

    if (day) {
      this.setState({
        day
      });
    }
    else {
      this.props.getDay(date);
    }
  };

  componentDidUpdate = (_prevProps: CombinedProps, prevState: OwnState) => {
    const { date } = this.props.match.params;
    const day: Day = this.props.days[date];

    if (day && day !== prevState.day) {
      this.setState({
        day
      });
    }
  };

  render = () => (
    <Main title={this.state.displayDay} >
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        this.props.failure[this.state.date] ?
          <NegativeBox message={this.props.failure[this.state.date]} /> :
          <DayComponent
            isLoading={this.props.ui.pending.get.includes(this.state.date)}
            day={this.state.day}
            setSelectingDay={this.props.setSelectingDay}
            putDay={this.props.putDay}
          />
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error.message,
  failure: domain.day.failures,
  days: domain.day.days,
  ui: {
    pending: {
      get: ui.day.getPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getDay: (date: string) => dispatch(getDayRequest(date)),
  putDay: (day: Day) => dispatch(putDayRequest(day)),
  setSelectingDay: (day: string) => dispatch(setUserIsSelectingDay(day))
});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, mapDispatchToProps)(DayPage);