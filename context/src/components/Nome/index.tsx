
interface NomeProps{
    nome:string;
    changeName: (name:string) => void;
}

export function Nome({nome, changeName}:NomeProps){
    return(
        <div>
            <h1>Aluno: {nome}</h1>
            <br/>
            <button onClick={() => changeName('Tiago Sousa')}>
                Trocar Nome
            </button>
        </div>
    )
}
