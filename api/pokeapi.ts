// Description: PokeAPI

// Pokemon List API
export interface Pokemon {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
}
export const getPokemon = async (limit = 2000): Promise<Pokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const data = await response.json();
  return data.results.map((item: Pokemon, index: number) => ({
    ...item,
    id: index + 1,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
};

// Pokemon Detail API
export type Ability = {
  ability: {
    name: string;
  };
};
export type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};
export interface PokemonDetail extends Pokemon {
  sprites: any;
  abilities: Ability[];
  stats: Stat[];
}
export const getPokemonDetail = async (id: string): Promise<PokemonDetail> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return {
    ...data,
    id,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
};
