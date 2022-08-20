import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const partitionService = {
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
  return fetchWrapper.get(`${baseUrl}/findAllPartition`);
}

function getAllActive() {
  return fetchWrapper.get(`${baseUrl}/findAllPartitionActive`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOnePartition/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createPartition`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updatePartition/${id}`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStatePartitionActive/${id}`,
    params
  );
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removePartition/${id}`);
}
