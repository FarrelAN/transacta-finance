import * as React from "react";
import { StatusBar, View } from "react-native";

// ------------------------------- Navigation -------------------------------
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./root-navigation";
import { RootStackParamList } from "types/navigation-types";

// -------------------------------- Themes UI Kitten --------------------------------
import * as eva from "@eva-design/eva";
import { ApplicationProvider, useTheme } from "@ui-kitten/components";
import { default as darkTheme } from "constants/themes/dark.json";
import { default as lightTheme } from "constants/themes/light.json";
import { default as customTheme } from "constants/themes/app-themes.json";
import { default as customMapping } from "constants/themes/mapping.json";

// -------------------------------- Reduxs --------------------------------
import { useAppSelector } from "reduxs/store";
import { appSelector, ThemeMode } from "reduxs/reducers/app-reducer";

// -------------------------------- Screens --------------------------------
import { FinanceStackParamList } from "types/navigation-types";
import AnalyseTransaction from "screens/Finance/AnalyseTransaction";
import Login from "screens/Auth/Login";
import Register from "screens/Auth/Register";
import FinanceMain from "screens/Finance/FinanceMain";
import Finance07 from "screens/Finance/Home";
import FinanceIntro from "screens/Finance/FinanceIntro";

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppContainer = () => {
  const themes = useTheme();
  const theme = useAppSelector(appSelector).theme;
  const isDarkMode = theme === ThemeMode.DARK;
  return (
    <ApplicationProvider
      {...eva}
      theme={
        isDarkMode
          ? { ...eva.dark, ...customTheme, ...darkTheme }
          : { ...eva.light, ...customTheme, ...lightTheme }
      }
      customMapping={{ ...eva.mapping, ...customMapping }}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        translucent={true}
        backgroundColor={"#00000000"}
      />
      <NavigationContainer ref={navigationRef}>
        <View
          style={{
            backgroundColor: themes["background-basic-color-1"],
            flex: 1,
          }}
        >
          <Stack.Navigator
            initialRouteName={"SplashScreen"}
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* <Stack.Screen name='Settings' component={SettingScreen} /> */}
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
            {/* <Stack.Screen name="Walkthrough" component={WalkthroughNavigator} />
            <Stack.Screen name="Authenticate" component={AuthenticateNavigator} />
            <Stack.Screen name="Ecommerce" component={EcommerceNavigator} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Finance" component={FinanceMain} />
            <Stack.Screen name="Analysis" component={AnalyseTransaction} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default AppContainer;
