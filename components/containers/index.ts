export type Pokemon = {
    id: number;
    nombre: string;
    vida: number;
    tipo: string;
    fuerza: number;
    imagen: string;
    precio: number;
}
export interface PokemonData {
    name: string;
    stats: { stat: { name: string }, base_stat: number }[];
    types: { type: { name: string } }[];
    sprites: {
        front_default: string;
    };
}

export type CartItem = {
    id: number; 
    quantity: number;
    item: Pokemon | PixabayImage; 
};


export type PixabayImage = {
    id: number;
    webformatURL: string;
    tags: string;
    precio:number;
  };


