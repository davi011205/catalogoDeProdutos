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
          <h3 className='produto-nome'>{produto.nome}</h3>
          <p className='produto-descricao'>{produto.infoAdicionais}</p>
          <p className='produto-preco'>R$ {produto.preco}</p>
          <p className="produto-quantidade">
            {produto.quantidade == 0 ? "Produto indisponível no momento" : `disponível: ${produto.quantidade}`}
          </p>
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