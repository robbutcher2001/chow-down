import * as React from 'react';

import styled, { css } from 'styled-components';

import { ZeroMarginedMain, CallToAction } from '../components/Main';
import DayCard from '../components/DayCard';
import MouseScroll from '../components/MouseScroll';

const cta: CallToAction = {
  text: 'Get week\'s ingredients',
  link: '/ingredients/week/this'
};

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
  <ZeroMarginedMain
    title='Week Ahead'
    cta={cta}
  >
    <FlexContainer>
      <DayCard
        day='Tonight'
        title='Spanish-style slow-cooked lamb shoulder and beans'
        description='Do something different for a Sunday roast with this Spanish-style slow-cooked lamb and beans. Its so much more than the traditional meat and two veg'
        rating={2}
        imageUrl='/images/recipes/9a250201-4e7c-4f6f-a453-cb790fcdb1c9'
        imageAlt='fake_alt'
      />
      <DayCard
        day='Tomorrow night'
        title='Domino Dauphinoise'
        description='This Dauphinoise makes an impressive addition to the Sunday lunch table. Pile in the cream, potatoes and thyme for a moreish, crispy delight'
        rating={4}
        imageUrl='/images/recipes/6c0b9aa1-5c87-4804-b680-6beb58b9d79a'
        imageAlt='fake_alt'
      />
      <DayCard
        day='Wednesday night'
        title='Overnight oats'
        description='The Slimming World overnight oats recipe is packed full of healthy breakfast goodness! Making overnight oats with yogurt means they’re extra thick and creamy.'
        rating={5}
        imageUrl='/images/recipes/8b4acaed-4296-46c6-8470-2067cf938154'
        imageAlt='fake_alt'
      />
      <DayCard
        day='Thursday night'
        title='Meat feast pasta'
        description='Meaty, filling, packed with flavour – this pasta feast ticks all the boxes!'
        rating={2}
        imageUrl='/images/recipes/dd7a20ec-5404-4c9c-8124-4b23aff03a07'
        imageAlt='fake_alt'
      />
      <DayCard
        day='Friday night'
        title='Fully loaded wedges'
        description='Dirty fries just got Food Optimised! The whole family will love these crispy spuds smothered in a tangy chicken-and-tomato topping...'
        rating={1}
        imageUrl='/images/recipes/d8f80b01-b25a-435f-ac18-27448ee3e8d5'
        imageAlt='fake_alt'
      />
      <DayCard
        day='Saturday night'
        title='Hot dogs'
        description='Our not-so-humble hot dog piled high with onions makes the ultimate quick and tasty treat. Using Slimming World sausages is an easy way to save Syns.'
        rating={5}
        imageUrl='/images/recipes/2e2b5324-3343-47e8-b5f1-f37a645e0a36'
        imageAlt='fake_alt'
      />
      <DayCard
        day='Sunday night'
        title='Best steak marinade'
        description='The only Steak Marinade recipe you’ll ever need! It’s deliciously robust and the perfect flavor pairing to rich beefy steaks. It’s incredibly easy to make and uses staple ingredients you likely already have on hand. Definitely a must have recipe!'
        rating={4}
        imageUrl='/images/recipes/e3ccf788-ed6c-4578-8771-3c8af9711bf0'
        imageAlt='fake_alt'
      />
      {/* <MouseScroll /> */}
    </FlexContainer>
  </ZeroMarginedMain>
);