import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../lib/supabase';

export default function Produtos() {

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    categoria: '',
    preco: '',
    estoque: ''
  });

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('nome', { ascending: true });

      if (error) throw error;

      setProdutos(data);

    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarProduto = async (e) => {
    e.preventDefault();
    setSalvando(true);

    try {

      const { error } = await supabase
        .from('produtos')
        .insert([{
          nome: novoProduto.nome,
          categoria: novoProduto.categoria,
          preco: parseFloat(novoProduto.preco),
          estoque: parseInt(novoProduto.estoque)
        }]);

      if (error) throw error;

      setIsModalOpen(false);
      setNovoProduto({ nome: '', categoria: '', preco: '', estoque: '' });

      buscarProdutos();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar produto.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="flex bg-[#020617] min-h-screen text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Gerenciar Produtos
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20 transition"
          >
            + Novo Produto
          </button>

        </div>

        {erro && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg">
            {erro}
          </div>
        )}

        {/* TABELA */}

        <div className="rounded-xl bg-white/5 backdrop-blur-md border border-purple-500/20 overflow-hidden">

          <table className="min-w-full">

            <thead className="bg-black/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Nome</th>
                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Categoria</th>
                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Preço</th>
                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Estoque</th>
                <th className="px-6 py-4 text-right text-xs text-slate-400 uppercase">Ações</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                    Carregando produtos...
                  </td>
                </tr>

              ) : produtos.length === 0 ? (

                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                    Nenhum produto cadastrado.
                  </td>
                </tr>

              ) : (

                produtos.map((produto) => (

                  <tr key={produto.id} className="border-t border-purple-500/10 hover:bg-white/5">

                    <td className="px-6 py-4 text-sm">
                      {produto.nome}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {produto.categoria}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-purple-400">
                      {Number(produto.preco).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </td>

                    <td className="px-6 py-4 text-sm">

                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        produto.estoque > 10
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>

                        {produto.estoque} un

                      </span>

                    </td>

                    <td className="px-6 py-4 text-right text-sm">

                      <button className="text-purple-400 hover:text-purple-300 mr-4">
                        Editar
                      </button>

                      <button className="text-red-400 hover:text-red-300">
                        Excluir
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </main>

      {/* MODAL */}

      {isModalOpen && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#020617] border border-purple-500/20 p-8 rounded-xl w-full max-w-md">

            <h2 className="text-2xl font-bold mb-6">
              Cadastrar Produto
            </h2>

            <form onSubmit={handleSalvarProduto} className="space-y-4">

              <input
                type="text"
                placeholder="Nome do produto"
                required
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-slate-700"
                value={novoProduto.nome}
                onChange={(e)=>setNovoProduto({...novoProduto,nome:e.target.value})}
              />

              <input
                type="text"
                placeholder="Categoria"
                required
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-slate-700"
                value={novoProduto.categoria}
                onChange={(e)=>setNovoProduto({...novoProduto,categoria:e.target.value})}
              />

              <div className="flex gap-4">

                <input
                  type="number"
                  step="0.01"
                  placeholder="Preço"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-slate-700"
                  value={novoProduto.preco}
                  onChange={(e)=>setNovoProduto({...novoProduto,preco:e.target.value})}
                />

                <input
                  type="number"
                  placeholder="Estoque"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-slate-700"
                  value={novoProduto.estoque}
                  onChange={(e)=>setNovoProduto({...novoProduto,estoque:e.target.value})}
                />

              </div>

              <div className="flex justify-end gap-3 pt-6">

                <button
                  type="button"
                  onClick={()=>setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg"
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}