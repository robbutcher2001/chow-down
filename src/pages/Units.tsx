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

class UnitsPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    // requestUnits = () => this.props.getUnits();
    addUnit = (form: Unit) => this.props.postUnit(form);

    componentDidMount = () => {
        if (!this.props.units.length) {
            this.props.getUnits();
        }
    };

    render = () => (
        <Main
            title='Units'
            loading={this.props.ui.pending.get}
            message={this.props.failure}
            error={this.props.error}
        >
            <h3>New unit</h3>
            <Form
                dispatch={this.addUnit}
                submitText='Add unit'>
                <InputBox
                    name='singular'
                    type='text'
                    placeholderText='Singular unit name'
                />
                <InputBox
                    name='plural'
                    type='text'
                    placeholderText='Plural unit name'
                />
            </Form>
            {this.props.ui.pending.post &&
                <div>Adding your new unit..</div>
            }
            {this.props.failure &&
                <div style={{ color: 'red' }}>{this.props.failure}</div>
            }
            <UnitGrid units={this.props.units} />
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
    (mapStateToProps, mapDispatchToProps)(UnitsPage);