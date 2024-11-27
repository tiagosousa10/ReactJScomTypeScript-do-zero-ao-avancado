import {BsCartPlus} from 'react-icons/bs'

export function Home(){
    return(
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto ">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
                    <section className="w-full">
                        <img 
                        className='w-full rounded-lg max-h-70 mb-2'
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsupport.apple.com%2Flibrary%2FAPPLE%2FAPPLECARE_ALLGEOS%2FSP750%2FSP750-airpods.jpeg&f=1&nofb=1&ipt=bc20df1e7c121650ed53e88ad48c9f8960ef9a8d7fea89bd199da805741187d9&ipo=images"
                        alt="logoDoProduto"   />
                        <p className='font-medium mt-1 mb-2'>Airpods pro</p>

                        <div className='flex gap-3 items-center'>
                            <strong className='text-zinc-700/90'>
                                1000 $
                            </strong>
                            <button className='bg-zinc-900 p-1 rounded'>
                                <BsCartPlus size={20} color='#fff'    />
                            </button>
                        </div>

                    </section>


                   
                </div>

            </main>
        </div>
    )
}
