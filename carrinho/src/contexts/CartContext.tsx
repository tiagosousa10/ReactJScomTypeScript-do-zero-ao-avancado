import {createContext, ReactNode, useState} from 'react'
import {ProductProps} from '../pages/Home'


interface CartContextData{
    cart: CartProps[],
    cartAmount: number,
    addItemCart: (newItem: ProductProps) => void,
    removeItemCart:(product : CartProps) => void,
    total: string
}

interface CartProps{
    id:number,
    title:string,
    description:string,
    price:number,
    cover:string,
    amount:number,
    total:number
}

interface CartProviderProps{
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({children} : CartProviderProps){
    const [cart,setCart] = useState<CartProps[]>([])
    const [total,setTotal] = useState("")

    function addItemCart(newItem:ProductProps){
        //adiciona no carrinho
        //verificar se já nao foi adicionado tambem!
        const indexItem = cart.findIndex(item => item.id === newItem.id) // devolve a posicao

        if(indexItem !== -1){
            //se entrou aqui, somamos +1 na quantidade e calculamos o total do carrinno
           //adicionar na lista
           const cartList = cart;

           cartList[indexItem].amount = cartList[indexItem].amount + 1
           cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

           setCart(cartList)
           totalResultCart(cartList)
           return;
        }

        // ADICIONAR NOVO PRODUTO NA LISTA
        const data = {
            ...newItem,
            amount:1,
            total:newItem.price
           }

           setCart(oldProducts =>[...oldProducts, data])
           totalResultCart([...cart,data])
    }


    function removeItemCart(product:CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id)

        if(cart[indexItem]?.amount > 1){
            const cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount -1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price

            setCart(cartList)
            totalResultCart(cartList)

            return;
        }

        const removeItem = cart.filter(item => item.id !== product.id)

        setCart(removeItem)
        totalResultCart(removeItem)

    }

    function totalResultCart(items:CartProps[]){
        const myCart = items;
        const result = myCart.reduce((acc,obj) => {return acc + obj.total}, 0)

        const resultFormated = result.toLocaleString("pt-PT", {
            style:'currency',
            currency:'EUR'
        })

        setTotal(resultFormated)
    }

    return(
        <CartContext.Provider 
        value={{
            cart,
            cartAmount: cart.length,
            addItemCart,
            removeItemCart,
            total
            }}>
            {children} 
        </CartContext.Provider>
    )
}


export default CartProvider
