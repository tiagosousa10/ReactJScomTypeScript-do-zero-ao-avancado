import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";

//COMPONENTS
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z.string().nonempty("O campo password é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      // caso user logado tente acessar a page login => desloga automatico
      await signOut(auth);
    }

    handleLogout();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("logado com sucesso!");
        console.log(user);
        toast.success("Login com sucesso!");
        navigate("/dashboard", { replace: true });
      })
      .catch((e) => {
        console.log("error: " + e);
        toast.error("Erro ao fazer login.");
      });
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4 ">
        <Link
          to={"/"}
          className="mb-6 max-w-sm w-full flex items-center justify-center   "
        >
          <img
            src={logoImg}
            alt="logo"
            className="w-[300px] items-center justify-center rounded-full"
          />
        </Link>

        <form
          className="bg-white max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite o seu e-mail"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite a sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white font-medium h-10"
          >
            Acessar
          </button>
        </form>

        <Link to={"/register"}>Ainda não possui uma conta? Cadastre-se!</Link>
      </div>
    </Container>
  );
}
