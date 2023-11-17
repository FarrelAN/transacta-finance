import * as React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import { TouchableOpacity, View } from "react-native";
import { AppIcon, LayoutCustom, Text } from "components";
import {
  Icon,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import EvaIcons from "types/eva-icon-enum";
import { globalStyle } from "styles/globalStyle";
import HomeScreen from "./Home/HomeScreen";

const Tab = createBottomTabNavigator();

const Screen = () => {
  return <></>;
};

const Finance02 = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
      <LayoutCustom horizontal style={styles.tabbar} level="1">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;
          const getIcon = () => {
            switch (index) {
              case 0:
                return "home_fill";
              case 1:
                return "wallet_fill";
              case 2:
                return "chart_fill";
              case 3:
                return "person_fill";
              default:
                break;
            }
          };
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.button}
            >
              <Icon
                pack="assets"
                name={getIcon()}
                style={[
                  styles.icon,
                  {
                    opacity: isFocused ? 1 : 0.5,
                    tintColor: isFocused
                      ? theme["text-primary-color"]
                      : theme["text-placeholder-color"],
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </LayoutCustom>
    );
  }
  return (
    <LayoutCustom style={styles.container} level="1">
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MyCard" component={Screen} />
        <Tab.Screen name="Statistic" component={Screen} />
        <Tab.Screen name="Profile" component={Screen} />
      </Tab.Navigator>
    </LayoutCustom>
  );
};
export default Finance02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabbar: {
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 4,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...globalStyle.shadow,
  },
  icon: {
    width: 28,
    height: 28,
  },
  button: {
    width: 76,
    paddingBottom: 24,
    alignItems: "center",
    rowGap: 4,
    paddingTop: 12,
    marginBottom: 8,
  },
});
