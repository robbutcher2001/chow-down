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
        background: '#d73a49',
        text: '#fff'
      }, {
        background: '#009688',
        text: '#fff'
      }, {
        background: '#ca4a6c',
        text: '#fff'
      }, {
        background: '#005ea5',
        text: '#fff'
      }, {
        background: '#6f42c1',
        text: '#fff'
      }, {
        background: '#17a2b8',
        text: '#000'
      }, {
        background: '#912b88',
        text: '#fff'
      }, {
        background: '#34568b',
        text: '#fff'
      }, {
        background: '#ff6f61',
        text: '#000'
      }, {
        background: '#6b5b95',
        text: '#fff'
      }, {
        background: '#88b04b',
        text: '#fff'
      }, {
        background: '#92a8d1',
        text: '#fff'
      }, {
        background: '#955251',
        text: '#fff'
      }, {
        background: '#b565a7',
        text: '#fff'
      }, {
        background: '#009b77',
        text: '#fff'
      }, {
        background: '#dd4124',
        text: '#fff'
      }, {
        background: '#d65076',
        text: '#fff'
      }, {
        background: '#45b8ac',
        text: '#fff'
      }, {
        background: '#efc050',
        text: '#000'
      }, {
        background: '#5b5ea6',
        text: '#fff'
      }, {
        background: '#9b2335',
        text: '#fff'
      }, {
        background: '#55b4b0',
        text: '#fff'
      }, {
        background: '#e15d44',
        text: '#fff'
      }, {
        background: '#bc243c',
        text: '#fff'
      }, {
        background: '#c3447a',
        text: '#fff'
      }, {
        background: '#98b4d4',
        text: '#000'
      }, {
        background: '#D73A4A',
        text: '#fff'
      }, {
        background: '#0366D6',
        text: '#fff'
      }, {
        background: '#0075CA',
        text: '#fff'
      }, {
        background: '#CFD3D7',
        text: '#000'
      }, {
        background: '#A2EEEF',
        text: '#000'
      }, {
        background: '#7057FF',
        text: '#fff'
      }, {
        background: '#008672',
        text: '#fff'
      }, {
        background: '#E4E669',
        text: '#000'
      }, {
        background: '#D876E3',
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