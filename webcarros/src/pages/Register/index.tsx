import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logoImg from "../../assets/logo.png";

//COMPONENTS
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z
    .string()
    .min(6, "A password precisa de ter pelo menos 6 caracteres.")
    .nonempty("O campo password é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const { handleInfoUser } = useContext(AuthContext);

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

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });

        handleInfoUser({
          name: data.email,
          email: data.email,
          uid: user.user.uid,
        });
        toast.success("Bem vindo ao webcarros!");
        console.log("cadastrado com sucesso!");
        navigate("/");
      })
      .catch((e) => {
        console.log("error: " + e);
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
              type="text"
              placeholder="Digite o nome completo..."
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite o seu e-mail..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite a sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white font-medium h-10"
          >
            Cadastrar
          </button>
        </form>

        <Link to={"/login"}>Já possui uma conta? Faça o login!</Link>
      </div>
    </Container>
  );
}
