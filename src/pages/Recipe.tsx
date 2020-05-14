import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import { GlobalState } from '../store';
import { Recipe } from '../store/domain/recipes/types';
import { Day, GetDaysApiRequest, PutDayApiRequest } from '../store/domain/days/types';
import { UserAction } from '../store/app/user/types';
import { getDaysRequest, putDaysRequest } from '../store/domain/days/actions';
import { setUserIsSelectingDay } from '../store/app/user/actions';

import DayComponent from '../components/Day';
import { ZeroMarginedMain } from '../components/Main';
import { ErrorBox } from '../components/MessageBox';

interface StateProps {
  error: string,
  failure: string,
  recipes: Recipe[],
  ui: {
    pending: {
      get: boolean
    }
  }
};

interface DispatchProps { };

interface RecipeUrlParamProps {
  id: string
};

interface OwnState {
  recipe: Recipe
};

type CombinedProps = StateProps & DispatchProps & RouteComponentProps<RecipeUrlParamProps>;

//TODO: maybe even remove margin around picure so it's top is level with Chow Down header
//temp
import styled from 'styled-components';
import Stars from '../components/Stars';
const StyledRecipe = styled.section<{ image: string }>`
  // background-image: linear-gradient(
  //   to top right,
  //   rgba(255, 255, 255, 0.6),
  //   rgba(255, 255, 255, 1) 80%),
  //   url(${props => props.image}
  // );
  // background-image: radial-gradient(
  //   rgba(255, 255, 255, 0.4),
  //   rgba(255, 255, 255, 1) 70%),
  //   url(${props => props.image}
  // );
  background-image: radial-gradient(
    farthest-corner at 35% 55%,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 1) 65%),
    url(${props => props.image}
  );
  // background-image: radial-gradient(farthest-corner at 35% 100%,
  //   #f35 0%, #43e 100%);
  background-size: cover;
  background-position: 75%;
  position: relative;
  min-height: 500px;
  max-width: 500px;

  // &:after {
  //   content: '';
  //   position: absolute;
  //   top: 0; right: 0; bottom: 0; left: 0;
  //   background: linear-gradient(
  //     to bottom,
  //     rgba(255, 255, 255, 0) 90%,
  //     rgba(255, 255, 255, 1)
  //   );
  // }

  > h3 {
    font-size: 1.35rem;
    margin: 0;
    padding: 1rem;
    text-align: right;
  }

  > span {
    float: right;
    box-shadow: 0 4px 30px 2px rgba(0,0,0,0.2);
    border-radius: 50px;
    box-sizing: border-box;
    background: #fff;
    padding: 6px 16px;
    position: absolute;
    right: 10%;
    bottom: 26%;
    z-index: 60;

    > section {
      padding: 0;
    }
  }

  > div {
    min-height: 200px;
    box-shadow: 0 0 12px 2px rgba(0,0,0,0.4);
    border-radius: 8px;
    box-sizing: border-box;
    background: #fff;
    padding: 2rem 1.5rem;
    position: absolute;
    left: 5%; right: 5%;
    bottom: -10%;
    z-index: 50;
  }
`
//end temp

class RecipePage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      recipe: null
    }
  }

  findRecipe = (id: string) => this.props.recipes.find(recipe => recipe.id === id);

  componentDidMount = () => {
    const { id } = this.props.match.params;
    console.log('using id ' + id);
    const recipe: Recipe = this.findRecipe(id);

    if (recipe) {
      this.setState({
        recipe
      });
    }
    else {
      // this.props.getDay(date);
    }
  };

  componentDidUpdate = (_prevProps: CombinedProps, prevState: OwnState) => {
    // const { date } = this.props.match.params;
    // const day: Day = this.findDay(date);

    // if (day && day !== prevState.day) {
    //   this.setState({
    //     day
    //   });
    // }
  };

  render = () => (
    <ZeroMarginedMain>
      {this.props.failure &&
        <ErrorBox message={this.props.failure} />
      }
      {this.props.error ?
        <ErrorBox message={this.props.error} /> :
        this.state.recipe &&
        <StyledRecipe image={this.state.recipe.image} >
          <h3>{this.state.recipe.title}</h3>
          {this.state.recipe.rating > 0 &&
            <span>
              <Stars rating={this.state.recipe.rating} />
            </span>
          }
          <div>{this.state.recipe.description}</div>
        </StyledRecipe>
      }
    </ZeroMarginedMain>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error.message,
  failure: domain.recipe.failure,
  recipes: domain.recipe.recipes,
  ui: {
    pending: {
      get: ui.recipe.getPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, mapDispatchToProps)(RecipePage);