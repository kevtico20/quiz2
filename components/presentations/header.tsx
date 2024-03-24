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
  console.table(cart);

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce((total: number, cartItem: CartItem) => {
        const precio =
          cartItem.item && "precio" in cartItem.item ? cartItem.item.precio : 0;
        return total + precio * cartItem.quantity;
      }, 0),
    [cart]
  );

  const getImageUrl = (cartItem: CartItem): string => {
    // Verifica si cartItem.item está definido antes de intentar acceder a webformatURL
    if (!cartItem.item) {
      console.error("CartItem.item está indefinido.", cartItem);
      return ""; // Retorna una URL o un valor predeterminado si es necesario
    }

    return cartItem.item.webformatURL; // Ambos tipos tienen webformatURL
  };

  const getItemName = (cartItem: CartItem): string => {
    if (!cartItem.item) {
      console.error("CartItem.item está indefinido.", cartItem);
      return ""; // Retorna una cadena vacía si no hay item definido
    }

    // Verifica si el tipo de item es "pokemon"
    if (cartItem.type === "pokemon" && cartItem.item.nombre) {
      return cartItem.item.nombre;
    } else {
      return "Pixabay Image"; // Si no es un Pokémon, asume que es una imagen de Pixabay
    }
  };

  return (
    <header className="py-1 flex justify-around bg-slate-900">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a className="text-white" href={"/"}>
              {" "}
              Inicio
            </a>
          </div>
          <nav className="md:ml-auto flex mt-5 md:mt-0 items-center">
            <div className="text-white ml-10 hover:underline">
              <Link href={"/gifProducts"}>Productos Naturaleza</Link>
            </div>
            <div className="text-white ml-10 hover:underline">
              <Link href={"/products"}>Productos Pokemon</Link>
            </div>
            <div className="carrito relative ms-14">
              <img
                className="hover:shadow-gray-50 cursor-pointer"
                src="https://img.icons8.com/stickers/56/shopping-cart.png"
                alt="shopping-cart"
              />
              <div
                id="carrito"
                className="bg-white p-3 absolute top-full right-0 hidden"
              >
                {isEmpty ? (
                  <p className="text-center font-bold">El carrito está vacío</p>
                ) : (
                  <>
                    <table className="table-fixed text-shadow-effect font-bold drop-shadow bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
                      <thead className="">
                        <tr>
                          <th className="w-20 ">Imagen</th>
                          <th className="w-24">Nombre</th>
                          <th className="w-24">Precio</th>
                          <th className="w-24">Cantidad</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>

                      <tbody className="text-center">
                        {cart.map((cartItem, index) => (
                          <tr className="my-1" key={index}>
                            {" "}
                            {/* Usar index como key solo si no tienes mejor opción */}
                            <td>
                              <img
                                className="h-20 img-shadow-effect"
                                src={getImageUrl(cartItem)}
                                alt="Imagen del producto"
                              />
                            </td>
                            <td className="capitalize">{getItemName(cartItem)}</td>
                            <td className="text-xl">
                              ${cartItem.item?.precio}
                            </td>
                            <td className="gap-4">
                              <div className="flex grow items-center">
                                <div className="flex flex-row items-center grow">
                                  <button
                                    type="button"
                                    className="btn btn-dark w-8 "
                                    onClick={() =>
                                      dispatch({
                                        type: "decrease-quantity",
                                        payload: { id: cartItem.id },
                                      })
                                    }
                                  >
                                    <img
                                      src="https://img.icons8.com/metro/28/minus.png"
                                      alt="minus"
                                    />
                                  </button>
                                  <div className="grow">
                                    <span className="text-xl">
                                      {cartItem.quantity}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-dark w-8"
                                    onClick={() =>
                                      dispatch({
                                        type: "increase-quantity",
                                        payload: { id: cartItem.id },
                                      })
                                    }
                                  >
                                    <img
                                      src="https://img.icons8.com/metro/26/plus.png"
                                      alt="plus"
                                    />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <button
                                className="bg-red-500 text-white rounded-3xl p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                type="button"
                                onClick={() =>
                                  dispatch({
                                    type: "remove-from-cart",
                                    payload: { id: cartItem.id },
                                  })
                                }
                              >
                                <img
                                  src="https://img.icons8.com/ffffff/glyph-neue/100/delete-trash.png"
                                  alt="delete-trash"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-right font-bold text-xl">
                      Total a pagar:{" "}
                      <span className="text-2xl">${cartTotal}</span>
                    </p>
                  </>
                )}
                <button
                  className="btn btn-dark w-full mt-3 p-2 hover:underline hover:text-blue-700"
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
