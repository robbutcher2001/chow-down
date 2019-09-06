import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { IngredientsState, GetIngredientsApiRequest } from '../store/domain/ingredients/types';
import { getIngredientsRequest } from '../store/domain/ingredients/actions';

// import Form from '../components/form';
// import InputBox from '../components/input-box';

// interface StateProps {
//     ingredients: number
// };

interface DispatchProps {
    getIngredients: () => GetIngredientsApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = IngredientsState & DispatchProps & OwnProps;

class IngredientsPage extends Component<CombinedProps, OwnState> {
    requestIngredients = () => this.props.getIngredients();

    componentDidMount = () => this.props.getIngredients();
    
    render = () => {
        console.log(this.props.error);
        return (
            <div>
                <h4>List ingredients</h4>
                <button onClick={this.requestIngredients}>
                    Refresh ingredients
                </button>
                <ul>
                    {this.props.ingredients.map((ingredient, index) =>
                        <li key={index}>{ingredient.name}</li>
                    )}
                </ul>
            </div>
        );
    }
};

const mapStateToProps = ({ domain }: GlobalState, ownProps: OwnProps): IngredientsState => ({
    error: domain.ingredient.error,
    ingredients: domain.ingredient.ingredients
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    getIngredients: () => dispatch(getIngredientsRequest())
});

export default connect<IngredientsState, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(IngredientsPage);