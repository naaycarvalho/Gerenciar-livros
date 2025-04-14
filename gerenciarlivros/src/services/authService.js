import { fetchBase } from "../api/api";


export const login = async (credentials) => {
    try {
        const data = await fetchBase('/autenticacao/login', {
            method: 'POST', 
            body: JSON.stringify(credentials),
        });

        localStorage.setItem("token", data.token);

        return data;

    } catch (error) {
        throw new Error(error.message);
    }

}
