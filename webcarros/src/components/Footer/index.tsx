import {
  Footer,
  FooterBrand,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import logoImg from "../../assets/logo.png";

export function FooterComponent() {
  return (
    <Footer
      container
      className="bg-black/70 rounded-none border-t-4 border-black/10 mt-auto h-auto py-4 "
    >
      <div className="w-full text-center">
        <div className="w-full flex flex-row justify-center items-center  mx-auto ">
          <FooterLinkGroup className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 mt-4 sm:mt-0">
            <FooterLink
              href="/"
              className="text-white hover:text-[#F4E9D7] transition-colors font-medium"
            >
              Sobre
            </FooterLink>
            <FooterLink
              href="/"
              className="text-white hover:text-[#F4E9D7] transition-colors font-medium"
            >
              Política de Privacidade
            </FooterLink>
            <FooterLink
              href="/"
              className="text-white hover:text-[#F4E9D7] transition-colors font-medium"
            >
              Termos de Uso
            </FooterLink>
            <FooterLink
              href="/"
              className="text-white hover:text-[#F4E9D7] transition-colors font-medium"
            >
              Contacto
            </FooterLink>
          </FooterLinkGroup>
        </div>
      </div>
    </Footer>
  );
}
