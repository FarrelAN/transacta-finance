import React from "react";
import { navigate } from "navigation/root-navigation";

// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";

// ----------------------------- Types ---------------------------------------
import EvaIcons from "types/eva-icon-enum";

// ----------------------------- Components && Elements -----------------------

//onPress={() => navigate('Finance', { screen: 'Home' })}

import Finance07 from "screens/Finance/Home";
import FinanceMain from "screens/Finance/FinanceMain";
import AnalyseTransaction from "screens/Finance/AnalyseTransaction";

import _ from "lodash";
import ChartPie from "./ChartPie";
import TransactionYear from "./TransactionYear";
import { AppIcon, LayoutCustom, Text } from "components";

const YearlyTab = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const _income = _.sumBy(YEARLY, (item) => item.amount.income);
  const _outcome = _.sumBy(YEARLY, (item) => item.amount.outcome);

  const data = [
    { x: "Income", y: _income },
    { x: "Outcome", y: -_outcome },
  ];

  return (
    <LayoutCustom style={styles.container}>
      <ChartPie data={data} />
      <LayoutCustom gap={16}>
        <LayoutCustom horizontal itemsCenter mh={24} justify="space-between">
          <Text category="t5">Transactions</Text>
          <LayoutCustom itemsCenter horizontal>
            <Text
              category="body"
              status="primary"
              onPress={() => navigate("Analysis")}
            >
              Analyze
            </Text>
            <AppIcon
              size={28}
              name={EvaIcons.ChevronRight}
              fill={theme["text-primary-color"]}
            />
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom gap={16} ph={24}>
          {SAMPLE_TRANSACTION.map((item, index) => {
            return <TransactionYear item={item} key={index} />;
          })}
        </LayoutCustom>
      </LayoutCustom>
    </LayoutCustom>
  );
});

export default YearlyTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  chartView: {
    alignItems: "flex-end",
    backgroundColor: "color-primary-active",
    marginHorizontal: 4,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
});
const YEARLY = [
  {
    date: new Date(new Date().setFullYear(2022)),
    amount: {
      income: 431200,
      outcome: -232000,
    },
  },
  {
    date: new Date(new Date().setFullYear(2023)),
    amount: {
      income: 523200,
      outcome: -118120,
    },
  },
];

const SAMPLE_TRANSACTION = [
  {
    date: new Date().setMonth(0),
    amount: {
      income: 11200,
      outcome: -2000,
    },
  },
  {
    date: new Date().setMonth(1),
    amount: {
      income: 2200,
      outcome: -22000,
    },
  },
  {
    date: new Date().setMonth(2),
    amount: {
      income: 4000,
      outcome: -7300,
    },
  },
];
