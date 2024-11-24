import { ReactNode} from 'react'

interface SocialProps{
    url:string;
    children: ReactNode
}

export function Social({url,children} : SocialProps){
    return(
        <a href={url}
        rel='noopener noreferrer' //url externa
        target='_blank' // para abrir noutro separador
        >
            {children}
        </a>
    )
}
