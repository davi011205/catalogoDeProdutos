
import React from 'react';

function DetalhesProduto({ product }) {
  return (
    <div className="product-detail">
      <img src={product.imagem} alt={product.nome} />
      <h2>{product.nome}</h2>
      <p>${product.preco}</p>
      <p>{product.descricao}</p>
      <p>{product.avaliacao}</p>
    </div>
  );
}

export default DetalhesProduto;