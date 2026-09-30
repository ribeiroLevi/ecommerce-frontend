"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Nav from "../components/nav";
import { loginUser } from "../services/api";

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { refreshSession } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const user = await loginUser({
        login,
        password,
      });

      // Login terminou e o cookie foi criado.
      // Agora consulta /auth/me novamente.
      await refreshSession();

      if (user.adm) {
        router.push("/");
        return;
      }

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao realizar login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav empty />

      <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#FFF8EF] px-4">
        <section className="w-full max-w-[340px]">
          {/* TÍTULO */}
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold text-[#32180D]">Entrar</h1>

            <p className="mt-1 text-sm text-[#766D67]">
              Acesse sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login"
                className="mb-1.5 block text-sm font-medium text-[#32180D]"
              >
                Login
              </label>

              <input
                id="login"
                name="login"
                type="text"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                placeholder="Seu login"
                required
                className="
                  w-full
                  rounded-md
                  border
                  border-[#DDD4CC]
                  bg-transparent
                  px-3
                  py-2.5
                  text-sm
                  text-[#32180D]
                  outline-none
                  transition
                  placeholder:text-[#9C948E]
                  focus:border-[#923A00]
                  focus:ring-1
                  focus:ring-[#923A00]
                "
              />
            </div>

            {/* SENHA */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#32180D]"
              >
                Senha
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Sua senha"
                required
                className="
                  w-full
                  rounded-md
                  border
                  border-[#DDD4CC]
                  bg-transparent
                  px-3
                  py-2.5
                  text-sm
                  text-[#32180D]
                  outline-none
                  transition
                  placeholder:text-[#9C948E]
                  focus:border-[#923A00]
                  focus:ring-1
                  focus:ring-[#923A00]
                "
              />
            </div>

            {/* ERRO */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* BOTÕES */}
            <div className="space-y-3 pt-3">
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  cursor-pointer
                  rounded-full
                  bg-[#963C00]
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[#7A3100]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <Link
                href="/register"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#9A8F86]
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-[#32180D]
                  transition
                  hover:bg-[#F4EADF]
                "
              >
                Criar conta
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-[#32180D]
                transition
                hover:opacity-60
              "
            >
              <span aria-hidden="true">←</span>
              Voltar
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
