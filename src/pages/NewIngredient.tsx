import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Ingredient, GetIngredientsApiRequest, PostIngredientApiRequest } from '../store/domain/ingredients/types';
import { getIngredientsRequest, postIngredientsRequest } from '../store/domain/ingredients/actions';

import Main from '../components/Main';
import IngredientGrid from '../components/Ingredients/IngredientGrid';
import Form from '../components/Form';
import InputBox from '../components/InputBox';

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

class NewIngredientPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    // requestIngredients = () => this.props.getIngredients();
    addIngredient = (form: Ingredient) => this.props.postIngredient(form);

    componentDidMount = () => this.props.getIngredients();

    render = () => {
        console.log(this.props.error);
        return (
            <Main
                title='Ingredients'
                loading={this.props.ui.pending.get}
                message={this.props.failure}
                error={this.props.error}
            >
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
                <h3>Existing ingredients</h3>
                <IngredientGrid ingredients={this.props.ingredients} />
            </Main>
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
    (mapStateToProps, mapDispatchToProps)(NewIngredientPage);