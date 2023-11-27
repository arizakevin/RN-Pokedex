import React from "react";
import { Link, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const queryClinet = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClinet}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Pokedex",
            headerRight: () => (
              <Link href="/favorites" asChild>
                <TouchableOpacity>
                  <Ionicons name="heart-circle" size={26} color={"white"} />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen name="(pokemon)/[id]" options={{ title: "" }} />
        <Stack.Screen
          name="favorites"
          options={{ title: "Favorites", presentation: "modal" }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;
