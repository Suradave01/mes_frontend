import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

const baseUrl = `${apiUrl}/camera-management`;

export const cameraService = {
  getAllCamera,
  createCamera,
  getCameraByUser,
  getCameraById,
  updateCamera,
  removeCamera,
};

async function getAllCamera() {
  return fetchWrapper.get(`${baseUrl}/getAllCamera`);
}

async function createCamera(params: any) {
  return fetchWrapper.post(`${baseUrl}/createCamera`, params);
}

async function getCameraByUser(params: any) {
  return fetchWrapper.post(`${baseUrl}/getCameraByUser`, params);
}

async function getCameraById(id: any) {
  return fetchWrapper.get(`${baseUrl}/getCameraById/${id}`);
}

async function updateCamera(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateCamera/${id}`, params);
}

async function removeCamera(id: any) {
  return fetchWrapper.delete(`${baseUrl}/removeCamera/${id}`);
}
