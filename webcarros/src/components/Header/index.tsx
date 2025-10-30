import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { Home, LayoutDashboard, LogOut, LogIn } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";

export function Header() {
  const { signed, loadingAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <div
      className="w-full flex items-center justify-center h-16 drop-shadow-md mb-4 sticky top-0 z-50 transition-all"
      style={{ backgroundColor: "#6FA4AF" }}
    >
      <header className="flex w-full items-center max-w-7xl justify-between px-4 md:px-6 mx-auto">
        <Link
          to={"/"}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img src={logoImg} alt="logoSite" className="h-8 md:h-10" />
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-[#D97D55]/20 hover:text-[#F4E9D7] focus:bg-[#D97D55]/20 focus:text-[#F4E9D7] focus:outline-none focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2 focus:ring-offset-[#6FA4AF] transition-colors"
                    title="Início"
                  >
                    <Home size={20} />
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <div className="h-6 w-px bg-[#D97D55]/40 mx-2" />

            {signed && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/dashboard")}
                      className="text-white hover:bg-[#D97D55]/20 hover:text-[#F4E9D7] focus:bg-[#D97D55]/20 focus:text-[#F4E9D7] focus:outline-none focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2 focus:ring-offset-[#6FA4AF] transition-colors"
                      title="Meus Carros"
                    >
                      <LayoutDashboard size={20} />
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <div className="h-6 w-px bg-[#D97D55]/40 mx-2" />
              </>
            )}

            {signed ? (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSignOut}
                    className="text-white hover:bg-[#D97D55]/20 hover:text-[#F4E9D7] focus:bg-[#D97D55]/20 focus:text-[#F4E9D7] focus:outline-none focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2 focus:ring-offset-[#6FA4AF] transition-colors"
                    title="Sair"
                  >
                    <LogOut size={20} />
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/login")}
                    className="text-white hover:bg-[#D97D55]/20 hover:text-[#F4E9D7] focus:bg-[#D97D55]/20 focus:text-[#F4E9D7] focus:outline-none focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2 focus:ring-offset-[#6FA4AF] transition-colors"
                    title="Entrar"
                  >
                    <LogIn size={20} />
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-3">
          {!loadingAuth && signed && (
            <>
              <Link
                to={"/dashboard"}
                className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2 focus:ring-offset-[#6FA4AF] rounded-full"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white text-white hover:bg-[#D97D55]/20 hover:border-[#D97D55] focus:bg-[#D97D55]/20 focus:border-[#D97D55] transition-colors"
                  title="Meus Carros"
                >
                  <LayoutDashboard size={20} />
                </Button>
              </Link>
              <div className="h-6 w-px bg-[#B7B89F]/30" />
              <Button
                variant="outline"
                size="icon"
                onClick={handleSignOut}
                className="rounded-full border-white text-white hover:bg-[#D97D55]/20 hover:border-[#D97D55] focus:bg-[#D97D55]/20 focus:border-[#D97D55] transition-colors"
                title="Sair"
              >
                <LogOut size={20} />
              </Button>
            </>
          )}

          {!loadingAuth && !signed && (
            <Link
              to={"/login"}
              className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2 focus:ring-offset-[#6FA4AF] rounded-full"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white text-white hover:bg-[#D97D55]/20 hover:border-[#D97D55] focus:bg-[#D97D55]/20 focus:border-[#D97D55] transition-colors"
                title="Entrar"
              >
                <LogIn size={20} />
              </Button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}
