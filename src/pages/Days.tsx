import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import styled, { css } from 'styled-components';

import { ZeroMarginedMain, CallToAction } from '../components/Main';
import DayCard from '../components/DayCard';
import MouseScroll from '../components/MouseScroll';
import { GlobalState } from '../store';

const cta: CallToAction = {
  text: 'Get week\'s ingredients',
  link: '/ingredients/week/this'
};

const FlexContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

    ${(props: any) =>
    props.primary &&
    css`
        // background: palevioletred;
        // color: white;
    `};
`

interface StateProps {
  ui: {
    pending: {
      get: boolean
    }
  }
};

interface DispatchProps {
  getDays: () => void
};

type CombinedProps = StateProps & DispatchProps;

const Days: FunctionComponent<CombinedProps> = (props: CombinedProps) => {

  useEffect(() => console.log(props));

  return (
    <ZeroMarginedMain
      title='Week Ahead'
    // cta={cta}
    >
      <FlexContainer>
        <DayCard
          day='Tonight'
          title='Spanish-style slow-cooked lamb shoulder and beans'
          description='Do something different for a Sunday roast with this Spanish-style slow-cooked lamb and beans. Its so much more than the traditional meat and two veg'
          rating={2}
          imageUrl='https://test.chowdown.recipes/images/recipes/8ec65ebf-3110-4c00-824a-cbf65e56c651'
          imageAlt='fake_alt'
        />
        <DayCard
          day='Tomorrow'
          title='Domino Dauphinoise'
          description='This Dauphinoise makes an impressive addition to the Sunday lunch table. Pile in the cream, potatoes and thyme for a moreish, crispy delight'
          rating={4}
          imageUrl='https://test.chowdown.recipes/images/recipes/e2dcb809-e833-42fd-a4ca-71246be1f278'
          imageAlt='fake_alt'
        />
        <DayCard
          day='Wednesday'
          title='Overnight oats'
          description='The Slimming World overnight oats recipe is packed full of healthy breakfast goodness! Making overnight oats with yogurt means they’re extra thick and creamy.'
          rating={5}
          imageUrl='https://test.chowdown.recipes/images/recipes/8ec65ebf-3110-4c00-824a-cbf65e56c651'
          imageAlt='fake_alt'
          dayNotSet
        />
        <DayCard
          day='Thursday'
          title='Meat feast pasta'
          description='Meaty, filling, packed with flavour – this pasta feast ticks all the boxes!'
          rating={2}
          imageUrl='https://test.chowdown.recipes/images/recipes/e2dcb809-e833-42fd-a4ca-71246be1f278'
          imageAlt='fake_alt'
        />
        <DayCard
          day='Friday'
          title='Fully loaded wedges'
          description='Dirty fries just got Food Optimised! The whole family will love these crispy spuds smothered in a tangy chicken-and-tomato topping...'
          rating={1}
          imageUrl='https://test.chowdown.recipes/images/recipes/8ec65ebf-3110-4c00-824a-cbf65e56c651'
          imageAlt='fake_alt'
        />
        <DayCard
          day='Saturday'
          title='Hot dogs'
          description='Our not-so-humble hot dog piled high with onions makes the ultimate quick and tasty treat. Using Slimming World sausages is an easy way to save Syns.'
          rating={5}
          imageUrl='https://test.chowdown.recipes/images/recipes/e2dcb809-e833-42fd-a4ca-71246be1f278'
          imageAlt='fake_alt'
          dayNotSet
        />
        <DayCard
          day='Sunday'
          title='Best steak marinade'
          description='The only Steak Marinade recipe you’ll ever need! It’s deliciously robust and the perfect flavor pairing to rich beefy steaks. It’s incredibly easy to make and uses staple ingredients you likely already have on hand. Definitely a must have recipe!'
          rating={4}
          imageUrl='https://test.chowdown.recipes/images/recipes/8ec65ebf-3110-4c00-824a-cbf65e56c651'
          imageAlt='fake_alt'
        />
        {/* <MouseScroll /> */}
      </FlexContainer>
    </ZeroMarginedMain>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  ui: {
    pending: {
      get: ui.recipe.getPending
    }
  }
});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, null)(Days);