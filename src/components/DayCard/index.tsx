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
    margin-bottom: 2rem;

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

            > span {
              position: absolute;
              border-left: 120px solid transparent;
              border-right: 120px solid transparent;
              border-bottom: 120px solid rgb(74, 202, 168);
              transform: rotate(-45deg);
              left: -82px;
              top: -22px;
            }

            > h3 {
              position: absolute;
              font-size: 1.2rem;
              width: 120px;
              height: 50px;
              text-align: center;
              margin: 0;
              color: white;
              transform: rotate(-45deg);
              top: 38px;
            }

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
    <section>
      <figure>
        <span />
        <h3>{props.day}</h3>
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