import React, { FunctionComponent } from 'react';

import Main from '../components/Main';
import SettingsLink from '../components/SettingsLink';

const SettingsPage: FunctionComponent = () => (
    <Main title='Settings'>
        <SettingsLink to='/units/new'>
            New unit
        </SettingsLink>
        <SettingsLink to='/ingredients/new'>
            New ingredient
        </SettingsLink>
        <SettingsLink to='/recipes/new'>
            New recipe
        </SettingsLink>
    </Main>
);

export default SettingsPage;