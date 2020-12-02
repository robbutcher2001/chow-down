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
  failure: string,
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

  updateSearchFilteredRecipes = (searchFilteredRecipes: Recipe[]) => {
    const resultantRecipes = searchFilteredRecipes.filter(recipe => this.state.tagFilteredRecipes.includes(recipe));
    this.setState({ searchFilteredRecipes, resultantRecipes })
  };

  updateTagFilteredRecipes = (newId: string) => {
    const selectedTags = this.state.selectedTags.includes(newId) ?
      this.state.selectedTags.filter(existingId => existingId !== newId) :
      [...this.state.selectedTags, newId];

    const tagFilteredRecipes = this.props.recipes.filter(recipe =>
      selectedTags.length === 0 ||
      selectedTags.filter(selectedTag => recipe.tags &&
        recipe.tags.map(tag => tag.id).includes(selectedTag)).length === selectedTags.length);
    const resultantRecipes = tagFilteredRecipes.filter(recipe => this.state.searchFilteredRecipes.includes(recipe));
    // const resultantRecipes = tagFilteredRecipes.filter(recipe => this.state.searchFilteredRecipes.includes(recipe));
    this.setState({ selectedTags, tagFilteredRecipes, resultantRecipes })
  };

  handleTagClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    console.log(currentTarget.dataset.tag);
  };

  componentWillUnmount = () => this.props.clearSelectingDay();

  render = () => (
    <Main title='Your recipes' cta={!this.props.selectedDay ? cta : undefined} >
      {this.props.failure &&
        <NegativeBox message={this.props.failure} />
      }
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <>
          <Search
            label='Search'
            searchableItems={this.props.recipes}
            resultsCb={this.updateSearchFilteredRecipes} />
          <HorizontalScroller>
            {this.props.tags.map(tag =>
              <TagButton
                key={tag.id}
                dataTag={tag.id}
                dataSelected={this.state.selectedTags.includes(tag.id)}
                $colour={tag.colours.background}
                onClick={() => this.updateTagFilteredRecipes(tag.id)}>
                {tag.name}
              </TagButton>
            )}
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
  failure: domain.recipe.failure,
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