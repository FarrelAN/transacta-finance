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
import ProgressBarLeaf from "./ProgressBarLeaf";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

const Finance05 = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  const [activeIndex, setActiveIndex] = React.useState(-1);
  const progress = useDerivedValue(() => {
    return withTiming(activeIndex);
  }, [activeIndex]);

  const onNext = () => {
    setActiveIndex(activeIndex + 1);
  };
  const onPrv = () => {
    if (activeIndex === 0) {
      goBack();
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title="Input New Transaction"
        accessoryLeft={() => <NavigationAction onPress={onPrv} />}
      />
      <Content contentContainerStyle={styles.content}>
        <ProgressBarLeaf progress={progress} length={3} />
        <ViewPager
          style={styles.viewPager}
          selectedIndex={activeIndex}
          onSelect={setActiveIndex}
        >
          <FirstStep onNext={onNext} />
          <SecondStep onNext={onNext} />
          <ThirdStep />
        </ViewPager>
      </Content>
    </Container>
  );
});

export default Finance05;

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
