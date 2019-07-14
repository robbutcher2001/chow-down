import * as React from 'react';
import { Link } from 'react-router-dom';

import { Hello } from './Hello';

export default () => (
    <div>
        <h1>Skeleton Test Pages</h1>
        <div>
            <Link to='/units'>Units Page</Link>
        </div>
        <div>
            <Link to='/ingredients'>Ingredients Page</Link>
        </div>
        <div>
            <Link to='/recipes'>Recipes Page</Link>
        </div>
        <Hello name='Rob' author='Butcher2' />
    </div>
);