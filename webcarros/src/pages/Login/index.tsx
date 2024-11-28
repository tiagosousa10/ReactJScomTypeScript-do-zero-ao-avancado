import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'

//COMPONENTS
import { Container } from '../../components/Container'
import { Input } from '../../components/Input'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    email:z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().nonempty("O campo password é obrigatório")
})

type FormData = z.infer<typeof schema>

export function Login(){
    const {register,handleSubmit,formState:{errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode:"onChange"
    })

    function onSubmit(data: FormData){
        console.log(data)
    }

    return(
       <Container>
        <div 
            className='w-full min-h-screen flex justify-center items-center flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}>
            <Link to={'/'} className='mb-6 max-w-sm w-full'>
            <img src={logoImg} alt='logo' className='w-full'/>
            </Link>

            <form className='bg-white max-w-xl w-full rounded-lg'>
            <div className='mb-3'>
            <Input 
                type="email" 
                placeholder="Digite o seu e-mail" 
                name='email'
                error={errors.email?.message} 
                register={register} 
                />
            </div>

            <div className='mb-3'>
            <Input 
                type="password" 
                placeholder="Digite a sua senha" 
                name='password'
                error={errors.password?.message} 
                register={register} 
                />
            </div>

                <button>
                    Acessar
                </button>
            </form>
        </div>
       </Container>
    )
}
