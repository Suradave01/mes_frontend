import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const userService = {
  getAll,
  getById,
  create,
  update,
  active,
  inactive,
  delete: _delete,
  signIn
};

const baseUrl = `${apiUrl}/user-management`;

function getAll() {
  return fetchWrapper.get(`${baseUrl}/findAllUser`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneUser/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createUser`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateUser/${id}`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateUserActive/${id}`, params);
}

function inactive(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateUserInactive/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeUser/${id}`);
}
function signIn(params: any) {
  return fetchWrapper.post(`${baseUrl}/signIn`, params);
}
