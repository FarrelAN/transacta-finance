import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { View, Image, StyleSheet } from "react-native";
import TypingAnimation from "components/TypingAnimation";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Button,
  Divider,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { navigate } from "navigation/root-navigation";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import {
  Container,
  Content,
  IDivider,
  LayoutCustom,
  NavigationAction,
  Text,
} from "components";
import EvaIcons from "types/eva-icon-enum";
import LayoutCurrency from "./LayoutCurrency";
import AnimatedCircularProgress from "./CircleProgress/AnimatedCircularProgress";
import convertPrice from "utils/convertPrice";
import TransactionItem from "./TransactionItem";

const AnalyseTransaction = React.memo(() => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  const sample = {
    spends: -71323,
    daily_budgets: 100000,
  };
  const _fill = (-sample.spends / sample.daily_budgets) * 100;

  useEffect(() => {
    const handleSubmit = async () => {
      setIsLoading(true); // Set loading to true when starting the request
      const response = await getResponseFromOpenAI(
        "Say a greeting as an Finance AI, max 1 sentence"
      );
      setResponse(response);
      setIsLoading(false); // Set loading to false when receiving the response
    };

    handleSubmit();
  }, []);

  const getResponseFromOpenAI = async (query: string) => {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // Optional (user controls the default),
          messages: [{ role: "user", content: query }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryRight={() => (
          <LayoutCustom gap={16} horizontal itemsCenter>
            <NavigationAction icon={EvaIcons.SearchOutline} />
            <NavigationAction icon={EvaIcons.BellOutline} />
          </LayoutCustom>
        )}
        accessoryLeft={() => (
          <LayoutCustom gap={16} horizontal itemsCenter>
            <>
              <NavigationAction
                icon={EvaIcons.Menu2}
                onPress={() => navigate("Finance", { screen: "Home" })}
              />
              <Text category="t5">AI Analysis</Text>
            </>
          </LayoutCustom>
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom itemsCenter horizontal gap={16} justify="space-between">
          <AnimatedCircularProgress
            size={180}
            width={12}
            backgroundWidth={4}
            fill={_fill}
            tintColor={theme["text-success-color"]}
            tintColorSecondary={theme["color-primary-500"]}
            backgroundColor={theme["background-basic-color-4"]}
            arcSweepAngle={264}
            rotation={228}
            lineCap="round"
          >
            {(fill: number) => (
              <LayoutCustom itemsCenter gap={8}>
                <Text category="t3">{Math.round((100 * fill) / 100)}%</Text>
              </LayoutCustom>
            )}
          </AnimatedCircularProgress>
          <LayoutCustom gap={24} mt={-24}>
            <LayoutCurrency title={"Your Spends"} currency={sample.spends} />
            <LayoutCurrency
              title={"Daily Budgets"}
              currency={sample.daily_budgets}
            />
          </LayoutCustom>
        </LayoutCustom>
        <IDivider marginTop={12} marginBottom={32} />
        <LayoutCustom horizontal mb={16} itemsCenter justify="space-between">
          <Text category="t5">Analysis Results</Text>
          <Text underline category="c1" status="primary">
            See More
          </Text>
        </LayoutCustom>
        <LayoutCustom gap={30} itemsCenter>
          <Text category="subhead">
            <TypingAnimation
              text={isLoading ? "Waiting for AI response..." : response}
              responseReady={!isLoading}
            />
          </Text>
        </LayoutCustom>
        <LayoutCustom mt={30} itemsCenter>
          {CARDS.map((transaction, index) => {
            return <TransactionItem transaction={transaction} key={index} />;
          })}
        </LayoutCustom>
        <Button children={"Add New Account"} appearance="outline" />
      </Content>
    </Container>
  );
});

export default AnalyseTransaction;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 80,
  },
  topNavigation: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "background-basic-color-3",
  },
  layout: {},
});

const CARDS = [
  {
    title: "Money Transfer",
    image: Images.avatar.avatar_05,
    balance: 145,
    createAt: new Date(),
  },
  {
    title: "Amazon",
    image: Images.finance.amazon,
    balance: -2345,
    createAt: new Date(),
  },
  {
    title: "Netflix Premium",
    image: Images.finance.netflix,
    balance: -45,
    createAt: new Date(new Date().setDate(new Date().getDay() - 1)),
  },
  {
    title: "Apple",
    image: Images.finance.apple,
    balance: -441,
    createAt: new Date(new Date().setDate(new Date().getDay() - 2)),
  },
  {
    title: "Paypall Transfer",
    image: Images.finance.paypall,
    balance: -125,
    createAt: new Date(new Date().setDate(new Date().getDay() - 3)),
  },
];
