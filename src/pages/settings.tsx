import React, { FunctionComponent } from 'react';

import Page from '../components/page';
import SettingsLink from '../components/SettingsLink';

const SettingsPage: FunctionComponent = () => (
    <Page title='Settings'>
        <SettingsLink to='/units'>
            Edit units
        </SettingsLink>
        <SettingsLink to='/ingredients'>
            Edit ingredients
        </SettingsLink>
    </Page>
);

export default SettingsPage;