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
import { LoadingBox, ErrorBox } from '../components/MessageBox';

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

    addIngredient = (form: Ingredient) => this.props.postIngredient(form);

    componentDidMount = () => this.props.getIngredients();

    render = () => (
        <Main title='New ingredient' >
            {this.props.failure &&
                <ErrorBox message={this.props.failure} />
            }
            {this.props.error ?
                <ErrorBox message={this.props.error} /> :
                <div>
                    {this.props.ui.pending.post ?
                        <LoadingBox message='Creating new ingredient' /> :
                        <Form
                            dispatch={this.addIngredient}
                            submitText='Add ingredient'>
                            <InputBox
                                name='ingredient'
                                type='text'
                                placeholderText='Ingredient name'
                            />
                        </Form>
                    }
                    <h4>Existing ingredients</h4>
                    {this.props.ui.pending.get ?
                        <LoadingBox message='Fetching ingredients' /> :
                        <IngredientGrid ingredients={this.props.ingredients} />
                    }
                </div>
            }
        </Main>
    )
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