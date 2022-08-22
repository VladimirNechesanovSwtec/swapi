import axios, { AxiosRequestConfig } from 'axios';

export type RequestOptions<TReq> = {
  url?: string;
  path?: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  query?: any;
  body?: TReq;
  noAuth?: boolean;
  headers?: Record<string, string>;
  responseType?: 'json' | 'blob';
};

export type Response<TRes> = {
  status: number;
  error?: string;
  data?: TRes;
};

const API_RESPONSE_TIMEOUT = 60000;

let token = '';
export const setToken = (t: string) => {
  token = t;
};
export function getToken() {
  return token;
}

let onFailedAuthorization: Function | undefined;
export function setOnFailedAuthorizationCallback(f: Function) {
  onFailedAuthorization = f;
}

export async function executeRequest<TReq, TRes>(opt: RequestOptions<TReq>): Promise<Response<TRes>> {
  const config: AxiosRequestConfig = {
    baseURL: opt.url || process.env.REACT_APP_API_KEY,
    url: opt.path,
    method: opt.method || 'get',
    headers: opt.headers || {},
    timeout: API_RESPONSE_TIMEOUT,
    responseType: opt.responseType || 'json',
    params: opt.query,
    data: opt.body,
  };

  if (!opt.noAuth && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await axios(config);

    return {
      status: res.status,
      data: res.data || undefined,
    };
  } catch (error) {
    const res = error.response;

    if (!res) {
      return {
        status: -1,
        error: 'Failed to connect',
      };
    }

    if (res.status === 401 && !opt.noAuth && onFailedAuthorization) {
      onFailedAuthorization();
    }

    return {
      status: res.status,
      error: (res.data && res.data.message) || error.message,
      data: res.data || undefined,
    };
  }
}
