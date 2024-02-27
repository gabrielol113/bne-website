'use client';
import { AuthContext } from "@/Contexts/UserContext";
import { useRouter } from "next/navigation";
import { useState, useContext } from 'react';

export default function Settings(){
    const router = useRouter();
    const { isAuthenticated, user } = useContext(AuthContext);
    if(isAuthenticated){
        return(
            <div>
                <h1>Settings</h1>
                <form>
                    <label>Name:</label>
<label>Name:</label>
<label>Name:</label>
<label>Name:</label>
                </form>
            </div>
        )
    }else{
        router.push('/')
    }

}