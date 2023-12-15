import React from "react";
import { View, Image, StyleSheet } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import {
  Container,
  Content,
  LayoutCustom,
  NavigationAction,
  RoundedButton,
  Text,
} from "components";
import BalanceCard from "./BalanceCard";
import { sample_coin } from "./data";
import CoinItem from "./CoinItem";

const Finance08 = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={() => <Text category="t5">{"My Cards"}</Text>}
        alignment="center"
        style={styles.topNavigation}
        accessoryLeft={() => <RoundedButton icon={"menu"} onPress={goBack} />}
        accessoryRight={() => <RoundedButton icon={"qr"} />}
      />
      <Content contentContainerStyle={styles.content}>
        <BalanceCard balance={233004.91} grow={12.2} />
        <LayoutCustom
          itemsCenter
          horizontal
          justify="space-between"
          margin={24}
        >
          <Text>Trending Crypto</Text>
          <LayoutCustom horizontal itemsCenter gap={12}>
            <RoundedButton icon={"box"} />
            <RoundedButton icon={"filter"} />
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom>
          {sample_coin.map((coin, index) => {
            return <CoinItem data={coin} index={index} key={index} />;
          })}
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default Finance08;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 24,
  },
});

const SAMPLE = [{ title: "" }];
