import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'query-string';
import moment from 'moment';

import { GlobalState } from '../store';
import { Day, PutDayApiRequest } from '../store/domain/days/types';
import { putDaysRequest } from '../store/domain/days/actions';

import Main from '../components/Main';
import Form from '../components/Form';
import Textarea from '../components/Textarea';
import { NegativeBox } from '../components/MessageBox';

interface DispatchProps {
  putDay: (day: Day) => PutDayApiRequest
};

interface DayUrlParamProps {
  date: string
};

interface OwnState {
  displayDay: string,
  date: string
};

type CombinedProps = DispatchProps & RouteComponentProps<DayUrlParamProps>;

class NewAlternateDayPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      displayDay: null,
      date: null
    }
  }

  redirectToDays = () => this.props.history.push('/');

  setAlternateDay = (form: Day) => {
    const dispatch = this.props.putDay(Object.assign({}, { date: this.state.date }, form));
    this.redirectToDays();

    return dispatch;
  };

  componentDidMount = () => {
    const params = qs.parse(this.props.location.search);
    const date: string = params.date as string;

    this.setState({
      displayDay: date && moment(date).isValid() ? moment(date).format('dddd') : null,
      date
    });
  }

  render = () => (
    <Main title='Alternate Day' >
      {!this.state.displayDay ?
        <NegativeBox message='Selected date cannot not be used' /> :
        <>
          <h3>Set {this.state.displayDay} as an alternative day</h3>
          <Form
            name='alternateDayForm'
            dispatch={this.setAlternateDay}
            submitText='Set'>
            <Textarea
              name='alternateDay'
              label='What will you be doing instead?'
              validator={(value: string) => value && value.length > 2}
            />
          </Form>
        </>
      }
    </Main>
  )
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  putDay: (day: Day) => dispatch(putDaysRequest(day))
});

export default connect<null, DispatchProps, null, GlobalState>
  (null, mapDispatchToProps)(NewAlternateDayPage);