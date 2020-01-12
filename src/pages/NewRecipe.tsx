import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, PostRecipeApiRequest } from '../store/domain/recipes/types';
import { postRecipesRequest } from '../store/domain/recipes/actions';

import Main from '../components/Main';
import Form from '../components/Form';
import InputBox from '../components/InputBox';

interface StateProps {
    error: string,
    failure: string,
    ui: {
        pending: {
            post: boolean
        }
    }
};

interface DispatchProps {
    postRecipe: (form: Recipe) => PostRecipeApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class NewRecipePage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    addRecipe = (form: Recipe) => this.props.postRecipe(form);

    render = () => (
        <Main
            title='New recipe'
            loading={this.props.ui.pending.post}
            message={this.props.failure}
            error={this.props.error}
        >
            <Form
                dispatch={this.addRecipe}
                submitText='Add recipe'>
                <InputBox
                    name='title'
                    type='text'
                    placeholderText='Title'
                />
                <InputBox
                    name='description'
                    type='text'
                    placeholderText='Description'
                />
                <InputBox
                    name='rating'
                    type='number'
                    placeholderText='Rating'
                />
                <InputBox
                    name='url'
                    type='text'
                    placeholderText='Url'
                />
                <InputBox
                    name='image'
                    type='text'
                    placeholderText='Upload image'
                />
            </Form>
            {this.props.ui.pending.post &&
                <div>Adding your new recipe..</div>
            }
            {this.props.failure &&
                <div style={{ color: 'orange' }}>{this.props.failure}</div>
            }
            {this.props.error &&
                <div style={{ color: 'red' }}>{this.props.error}</div>
            }
        </Main>
    );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
    error: app.error,
    failure: domain.recipe.failure,
    ui: {
        pending: {
            post: ui.recipe.postPending
        }
    }
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    postRecipe: (form: Recipe) => dispatch(postRecipesRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(NewRecipePage);