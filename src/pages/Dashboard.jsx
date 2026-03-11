import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Visão geral do sistema
          </p>
        </div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
            <p className="text-slate-400 text-sm">Produtos</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-400">128</h2>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
            <p className="text-slate-400 text-sm">Vendas</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-400">R$ 12.540</h2>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
            <p className="text-slate-400 text-sm">Clientes</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-400">89</h2>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
            <p className="text-slate-400 text-sm">Pedidos Hoje</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-400">17</h2>
          </div>

        </div>

        {/* Área principal */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">

          {/* Resumo do sistema */}
          <div className="xl:col-span-2 p-6 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-md">

            <h3 className="text-lg font-semibold mb-6">
              Resumo do Sistema
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

              <div>
                <p className="text-slate-400 text-sm">Produtos ativos</p>
                <p className="text-2xl font-bold text-purple-400">120</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Estoque baixo</p>
                <p className="text-2xl font-bold text-yellow-400">8</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Pedidos pendentes</p>
                <p className="text-2xl font-bold text-red-400">3</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Usuários</p>
                <p className="text-2xl font-bold text-purple-400">5</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Categorias</p>
                <p className="text-2xl font-bold text-purple-400">12</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Sistema</p>
                <p className="text-2xl font-bold text-green-400">Online</p>
              </div>

            </div>

          </div>

          {/* Atividade recente */}
          <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-md">

            <h3 className="text-lg font-semibold mb-4">
              Atividade Recente
            </h3>

            <ul className="space-y-4 text-sm text-slate-400">

              <li className="flex justify-between">
                <span>Produto criado</span>
                <span className="text-purple-400">agora</span>
              </li>

              <li className="flex justify-between">
                <span>Nova venda</span>
                <span className="text-purple-400">5 min</span>
              </li>

              <li className="flex justify-between">
                <span>Novo cliente</span>
                <span className="text-purple-400">1h</span>
              </li>

              <li className="flex justify-between">
                <span>Pedido atualizado</span>
                <span className="text-purple-400">3h</span>
              </li>

            </ul>

          </div>

        </div>

      </main>

    </div>
  );
}