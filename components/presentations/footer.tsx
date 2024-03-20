"use client"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-8 ">
      <div className="container mx-auto flex justify-center">
        <p>&copy; {new Date().getFullYear()} Mi Tienda de Imágenes. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
