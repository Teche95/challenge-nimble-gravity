import axios from "axios";
import type { ApplyBody, ApplyResponse, PositionsData, UserData } from "../modules/interfaces";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/"

export const getCandidateData = async (): Promise<UserData> => {
    try {
        const response = await axios.get<UserData>(`${BASE_URL}api/candidate/get-by-email?email=julian.techeira9@gmail.com`)
        return response.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API error:", error.response?.data);
            throw new Error(
                error.response?.data?.error || "Error al obtener el candidato"
            );
        }
        console.error("Unexpected error:", error);
        throw new Error("Error inesperado");
    }
}

export const getOpenPositions = async (): Promise<PositionsData[]> => {
    try {
        const response = await axios.get<PositionsData[]>(`${BASE_URL}/api/jobs/get-list`)
        return response.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API error:", error.response?.data);
            throw new Error(
                error.response?.data?.error || "Error al obtener posiciones"
            );
        }
        console.error("Unexpected error:", error);
        throw new Error("Error inesperado");
    }
}

export const submitPosition = async (body: ApplyBody): Promise<ApplyResponse> => {
    try {
        const response = await axios.post<ApplyResponse>(`${BASE_URL}/api/candidate/apply-to-job`, body)
        return response.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data.error || error.response?.data.message || "Error del servidor"

            throw new Error(message)
        }
        throw new Error("Error desconocido")
    }
}

