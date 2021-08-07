import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndPoint = apiUrl + "/users"

export function signup(data) {
    return http.post(apiEndPoint, data);
}