import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const companyService = {
  getAll,
  getAllActive,
  getById,
  create,
  update,
  active,
  inactive,
  delete: _delete,
};

const baseUrl = `${apiUrl}/company-management`;

function getAll() {
  return fetchWrapper.get(`${baseUrl}/findAllCompany`);
}

function getAllActive() {
  return fetchWrapper.get(`${baseUrl}/findAllCompanyActive`);
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneCompany/${id}`);
}

function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createCompany`, params);
}

function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateCompany/${id}`, params);
}

function active(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateCompanyActive/${id}`,
    params
  );
}

function inactive(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateCompanyInactive/${id}`,
    params
  );
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeCompany/${id}`);
}
