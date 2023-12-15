import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  SplashScreen: undefined;
  Settings: NavigatorScreenParams<SettingStackParamList> | undefined;
  Walkthrough: NavigatorScreenParams<WalkthroughStackParamList> | undefined;
  Authenticate: NavigatorScreenParams<AuthenticateStackParamList> | undefined;
  Ecommerce: NavigatorScreenParams<EcommerceStackParamList> | undefined;
  Profile: NavigatorScreenParams<WalkthroughStackParamList> | undefined;
  Login: NavigatorScreenParams<WalkthroughStackParamList> | undefined;
  Register: NavigatorScreenParams<WalkthroughStackParamList> | undefined;
  Finance: NavigatorScreenParams<WalkthroughStackParamList> | undefined;
  Analysis: NavigatorScreenParams<WalkthroughStackParamList> | undefined;
  Dashboard: NavigatorScreenParams<WalkthroughStackParamList> | undefined;
  SlideMenu: NavigatorScreenParams<SlideMenuStackParamList> | undefined;
};
export type SettingStackParamList = {
  Home: undefined;
  Theme: undefined;
};
export type WalkthroughStackParamList = {
  WalkthroughIntro: undefined;
  Walkthrough01: undefined;
  Walkthrough02: undefined;
  Walkthrough03: undefined;
  Walkthrough04: undefined;
  Walkthrough05: undefined;
  Walkthrough06: undefined;
  Walkthrough07: undefined;
  Walkthrough08: undefined;
  Walkthrough09: undefined;
  Walkthrough10: undefined;
};
export type AuthenticateStackParamList = {
  AuthenticateIntro: undefined;
  Authenticate01: undefined;
  Authenticate02: undefined;
  Authenticate03: undefined;
  Authenticate04: undefined;
  Authenticate05: undefined;
  Authenticate06: undefined;
  Authenticate07: undefined;
  Authenticate08: undefined;
  Authenticate09: undefined;
  Authenticate10: undefined;
};
export type EcommerceStackParamList = {
  EcommerceIntro: undefined;
  Ecommerce01: undefined;
  Ecommerce02: undefined;
  Ecommerce03: undefined;
  Ecommerce04: undefined;
  Ecommerce05: undefined;
  Ecommerce06: undefined;
  Ecommerce07: undefined;
  Ecommerce08: undefined;
  Ecommerce09: undefined;
  Ecommerce10: undefined;
};
export type FinanceStackParamList = {
  FinanceIntro: undefined;
  Finance01: undefined;
  Finance02: undefined;
  Finance03: undefined;
  Finance04: undefined;
  Finance05: undefined;
  Finance06: undefined;
  Finance07: undefined;
  Finance08: undefined;
  Finance09: undefined;
  Finance10: undefined;
};
export type SlideMenuStackParamList = {
  SlideMenuIntro: undefined;
  SlideMenu01: undefined;
  SlideMenu02: undefined;
  SlideMenu03: undefined;
  SlideMenu04: undefined;
  SlideMenu05: undefined;
  SlideMenu06: undefined;
  SlideMenu07: undefined;
  SlideMenu08: undefined;
  SlideMenu09: undefined;
  SlideMenu10: undefined;
};
