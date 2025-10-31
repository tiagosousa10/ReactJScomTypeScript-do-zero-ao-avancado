import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha todos os Campos!!!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
        console.log("login feito com sucesso!");
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Digite o seu e-mail"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="**********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash
                    className="text-gray-400 hover:text-gray-600"
                    size={18}
                  />
                ) : (
                  <FaEye
                    className="text-gray-400 hover:text-gray-600"
                    size={18}
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <Link
              to="#"
              className="text-sm text-gray-600 hover:text-teal-500 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors mb-6"
            type="submit"
          >
            Login
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              type="button"
              className="flex-1 bg-teal-50 hover:bg-teal-100 text-gray-900 font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              <FaGoogle size={20} />
            </button>
            <button
              type="button"
              className="flex-1 bg-teal-50 hover:bg-teal-100 text-gray-900 font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              <FaGithub size={20} />
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="#"
              className="text-teal-500 hover:text-teal-600 underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
