export function Cart(){
    return(
        <div className="w-full max-w-7xl mx-auto ">
            <h1 className="font-medium text-2xl text-center my-4">Carrinho de Compras</h1>

            <section className="flex items-center justify-between border-b-2 border-gray-300">
                <img 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsupport.apple.com%2Flibrary%2FAPPLE%2FAPPLECARE_ALLGEOS%2FSP750%2FSP750-airpods.jpeg&f=1&nofb=1&ipt=bc20df1e7c121650ed53e88ad48c9f8960ef9a8d7fea89bd199da805741187d9&ipo=images"
                    alt="logoProduto"
                    className="w-28"
                   />

                   <strong>Preço: 1000$</strong>


                   <div className="flex items-center justify-center gap-3">
                    <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                        -
                    </button>

                        1

                    <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                        +
                    </button>
                   </div>


                   <strong className="float-right">
                    SubTotal: 1000$
                   </strong>
            </section>


            <p className="font-bold mt-4">Total: 1000$</p>
        </div>
    )
}
