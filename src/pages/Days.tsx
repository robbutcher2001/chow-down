import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import { GlobalState } from '../store';
import { Day, GetDaysApiRequest } from '../store/domain/days/types';
import { getDaysRequest } from '../store/domain/days/actions';

import { ZeroMarginedMain, CallToAction } from '../components/Main';
import DayGrid from '../components/Days/DayGrid';
import { ErrorBox, LoadingBox } from '../components/MessageBox';

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
      get: boolean
    }
  }
};

interface DispatchProps {
  getDays: (from: string, to: string) => GetDaysApiRequest
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
  }

  componentDidMount = () => this.props.getDays(
    moment().format(this.state.dateFormat),
    moment().add(this.state.seekDays, 'd').format(this.state.dateFormat)
  );

  render = () => (
    <ZeroMarginedMain title='Week Ahead' >
      {this.props.failure &&
        <ErrorBox message={this.props.failure} />
      }
      {this.props.error ?
        <ErrorBox message={this.props.error} /> :
        <div>
          {this.props.ui.pending.get ?
            <LoadingBox message='Fetching days' /> :
            <DayGrid
              dateFormat={this.state.dateFormat}
              seekDays={this.state.seekDays}
              days={this.props.days}
            />
          }
        </div>
      }
    </ZeroMarginedMain>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error,
  failure: domain.day.failure,
  days: domain.day.days,
  ui: {
    pending: {
      get: ui.day.getPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getDays: (from: string, to: string) => dispatch(getDaysRequest(from, to))
});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, mapDispatchToProps)(DaysPage);