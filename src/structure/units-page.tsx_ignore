import * as React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../globals/constants';

import Form from '../components/form';
import InputBox from '../components/input-box';

export default connect(state => ({
    status: state.units.status,
    units: state.units.data
}), dispatch => ({
    fireRequest: payload => dispatch({ type: Actions.units.GET_UNITS_REQUEST, payload })
}))(
    class UnitsPage extends React.Component<any, any> {
        constructor(props) {
            super(props);

            this.onButtonPress = this.onButtonPress.bind(this);
        }

        componentDidMount() {
            if (this.props.status === 'no_data') {
                this.props.fireRequest();
            }
        }

        onButtonPress(event) {
            event.preventDefault();
            console.log('Units requested');
            this.props.fireRequest();
        }

        render() {
            console.log(this.props.status);
            return (
                <div>
                    <h4>List units</h4>
                    <button onClick={event => this.onButtonPress(event)}>
                        Refresh units
                    </button>
                    {this.props.status === 'pending' &&
                        <div>Loading units..</div>
                    }
                    <ul>
                        {this.props.units.map((unit, index) =>
                            <li key={index}>{unit.singular}, {unit.plural}</li>
                        )}
                    </ul>
                    <h4>Add unit</h4>
                    <Form
                        payloadType={Actions.units.POST_UNIT_REQUEST}
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
                    {this.props.status === 'adding' &&
                        <div>Adding your new unit..</div>
                    }
                    {this.props.status === 'exists' &&
                        <div style={{color: 'red'}}>That already exists!</div>
                    }
                </div>
            );
        }
    }
);