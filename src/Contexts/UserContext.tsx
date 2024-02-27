'use client';
import { userInfo } from "os";
import { ReactNode, useState } from "react";
import { createContext } from "react";
import {db} from '@/app/api/firebaseConfig';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import  {v4 as uuid}  from 'uuid';
import Router from "next/router";
import Toastify from 'toastify-js';


type userInfo = {
    name?: string;
    email: string;
    password?: string;
    token?: string;
    isDonator?: boolean;
}

type MyContextProps = {
 isAuthenticated: boolean;
 user: userInfo;
 Login: (data :userInfo)=> boolean;
 Signin: (data :userInfo)=> void;
 Logout: ()=> void;
}


type MyProviderProps = {
    children: ReactNode;
};
export const AuthContext = createContext({} as MyContextProps);

export default function AuthContextProvider({children}: MyProviderProps){
    const [user, setUser] = useState({});    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    async function Login(data: userInfo){
        const user = await checkUserOnDB(data.email);
        if(data.password !== user.password){            
            return false;
        }
        if(!!user){
            setUser(user);
            setIsAuthenticated(true);              
            const token = uuid();
            setCookie(undefined, '@bnewebsite.token', user.email +'-'+token,{
            maxAge: 60*60*24*30, // 1 mês
            path: '/'
        });
            Toastify({
                text: "Logado com sucesso!",
                offset: {
                    x:50,
                    y:10
                },
            }).showToast();
            router.push('/')
            return true;
        }else {
            console.log("Usuário não existe!");
            return false;
        }
    }
    async function getUserInfo(data: userInfo){
        const usersRef = collection(db,'users');
        const docRef = doc(db, 'users', data.email);
        const docSnap = await getDoc(docRef);
    }
    function Logout(){
        setUser({});   
        
        alert('Deslogado!');
        setIsAuthenticated(false);

    }
    async function GetCookies(){        
        const { '@bnewebsite.token': token } = parseCookies();
        if(token){
            const email = token.split('-').toString();
            getUserInfo({email})
        }
    }

    async function checkUserOnDB(email: string){
            const usersRef = collection(db,'users');
            const docRef = doc(db, 'users', email);
            const docSnap = await getDoc(docRef);
            const dados = docSnap.data();
            if(docSnap.exists()){
                return dados;
            }else{
                return false;
            }
    }   

    async function Signin(data: userInfo) {
        if(data !=null){
            if(data.name === ''){
                alert("Preencha o campo de nome");
                return;
            }
            if(data.email === ''){
                alert("Preencha o campo de email");
                return;
            }
            if(data.password === ''){
                alert("Preencha o campo de senha");
                return;
            }
            if(await checkUserOnDB(data.email)){
                alert('Email já utilizado!');
                return;
            }else{
                const token = uuid();
                await setDoc(doc(db,'users', data.email),{
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    token: token
                })
                alert('Cadastro realizado com sucesso!');
                Login(data);
            }
        }
    }
    return(
        <AuthContext.Provider value={{user, isAuthenticated, Login, Logout, Signin}}>
            {children}
        </AuthContext.Provider>
    )
}