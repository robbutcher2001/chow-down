import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Ingredient, GetIngredientsApiRequest, PostIngredientApiRequest } from '../store/domain/ingredients/types';
import { getIngredientsRequest, postIngredientsRequest } from '../store/domain/ingredients/actions';

import Form from '../components/form';
import InputBox from '../components/input-box';

interface StateProps {
    error: string,
    failure: string,
    ingredients: Ingredient[],
    ui: {
        pending: {
            get: boolean,
            post: boolean
        }
    }
};

interface DispatchProps {
    getIngredients: () => GetIngredientsApiRequest,
    postIngredient: (form: object) => PostIngredientApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class IngredientsPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    requestIngredients = () => this.props.getIngredients();
    addIngredient = (form: object) => this.props.postIngredient(form);

    componentDidMount = () => this.props.getIngredients();

    render = () => {
        console.log(this.props.ui.pending.post);
        return (
            <div>
                <h4>List ingredients</h4>
                <button onClick={this.requestIngredients}>
                    Refresh ingredients
                </button>
                {this.props.ui.pending.get &&
                    <div style={{ color: 'red' }}>Getting..</div>
                }
                <ul>
                    {this.props.ingredients.map((ingredient, index) =>
                        <li key={index}>{ingredient.name}</li>
                    )}
                </ul>
                <h4>Add ingredient</h4>
                <Form
                    dispatch={this.addIngredient}
                    submitText='Add ingredient'>
                    <InputBox
                        name='name'
                        type='text'
                        placeholderText='New ingredient name'
                    />
                </Form>
                <div>{this.props.error}</div>
                {this.props.ui.pending.post &&
                    <div>Adding your new ingredient..</div>
                }
                {this.props.failure &&
                    <div style={{color: 'red'}}>{this.props.failure}</div>
                }
            </div>
        );
    }
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
    //TODO: move application-wide errors to footer component for toast notification (feed down through page container)
    error: app.error,
    failure: domain.ingredient.failure,
    ingredients: domain.ingredient.ingredients,
    ui: {
        pending: {
            get: ui.ingredient.getPending,
            post: ui.ingredient.postPending
        }
    }
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    getIngredients: () => dispatch(getIngredientsRequest()),
    postIngredient: (form: object) => dispatch(postIngredientsRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(IngredientsPage);