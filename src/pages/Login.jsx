import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErro("E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">

      {/* GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-black blur-3xl"></div>

      {/* PARTICLES */}
      <Particles
        init={particlesInit}
        className="absolute inset-0"
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 80 },
            color: { value: "#a855f7" },
            links: {
              enable: true,
              color: "#a855f7",
              opacity: 0.2,
              distance: 140,
            },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.4 },
            size: { value: 2.5 },
          },
        }}
      />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">

          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-600/40">
            ⚡
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">
            Sistema
          </h1>

          <p className="text-slate-400 text-sm">
            Acesso ao painel
          </p>

        </div>

        {erro && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded-lg mb-6 text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div className="relative">

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#020617] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            />

            <span className="absolute left-3 top-3 text-slate-400">
              📧
            </span>

          </div>

          {/* SENHA */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#020617] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
            />

            <span className="absolute left-3 top-3 text-slate-400">
              🔒
            </span>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              {showPassword ? "🙈" : "👁"}
            </button>

          </div>

          {/* BOTÃO */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
          >

            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {loading ? "Entrando..." : "Entrar"}

          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Sistema protegido • Supabase Auth
        </p>

      </div>

    </div>
  );
}