import { FetchOptions } from "./csrf.types";

export const restoreCSRF = async () => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    return res;
} 

export const storeCSRFToken = (response: Response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if(csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

const csrfFetch = async (url:string, options: FetchOptions = {}):Promise<Response> => {
    options.method ||= 'GET';
    options.headers ||= {};
    
    if(options.method.toUpperCase() !== 'GET') {
        if(('Content-Type' in options.headers) && !options.headers['Content-Type']) {
            delete options.headers['Content-Type'];
        } else {
            options.headers['Content-Type'] = 'application/json';
        }
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options as RequestInit);

    if(res.status >= 400) throw res;

    return res;
}
export default csrfFetch;