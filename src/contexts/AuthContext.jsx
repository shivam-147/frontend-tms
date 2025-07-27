import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

    const login = (data) => {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
    }

    const register = (data) => {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)