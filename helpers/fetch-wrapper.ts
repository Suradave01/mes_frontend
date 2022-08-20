export const fetchWrapper = {
  get,
  post,
  patch,
  delete: _delete,
  accessToken,
  saveToken,
  loadToken,
  removeToken,
};

function get(url: RequestInfo) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: RequestInfo, body: any) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function patch(url: RequestInfo, body: any) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: RequestInfo) {
  const requestOptions = {
    method: "DELETE",
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response: {
  text: () => Promise<any>;
  ok: any;
  statusText: any;
}) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function accessToken(this: any) {
  return this._accessToken ? this._accessToken : this.loadToken();
}

function saveToken(this: any, accessToken: any) {
  this._accessToken = accessToken;
  return localStorage.setItem("accessToken", accessToken);
}

function loadToken(this: any) {
  const token = localStorage.getItem("accessToken");
  this._accessToken = token;
  return token;
}

function removeToken() {
  localStorage.removeItem("accessToken");
}
