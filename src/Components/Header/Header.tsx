'use client';
import Link from "next/link";
import HeaderIcon from '@/assets/HeaderIcon.png'
import Image from "next/image";
import { AuthContext } from "@/Contexts/UserContext";
import { useContext } from "react";
import Router from "next/router";
import styles from './page.module.css';

export default function Header(){
    const { isAuthenticated, user, Login, Logout } = useContext(AuthContext);

    function handleLogout(){
        Logout();
    }
    function handleLogin(){
        Router.push('/login');
    }
    return(
        <>
            <header className={styles.headerClass}>
                <Link href={'/'} className="flex float-start p-3">
                    <Image 
                        src={HeaderIcon} 
                        width={40}
                        height={40}
                        alt="BNE icon image"
                    />
                </Link>
                {
                    isAuthenticated &&  <div className="p-3">{user.name}</div>
                }
                <div>
                    {
                        isAuthenticated?<button onClick={ ()=> handleLogout() } className="p-3 float-right">Logout</button>:                                                                    
                        !isAuthenticated && <Link href={'/login'}  className="p-3 float-right">Login</Link>
                    }
                    <Link href={'/settings'} className="p-3 float-right">Settings</Link>
                    <Link href={'/'} className="p-3 float-right">Home</Link>
                </div>     
            </header>
        </>
    )
}