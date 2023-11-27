import { FC } from "react";
import { PokemonDetail, Stat } from "@/api/pokeapi";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FlipInEasyX,
} from "react-native-reanimated";
import { StyleProp, TextStyle, Text, View } from "react-native";
import { capitalize } from "@/utils/strings";

interface DetailPresentationalProps {
  details: PokemonDetail;
  isLoading: boolean;
}
const DetailPresentational: FC<DetailPresentationalProps> = ({
  details,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <View style={[styles.card, { alignItems: "center" }]}>Loading...</View>
    );
  }

  return (
    <>
      <Animated.View
        style={[styles.card, { alignItems: "center" }]}
        entering={FadeIn.delay(200)}
      >
        <Animated.Image
          entering={FadeInUp.delay(500)}
          source={{ uri: details.sprites.front_default }}
          style={styles.preview}
        />
        <Animated.Text
          style={styles.idAndName as StyleProp<TextStyle>}
          entering={FlipInEasyX.delay(500)}
        >
          #{details.id} - {details.name}
        </Animated.Text>
      </Animated.View>
      <Animated.View style={styles.card} entering={FadeInDown.delay(300)}>
        <Text style={{ fontWeight: "bold" }}>Abilities</Text>
        {details.abilities.map((ability: any) => (
          <Animated.Text
            key={ability.ability.name}
            entering={FlipInEasyX.delay(500)}
          >
            {capitalize(ability.ability.name)}
          </Animated.Text>
        ))}
      </Animated.View>
      <Animated.View style={styles.card} entering={FadeInDown.delay(300)}>
        <Text style={{ fontWeight: "bold" }}>Stats</Text>
        {details.stats.map((stat: Stat) => (
          <Animated.Text key={stat.stat.name} entering={FlipInEasyX.delay(500)}>
            {capitalize(stat.stat.name)}: {stat.base_stat}
          </Animated.Text>
        ))}
      </Animated.View>
    </>
  );
};

const styles = {
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    gap: 4,
  },
  preview: {
    width: 200,
    height: 200,
  },
  idAndName: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 10,
  },
};

export default DetailPresentational;
