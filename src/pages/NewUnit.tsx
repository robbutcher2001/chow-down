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
import { LoadingBox, ErrorBox } from '../components/MessageBox';

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
                <ErrorBox message={this.props.failure} />
            }
            {this.props.error ?
                <ErrorBox message={this.props.error} /> :
                <div>
                    {this.props.ui.pending.post ?
                        <LoadingBox message='Creating new unit' /> :
                        <Form
                            dispatch={this.addUnit}
                            submitText='Add unit'>
                            <InputBox name='singular' type='text' label='Singular unit name' />
                            <InputBox name='plural' type='text' label='Plural unit name' />
                        </Form>
                    }
                    <h3>Existing units</h3>
                    {this.props.ui.pending.get ?
                        <LoadingBox message='Fetching units' /> :
                        <UnitGrid units={this.props.units} />
                    }
                </div>
            }
        </Main>
    );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
    error: app.error,
    failure: domain.unit.failure,
    units: domain.unit.units,
    ui: {
        pending: {
            get: ui.unit.getPending,
            post: ui.unit.postPending
        }
    }
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    getUnits: () => dispatch(getUnitsRequest()),
    postUnit: (form: Unit) => dispatch(postUnitsRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(NewUnitPage);