import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, GetRecipesApiRequest } from '../store/domain/recipes/types';
import { Tag, GetTagsApiRequest } from '../store/domain/tags/types';
import { Day, PutDayApiRequest } from '../store/domain/days/types';
import { UserAction } from '../store/app/user/types';
import { getRecipesRequest } from '../store/domain/recipes/actions';
import { getTagsRequest } from '../store/domain/tags/actions';
import { putDayRequest } from '../store/domain/days/actions';
import { clearUserIsSelectingDay } from '../store/app/user/actions';

import Main, { CallToAction } from '../components/Main';
import Search from '../components/Search';
import HorizontalScroller from '../components/HorizontalScroller';
import RecipeGrid from '../components/Recipes/RecipeGrid';
import { NegativeBox } from '../components/MessageBox';
import { TagButton } from '../components/Clickable';

const cta: CallToAction = {
  text: 'New recipe',
  link: '/recipes/new'
};

interface StateProps {
  error: string,
  failures: {
    recipe: string,
    tag: string
  },
  recipes: Recipe[],
  tags: Tag[],
  selectedDay: string,
  ui: {
    pending: {
      gets: {
        recipes: boolean,
        tags: boolean
      },
      posts: {
        recipes: boolean
      },
      puts: {
        tags: boolean
      }
    }
  }
};

interface DispatchProps {
  getRecipes: () => GetRecipesApiRequest,
  getTags: () => GetTagsApiRequest,
  putDay: (day: Day) => PutDayApiRequest,
  clearSelectingDay: () => UserAction
};

interface OwnProps { };

interface OwnState {
  selectedTags: string[];
  searchFilteredRecipes: Recipe[];
  tagFilteredRecipes: Recipe[];
  resultantRecipes: Recipe[];
};

type CombinedProps = StateProps & DispatchProps & OwnProps;

class RecipesPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      selectedTags: [],
      searchFilteredRecipes: [],
      tagFilteredRecipes: [],
      resultantRecipes: []
    };
  }

  componentDidMount = () => {
    !this.props.ui.pending.posts.recipes && this.props.getRecipes()
    !this.props.ui.pending.puts.tags && this.props.getTags()
  };

  componentDidUpdate(prevProps: CombinedProps) {
    if (this.props.ui.pending.gets.recipes !== prevProps.ui.pending.gets.recipes) {
      this.setState({
        searchFilteredRecipes: this.props.recipes,
        tagFilteredRecipes: this.props.recipes,
        resultantRecipes: this.props.recipes
      });
    }
  };

  fakeLoadingTags = () => [0, 1, 2, 3, 4].map(index =>
    <TagButton
      key={index}
      loading={true}>
      Tags loading..
    </TagButton>
  );

  updateSearchFilteredRecipes = (searchFilteredRecipes: Recipe[]) => {
    const resultantRecipes = searchFilteredRecipes.filter(recipe => this.state.tagFilteredRecipes.includes(recipe));
    this.setState({ searchFilteredRecipes, resultantRecipes })
  };

  selectedTags = (newTagId: string) => {
    const selectedTags = this.state.selectedTags.includes(newTagId) ?
      this.state.selectedTags.filter(existingId => existingId !== newTagId) :
      [...this.state.selectedTags, newTagId];

    this.updateTagFilteredRecipes(selectedTags);
  };

  updateTagFilteredRecipes = (selectedTags: string[]) => {
    const tagFilteredRecipes = selectedTags.length > 0 ?
      this.props.recipes.filter(recipe => recipe.tags && selectedTags.every(selectedTag => recipe.tags.map(tag => tag.id).includes(selectedTag))) :
      this.props.recipes;

    const resultantRecipes = tagFilteredRecipes.filter(recipe => this.state.searchFilteredRecipes.includes(recipe));

    this.setState({ selectedTags, tagFilteredRecipes, resultantRecipes })
  };

  componentWillUnmount = () => this.props.clearSelectingDay();

  render = () => (
    <Main title='Your recipes' cta={!this.props.selectedDay ? cta : undefined} >
      {this.props.failures.recipe &&
        <NegativeBox message={this.props.failures.recipe} />
      }
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <>
          <Search
            label='Search'
            searchableItems={this.props.recipes}
            resultsCb={this.updateSearchFilteredRecipes} />
          <HorizontalScroller>
            {this.props.failures.tag ?
              <div>{this.props.failures.tag}</div> :
              this.props.ui.pending.gets.tags ?
                this.fakeLoadingTags() :
                this.props.tags.map(tag =>
                  <TagButton
                    key={tag.id}
                    colour={tag.colours.background}
                    selected={this.state.selectedTags.includes(tag.id)}
                    onClick={() => this.selectedTags(tag.id)}>
                    {tag.name}
                  </TagButton>
                )
            }
          </HorizontalScroller>
          <RecipeGrid
            isLoading={this.props.ui.pending.gets.recipes || this.props.ui.pending.posts.recipes}
            recipes={this.state.resultantRecipes}
            selectedDay={this.props.selectedDay}
            putDay={this.props.putDay}
          />
        </>
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, _ownProps: OwnProps): StateProps => ({
  error: app.error.message,
  failures: {
    recipe: domain.recipe.failure,
    tag: domain.tag.failure
  },
  recipes: domain.recipe.recipes,
  tags: domain.tag.tags,
  selectedDay: app.user.selectedDay,
  ui: {
    pending: {
      gets: {
        recipes: ui.recipe.getPending,
        tags: ui.tag.getPending
      },
      posts: {
        recipes: ui.recipe.postPending
      },
      puts: {
        tags: ui.tag.putPending
      }
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch, _ownProps: OwnProps): DispatchProps => ({
  getRecipes: () => dispatch(getRecipesRequest()),
  getTags: () => dispatch(getTagsRequest()),
  putDay: (day: Day) => dispatch(putDayRequest(day)),
  clearSelectingDay: () => dispatch(clearUserIsSelectingDay())
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
  (mapStateToProps, mapDispatchToProps)(RecipesPage);