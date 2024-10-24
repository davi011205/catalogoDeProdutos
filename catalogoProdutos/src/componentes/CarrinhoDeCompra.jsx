import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Usando react-icons para o ícone de lixeira

function CarrinhoDeCompra({ itensCarrinho, setItensCarrinho, fecharCarrinho }) {
  // Calcula o total considerando a quantidade de cada item
  const total = itensCarrinho.reduce((acc, item) => acc + item.precoAtual * (item.quantidade || 1), 0);

  const handleQuantidadeChange = (id, novaQuantidade) => {
    const item = itensCarrinho.find(item => item.id === id);
    const novosItens = itensCarrinho.map(item => 
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    );
    setItensCarrinho(novosItens);
  };
  

  const handleRemoverItem = (id) => {
    const novosItens = itensCarrinho.filter(item => item.id !== id);
    setItensCarrinho(novosItens);
  };

  const handleFecharPedido = () => {
    const itensNomes = itensCarrinho.map(item => `${item.quantidade || 1} ${item.nome}`).join(', ');
    const mensagem = `Olá, gostaria de fazer o pedido dos itens: ${itensNomes}`;
    const numero = 5531988759095;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="carrinho-overlay">
      <div className="carrinhoDeCompra">
        <div className='carrinhoTitulo'>
          <h2>Minha sacola</h2>
          <div onClick={fecharCarrinho} style={{cursor: 'pointer'}}>X</div>
        </div>
        <div className="produtoCarrinho">
          {itensCarrinho.map((item) => (
            <div key={item.id} className='produtosAdicionados'>
              <div className="imagemProdutoCarrinho">
                <img src={item.imagem} alt={item.nome} />
              </div>
              <div className="detalhesProdutosCarrinho" >
                <div className="nomeLixeiraProdutoCarrinho">
                  <p>{item.nome}</p>
                  <FaTrash 
                    onClick={() => handleRemoverItem(item.id)} 
                    style={{cursor: 'pointer'}}
                  />
                </div>
                <div className='quantidadeTotalItemProdutoCarrinho'>
                  <input 
                    type="number" 
                    value={item.quantidade} 
                    min="1"
                    max={item.estoque}
                    onChange={(e) => handleQuantidadeChange(item.id, parseInt(e.target.value))} 
                  />
                  <div className="precoProdutoCarrinho">
                    <p>por ${(typeof item.precoAtual === 'string' ? parseFloat(item.precoAtual)* item.quantidade : item.precoAtual * item.quantidade).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='totalCarrinho'>
          <div className='valor'>
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className='concluirPedido'>
            <p>você será direcionado para o whatsApp</p>
            <button onClick={handleFecharPedido}>Fechar Pedido</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarrinhoDeCompra;
