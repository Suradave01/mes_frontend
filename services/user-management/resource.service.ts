import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const resourceService = {
  getAll,
  getAllActive,
  getById,
  create,
  update,
  active,
  delete: _delete,
  getAllMenu,
  getAllEntity,
};

const baseUrl = `${apiUrl}/user-management`;

function getAll() {
  return fetchWrapper.get(`${baseUrl}/findAllResource`);
}

function getAllMenu() {
  return fetchWrapper.get(`${baseUrl}/findAllResourceMenu`);
}

function getAllEntity() {
  return fetchWrapper.get(`${baseUrl}/findAllResourceEntity`);
}

function getAllActive() {
  return fetchWrapper.get(`${baseUrl}/findAllResourceActive`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneResource/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createResource`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateResource/${id}`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateResourceActive/${id}`,
    params
  );
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeResource/${id}`);
}
