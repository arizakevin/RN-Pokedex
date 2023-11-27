import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getPokemonDetail } from "@/api/pokeapi";
import { capitalize } from "@/utils/strings";
import { Ionicons } from "@expo/vector-icons";
import { storage } from "@/api/mmkv";
import DetailPresentational from "./detail.presentational";

const DetailContainer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState<boolean>(
    storage.getString(`favorite-${id}`) === "true"
  );

  const pokemonDetailQuery = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonDetail(id!),
    refetchOnMount: false,
  });

  const details = pokemonDetailQuery.data;

  const toggleFavorite = async () => {
    storage.set(`favorite-${id}`, !isFavorite ? "true" : "false");
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (!pokemonDetailQuery.isSuccess) return;
    navigation.setOptions({
      title: capitalize(pokemonDetailQuery.data.name),
    });
  }, [pokemonDetailQuery.isSuccess]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={22}
            color={"white"}
          />
        </Text>
      ),
    });
  }, [isFavorite]);

  if (!details) return null;

  return (
    <DetailPresentational
      details={details}
      isLoading={pokemonDetailQuery.isLoading}
    />
  );
};

export default DetailContainer;
