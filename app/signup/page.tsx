import Link from "next/link";
import Nav from "../components/nav";

export default function RegisterPage() {
  return (
    <div>
      <Nav empty />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <section className="w-full max-w-[390px]">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-amber-950">Criar conta</h1>

            <p className="mt-1 text-sm text-stone-500">
              Preencha os dados para se cadastrar
            </p>
          </div>

          <form className="border border-stone-400 rounded-xl p-5 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-1.5 text-sm font-medium text-stone-900"
              >
                Nome completo
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome"
                className="w-full h-10 px-3 rounded-md border border-stone-300 bg-transparent text-sm outline-none placeholder:text-stone-400 focus:border-amber-900"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block mb-1.5 text-sm font-medium text-stone-900"
              >
                Endereço
              </label>

              <input
                id="address"
                name="address"
                type="text"
                placeholder="Rua, número, bairro, cidade/UF"
                className="w-full h-10 px-3 rounded-md border border-stone-300 bg-transparent text-sm outline-none placeholder:text-stone-400 focus:border-amber-900"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1.5 text-sm font-medium text-stone-900"
              >
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                className="w-full h-10 px-3 rounded-md border border-stone-300 bg-transparent text-sm outline-none placeholder:text-stone-400 focus:border-amber-900"
              />
            </div>

            <div>
              <label
                htmlFor="login"
                className="block mb-1.5 text-sm font-medium text-stone-900"
              >
                Login
              </label>

              <input
                id="login"
                name="login"
                type="text"
                placeholder="Escolha um login"
                className="w-full h-10 px-3 rounded-md border border-stone-300 bg-transparent text-sm outline-none placeholder:text-stone-400 focus:border-amber-900"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1.5 text-sm font-medium text-stone-900"
              >
                Senha
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full h-10 px-3 rounded-md border border-stone-300 bg-transparent text-sm outline-none placeholder:text-stone-400 focus:border-amber-900"
              />
            </div>

            <div className="space-y-3 pt-4">
              <button
                type="submit"
                className="w-full h-11 rounded-full bg-amber-800 text-white text-sm font-medium cursor-pointer transition hover:bg-amber-900"
              >
                Criar conta
              </button>

              <Link
                href="/login"
                className="flex w-full h-11 items-center justify-center rounded-full border border-stone-500 text-sm text-stone-900 transition hover:bg-orange-100"
              >
                Já tenho conta
              </Link>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-stone-800 transition hover:text-amber-900"
              >
                <span>←</span>
                Voltar
              </Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
