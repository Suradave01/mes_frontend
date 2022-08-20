import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const ChannelService = {
  findAllChannel,
};

const baseUrl = `${apiUrl}/alarm-management`;

function findAllChannel() {
  return fetchWrapper.get(`${baseUrl}/findAllChannel`);
}