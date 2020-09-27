import { call, put as putSideEffect } from 'redux-saga/effects';

import { unexpectedServerError, unexpectedResponse, clearError } from './app/error/actions';
import { ErrorMessageApiResponse } from './app/error/types';

enum Method {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

enum Headers {
    ACCEPT = 'application/json',
    CONTENT_TYPE = 'application/json; charset=utf-8'
};

interface RequestHeaders {
    [s: string]: string
};

interface ResponseBody {
    data: object
};

//TODO: need to type the return of the callbacks, any is not good
export interface SuccessCallback {
    (json: object, ...passThrough: string[]): any
};

export interface FailCallback {
    (code: number, json: object, ...passThrough: string[]): any
};

//TODO: need to type the response from fetch, any is not good
function* handleResponse(response: any, success: SuccessCallback, failure: FailCallback, ...passThrough: string[]) {
    try {
        if (response.status && response.status >= 200 && response.status <= 504) {
            const json: ResponseBody = {
                data: yield response.json()
            };

            if (response.status < 300) {
                yield* success(json.data, ...passThrough);
            }
            //TODO: does json.data.message actually get parsed in failure reducer? don't know until we return error >=400 && <500
            else if (response.status >= 400 && response.status < 500 || response.status > 500) {
                yield* failure(response.status, json.data, ...passThrough);
            }
            else if (response.status === 500) {
                const error = { ...json.data } as ErrorMessageApiResponse;
                yield putSideEffect(unexpectedServerError(error));
            }
            else {
                throw response;
            }
        }
        else {
            throw response;
        }
    } catch (err) {
        let errorMessage: string = err.statusText ? err.statusText : 'failed with status code ' + err.status;
        if (err.toString().includes('Failed to fetch') ||
            err.toString().includes('Could not connect to the server')) {
            errorMessage = 'remote server is unreachable';
        }

        const error: ErrorMessageApiResponse = {
            message: 'An error has occurred with message: ' +
                (errorMessage ? errorMessage.toLowerCase() : '<no message provided by server>') + '.'
        };

        yield putSideEffect(unexpectedResponse(error));
    }
};

function* doFetch(method: Method, url: string, success: SuccessCallback, failure: FailCallback, payload?: object, ...passThrough: string[]) {
    const headers: RequestHeaders = {
        'Accept': Headers.ACCEPT
    };

    const init: RequestInit = {
        method,
        headers
    };

    if (payload) {
        init.body = JSON.stringify({ ...payload });
        headers['Content-Type'] = Headers.CONTENT_TYPE;
    }

    try {
        yield putSideEffect(clearError());
        yield* handleResponse(
            yield call(fetch, url, init),
            success,
            failure,
            ...passThrough
        );
    } catch (err) {
        yield* handleResponse(
            err,
            success,
            failure,
            ...passThrough
        );
    }
};

export const post = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback,
    payload: object,
    ...passThrough: string[]
) =>
    doFetch(Method.POST, url, successCallback, failCallback, payload, ...passThrough);

export const get = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback,
    ...passThrough: string[]
) =>
    doFetch(Method.GET, url, successCallback, failCallback, null, ...passThrough);

export const put = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback,
    payload: object,
    ...passThrough: string[]
) =>
    doFetch(Method.PUT, url, successCallback, failCallback, payload, ...passThrough);

export const del = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback,
    ...passThrough: string[]
) =>
    doFetch(Method.DELETE, url, successCallback, failCallback, null, ...passThrough);