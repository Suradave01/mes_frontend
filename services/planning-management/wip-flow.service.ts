import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const wipFlowService = {
  findAllWipFlow,
  create,
  getById,
  update
};

const baseUrl = `${apiUrl}/production-planning-management`;

function findAllWipFlow() {
  return fetchWrapper.get(`${baseUrl}/findAllWipFlow`);
}
function create(params: any) {
  return fetchWrapper.post(`${baseUrl}/createWipFlow`, params);
}
function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneWipFlow/${id}`);
}
function update(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateWipFlow/${id}`, params);
}