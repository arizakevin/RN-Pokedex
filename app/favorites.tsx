import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { storage } from "@/api/mmkv";
import { PokemonDetail, getPokemonDetail } from "@/api/pokeapi";
import { useQueries } from "@tanstack/react-query";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  Layout,
  SlideOutLeft,
} from "react-native-reanimated";

const Favorites = () => {
  const [keys, setKeys] = useState<string[]>(storage.getAllKeys());
  const [data, setData] = useState<PokemonDetail[] | undefined>();

  const pokemonQueries = useQueries({
    queries: keys.map((key) => {
      const pokemonId = key.split("-")[1];
      return {
        queryKey: ["pokemon", pokemonId],
        queryFn: () => getPokemonDetail(pokemonId),
      };
    }),
  });
  const allQueriesFinished = pokemonQueries.every((query) => query.isSuccess);
  useEffect(() => {
    if (!allQueriesFinished) return;
    setData(
      pokemonQueries.map((query) => query.data!).sort((a, b) => a.id - b.id)
    );
  }, [allQueriesFinished]);

  const removeFavorite = (pokemonId: number) => {
    storage.delete(`favorite-${pokemonId}`);
    setKeys(storage.getAllKeys());
    if (!data) return;
    setData(data.filter((pokemon) => pokemon.id !== pokemonId));
  };

  if (!allQueriesFinished || !data) {
    return (
      <View style={styles.noFavoritesContainer}>
        <Text style={styles.noFavoritesText}>Loading...</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.noFavoritesContainer}>
        <Text style={styles.noFavoritesText}>You have no favorites yet!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {data.map((pokemon, index) => (
        <Animated.View
          key={pokemon.id}
          style={styles.item}
          layout={Layout.delay(100)}
          entering={FadeIn.delay(80 * index)}
          exiting={SlideOutLeft.duration(200)}
        >
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.preview}
          />
          <Text style={styles.name}>{pokemon.name}</Text>
          <TouchableOpacity onPress={() => removeFavorite(pokemon.id)}>
            <Ionicons name="trash" size={18} color="red" />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

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
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFavoritesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Favorites;
