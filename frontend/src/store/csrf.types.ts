export type FetchOptions = {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    body?: string | FormData,
    headers?: {
        'Content-Type'?: string | null,
        'Accept'?: string,
        'X-CSRF-Token'?: string | null
    }
}
