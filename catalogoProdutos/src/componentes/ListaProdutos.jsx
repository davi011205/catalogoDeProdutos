import React, { useState } from 'react';

function ListaProdutos({ produtos, adicionarNoCarrinho }) {
  const [hoverProduto, setHoverProduto] = useState(null);
  const [selectedProduto, setSelectedProduto] = useState(null);

  const handleProdutoClick = (produto) => {
    setSelectedProduto(produto);
  };

  const handleMouseEnter = (produto) => {
    setHoverProduto(produto);
  };

  const handleMouseLeave = () => {
    setHoverProduto(null);
  };

  const produtosDisponiveis = produtos.filter(produto => produto.estoque > 0);

  return (
    <div className="produto-list">
      {produtosDisponiveis.map((produto) => (
        <div
          key={produto.id}
          className={`produto-card ${hoverProduto === produto ? 'hovered' : ''}`}
          onMouseEnter={() => handleMouseEnter(produto)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleProdutoClick(produto)}
        >
          <img src={produto.imagem} alt={produto.nome} />
          <h3 className='produto-nome'>{produto.nome}</h3>
          <p className='produto-preco'>R$ {produto.precoAtual}</p>
          <p className="produto-quantidade">disponível: {produto.estoque}</p>
          <button onClick={() => adicionarNoCarrinho(produto)}>Adicionar</button>
        </div>
      ))}
    </div>
  );
}

export default ListaProdutos;