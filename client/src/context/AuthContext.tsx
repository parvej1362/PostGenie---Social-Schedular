import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthContextype {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (userData : User, token: string)=> void;
    logout: () => void;
    isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextype | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [user, setUser] =useState<User | null>(null)
    const [token, setToken] =useState<string | null>(null)
    const [isLoading, setIsLoading] =useState(true)

    const normalizeUser = (userData: any): User | null => {
        if (!userData) return null;
        return {
            _id: userData._id || "",
            name: userData.name || userData.anme || "",
            email: userData.email || "",
        };
    };

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        const storedToken= localStorage.getItem("token");

        if(storedUser && storedToken){
            const parsed = JSON.parse(storedUser);
            const normalized = normalizeUser(parsed);
            setUser(normalized);
            setToken(storedToken);
            api.defaults.headers.common["Authorization"]=`Bearer ${storedToken}`;
        }

        setIsLoading(false)
    },[])

    const login= (userData: any, newToken: string)=>{
        const normalized = normalizeUser(userData) || userData;
        setUser(normalized);
        setToken(newToken);
        localStorage.setItem("user", JSON.stringify(normalized));
        localStorage.setItem("token", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    }

    const logout= ()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        delete api.defaults.headers.common["Authorization"];
    }

    return <AuthContext.Provider value={{user, token, isLoading, login, logout, isAuthenticated: !!token}}>
        {children}
        </AuthContext.Provider>
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}