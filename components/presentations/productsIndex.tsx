"use client";

import { useReducer, useEffect } from "react";
import Product from "../presentations/products";
import Header from "../presentations/header";
import Footer from "../presentations/footer";
import { cartReducer, initialState } from "../containers/reducers/cart-reducer";
import { obtenerPokemon } from "../containers/apis/pokeApi";




function ProductsIndex() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const pokemonData = await obtenerPokemon("charizard"); 
        dispatch({ type: "remove-from-cart", payload: { id: 10 } }); 
      } catch (error) {
        console.error("Error al obtener datos de Pokémon:", error);
      }
    }

    fetchPokemonData(); 
  }, []);

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />

      <main className="mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {state.data.map((poke) => (
            <Product key={poke.id} poke={poke} dispatch={dispatch} />
          ))}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default ProductsIndex;
