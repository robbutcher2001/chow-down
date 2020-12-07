import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Tag, GetTagsApiRequest, PutTagApiRequest } from '../store/domain/tags/types';
import { getTagsRequest, putTagsRequest } from '../store/domain/tags/actions';

import Main from '../components/Main';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import { NegativeBox } from '../components/MessageBox';
import TagComponent from '../components/Tags/Tag';
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

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class NewTagPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
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
            <div>
              Preview
              <TagComponent
                $colour='#AB32CB'>
                Preview me
              </TagComponent>
            </div>
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
                colours={[{
                  background: 'red',
                  text: ''
                },{
                  background: 'blue',
                  text: ''
                }]}
                validator={(value: string) => value.length > 3}
              />
              {/* <div>background and text colour picker, displays in preview above</div> */}
              {/* do we need a styled wrapper on this page for fear of creating too many unreusable components? */}
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