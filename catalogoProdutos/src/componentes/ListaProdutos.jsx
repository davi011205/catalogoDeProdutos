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

  return (
    <div className="produto-list">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className={`produto-card ${hoverProduto === produto ? 'hovered' : ''}`}
          onMouseEnter={() => handleMouseEnter(produto)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleProdutoClick(produto)}
        >
          <img src={produto.imagem} alt={produto.nome} />
          <h3>{produto.nome}</h3>
          <p>{produto.infoAdicionais}</p>
          <p>R$ {produto.preco}</p>
          {hoverProduto === produto && (
            <div className="hover-content">{produto.hover}</div>
          )}
          <button onClick={() => adicionarNoCarrinho(produto)}>Adicionar ao Carrinho</button>
        </div>
      ))}
    </div>
  );
}

export default ListaProdutos;