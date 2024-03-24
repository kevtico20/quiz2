"use client";
import { useState, useEffect, useReducer } from "react";
import Products from "../presentations/productsPi";
import Header from "./header";
import Footer from "./footer";
import { cartReducer, initialState } from "../containers/reducers/cart-reducer";
import { buscarImagenes } from "../containers/apis/pixabay";
import { PixabayImage } from "../containers";

function ProductsPixabay() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPixa, setAllPixa] = useState<PixabayImage[]>([]);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredPixa, setFilteredPixa] = useState<PixabayImage[]>([]);
  const [pixaResults, setPixaResults] = useState([]);


useEffect(() => {
  async function initialFetch() {
    let pixa = JSON.parse(localStorage.getItem('pixaBay') || '[]');
    if (pixa.length === 0) {
      try {
        pixa = await buscarImagenes("yellow"); 
        console.table(pixa)
        localStorage.setItem('pixaBay', JSON.stringify(pixa));
      } catch (error) {
        console.error("Error al obtener datos de Pokémon:", error);
      }
    }
    setAllPixa(pixa); 
    setFilteredPixa(pixa); 
    setTotalPages(Math.ceil(pixa.length / pageSize));
  }
  initialFetch();
}, [pageSize]);


  const handleNextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const handlePrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = filteredPixa.slice(indexOfFirstProduct,indexOfLastProduct);




  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />
      <main className="mt-5">
        <h2 className="text-center text-4xl lg:text-5xl font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500">
          Galería Artistica
        </h2>
        {/* <SearchFilter
          filterText={filterText}
          setFilterText={setFilterText}
          onSearch={handleSearch}
        /> */}
        <div className="flex justify-center">
          <div className="m-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {currentProducts.map((pixa) => (
               
                <Products key={pixa.id} pixa={pixa} dispatch={dispatch} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Siguiente
          </button>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default ProductsPixabay;
