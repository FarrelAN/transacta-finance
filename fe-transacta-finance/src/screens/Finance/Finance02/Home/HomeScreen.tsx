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
  AppIcon,
  Container,
  Content,
  LayoutCustom,
  NavigationAction,
  RoundedButton,
  Text,
} from "components";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { FinanceStackParamList } from "types/navigation-types";
import CreditCard from "./CreditCard";
import PaginationItem from "./Pagination";
import IButton from "./IButton";
import EvaIcons from "types/eva-icon-enum";
import { Icons } from "assets/icons";
import ActivityItem from "./ActivityItem";

const HomeScreen = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const { height, width, top, bottom } = useLayout();

  const progressValue = useSharedValue<number>(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title="Home"
        style={styles.topNavigation}
        accessoryLeft={() => (
          <RoundedButton
            icon="arrow-left"
            onPress={() => navigate("FinanceIntro")}
          />
        )}
        accessoryRight={() => <RoundedButton icon="bell" />}
      />
      <Content contentContainerStyle={styles.content}>
        <Carousel
          data={CARDS}
          width={width * 0.9}
          height={212 * (height / 812)}
          loop={true}
          style={{
            width: width,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.96,
            parallaxScrollingOffset: 10,
          }}
          renderItem={({ item, index }) => {
            return <CreditCard item={item} key={index} />;
          }}
        />
        <LayoutCustom horizontal itemsCenter justify="center" gap={8}>
          {CARDS.map((item, index) => {
            return (
              <PaginationItem
                backgroundColor={theme["background-basic-color-6"]}
                animValue={progressValue}
                index={index}
                key={index}
                length={CARDS.length}
              />
            );
          })}
        </LayoutCustom>
        <LayoutCustom
          horizontal
          itemsCenter
          justify="center"
          gap={48}
          mt={32}
          mb={40}
        >
          <IButton icon="wallet_send" title="Send money" />
          <IButton icon="qr" title="QR Actions" />
          <IButton icon="document" title={`Pay\nbill`} />
        </LayoutCustom>
        <LayoutCustom horizontal itemsCenter justify="space-between" mh={24}>
          <Text>Recent Activities</Text>
          <LayoutCustom horizontal itemsCenter gap={4}>
            <Text category="c1" status="primary">
              See All
            </Text>
            <AppIcon
              size={18}
              name={EvaIcons.ArrowRight}
              fill={theme["text-primary-color"]}
            />
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom gap={16} mt={24}>
          {Activities.map((item, index) => {
            return <ActivityItem item={item} key={index} />;
          })}
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default HomeScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 120,
  },
  topNavigation: {
    paddingHorizontal: 24,
  },
});

const CARDS = [
  { color: "#8438FF", balance: 15245.9, card_number: "5282300014453286" },
  { color: "#38CFFF", balance: 24245.9, card_number: "5282300014453286" },
  { color: "#FF7438", balance: 151245.9, card_number: "5282300014453286" },
];

const Activities = [
  {
    id: "1",
    title: "Langganan Netflix",
    icon: "netflix",
    amount: -29.9,
    create_at: "31.05.2023",
  },
  {
    id: "2",
    title: "Jajan Kantek",
    icon: "turkcell",
    amount: -242.05,
    create_at: "30.05.2023",
  },
  {
    id: "3",
    title: "Shopping Invoice",
    icon: "wallet_send",
    amount: -1242.05,
    create_at: "30.05.2023",
  },
  {
    id: "3",
    title: "Food Invoice",
    icon: "wallet_send",
    amount: -42.05,
    create_at: "27.05.2023",
  },
];
