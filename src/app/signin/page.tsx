'use client';
import { Checkbox } from '@mui/material'
import styles from './page.module.css'
import { useState, useContext } from 'react'
import { AuthContext } from "@/Contexts/UserContext";
import Link from 'next/link';
import axios from 'axios';

export default function Signin(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { isAuthenticated, Signin } = useContext(AuthContext);
    function handleSignin(ev: Event){
        ev.preventDefault();
        let data = {
            name,
            email,
            password
        }
        Signin(data);
        setEmail('');
        setPassword('');
    }

    function handleShowPassword(){
        
    }

    function discordHandleLogin(){
       /* axios.get('/auth/discord/login', async ctx => {
            const url = 'https://discord.com/oauth2/authorize?client_id=1210918233066971257&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=identify'
        })*/
    }
    return(
        <>
            <div className={styles.container}>
                <div className={styles.formsContainer}>
                    <form className={styles.forms}>
                        <div>
                            <h1 className={styles.header1}>Cadastro</h1>
                        </div>
                        <div className={styles.divInput}>
                            <label>Nome:</label>
                            <input 
                                type="text"
                                className={ styles.Input }
                                placeholder="Insira seu nome"
                                value={name} 
                                onChange={ ev => setName(ev.target.value)}
                            />
                            <label>Email:</label>
                            <input 
                                type="text"
                                className={ styles.Input }
                                placeholder="Insira seu email"
                                value={email} 
                                onChange={ ev => setEmail(ev.target.value)}
                            />
                            <label>Senha:</label>
                                <input 
                                    type={1?'password':'text'}
                                    className={ styles.Input }
                                    value={password}
                                    onChange={ ev => setPassword(ev.target.value)}
                                    placeholder="Insira sua senha"
                                />
                            <span className={styles.loginPhrase}>
                                <p>Já possui uma conta, faça login <Link href={'/login'} className={styles.link}>aqui</Link></p>
                            </span>

                        </div>

                        <div className='flex justify-center'>                    
                            <button onClick={ (Event)=> handleSignin(Event) } className={ styles.sendButton }>Send</button>
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button className='border p-3 rounded-md' onClick={ discordHandleLogin }>Sign with Discord</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}