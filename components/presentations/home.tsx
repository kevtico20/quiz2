"use client";

import Header from "./header";
import Footer from "./footer";
import { cartReducer, initialState } from "../containers/reducers/cart-reducer";
import { useReducer, useEffect } from "react";

const Index: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Ana García",
      review:
        "¡Increíble calidad y servicio! Compré varias obras de arte y quedé totalmente satisfecha.",
    },
    {
      id: 2,
      name: "Juan Pérez",
      review:
        "Estoy muy contento con mi compra. Las imágenes son hermosas y la entrega fue rápida.",
    },
    // Agrega más reseñas según sea necesario
  ];

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch}></Header>
      <main className="flex-1">
        <div className="container mx-auto">
          <section
            className="relative h-96 bg-cover bg-center"
            style={{ backgroundImage: 'url("/ruta/de/la/imagen.jpg")' }}
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <h1 className="text-4xl font-bold text-white text-center">
                Bienvenido a Nuestra Tienda
              </h1>
            </div>
          </section>
          <section className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">¿Quiénes Somos?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Carta 1 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">Misión</h3>
                <p className="text-gray-700">
                  Nuestra misión es proporcionar a nuestros clientes las mejores
                  imágenes artísticas, inspirando y enriqueciendo sus vidas.
                </p>
              </div>

              {/* Carta 2 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">Visión</h3>
                <p className="text-gray-700">
                  Nuestra visión es convertirnos en la principal plataforma para
                  la adquisición de obras de arte, ofreciendo una experiencia
                  única y satisfactoria.
                </p>
              </div>

              {/* Carta 3 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">Valores</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Calidad</li>
                  <li>Innovación</li>
                  <li>Integridad</li>
                  <li>Compromiso</li>
                </ul>
              </div>
            </div>
          </section>
          <section className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">
              Opiniones de Nuestros Clientes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg p-6 shadow-md"
                >
                  <h3 className="text-xl font-bold mb-2">{review.name}</h3>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Index;
