import { call } from 'redux-saga/effects';

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
}

//TODO: need to type the return of the callbacks, any is not good
export interface SuccessCallback {
    (json: object): any
}

export interface FailCallback {
    (reason: string): any
}

function* doFetch(method: Method, url: string, success: SuccessCallback, failure: FailCallback, payload?: object) {
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
        const response = yield call(fetch, url, init);
        if (response.status === 200) {
            const json = yield response.json();
            yield* success(json);
        }
        else {
            throw response;
        }
    } catch (err) {
        yield* failure(err.message);
    }
}

export const post = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback,
    payload: object
) =>
    doFetch(Method.POST, url, successCallback, failCallback, payload);

export const get = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback
) =>
    doFetch(Method.GET, url, successCallback, failCallback);

export const put = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback,
    payload: object
) =>
    doFetch(Method.PUT, url, successCallback, failCallback, payload);

export const del = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback
) =>
    doFetch(Method.DELETE, url, successCallback, failCallback);