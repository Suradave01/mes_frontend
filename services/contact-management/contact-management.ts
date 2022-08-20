import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const contactManagement = {
  findAllContact,
  createContact,
  findOneContact,
  updateContact,
  updateStateContactActive,
  updateStateContactInactive,
  removeContact

};

const baseUrl = `${apiUrl}/contact-management`;

function findAllContact() {
  return fetchWrapper.get(`${baseUrl}/findAllContact`);
}
function createContact(params: any) {
  return fetchWrapper.post(`${baseUrl}/createContact`, params);
}
function findOneContact(id: number) {
  return fetchWrapper.get(`${baseUrl}/findOneContact/${id}`);
}
function updateContact(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateContact/${id}`, params);
}
function updateStateContactActive(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateContactActive/${id}`,
    params
  );
}
function updateStateContactInactive(id: any, params: any) {
  return fetchWrapper.patch(
    `${baseUrl}/updateStateContactInactive/${id}`,
    params
  );
}
function removeContact(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeContact/${id}`);
}

