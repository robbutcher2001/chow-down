import React, { FunctionComponent } from 'react';

import MessageBox from '../components/MessageBox';
import Page from '../components/page';

const NotFoundPage: FunctionComponent = () => (
    <Page title=''>
        <MessageBox message='Page not found' />
    </Page>
);

export default NotFoundPage;