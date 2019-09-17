import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Unit, GetUnitsApiRequest, PostUnitApiRequest } from '../store/domain/units/types';
import { getUnitsRequest, postUnitsRequest } from '../store/domain/units/actions';

import Form from '../components/form';
import InputBox from '../components/input-box';

interface StateProps {
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
    postUnit: (form: object) => PostUnitApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class UnitsPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    requestUnits = () => this.props.getUnits();
    addUnit = (form: object) => this.props.postUnit(form);

    componentDidMount = () => this.props.getUnits();

    render = () => {
        console.log(this.props.units);
        return (
            <div>
                <h4>List units</h4>
                <button onClick={this.requestUnits}>
                    Press me to get all units
                </button>
                {this.props.ui.pending.get &&
                    <div style={{ color: 'red' }}>Getting..</div>
                }
                {this.props.units.map((unit, index) =>
                    <li key={index}>{unit.singular}, {unit.plural}</li>
                )}
                <h4>Add unit</h4>
                <Form
                    dispatch={this.addUnit}
                    submitText='Add unit'>
                    <InputBox
                        name='singular'
                        placeholderText='Singular unit name'
                    />
                    <InputBox
                        name='plural'
                        placeholderText='Plural unit name'
                    />
                </Form>
                {this.props.ui.pending.post &&
                    <div>Adding your new unit..</div>
                }
                {this.props.failure &&
                    <div style={{color: 'red'}}>{this.props.failure}</div>
                }
            </div>
        );
    }
};

const mapStateToProps = ({ domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
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
    postUnit: (form: object) => dispatch(postUnitsRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(UnitsPage);