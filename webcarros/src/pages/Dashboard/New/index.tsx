import { Container } from "../../../components/Container";
import { PanelHeader } from "../../../components/PanelHeader";

import {FiUpload} from 'react-icons/fi'

export function New(){
    return(
        <Container>
            <PanelHeader/>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button 
                    className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000"  />
                    </div>
                    <div className="cursor-pointer">
                        <input type="file" accept="image/**" className="opacity-0 cursor-pointer" />
                    </div>
                </button>
            </div>

            <div className="w-full bg-white p-3 rounded-lg flex-col flex sm:flex-row items-center gap-2 mt-2">
                <h1>TESTE</h1>
            </div>

        </Container>
    )
}
