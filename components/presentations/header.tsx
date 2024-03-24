"use client";

import Link from "next/link";
import { Dispatch, useMemo } from "react";
import type { CartItem } from "../containers/index";
import type { CartActions } from "../containers/reducers/cart-reducer";

type HeaderProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
};

export default function Header({ cart, dispatch }: HeaderProps) {

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce((total: number, cartItem: CartItem) => {
    const precio = cartItem.item && "precio" in cartItem.item ? cartItem.item.precio : 0;
    return total + (precio * cartItem.quantity);
  }, 0), [cart]);


  const getImageUrl = (cartItem: CartItem): string => {
    // Verifica si cartItem.item está definido antes de intentar acceder a webformatURL
    if (!cartItem.item) {
      console.error('CartItem.item está indefinido.', cartItem);
      return ''; // Retorna una URL o un valor predeterminado si es necesario
    }
  
    return cartItem.item.webformatURL; // Ambos tipos tienen webformatURL
  };
  
  const getItemName = (cartItem: CartItem): string => {
    return cartItem.type === "pokemon" ? cartItem.item.nombre : "Pixabay Image"; 
  };
  
  return (
    <header className="py-5 flex justify-around bg-slate-900">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a className="text-white" href={"/"}>
              {" "}
              Inicio
            </a>
          </div>
          <nav className="md:ml-auto flex mt-5 md:mt-0">
            <div className="text-white ml-10">
              <Link href={"/gifProducts"}>Productos Peliculas</Link>
            </div>
            <div className="text-white ml-10">
              <Link href={"/products"}>Productos Pokemon</Link>
            </div>
            <div className="carrito relative">
              <img
                className="w-12 md:w-auto"
                src="carrito.png"
                alt="imagen carrito"
              />
              <div
                id="carrito"
                className="bg-white p-3 absolute top-full right-0 hidden"
              >
                {isEmpty ? (
                  <p className="text-center">El carrito está vacío</p>
                ) : (
                  <>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((cartItem, index) => (
                          <tr key={index}>
                            {" "}
                            {/* Usar index como key solo si no tienes mejor opción */}
                            <td>
                              <img
                                className="w-20 h-auto"
                                src={getImageUrl(cartItem)}
                                alt="Imagen del producto"
                              />
                            </td>
                            <td>{getItemName(cartItem)}</td>
                            <td className="font-bold">${cartItem.item?.precio}</td>
                            <td className="flex items-center mt-6 gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  dispatch({
                                    type: "decrease-quantity",
                                    payload: { id: cartItem.id },
                                  })
                                }
                              >
                                -
                              </button>
                              <span>{cartItem.quantity}</span>
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  dispatch({
                                    type: "increase-quantity",
                                    payload: { id: cartItem.id },
                                  })
                                }
                              >
                                +
                              </button>
                            </td>
                            <td>
                              {" "}
                              <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                type="button"
                                onClick={() =>
                                  dispatch({
                                    type: "remove-from-cart",
                                    payload: { id: cartItem.id },
                                  })
                                }
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-right">
                      Total a pagar:{" "}
                      <span className="font-bold">${cartTotal}</span>
                    </p>
                  </>
                )}
                <button
                  className="btn btn-dark w-full mt-3 p-2"
                  onClick={() => dispatch({ type: "clear-cart" })}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
