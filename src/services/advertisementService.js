import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndPoint = apiUrl + "/advertisements"

export function getAdvertisements() {
    return http.get(apiEndPoint)
}

export function getUserAdvertisements(id) {
    return http.get(apiEndPoint + "/userAdvertisements/" + id);
}

export function getAdvertisementById(id) {
    return http.get(apiEndPoint + "/" + id)
}

export function addAdvertisement(data) {
    return http.post(apiEndPoint, data)
}

export function updateAdvertisement(id, data) {
    return http.put(apiEndPoint + "/" + id, data)
}

export function deleteAdvertisement(id) {
    return http.delete(apiEndPoint + "/" + id)
}