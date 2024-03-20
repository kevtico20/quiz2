const PIXABAY_API_KEY = '33461008-7e6d1546b7d6e2a4b58ac93a3';
const PIXABAY_API_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=yellow+flowers&image_type=photo`;

export async function buscarImagenes() {
    try {
        const response = await fetch(PIXABAY_API_URL);
        if (!response.ok) {
            throw new Error('No se pudo obtener una respuesta de la API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al buscar imágenes en Pixabay:', error);
        throw error;
    }
}