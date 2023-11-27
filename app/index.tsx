import { Pokemon, getPokemon } from "@/api/pokeapi";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";

export default function App() {
  const pokemonQuery = useQuery({
    queryKey: ["pokemon"],
    refetchOnMount: false,
    queryFn: () => getPokemon(),
  });

  const renderPokemonRow = (pokemon: Pokemon) => {
    return (
      <Link key={pokemon.id} href={`/(pokemon)/${pokemon.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image source={{ uri: pokemon.imageUrl }} style={styles.preview} />
            <Text style={styles.name}>{pokemon.name}</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  if (pokemonQuery.isLoading) {
    return <ActivityIndicator style={styles.activityIndicator} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={pokemonQuery.data}
        estimatedItemSize={150}
        renderItem={(item) => renderPokemonRow(item.item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  preview: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
    textTransform: "capitalize",
    flex: 1,
  },
  activityIndicator: {
    marginTop: 60,
  },
});
