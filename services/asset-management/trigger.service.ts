import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const triggerService = {
  create,
  active,
  inactive,
  getAll,
  update,
  delete: _delete,
  getById,
};

const baseUrl = `${apiUrl}/asset-management`;

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createTrigger`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateTriggerActive/${id}`,
    params
  );
}

function inactive(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateTriggerInactive/${id}`,
    params
  );
}

function getAll() {
  return fetchWrapper.get(`${baseUrl}/findAllTrigger`);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateTrigger/${id}`, params);
}

function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeTrigger/${id}`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneTrigger/${id}`);
}
