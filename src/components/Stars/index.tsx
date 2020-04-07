import React, { ReactNode } from 'react';

import styled from 'styled-components';

interface StarsProps {
  rating: number
};

const Stars = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 1.2rem;
  padding: 0.5rem;

  > mark {
    color: #4acaa8;
    background-color: rgba(0, 0, 0, 0);
  }
`

// TODO: convert to Unicode stars and use CSS custom var (--rating) to colour: https://css-tricks.com/five-methods-for-five-star-ratings/
export default (props: StarsProps) => (
  <Stars>
    {function () {
      const rating: ReactNode[] = [];
      for (let i = 0; i < props.rating; i++) {
        rating.push(<mark key={i} >&#9733;</mark>);
      }
      return rating;
    }()}
  </Stars>
);