'use client';
import { Checkbox } from '@mui/material'
import styles from './page.module.css'
import { useState, useContext } from 'react'
import { AuthContext } from "@/Contexts/UserContext";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login(){
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { isAuthenticated, Login } = useContext(AuthContext);
    function handleLogin(ev: Event){
        ev.preventDefault();
        let data = {
            email,
            password
        }
        if(Login(data) == false){            
            router.push('/login');
        }        
    }    
    return(
        <>
            <div className={styles.container}>  
                
                <form className={styles.formsContainer}>
                    <div>
                        <h1 className={styles.header6}>Login</h1>
                    </div>
                    <div className={styles.forms}>
                        <label>Email:</label>
                        <input 
                            type="text"
                            className={ styles.Input }
                            placeholder="Insira seu email"
                            name='email'
                            value={email} 
                            onChange={ ev => setEmail(ev.target.value)}
                        />
                        <label>Senha:</label>
                        <div className='flex'>
                            <input 
                                type={showPassword?'text':'password'}
                                className={ styles.Input }
                                value={password}
                                name='password'
                                onChange={ ev => setPassword(ev.target.value)}
                                placeholder="Insira sua senha"
                            />
                        </div>

                        <div className='flex justify-center'>                    
                            <button onClick={ (ev)=> handleLogin(ev) } className={ styles.sendButton }>Send</button>
                        </div>
                        <span>
                            <p className={styles.signinPhrase}>Não possui uma conta, cadastre-se <Link href={'/signin'} className='text-blue'>aqui</Link></p>
                        </span>
                    </div>

                </form>
            </div>
        </>
    )
}