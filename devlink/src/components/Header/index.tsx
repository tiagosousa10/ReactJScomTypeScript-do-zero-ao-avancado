import {BiLogOut} from 'react-icons/bi'
import {Link} from 'react-router-dom'

import {signOut} from 'firebase/auth'
import {auth} from '../../services/firebaseConnection'

export function Header(){

  async function handleLogout(){
     await signOut(auth)
    }

    return(
        <header className='w-full mt-4'>
           <nav className='w-full bg-white h-14 flex items-center justify-between rounded-lg px-4 shadow-md'>
            <div className='flex gap-6 font-medium'>
                <Link to={"/"} className="text-gray-700 hover:text-teal-500 transition-colors">Home</Link>
                <Link to={"/admin"} className="text-gray-700 hover:text-teal-500 transition-colors">Links</Link>
                <Link to={"/admin/social"} className="text-gray-700 hover:text-teal-500 transition-colors">Redes Sociais</Link>
            </div>

            <button onClick={handleLogout} className="hover:opacity-80 transition-opacity">
                <BiLogOut  size={28} color='#db2629' />
            </button>
           </nav>
        </header>
    )
}
