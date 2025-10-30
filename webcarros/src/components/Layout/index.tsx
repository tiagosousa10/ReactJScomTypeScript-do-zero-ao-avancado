import { Header } from "../Header";
import { FooterComponent } from "../Footer";
import { Outlet } from "react-router-dom";

export function Layout(){
    return(
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow">
                <Outlet/>
            </main>
            <FooterComponent/>
        </div>
    )
}
