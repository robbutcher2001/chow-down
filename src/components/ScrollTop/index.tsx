import React, { Component, ReactElement } from 'react';
//TODO: should we be using withRouter nowadays?
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ScrollTopProps {
  children: ReactElement
};

type CombinedProps = ScrollTopProps & RouteComponentProps<{}>;

class ScrollTop extends Component<CombinedProps> {
  constructor(props: CombinedProps) {
    super(props);
  };

  componentDidUpdate(prevProps: CombinedProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  };

  render = () => (
    this.props.children
  );
};

export default withRouter(ScrollTop);