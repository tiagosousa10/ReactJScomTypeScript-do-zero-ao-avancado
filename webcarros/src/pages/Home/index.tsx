import { Container } from "../../components/Container";

export function Home(){
    return(
        <Container>
        <section className="bg-white p-4 rounde-lg w-full max-w-3xl mx-auto flex items-center gap-2">
            <input 
                type="text" 
                placeholder="Digite o nome do carro..." className="w-full border-2 rounde-lg h-9 px-3 outline-none" />
            <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
                Pesquisar
            </button>
        </section>

        <h1 className="font-bold text-center mt-6 text-2xl mb-4">Carros novos e usados em Portugal</h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <section className="w-full bg-white rounded-lg" >
                <img 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.motor1.com%2Fimages%2Fmgl%2F8LQ6M%2Fs1%2Flamborghini-aventador-svj-63-roadster.jpg&f=1&nofb=1&ipt=c1dfa089666a7b318e64282e6ab73a2568181f01245ce65558dea19baa761b24&ipo=images"
                    alt="nomeCarro"
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                   />
                <p className="font-bold mt-1 mb-2 px-2">Lamborghini Aventador</p>   
                <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.00 km</span>
                    <strong className="text-black font-medium text-xl">235.000$</strong>
                </div>

                <div className="w-full h-px bg-slate-200 my-2"></div>

                <div className="px-2 pb-2">
                    <span className="text-black">Porto - Portugal</span>
                </div>
            </section>

            
        </main>

        </Container>
    )
}
