import React, { FunctionComponent } from 'react';

import Main from '../components/page';
import MessageBox from '../components/MessageBox';

const NotFoundPage: FunctionComponent = () => (
    <Main>
        <MessageBox message='Page not found' />
    </Main>
);

export default NotFoundPage;