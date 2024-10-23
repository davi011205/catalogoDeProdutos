import './App.css';
import React, { useEffect, useState } from 'react';
import { db } from './scripts/firebaseConfig'; // Importa a configuração do Firebase
import { collection, getDocs } from 'firebase/firestore';
import ListaProdutos from './componentes/ListaProdutos';
import CarrinhoDeCompra from './componentes/CarrinhoDeCompra';
import SugestoesPesquisa from './componentes/SugestoesPesquisa';
import Disclaimer from './componentes/Disclaimer';
import { FaShoppingCart, FaSearch, FaListUl, FaStar, FaWhatsapp } from 'react-icons/fa'; 
import SugestoesPesquisaCuidadoFacial from './componentes/SugestoesPesquisaCuidadoFacial';
import SugestoesPesquisaMaquiagem from './componentes/SugestoesPesquisaMaquiagem';

function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false); 
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false); 
  const [mostrarSugestoesMaquiagem, setMostrarSugestoesMaquiagem] = useState(false); 
  const [mostrarSugestoesCuidadoFacial, setMostrarSugestoesCuidadoFacial] = useState(false); 

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
  ? produtos.filter((produto) =>
      produto.categoria.split(',').map(cat => cat.trim()).includes(selectedCategoria)
    )
  : produtos;


  return (
    <div>
      <header >
        <Disclaimer></Disclaimer>
        <div className='tituloPesquisaCarrinho'>
          <div className='titulo'>
            <h1>Produtos a Pronta Entrega</h1>
          </div>

          <div className='pesquisaESugestao'>
            <div id="pesquisa" className="containerPesquisa">
              <input 
                type="text"
                placeholder="O que você procura?" 
                className="inputPesquisa" 
                onFocus = {() => {
                  setMostrarSugestoes(true);
                }}
                onBlur = {() => {
                  setTimeout(() => setMostrarSugestoes(false), 200);
                }}
                
              />
              <span className="iconePesquisa"><FaSearch /></span>
            </div>
            {mostrarSugestoes && <SugestoesPesquisa/>}
          </div>

        <div className="cart-icon-container" onClick={() => setMostrarCarrinho(!mostrarCarrinho)}>
          <FaShoppingCart size={40} className="cart-icon" /> {/* Ícone maior para melhor visualização */}
          {itensCarrinho.length > 0 && (
            <span className="cart-count">{itensCarrinho.length}</span>
          )} {/* O contador só aparece quando há itens no carrinho */}
        </div>
      </div>

        <div className="filter-buttons">
          <div onClick={() => handleCategoriaFilterChange(null)}>
            <FaListUl></FaListUl> Todas as categorias
          </div>

          <div onClick={() => handleCategoriaFilterChange('promocao')}>
            <FaStar style={{scale: '1.1'}}></FaStar> Promoções
          </div>

          <div onClick={() => handleCategoriaFilterChange('cuidadoFacial')}
            onMouseEnter = {() => {
              setMostrarSugestoesCuidadoFacial(true);
            }}
            onMouseLeave = {() => {
              setTimeout(() => setMostrarSugestoesCuidadoFacial(false), 200);
            }}
          >
            Cuidados Faciais
            {mostrarSugestoesCuidadoFacial && <SugestoesPesquisaCuidadoFacial/>}
          </div>

          <div onClick={() => handleCategoriaFilterChange('maquiagem')}
            onMouseEnter = {() => {
              setMostrarSugestoesMaquiagem(true);
            }}
            onMouseLeave = {() => {
              setTimeout(() => setMostrarSugestoesMaquiagem(false), 200);
            }}
          >
            Maquiagem
            {mostrarSugestoesMaquiagem && <SugestoesPesquisaMaquiagem/>}

          </div>

          <div onClick={() => handleCategoriaFilterChange('cuidadoCorporal')}>
            cuidados Corporais
          </div>

          <div onClick={() => handleCategoriaFilterChange('perfumes')}>
            Perfumes
          </div>

          <div onClick={() => handleCategoriaFilterChange('presente')}>
            Para presentear
          </div>
    
        </div>
      </header>
        {mostrarCarrinho && <CarrinhoDeCompra itensCarrinho={itensCarrinho} />}
      
      <div>
        <ListaProdutos produtos={filteredProdutos} adicionarNoCarrinho={handleAddToCart} />
        <FaWhatsapp size={40} className='whatsApp'></FaWhatsapp>
      </div>
    </div>
  );
}

export default App;