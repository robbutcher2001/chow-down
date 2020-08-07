import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Unit, GetUnitsApiRequest, PostUnitApiRequest } from '../store/domain/units/types';
import { getUnitsRequest, postUnitsRequest } from '../store/domain/units/actions';

import Main from '../components/Main';
import UnitGrid from '../components/Units/UnitGrid';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import { NegativeBox } from '../components/MessageBox';

interface StateProps {
  error: string,
  failure: string,
  units: Unit[],
  ui: {
    pending: {
      get: boolean,
      post: boolean
    }
  }
};

interface DispatchProps {
  getUnits: () => GetUnitsApiRequest,
  postUnit: (form: Unit) => PostUnitApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class NewUnitPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
  }

  addUnit = (form: Unit) => this.props.postUnit(form);

  componentDidMount = () => this.props.getUnits();

  render = () => (
    <Main title='New unit' >
      {this.props.failure &&
        <NegativeBox message={this.props.failure} />
      }
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <>
          <div className={this.props.ui.pending.post ? 'spinner spinning' : 'spinner'}>
            <Form
              name='unitForm'
              dispatch={this.addUnit}
              submitText='Add unit'>
              <InputBox
                name='singular'
                type='text'
                label='Singular unit name'
                validator={(value: string) => value.length > 0}
              />
              <InputBox
                name='plural'
                type='text'
                label='Plural unit name'
                validator={(value: string) => value.length > 0}
              />
            </Form>
          </div>
          <UnitGrid
            isLoading={this.props.ui.pending.get}
            title='Existing units'
            units={this.props.units}
          />
        </>
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, _ownProps: OwnProps): StateProps => ({
  error: app.error.message,
  failure: domain.unit.failure,
  units: domain.unit.units,
  ui: {
    pending: {
      get: ui.unit.getPending,
      post: ui.unit.postPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch, _ownProps: OwnProps): DispatchProps => ({
  getUnits: () => dispatch(getUnitsRequest()),
  postUnit: (form: Unit) => dispatch(postUnitsRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
  (mapStateToProps, mapDispatchToProps)(NewUnitPage);