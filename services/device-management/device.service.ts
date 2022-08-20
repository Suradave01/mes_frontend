import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const deviceService = {
  getAll,
  getAllField,
  getAllActive,
  getById,
  create,
  createField,
  update,
  active,
  inactive,
  activeField,
  delete: _delete,
  deleteField,
  createConditionType,
  findAllConditionType,
  removeConditionType
};

const baseUrl = `${apiUrl}/device-management`;

function getAll() {
  return fetchWrapper.get(`${baseUrl}/findAllDevice`);
}

function getAllField() {
  return fetchWrapper.get(`${baseUrl}/findAllDeviceField`);
}

function getAllActive() {
  return fetchWrapper.get(`${baseUrl}/findAllDeviceActive`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneDevice/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createDevice`, params);
}

function createField(params: any) {
  return fetchWrapper.post(`${baseUrl}/createDeviceField`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateDevice/${id}`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateDeviceActive/${id}`, params);
}

function inactive(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateDeviceInactive/${id}`,
    params
  );
}

function activeField(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateDeviceFieldActive/${id}`,
    params
  );
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeDevice/${id}`);
}

function deleteField(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeDeviceField/${id}`);
}

function createConditionType(params: any) {
  return fetchWrapper.post(`${baseUrl}/createConditionType`, params);
}

function findAllConditionType() {
  return fetchWrapper.get(`${baseUrl}/findAllConditionType`);
}

function removeConditionType(id: any) {
  // console.log(id);
  
  return fetchWrapper.delete(`${baseUrl}/removeConditionType/${id}`);
}
