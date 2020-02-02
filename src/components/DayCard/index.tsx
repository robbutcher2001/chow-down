import React from 'react';

import styled from 'styled-components';

interface DayCardProps {
    day: string,
    title: string,
    description?: string,
    rating: number,
    imageUrl: string,
    imageAlt: string
};

const DayCard = styled.li`
    cursor: pointer;
    padding: 0.5rem;
    margin-bottom: 2rem;
    box-shadow: inset 0 0 0 2px rgba(144, 144, 144, 0.25);
    border: 0;
    border-radius: 0.825rem;

    > h3 {
        font-size: 1.2rem;
        margin: 0;
        padding: 1rem .5rem;
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
    }

    > section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        > figure {
            max-height: 350px;
            max-width: 450px;
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

        > article {
            flex-grow: 2;
            padding: 2rem;

            table {
                width: 100%;

                tbody > tr:nth-child(even) {
                    background-color: rgba(0,0,0,0.05);
                }
            }

            section {
                font-style: italic;
                margin: 1.5rem 0 0 0;
            }
        }
    }
`

export default (props: DayCardProps) => (
    <DayCard>
        <h3>{props.day}</h3>
        <section>
            <figure>
                <img src={props.imageUrl} alt={props.imageAlt}></img>
                <figcaption>
                    <h3>{props.title}</h3>
                </figcaption>
            </figure>
            <article>
                <table>
                    <tbody>
                        <tr>
                            <td>1 large onion</td>
                        </tr>
                        <tr>
                            <td>3 tbsp mild curry paste</td>
                        </tr>
                        <tr>
                            <td>2 tsp vegetable bouillon powder</td>
                        </tr>
                        <tr>
                            <td>400g can chopped tomatoes</td>
                        </tr>
                    </tbody>
                </table>
                <section>{props.description}</section>
            </article>
        </section>
    </DayCard>
);