"use client";

import { useState, useEffect, useReducer } from "react";
import Header from "./header";
import Footer from "./footer";
import { cartReducer, initialState } from "../containers/reducers/cart-reducer";
import { buscarImagenes } from "../containers/apis/pixabay";
import { PixabayImage } from "../containers";
import ProductPi from "./productsPi";

// Asume que buscarImagenes ya está adecuadamente implementado y devuelve un array de PixabayImage
function ProductsPixabay() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagenes, setImagenes] = useState([]);

  // Efecto para cargar las imágenes al montar el componente
  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        const resultado = await buscarImagenes();
        // Asumiendo que el resultado contiene un array de imágenes en resultado.hits
        setImagenes(resultado.hits);
      } catch (error) {
        console.error("Error al cargar imágenes:", error);
      }
    };

    cargarImagenes();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

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
              {imagenes.map((poke) => (
                <ProductPi key={poke.id} image={poke} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          {/* <button
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
          </button> */}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default ProductsPixabay;
