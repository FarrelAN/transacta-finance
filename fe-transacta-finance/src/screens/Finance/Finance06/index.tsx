import React from "react";
import { View, Image, StyleSheet } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  ViewPager,
  TabBar,
  Tab,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------
import EvaIcons from "types/eva-icon-enum";
import {
  AppIcon,
  Container,
  Content,
  LayoutCustom,
  NavigationAction,
  Text,
} from "components";
import DailyTab from "./DailyTab/DailyTab";
import MonthlyTab from "./MonthlyTab";
import YearlyTab from "./YearlyTab";
import convertPrice from "utils/convertPrice";

const Finance06 = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [showBalance, setShow] = React.useState(false);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[styles.topNavigation, { paddingTop: top + 8 }]}
        title={() => (
          <Text category="t5" status="white" children="Money Manager" />
        )}
        accessoryRight={() => (
          <NavigationAction icon={EvaIcons.Search} status="white" />
        )}
      />
      <Content
        contentContainerStyle={styles.content}
        style={{ marginTop: -48 }}
      >
        <TabBar
          style={styles.tabbar}
          indicatorStyle={styles.indicator}
          onSelect={setSelectedIndex}
          selectedIndex={selectedIndex}
        >
          {TABS.map((tab, index) => {
            return (
              <Tab
                key={index}
                title={() => (
                  <Text capitalize status="warning">
                    {tab}
                  </Text>
                )}
              />
            );
          })}
        </TabBar>
        <LayoutCustom mh={4} gap={12} style={styles.total}>
          <LayoutCustom itemsCenter horizontal gap={12}>
            <Text status="white">Total Balance</Text>
            <AppIcon
              onPress={() => setShow(!showBalance)}
              fill={theme["text-white-color"]}
              name={showBalance ? EvaIcons.Eye : EvaIcons.EyeOff}
            />
          </LayoutCustom>
          <LayoutCustom horizontal itemsCenter gap={24} justify="space-between">
            <Text status="white" category="t2">
              {showBalance ? convertPrice(1204200.423, 2) : "$*********"}
            </Text>
            <LayoutCustom style={styles.grow}>
              <Text status="success-dark">+4.5%</Text>
            </LayoutCustom>
          </LayoutCustom>
        </LayoutCustom>
        <ViewPager
          swipeEnabled={false}
          style={styles.viewpager}
          onSelect={setSelectedIndex}
          selectedIndex={selectedIndex}
        >
          <DailyTab />
          <MonthlyTab />
          <YearlyTab />
        </ViewPager>
      </Content>
    </Container>
  );
});

export default Finance06;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    paddingHorizontal: 24,
    backgroundColor: "color-warning-500",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
    zIndex: 100,
  },
  total: {
    backgroundColor: "color-warning-500",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  content: {
    zIndex: -100,
    paddingBottom: 80,
  },
  viewpager: {
    flex: 1,
  },
  tabbar: {
    marginTop: 64,
    paddingBottom: 8,
  },
  indicator: {
    marginBottom: 24,
    backgroundColor: "color-warning-400",
    height: 3,
  },
  grow: {
    backgroundColor: "background-basic-color-1",
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
const TABS = ["Daily", "MONTHLY", "YEARLY"];
