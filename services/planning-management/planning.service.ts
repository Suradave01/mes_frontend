import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const planningService = {
  prioritizeWorkOrder,
  updateWorkOrderItemType,
  updateWorkOrderItemNextAsset,
  updateWorkOrderItemDetail,
  updateWoItemStart,
  updateWoItemStop,
  updateWoItemResume,
  updateWoItemCancel,
  updateWoItemRetrieve,
  copyWorkOrder,
  getValueSensorSuccess,
  updateWoItemFinish,
  updateDataDeviceField,
};

const baseUrl = `${apiUrl}/production-planning-management`;

function prioritizeWorkOrder(params: any) {
  // console.log("asd");
  console.log(params);

  return fetchWrapper.post(`${baseUrl}/prioritizeWorkOrder`, params);
}

function updateWorkOrderItemType(params: any) {
  const { id, mc_no, typeItem } = params;
  const options = { mc_no, typeItem };

  return fetchWrapper.patch(
    `${baseUrl}/updateWorkOrderItemType/${id}`,
    options
  );
}

function updateWorkOrderItemNextAsset(params: any) {
  const { id, job_no, new_send, old_send } = params;
  const options = { job_no, new_send, old_send };

  return fetchWrapper.patch(
    `${baseUrl}/updateWorkOrderItemNextAsset/${id}`,
    options
  );
}

function updateWorkOrderItemDetail(params: any) {
  const { id } = params;
  const options = params;

  return fetchWrapper.patch(
    `${baseUrl}/updateWorkOrderItemDetail/${id}`,
    options
  );
}

function updateWoItemStart(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateWoItemStart/${id}`, params);
}

function updateWoItemStop(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateWoItemStop/${id}`, params);
}

function updateWoItemResume(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateWoItemResume/${id}`, params);
}

function updateWoItemCancel(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateWoItemCancel/${id}`, params);
}

function updateWoItemRetrieve(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateWoItemRetrieve/${id}`, params);
}

function copyWorkOrder(id: any) {
  return fetchWrapper.patch(`${baseUrl}/copyWorkOrder/${id}`, null);
}

async function updateDataDeviceField() {
  fetchWrapper.get(`${apiUrl}/device-management/updateDataDeviceField`);
}

async function getValueSensorSuccess(id: any) {
  return fetchWrapper.get(`${baseUrl}/getValueSensorSuccess/${id}`);
}

function updateWoItemFinish(id: any, params: any) {
  return fetchWrapper.patch(`${baseUrl}/updateWoItemFinish/${id}`, params);
}
