import { Dispatch } from "react";
import type { Pokemon } from "../containers/index";
import type { CartActions } from "../containers/reducers/cart-reducer";

type PokemonProps = {
  poke: Pokemon;
  dispatch: Dispatch<CartActions>;
  
};

export default function Product({ poke, dispatch }: PokemonProps) {
  const { nombre, vida, tipo, fuerza, imagen, precio } = poke;
  console.log(poke);
  return (
    <div className="col-md-6 col-lg-4 my-4">
      <div className="card p-4 border">
        <div className="row align-items-center">
          <div className="col-4">
            <img
              className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 2xl:w-120 2xl:h-120 mx-auto"
              src={`${imagen}`}
              alt="imagen"
            />
          </div>
          <hr className="my-4" />
          <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase">Name: {nombre}</h3>
            <p>Life: {vida}</p>
            <p>Type: {tipo}</p>
            <p>Attack: {fuerza}</p>
            <p className="fw-black text-primary fs-3">${precio}</p>
            <hr className="my-4" />
            <button
              type="button"
              className="btn-rounded bg-gray-800 hover:bg-blue-600 active:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-100"
              onClick={() =>
                dispatch({ type: "add-to-cart", payload: { item: poke } })
              }
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
