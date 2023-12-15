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
import { memo } from "react";
import { Image, FlatList } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, Toggle } from "@ui-kitten/components";
// ----------------------------- Assets -----------------------------------
import { Images } from "assets/images";
// ----------------------------- Hook -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  FinanceStackParamList,
  RootStackParamList,
} from "types/navigation-types";
// ----------------------------- Components -----------------------------------
import {
  NavigationAction,
  Container,
  ButtonIntro,
  LinearGradientText,
} from "components";
// ----------------------------- Redux -----------------------------------
import {
  appSelector,
  switchTheme,
  ThemeMode,
} from "reduxs/reducers/app-reducer";
import { useAppSelector, useAppDispatch } from "reduxs/store";

import StatisticScreen from "./StatisticScreen";

const Tab = createBottomTabNavigator();

const Screen = () => {
  const { navigate } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const themeMode = useAppSelector(appSelector).theme;
  const dispatch = useAppDispatch();

  return (
    <>
      <TopNavigation
        alignment="center"
        title={() => (
          <LinearGradientText text={"Finance"} textStyle={styles.title} />
        )}
        // accessoryLeft={() => <NavigationAction />}
        accessoryRight={() => (
          <Toggle
            status="success"
            checked={themeMode === ThemeMode.LIGHT}
            onChange={() => {
              dispatch(
                switchTheme(
                  themeMode === ThemeMode.DARK
                    ? ThemeMode.LIGHT
                    : ThemeMode.DARK
                )
              );
            }}
          />
        )}
      />
    </>
  );
};

import Finance05 from "screens/Finance/InputTransaction";
import Finance06 from "screens/Finance/Finance06";
import Finance07 from "screens/Finance/Home";
import Finance08 from "screens/Finance/Finance08";
import FinanceIntro from "screens/Finance/FinanceIntro";
import AnalyseTransaction from "../AnalyseTransaction";

const FinanceMain = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
      <LayoutCustom horizontal style={styles.tabbar} level="1">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const getLabel = () => {
            switch (index) {
              case 0:
                return "Home";
              case 1:
                return "Statistics";
              case 3:
                return "My Card";
              case 4:
                return "Profile";
              default:
                break;
            }
          };

          const isFocused = state.index === index;
          const getIcon = () => {
            switch (index) {
              case 0:
                if (!isFocused) {
                  return "home";
                } else {
                  return "home_fill";
                }
              case 1:
                if (!isFocused) {
                  return "chart";
                } else {
                  return "chart_fill";
                }
              case 3:
                if (!isFocused) {
                  return "wallet";
                } else {
                  return "wallet_fill";
                }
              case 4:
                if (!isFocused) {
                  return "person";
                } else {
                  return "person_fill";
                }
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
          if (index === 2) {
            return (
              <LayoutCustom
                key="addmore"
                style={styles.button}
                level="11"
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <AppIcon
                  name={EvaIcons.PlusSquare}
                  size={32}
                  fill={theme["background-basic-color-1"]}
                />
              </LayoutCustom>
            );
          }

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
              style={{
                width: 76,
                paddingBottom: 24,
                alignItems: "center",
                rowGap: 4,
                paddingTop: 12,
                opacity: isFocused ? 1 : 0.5,
              }}
            >
              <Icon
                pack="assets"
                name={getIcon()}
                style={[
                  styles.icon,
                  isFocused && {
                    tintColor: theme["text-primary-color"],
                  },
                ]}
              />
              <Text
                category="c1"
                status={!isFocused ? "placeholder" : "primary"}
              >
                {getLabel()}
              </Text>
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
        <Tab.Screen name="Home" component={Finance07} />
        <Tab.Screen name="Statistics" component={Finance06} />
        <Tab.Screen name="More" component={Finance05} />
        <Tab.Screen name="My Cards" component={Finance08} />
        <Tab.Screen name="Profile" component={Screen} />
      </Tab.Navigator>
    </LayoutCustom>
  );
};
export default FinanceMain;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabbar: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...globalStyle.shadow,
  },
  icon: {
    width: 24,
    height: 24,
  },
  button: {
    borderRadius: 99,
    alignSelf: "flex-start",
    padding: 12,
    marginTop: 4,
  },
});
