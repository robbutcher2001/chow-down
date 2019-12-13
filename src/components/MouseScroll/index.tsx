import React, { Component } from 'react';
import styled from 'styled-components';

interface OwnState {
    scrollLocation: number
};

const MouseScroll = styled.div`
    width: 100px;
    height: 100px;
    background-color: green;
`

class MouseScrollComponent extends Component<{}, OwnState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            scrollLocation: 0
        };
    }

    onMouseScrollEvent = (event: React.WheelEvent<HTMLDivElement>) => {
        const deltaX: number = event.deltaX;
        this.setState(prevState => ({
            scrollLocation: prevState.scrollLocation + deltaX
        }));
    }

    onTouchMoveEvent = (event: React.TouchEvent<HTMLDivElement>) => {
        console.log(event);
    }

    render = () => {
        return (
            <MouseScroll
                className='mouse-scroll'
                onWheel={this.onMouseScrollEvent}
                onTouchMove={this.onTouchMoveEvent}
                style={{ transform: 'rotate(' + this.state.scrollLocation + 'deg)' }}
            />
        );
    }
};

export default MouseScrollComponent;