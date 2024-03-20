export interface Pokemon {
    id: number; // Agregar ID único
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
    sprites: { front_default: string };
}
export type CartItem = Pokemon & {
    quantity: number;
}

// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }
// export type CartItem = Omit<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }

