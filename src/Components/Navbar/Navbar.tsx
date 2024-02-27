import Link from "next/link";
import styles from './styles.module.css'
export default function Navbar(){
    return(
        <nav className='h-screen pr-4 pt-8 pb-4 flex justify-between flex-col'>
            <ul className={ styles.unorderl }>
                <li className={ styles.list }><Link href={'/'}>Dashboard</Link></li>
                <li className={ styles.list }><Link href={'/historic'}>Matches</Link></li>
                <li className={ styles.list }><Link href={'/status'}>Status</Link></li>
                <li className={ styles.list }><Link href={'/maps'}>Maps</Link></li>
            </ul>
        </nav>
    )
}