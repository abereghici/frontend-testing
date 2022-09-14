type Config = {
  token?: string;
  data?: Record<string, unknown>;
  headers?: Headers;
};

async function client(
  endpoint: string,
  {data, token, headers: customHeaders, ...customConfig}: Config = {},
) {
  const headers = new Headers(customHeaders);

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  if (data) {
    headers.append('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers,
    ...customConfig,
  };

  const response = await window.fetch(`/${endpoint}`, config);
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    return Promise.reject(responseData);
  }
}

export const savePost = (postData: Record<string, unknown>) =>
  client(`post/${postData.id}`, {data: postData});

export const loadGreeting = (subject: string) =>
  client(`greeting`, {data: {subject}});

export const reportError = (error: Error, info: React.ErrorInfo) =>
  client(`error`, {data: {error, info}});

export const submitForm = (data: Record<string, unknown>) =>
  client(`form`, {data});
