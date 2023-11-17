import React from "react";
import {
  View,
  ViewStyle,
  StyleProp,
  ColorValue,
  TouchableOpacity,
} from "react-native";
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
import Text from "./Text";

interface Props {
  tabs?: string[];
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  backgroundTab?: string | ColorValue;
  backgroundTabActive?: string | ColorValue;
  onChangeTab: (index: number) => void;
  tabActive: number;
  uppercase?: boolean;
  capitalize?: boolean;
}
const TabBar = ({
  tabs,
  onChangeTab,
  style,
  tabStyle,
  capitalize,
  uppercase = true,
  backgroundTab,
  tabActive,
  backgroundTabActive,
}: Props) => {
  const theme = useTheme();
  const _onChangeTab = React.useCallback(
    (number: number) => {
      onChangeTab(number);
    },
    [onChangeTab]
  );
  const styles = useStyleSheet(themedStyles);
  let bg = backgroundTab ? backgroundTab : theme["background-basic-color-3"];
  let active_bg = backgroundTabActive
    ? backgroundTabActive
    : theme["color-primary-default"];
  return (
    <View style={[styles.container, style, { backgroundColor: bg }]}>
      {tabs?.map((item, index) => {
        const backgroundColor = {
          backgroundColor: tabActive === index ? active_bg : undefined,
        };
        return (
          <TouchableOpacity
            onPress={() => _onChangeTab(index)}
            key={index}
            style={[styles.tabStyle, backgroundColor, tabStyle]}
          >
            <Text
              capitalize={capitalize}
              uppercase={uppercase}
              center
              status={tabActive === index ? "white" : "basic"}
              category="c1"
              children={item}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default TabBar;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 2,
    borderWidth: 2,
    borderColor: "background-basic-color-4",
  },
  tabStyle: {
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    flex: 1,
    borderWidth: 0,
  },
});
