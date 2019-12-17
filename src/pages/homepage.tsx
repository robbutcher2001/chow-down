import * as React from 'react';
import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

import Page from '../components/page';
import Main from '../components/main';
import DayCard from '../components/DayCard';
import MouseScroll from '../components/MouseScroll';

const Button = styled.button`
  background: transparent;
  border-radius: 6px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.5em 1.5em;

  :hover {
    background: lightgray;
    cursor: pointer;
  }

  ${(props: any) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`

const FlexContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
`

export default () => (
  <Page title='Skeleton Test Pages'>
    <div>
      <Link to='/units'>Units Page</Link>
    </div>
    <div>
      <Link to='/ingredients'>Ingredients Page</Link>
    </div>
    <div>
      <Link to='/recipes'>Recipes Page</Link>
    </div>
    <br />
    <Button>Styled button</Button>
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
  </Page>
);