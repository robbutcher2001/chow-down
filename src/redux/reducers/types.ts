export interface Message {
    user: string
    message: string
}

export interface HelloState {
    hello_messages: Message[]
}

export const SAY_HELLO = 'SAY_HELLO'
export const DELETE_HELLO = 'DELETE_HELLO';

interface SayHelloAction {
    type: typeof SAY_HELLO
    rob_payload: Message
}

interface DeleteHelloAction {
    type: typeof DELETE_HELLO
}

export type SayHelloTypes = SayHelloAction | DeleteHelloAction