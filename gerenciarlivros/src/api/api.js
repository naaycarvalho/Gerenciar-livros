const baseURl = 'http://localhost:3000';

export const fetchBase = async (endpoint, options = {}) => {
    const response = await fetch(`${baseURl}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    });

    if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.mensagem || 'Erro na requisição');
    }
    
    return response.json();
};

export const fetchWithAuth = async (endpoint, options = {}) => {
    
    const token = localStorage.getItem('token');
    console.log(token);
  

    const response = await fetch(`${baseURl}${endpoint}`, { 
        headers: {
            
            'Content-Type': 'application/json',
            Authorization: ` ${token}`, 
            ...options.headers
        },
        ...options
    });

    if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.mensagem || 'Erro na requisição');
    }
    
    return response.json();
};