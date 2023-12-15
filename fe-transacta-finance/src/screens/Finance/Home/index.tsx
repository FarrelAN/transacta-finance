import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
} from "@ui-kitten/components";
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
  Text,
} from "components";
import CreditCard from "./CreditCard";
import TransactionItem from "./TransactionItem";
import { faker } from "@faker-js/faker";
import ServiceItem from "./ServiceItem";
// ----------------------------- Types ----------------------------------------
import EvaIcons from "types/eva-icon-enum";
// ----------------------------- Reanimated 2 -----------------------
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
// ----------------------------- Navigation -----------------------
import { useNavigation } from "@react-navigation/native";

const Finance07 = React.memo(() => {
  const { goBack } = useNavigation();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const time_now = new Date().getHours();
  const _intro = () => {
    if (time_now >= 0 && time_now < 12) {
      return "Good Morning!";
    } else if (time_now == 12) {
      return "Good Noon!";
    } else if (time_now >= 12 && time_now <= 17) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  };
  const notification = 5;

  const progressValue = useSharedValue(0);

  const randomNames = [
    "M. Farrel Athaillah N.",
    "Prima Shalih",
    "M. Najih Aflah",
  ];
  const randomName =
    randomNames[Math.floor(Math.random() * randomNames.length)];

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryLeft={() => (
          <LayoutCustom horizontal itemsCenter gap={12} onPress={goBack}>
            <Avatar source={Images.avatar.avatar_farrel} shape="square" />
            <LayoutCustom>
              <Text category="subhead" status="grey">
                {_intro()}
              </Text>
              <Text>{randomName}</Text>
            </LayoutCustom>
          </LayoutCustom>
        )}
        accessoryRight={() => (
          <LayoutCustom>
            <NavigationAction icon={EvaIcons.BellOutline} />
            {notification > 0 && (
              <LayoutCustom style={styles.notification}>
                <Text status="white" category="c1">
                  {notification}
                </Text>
              </LayoutCustom>
            )}
          </LayoutCustom>
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom gap={16} mh={24}>
          <Text category="t5">Services</Text>
          <LayoutCustom horizontal gap={12}>
            {SAMPLE_SERVICE.map((service, index) => {
              return <ServiceItem item={service} key={index} />;
            })}
          </LayoutCustom>
        </LayoutCustom>
        <Carousel
          data={SAMPLE_CARD}
          width={width * 0.86}
          height={width * 0.5}
          style={styles.carousel}
          loop
          pagingEnabled={true}
          snapEnabled={true}
          autoPlay={false}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.98,
            parallaxScrollingOffset: 24,
          }}
          renderItem={({ item, index, animationValue }) => (
            <CreditCard
              data={item}
              key={index}
              animationValue={animationValue}
            />
          )}
        />
        <LayoutCustom mt={32} gap={24} mh={24}>
          <LayoutCustom horizontal justify="space-between" itemsCenter mb={12}>
            <Text category="t5">Recent Transactions</Text>
            <LayoutCustom horizontal itemsCenter>
              <Text category="body" status="primary">
                See All
              </Text>
              <AppIcon
                name={EvaIcons.ChevronRight}
                fill={theme["text-primary-color"]}
              />
            </LayoutCustom>
          </LayoutCustom>
          {SAMPLE_TRANSACTION.map((transaction, index) => {
            return <TransactionItem data={transaction} key={index} />;
          })}
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default Finance07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: 24,
  },
  notification: {
    position: "absolute",
    top: 2,
    right: 4,
    width: 17,
    height: 17,
    borderRadius: 99,
    backgroundColor: "color-danger-active",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingTop: 24,
    paddingBottom: 60,
  },
  carousel: {
    width: "100%",
    justifyContent: "center",
    marginTop: 40,
    alignItems: "center",
  },
});

const SAMPLE_TRANSACTION = [
  {
    image: Images.finance.prime,
    title: "Prime Membership",
    created_at: new Date(new Date().setHours(new Date().getHours())),
    amount: 1230,
  },
  {
    image: Images.finance.nike,
    title: "Nike Store",
    created_at: new Date(new Date().setHours(new Date().getHours()) - 1),
    amount: -4230,
  },
  {
    title: faker.name.firstName("male"),
    created_at: new Date(new Date().setHours(new Date().getHours()) - 2),
    amount: 11230,
  },
  {
    title: faker.name.firstName("female"),
    created_at: new Date(new Date().setHours(new Date().getHours()) - 4),
    amount: -5230,
  },
];

const SAMPLE_SERVICE = [
  { icon: "qr", title: "Scan & Pay" },
  { icon: "income", title: "Send Money" },
  { icon: "outcome", title: "Receive Money" },
  { icon: "wallet_fill", title: "Wallet" },
];

const SAMPLE_CARD = [
  {
    image: Images.finance.creditcard_01,
    number: "1234",
    balance: 123223,
    exp_time: "09/25",
  },
  {
    image: Images.finance.creditcard_02,
    number: "1234",
    balance: 123223,
    exp_time: "09/25",
  },
  {
    image: Images.finance.creditcard_03,
    number: "1234",
    balance: 123223,
    exp_time: "09/25",
  },
];
