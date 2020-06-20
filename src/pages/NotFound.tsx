import React, { FunctionComponent } from 'react';

import Main from '../components/Main';
import { NegativeBox } from '../components/MessageBox';

const NotFoundPage: FunctionComponent = () => (
    <Main>
        <NegativeBox message='Page not found' />
    </Main>
);

export default NotFoundPage;