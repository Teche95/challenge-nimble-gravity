import { useEffect, useState } from "react";
import { getCandidateData, getOpenPositions, submitPosition } from "../../services";
import type { PositionsData, UserData } from "../interfaces";

export const usePositions = () => {
    const [positions, setPositions] = useState<PositionsData[]>();
    const [user, setuser] = useState<UserData>();
    const [repoUrls, setRepoUrls] = useState<{ [key: string]: string }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [globalError, setGlobalError] = useState<string>("");
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await getCandidateData();
                setuser(res);
            } catch (err: any) {
                setGlobalError(err.message || "Error al obtener usuario");
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        const getPositions = async () => {
            try {
                const res = await getOpenPositions();
                setPositions(res);
            } catch (err: any) {
                setGlobalError(err.message || "Error al obtener posiciones");
            }
        };
        getPositions();
    }, []);

    const handleSubmit = async (jobId: string) => {
        if (!user || !user.uuid || !user.candidateId || !user.applicationId) return;

        setLoading((prev) => ({ ...prev, [jobId]: true }));

        try {
            await submitPosition({
                uuid: user.uuid,
                candidateId: user.candidateId,
                applicationId: user.applicationId,
                jobId,
                repoUrl: repoUrls[jobId] || "",
            });

            setErrors((prev) => ({ ...prev, [jobId]: "" }));
        } catch (err: any) {
            setErrors((prev) => ({
                ...prev,
                [jobId]: err.message || "Error al enviar",
            }));
        } finally {
            setLoading((prev) => ({ ...prev, [jobId]: false }));
        }
    };
    return {
        positions,
        globalError,
        errors,
        loading,
        handleSubmit,
        setRepoUrls
    };
}