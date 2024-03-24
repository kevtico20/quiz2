import React from 'react';

const ProductPi = ({ image }) => {
  // Asignación de un precio ficticio para el ejemplo
  const precio = "9.99";

  return (
    <div className="col-md-6 col-lg-4 my-4">
      <div className="card shadow-lg border-0 rounded-lg transform transition hover:scale-105 duration-300">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg">
          <div className="row align-items-center">
            <div className="col-12">
              <img
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 2xl:w-120 2xl:h-120 mx-auto rounded-full border-4 border-white shadow-md"
                src={image.webformatURL}
                alt={image.tags ? image.tags : "Imagen sin etiquetas"}
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-b-lg">
          <h3 className="text-gray-800 text-lg md:text-xl lg:text-2xl font-bold">{image.tags ? image.tags : "Imagen de Pixabay"}</h3>
          <p className="text-lg font-bold text-gray-800">${precio}</p>
          <button
            type="button"
            className="mt-4 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => {
              // Aquí deberías implementar la lógica para manejar la acción de agregar al carrito.
              console.log("Agregar al carrito no implementado");
            }}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPi;
