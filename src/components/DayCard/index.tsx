import React from 'react';

import styled from 'styled-components';

interface DayCardProps {
    day: string,
    title: string,
    rating: number,
    imageUrl: string,
    imageAlt: string
};

const DayCard = styled.li`
    cursor: pointer;
    margin-bottom: 2rem;

    > h3 {
        font-size: 1.2rem;
        margin: 0;
        padding: 1rem .5rem;
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
        background-color: rgba(0,0,0,0.05);
    }

    > figure {
        max-height: 350px;
        overflow: hidden;
        margin: 0;
        position: relative;

        > img {
            width: 100%;
        }

        > figcaption {
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, .7);
            width: 100%;

            > h3 {
                color: white;
                padding: 1.5rem .5rem;
                margin: 0;
            }
        }
    }
`

export default (props: DayCardProps) => (
    <DayCard>
        <h3>{props.day}</h3>
        <figure>
            <img src={props.imageUrl} alt={props.imageAlt}></img>
            <figcaption>
                <h3>{props.title}</h3>
            </figcaption>
        </figure>
    </DayCard>
);