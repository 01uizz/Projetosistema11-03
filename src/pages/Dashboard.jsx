import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const { user, role } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617] p-4">

      <div className="bg-slate-900/70 backdrop-blur-lg border border-purple-500/20 shadow-xl rounded-2xl p-10 w-full max-w-lg text-center">

        <h1 className="text-3xl font-bold text-purple-300 mb-4">
          Dashboard
        </h1>

        <p className="text-slate-300 mb-2">
          Bem-vindo(a),
          <span className="font-semibold text-white"> {user?.email}</span>!
        </p>

        <p className="text-slate-400 mb-6">
          Seu perfil de acesso é:
          <span className="uppercase font-bold text-purple-400 ml-1">
            {role}
          </span>
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition shadow-lg"
        >
          Sair do Sistema
        </button>

      </div>

    </div>
  );
}