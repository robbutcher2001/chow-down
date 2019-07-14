import * as React from 'react';

export interface HelloProps { name: string; author: string; }

export const Hello = (props: HelloProps) => <h1>Hello from {props.name} and {props.author}</h1>