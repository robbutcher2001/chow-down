import React, { FunctionComponent } from 'react';

import Main from '../components/Main';
import SettingsLink from '../components/SettingsLink';

const SettingsPage: FunctionComponent = () => (
    <Main title='Settings'>
        <SettingsLink to='/units'>
            Edit units
        </SettingsLink>
        <SettingsLink to='/ingredients'>
            Edit ingredients
        </SettingsLink>
    </Main>
);

export default SettingsPage;