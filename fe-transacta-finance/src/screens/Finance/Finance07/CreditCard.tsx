import React from "react";
import { ImageSourcePropType, ImageBackground } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";

// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";

// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, Text } from "components";
import convertPrice from "utils/convertPrice";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ICreditCardProps {
  image: ImageSourcePropType;
  number: string;
  balance: number;
  exp_time: string;
}

const CreditCard: React.FC<{
  data: ICreditCardProps;
  animationValue: Animated.SharedValue<number>;
}> = ({ data, animationValue }) => {
  const styles = useStyleSheet(themedStyles);
  const { height, width, top, bottom } = useLayout();

  const maskStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-1, 0, 1], [0.9, 1, 0.9]);
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.7, 1, 0.7]
    );
    const mt = interpolate(animationValue.value, [-1, 0, 1], [8, 0, 8]);
    return {
      transform: [{ scale: scale }],
      marginTop: mt,
      flex: 1,
      opacity,
    };
  }, [animationValue]);

  return (
    <Animated.View style={maskStyle}>
      <ImageBackground
        source={data.image}
        style={{
          ...styles.container,
          width: 305.97 * (width / 375),
          height: 178.72 * (height / 812),
        }}
      >
        <LayoutCustom gap={8}>
          <Text category="body" status="white" opacity={0.7}>
            Current Balance
          </Text>
          <Text category="t3" status="white">
            {convertPrice(data.balance, 2)}
          </Text>
        </LayoutCustom>
        <LayoutCustom horizontal itemsCenter justify="space-between">
          <Text category="body" status="white">
            **** **** **** {data.number}
          </Text>
          <Text category="body" status="white">
            {data.exp_time}
          </Text>
        </LayoutCustom>
      </ImageBackground>
    </Animated.View>
  );
};

export default CreditCard;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 40,
    marginLeft: 6,
    justifyContent: "space-between",
  },
});
