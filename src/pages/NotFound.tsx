import React, { FunctionComponent } from 'react';

import Main from '../components/Main';
import { ErrorBox } from '../components/MessageBox';

const NotFoundPage: FunctionComponent = () => (
    <Main>
        <ErrorBox message='Page not found' />
    </Main>
);

export default NotFoundPage;