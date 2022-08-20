import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const importService = {
  findAllImportPlanning,
  findAllImportCusData,
  processImportDataPlanning,
  processImportDataCustomer,
  delete: _delete,
};

const baseUrl = `${apiUrl}/import-data`;

function findAllImportPlanning() {
  return fetchWrapper.get(`${baseUrl}/findAllImportPlanning`);
}

function findAllImportCusData() {
  return fetchWrapper.get(`${baseUrl}/findAllImportCusData`);
}

function processImportDataPlanning(id: any, params: any) {
  console.log(params);

  return fetchWrapper.post(
    `${baseUrl}/processImportDataPlanning/${id}`,
    params
  );
}

function processImportDataCustomer(id: any, params: any) {
  console.log(params);

  return fetchWrapper.post(
    `${baseUrl}/processImportDataCustomer/${id}`,
    params
  );
}

function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeImport/${id}`);
}
