import React, { Component } from 'react';
import styled from 'styled-components';

interface OwnState {
    scrollLocation: number
};

const MouseScroll = styled.div`
    width: 100px;
    height: 100px;
    background-color: cadetblue;
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
            scrollLocation: prevState.scrollLocation + deltaX * -1
        }));
    }

    onTouchMoveEvent = (event: React.TouchEvent<HTMLDivElement>) => {
        const clientX = event.changedTouches[0] ? event.changedTouches[0].clientX : 0;
        this.setState({
            scrollLocation: clientX
        });

        if (window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
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