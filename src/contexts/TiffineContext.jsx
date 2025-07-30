import { Children, createContext, useContext, useEffect, useState } from "react";

import API from "../axios/api";

import { useAuth } from "./AuthContext";

const TiffinContext = createContext();

export const TiffinProvider = ({ children }) => {
    const { user } = useAuth()
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    const authHeader = {
        headers: {
            Authorization: `Bearer ${user?.token}`
        }
    }

    const fetechClients = async () => {
        setLoading(true)

        try {
            const res = await API.get('/clients', authHeader)
            setClients(res.data)
        }
        catch (error) {
            console.error("Error in fetching clients: ", error.message)
        }
        finally {
            setLoading(false)
        }
    }

    const addClient = async (data) => {
        try {
            const res = await API.post('/clients', data, authHeader)
            setClients(prev => [...prev, res.data])
        } catch (error) {
            console.error('Error in adding client', error.message)
        }
    }


    useEffect(() => {
        if (user) fetechClients()
    }, [user])

    return (
        <TiffinContext.Provider
            value={{ clients, setClients, addClient, fetechClients, loading }}
        >
            {children}
        </TiffinContext.Provider>
    )

}

export const useTiffin = () => useContext(TiffinContext)