import React from 'react';

function CarrinhoDeCompra({ itensCarrinho }) {
  // Calcula o total considerando a quantidade de cada item
  const total = itensCarrinho.reduce((acc, item) => acc + (typeof item.preco === 'string' ? parseFloat(item.preco) : item.preco) * (item.quantidade || 1), 0);

  const handleFecharPedido = () => {
    const itensNomes = itensCarrinho.map(item => `${item.quantidade || 1} ${item.nome}`).join(', ');
    const mensagem = `Olá, gostaria de fazer o pedido dos itens: ${itensNomes}`;
    const numero = 5531988759095;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="shopping-cart">
      <h2>Meu Carrinho</h2>
      <ul>
        {itensCarrinho.map((item) => (
          <li key={item.id}>
            {item.nome} - ${item.preco} (x{item.quantidade || 1})
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleFecharPedido}>Fechar Pedido</button>
    </div>
  );
}

export default CarrinhoDeCompra;
