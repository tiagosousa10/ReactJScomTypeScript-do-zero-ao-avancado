import {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.svg'
import { FiUser, FiLogIn } from 'react-icons/fi'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu'
import { Button } from '../ui/button'

export function Header(){
    const {signed,loadingAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    return(
        <div className='w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4 sticky top-0 z-50'>
            <header className='flex w-full items-center max-w-7xl justify-between px-4 md:px-6 mx-auto'>
                <Link to={'/'} className='flex items-center'>
                    <img src={logoImg} alt="logoSite" className='h-8 md:h-10' />
                </Link>

                <NavigationMenu className='hidden md:flex'>
                    <NavigationMenuList className='gap-2'>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to={'/'} className='px-4 py-2 text-sm font-medium hover:text-primary transition-colors'>
                                    Início
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Button variant="ghost" onClick={() => signed ? navigate('/dashboard') : navigate('/login')}>
                                    {signed ? 'Meus Carros' : 'Entrar'}
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

              {!loadingAuth && signed && (
                  <Link to={'/dashboard'} className='md:hidden'>
                  <Button variant="outline" size="icon" className='rounded-full'>
                  <FiUser size={20} />
                  </Button>
                  </Link>
              )}

              {!loadingAuth && !signed && (
                  <Link to={'/login'} className='md:hidden'>
                 <Button variant="outline" size="icon" className='rounded-full'>
                  <FiLogIn size={20} />
                  </Button>
                  </Link>
              )}
            </header>
        </div>
    )
}
