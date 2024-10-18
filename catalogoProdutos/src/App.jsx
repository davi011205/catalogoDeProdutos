import './App.css';
import React, { useEffect, useState } from 'react';
import { db } from './scripts/firebaseConfig'; // Importa a configuração do Firebase
import { collection, getDocs } from 'firebase/firestore';
import ListaProdutos from './componentes/ListaProdutos';
import CarrinhoDeCompra from './componentes/CarrinhoDeCompra';

function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      const produtosCollection = collection(db, 'produtos');
      const produtosSnapshot = await getDocs(produtosCollection);
      const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProdutos(produtosList);
    };

    fetchProdutos();
  }, []); // O array vazio significa que isso será executado apenas uma vez após o componente ser montado

  const handleCategoriaFilterChange = (categoria) => {
    setSelectedCategoria(categoria);
  };

  const handleAddToCart = (produto) => {
    setItensCarrinho((prevItems) => {
      const itemExistente = prevItems.find((item) => item.id === produto.id);

      if (itemExistente) {
        // Se o item já existe, atualiza a quantidade
        return prevItems.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: (item.quantidade || 1) + 1 } // Se quantidade não existir, inicializa como 1
            : item
        );
      } else {
        // Se o item não existe, adiciona ao carrinho
        return [...prevItems, { ...produto, quantidade: 1 }];
      }
    });
  };

  const filteredProdutos = selectedCategoria
    ? produtos.filter((produto) => produto.categoria === selectedCategoria)
    : produtos;

  return (
    <div className="App">
      <h1>Produtos a Pronta Entrega</h1>
      <div className="filter-buttons">
        <button onClick={() => handleCategoriaFilterChange(null)}>Todos</button>
        <button onClick={() => handleCategoriaFilterChange('teste')}>Crédito</button>
        <button onClick={() => handleCategoriaFilterChange('teste2')}>Débito</button>
        <button onClick={() => handleCategoriaFilterChange('credito/debito')}>Crédito/Débito</button>
      </div>
      <ListaProdutos produtos={filteredProdutos} adicionarNoCarrinho={handleAddToCart} />
      <CarrinhoDeCompra itensCarrinho={itensCarrinho} />
    </div>
  );
}

export default App;