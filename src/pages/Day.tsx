import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import { GlobalState } from '../store';
import { Day, GetDaysApiRequest, PutDayApiRequest } from '../store/domain/days/types';
import { UserAction } from '../store/app/user/types';
import { getDaysRequest, putDaysRequest } from '../store/domain/days/actions';
import { setUserIsSelectingDay } from '../store/app/user/actions';

import DayComponent from '../components/Day';
import Main from '../components/Main';
import { ErrorBox, LoadingBox } from '../components/MessageBox';

interface StateProps {
  error: string,
  failure: string,
  days: Day[]
  ui: {
    pending: {
      get: boolean
    }
  }
};

interface DispatchProps {
  getDay: (date: string) => GetDaysApiRequest,
  putDay: (day: Day) => PutDayApiRequest,
  setSelectingDay: (day: string) => UserAction
};

interface DayUrlParamProps {
  date: string
};

interface OwnState {
  displayDay: string,
  day: Day
};

type CombinedProps = StateProps & DispatchProps & RouteComponentProps<DayUrlParamProps>;

//TODO: convert to FunctionComponent and useEffect() and useParams
class DaysPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      displayDay: null,
      day: null
    }
  }

  findDay = (date: string) => this.props.days.find(day => day.date === date);

  componentDidMount = () => {
    const { date } = this.props.match.params;
    const day: Day = this.findDay(date);

    this.setState({
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
    const day: Day = this.findDay(date);

    if (day && day !== prevState.day) {
      this.setState({
        day
      });
    }
  };

  render = () => (
    <Main title={this.state.displayDay} >
      {this.props.failure &&
        <ErrorBox message={this.props.failure} />
      }
      {this.props.error ?
        <ErrorBox message={this.props.error} /> :
        <>
          {this.props.ui.pending.get ?
            <LoadingBox message={`Fetching ${this.state.displayDay}'s plan`} /> :
            !this.state.day ?
              <ErrorBox message='We could not find a recipe associated to this day' /> :
              <DayComponent
                day={this.state.day}
                setSelectingDay={this.props.setSelectingDay}
                putDay={this.props.putDay}
              />
          }
        </>
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
      get: ui.day.getPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getDay: (date: string) => dispatch(getDaysRequest(date, date)),
  putDay: (day: Day) => dispatch(putDaysRequest(day)),
  setSelectingDay: (day: string) => dispatch(setUserIsSelectingDay(day))
});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, mapDispatchToProps)(DaysPage);