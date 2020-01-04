import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Ingredient, GetIngredientsApiRequest, PostIngredientApiRequest } from '../store/domain/ingredients/types';
import { getIngredientsRequest, postIngredientsRequest } from '../store/domain/ingredients/actions';

import Page from '../components/page';
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
    postIngredient: (form: Ingredient) => PostIngredientApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class IngredientsPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    // requestIngredients = () => this.props.getIngredients();
    addIngredient = (form: Ingredient) => this.props.postIngredient(form);

    componentDidMount = () => this.props.getIngredients();

    render = () => {
        console.log(this.props.error);
        return (
            <Page
                title='Ingredients'
                loading={this.props.ui.pending.get}
                message={this.props.failure}
                error={this.props.error}
            >
                <h3>New ingredient</h3>
                <Form
                    dispatch={this.addIngredient}
                    submitText='Add ingredient'>
                    <InputBox
                        name='ingredient'
                        type='text'
                        placeholderText='Ingredient name'
                    />
                </Form>
                {this.props.ui.pending.post &&
                    <div>Adding your new ingredient..</div>
                }
                {this.props.failure &&
                    <div style={{ color: 'red' }}>{this.props.failure}</div>
                }
                <ul>
                    {this.props.ingredients.map((ingredient, index) =>
                        <li key={index}>{ingredient.ingredient}</li>
                    )}
                </ul>
            </Page>
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
    postIngredient: (form: Ingredient) => dispatch(postIngredientsRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(IngredientsPage);