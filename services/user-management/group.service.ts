import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const groupService = {
  getAll,
  getAllActive,
  getById,
  create,
  update,
  active,
  delete: _delete,
};

const baseUrl = `${apiUrl}/user-management`;

function getAll() {
  return fetchWrapper.get(`${baseUrl}/findAllGroup`);
}

function getAllActive() {
  return fetchWrapper.get(`${baseUrl}/findAllGroupActive`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneGroup/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createGroup`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateGroup/${id}`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateGroupActive/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeGroup/${id}`);
}
