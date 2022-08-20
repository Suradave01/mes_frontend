import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const roleService = {
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
  return fetchWrapper.get(`${baseUrl}/findAllRole`);
}

function getAllActive() {
  return fetchWrapper.get(`${baseUrl}/findAllRoleActive`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneRole/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createRole`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateRole/${id}`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateRoleActive/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeRole/${id}`);
}
