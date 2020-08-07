import React from 'react';

import styled from 'styled-components';

interface IngredientMarkerProps {
  mark: string
};

const IngredientMarker = styled.li`
  font-size: ${props =>
    props.theme.typography.fontSize.xxlarge
  };
  border-left-style: solid;
  border-left-width: 0.5rem;
  border-left-color: ${props =>
    props.theme.colour.pink
  };
  color: ${props => props.theme.isDark ?
    props.theme.colour.lightestGrey :
    props.theme.colour.black
  };
  margin: 3rem 0.5rem 0.5rem 0.5rem;
  padding: 1rem;
  flex: 0 1 100%;
`

export default (props: IngredientMarkerProps) => (
  <IngredientMarker>
    {props.mark}
  </IngredientMarker>
);