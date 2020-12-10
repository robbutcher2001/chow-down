import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Tag, GetTagsApiRequest, PutTagApiRequest, TagColour } from '../store/domain/tags/types';
import { getTagsRequest, putTagsRequest } from '../store/domain/tags/actions';

import Main from '../components/Main';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import { NegativeBox } from '../components/MessageBox';
import TagGrid from '../components/Tags/TagGrid';
import ColourPicker from '../components/ColourPicker';

interface StateProps {
  error: string,
  failure: string,
  tags: Tag[],
  ui: {
    pending: {
      get: boolean,
      put: boolean
    }
  }
};

interface DispatchProps {
  getTags: () => GetTagsApiRequest,
  putTag: (form: Tag) => PutTagApiRequest
};

interface OwnProps { };

interface OwnState {
  colours: TagColour[]
};

type CombinedProps = StateProps & DispatchProps & OwnProps;

class NewTagPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      colours: [{
        background: '#005ea5',
        text: '#ffffffd4'
      }, {
        background: '#17a2b8',
        text: '#000000d4'
      }, {
        background: '#008672',
        text: '#fff'
      }, {
        background: '#88b04b',
        text: '#fff'
      }, {
        background: '#efc050',
        text: '#000000e0'
      }, {
        background: '#d73a49',
        text: '#fff'
      }, {
        background: '#c3447a',
        text: '#fff'
      }, {
        background: '#d876e3',
        text: '#000'
      }, {
        background: '#ff6f61',
        text: '#000000e0'
      }, {
        background: '#6f42c1',
        text: '#fff'
      }]
    }
  }

  addTag = (form: Tag) => this.props.putTag(form);

  componentDidMount = () => this.props.getTags();

  render = () => (
    <Main title='New tag' >
      {this.props.failure &&
        <NegativeBox message={this.props.failure} />
      }
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <>
          <div className={this.props.ui.pending.put ? 'spinner spinning' : 'spinner'}>
            <Form
              name='tagForm'
              dispatch={this.addTag}
              submitText='Create tag'>
              <InputBox
                name='name'
                type='text'
                label='Tag name'
                validator={(value: string) => value.length > 3}
              />
              <ColourPicker
                name='colours'
                label='Pick a colour scheme'
                tagNameFieldKey='name'
                colours={this.state.colours}
                validator={(value: object) => !!value}
              />
            </Form>
          </div>
          <TagGrid
            isLoading={this.props.ui.pending.get}
            title='Existing tags'
            tags={this.props.tags}
          />
        </>
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, _ownProps: OwnProps): StateProps => ({
  error: app.error.message,
  failure: domain.tag.failure,
  tags: domain.tag.tags,
  ui: {
    pending: {
      get: ui.tag.getPending,
      put: ui.tag.putPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch, _ownProps: OwnProps): DispatchProps => ({
  getTags: () => dispatch(getTagsRequest()),
  putTag: (form: Tag) => dispatch(putTagsRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
  (mapStateToProps, mapDispatchToProps)(NewTagPage);