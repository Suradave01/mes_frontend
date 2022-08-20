import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const wipService = {
  findAllWip,
  create,
  getById,
  update
};

const baseUrl = `${apiUrl}/production-planning-management`;

function findAllWip() {
  return fetchWrapper.get(`${baseUrl}/findAllWip`);
}
function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createWip`, params);
}
function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneWip/${id}`);
}
function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateWip/${id}`, params);
}