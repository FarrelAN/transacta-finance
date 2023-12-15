import React from "react";
import { View, Image, StyleSheet } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  ViewPager,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
import FinanceMain from "screens/Finance/FinanceMain";
import { navigate } from "navigation/root-navigation";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import { Container, Content, NavigationAction, Text } from "components";
import EvaIcons from "types/eva-icon-enum";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import FirstStep from "./FirstStep";

const Login = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { height, width, top, bottom } = useLayout();
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = React.useState(-1);
  const progress = useDerivedValue(() => {
    return withTiming(activeIndex);
  }, [activeIndex]);

  const onNext = () => {
    navigate("Finance");
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <ViewPager
          style={styles.viewPager}
          selectedIndex={activeIndex}
          onSelect={setActiveIndex}
        >
          <FirstStep onNext={onNext} />
        </ViewPager>
      </Content>
    </Container>
  );
});

export default Login;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
