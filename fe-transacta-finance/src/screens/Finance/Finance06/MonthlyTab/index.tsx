import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";

// ----------------------------- Components && Elements -----------------------
import { AppIcon, LayoutCustom, Text } from "components";
import TabBar from "./TabBar";
import Chart from "./Chart";
import dayjs from "dayjs";
import EvaIcons from "types/eva-icon-enum";
import { faker } from "@faker-js/faker";
import TransactionItem, {
  ITransactionItemProps,
} from "../DailyTab/TransactionItem";

const MonthlyTab = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const _income = MONTHLY.map((item, index) => {
    return { x: dayjs(item.date).format("MMM"), y: item.amount.income };
  });
  const _outcome = MONTHLY.map((item, index) => {
    return { x: dayjs(item.date).format("MMM"), y: -item.amount.outcome };
  });
  const data = selectedTab === 0 ? _income : _outcome;

  return (
    <LayoutCustom style={styles.container}>
      <LayoutCustom gap={16} mt={24}>
        <Text marginLeft={24} category="t5">
          Statistics
        </Text>
        <LayoutCustom style={styles.chartView}>
          <TabBar
            tabs={["Income", "Outcome"]}
            selectedIndex={selectedTab}
            setSelectedIndex={setSelectedTab}
          />
          <Chart data={data} isOutcome={selectedTab === 1} />
        </LayoutCustom>
      </LayoutCustom>
      <LayoutCustom gap={16}>
        <LayoutCustom horizontal itemsCenter mh={24} justify="space-between">
          <Text category="t5">Transactions</Text>
          <LayoutCustom itemsCenter horizontal>
            <Text category="body" status="primary">
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
            return <TransactionItem item={item} key={index} />;
          })}
        </LayoutCustom>
      </LayoutCustom>
    </LayoutCustom>
  );
});

export default MonthlyTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    gap: 24,
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

const SAMPLE_TRANSACTION: ITransactionItemProps[] = [
  {
    title: "₿ Crypto",
    create_at: new Date(new Date().setHours(new Date().getHours())),
    amount: -2100,
  },
  {
    title: "📈 Stock Market",
    amount: 12100,
    create_at: new Date(new Date().setHours(new Date().getHours())),
  },
  {
    user: {
      name: "Tiana Saris",
      avatar: faker.image.avatar(),
    },
    title: "💰 Add Money",
    amount: 456,
    create_at: new Date(new Date().setHours(new Date().getHours())),
  },
  {
    user: {
      name: "Kaiya Baptista",
      avatar: faker.image.avatar(),
    },
    title: "💰 Add Money",
    amount: 4356,
    create_at: new Date(new Date().setHours(new Date().getHours() - 1)),
  },
  {
    user: {
      name: "Desirae Bergson",
      avatar: faker.image.avatar(),
    },
    title: "📈 Stock Market",
    amount: -1356,
    create_at: new Date(new Date().setHours(new Date().getHours() - 1.4)),
  },
  {
    user: {
      name: "Emery Schleifer",
      avatar: faker.image.avatar(),
    },
    title: "💰 Add Money",
    amount: 1256,
    create_at: new Date(new Date().setHours(new Date().getHours() - 2)),
  },
];

const MONTHLY = [
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
  {
    date: new Date().setMonth(3),
    amount: {
      income: 11200,
      outcome: -9050,
    },
  },
  {
    date: new Date().setMonth(4),
    amount: {
      income: 12200,
      outcome: -8000,
    },
  },
  {
    date: new Date().setMonth(5),
    amount: {
      income: 4100,
      outcome: -12000,
    },
  },
  {
    date: new Date().setMonth(6),
    amount: {
      income: 14200,
      outcome: -15300,
    },
  },
  {
    date: new Date().setMonth(7),
    amount: {
      income: 8200,
      outcome: -3400,
    },
  },
  {
    date: new Date().setMonth(8),
    amount: {
      income: 5200,
      outcome: -8120,
    },
  },
];
