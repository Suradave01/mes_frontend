import { apiUrl } from "../../config";
import { fetchWrapper } from "../../helpers";

export const authService = {
  signIn,
  signOut,
};

const baseUrl = `${apiUrl}/authentication`;

async function signIn(params: any) {
  const result = await fetchWrapper.post(`${baseUrl}/signIn`, params);
  const accessToken = result.accessToken;
  fetchWrapper.saveToken(accessToken);
  console.log(result.payload);
  console.log(result);

  return result.payload;
}

async function signOut() {
  fetchWrapper.removeToken();
}
