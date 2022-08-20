import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const assetService = {
  getAll,
  getAllActive,
  getById,
  create,
  createAssetMappingDevice,
  update,
  updateAssetMappingDevice,
  updateAssetMappingDeviceActive,
  active,
  inactive,
  running,
  warning,
  stop: _stop,
  delete: _delete,
  findOneAsset,
  removeAssetMappingDevice,
};

const baseUrl = `${apiUrl}/asset-management`;

function getAll() {
  return fetchWrapper.get(`${baseUrl}/findAllAsset`);
}

function getAllActive() {
  return fetchWrapper.get(`${baseUrl}/findAllAssetActive`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneAsset/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createAsset`, params);
}

function createAssetMappingDevice(params: any) {
  return fetchWrapper.post(`${baseUrl}/createAssetMappingDevice`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateAsset/${id}`, params);
}

function updateAssetMappingDevice(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateAssetMappingDevice/${id}`,
    params
  );
}

function updateAssetMappingDeviceActive(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateAssetMappingDeviceActive/${id}`,
    params
  );
}

function active(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateAssetActive/${id}`, params);
}

function inactive(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateAssetInactive/${id}`,
    params
  );
}

function running(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateAssetRunning/${id}`, params);
}

function warning(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateAssetWarning/${id}`, params);
}

function _stop(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateStateAssetStop/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeAsset/${id}`);
}

function findOneAsset(id: any) {
  return fetchWrapper.get(`${baseUrl}/findOneAsset/${id}`);
}

function removeAssetMappingDevice(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeAssetMappingDevice/${id}`);
}
