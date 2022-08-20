import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const permissionService = {
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
  return fetchWrapper.get(`${baseUrl}/findAllPermission`);
}

function getAllActive() {
  return fetchWrapper.get(`${baseUrl}/findAllPermissionActive`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOnePermission/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createPermission`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updatePermission/${id}`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStatePermissionActive/${id}`,
    params
  );
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removePermission/${id}`);
}
