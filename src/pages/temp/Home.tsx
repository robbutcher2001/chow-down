import * as React from 'react';

import styled, { css } from 'styled-components';

import Main from '../../components/Main';
import DayCard from '../../components/DayCard';
import MouseScroll from '../../components/MouseScroll';

const FlexContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;

    ${(props: any) =>
    props.primary &&
    css`
        background: palevioletred;
        color: white;
      `};
`

export default () => (
  <Main title='Week Ahead'>
    <FlexContainer>
      <DayCard
        day='Today'
        title='Slow cooker chicken curry'
        // description='Try this easy, one-pot chicken curry thats low-fat, low-calorie and delivers three of your five a day. Its slow-cooked so the meat is beautifully tender'
        rating={4}
        imageUrl='https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/slow-cooker-chicken-curry.jpg'
        imageAlt='fake_alt'
      />
      <DayCard
        day='Tomorrow'
        title='Slow cooker Thai chicken curry'
        // description='Dont slave over a hot stove – our no-fuss Thai chicken curry is quick to prepare, then let your slow cooker do the work. Serve with rice and Thai basil'
        rating={2}
        imageUrl='https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/slow-cooker-thai-curry.jpg'
        imageAlt='fake_alt'
      />
      <MouseScroll />
    </FlexContainer>
  </Main>
);