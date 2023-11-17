import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  Avatar,
  Icon,
  IndexPath,
  Select,
  SelectItem,
  StyleService,
  TopNavigation,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";

// ----------------------------- Components && Elements -----------------------
import {
  AppIcon,
  Container,
  Content,
  LayoutCustom,
  RoundedButton,
  Text,
} from "components";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
} from "victory-native";
// ----------------------------- Faker ---------------------------------------
import { faker } from "@faker-js/faker";

// ----------------------------- Types ---------------------------------------
import { FinanceStackParamList } from "types/navigation-types";
import EvaIcons from "types/eva-icon-enum";

const StatisticScreen = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { height ,width} = useLayout();
  const { navigate } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const [selected, setSelected] = React.useState(new IndexPath(1));

  const displayValue = Select_option[selected.row];
  const handleSelect = (index: IndexPath | IndexPath[]) => {
    if (Array.isArray(index)) {
      // Handle multiple indices
    } else {
      // Handle single index
      setSelected(index);
    }
  };
  const data_income = [
    { x: 1, y: 13000, name: "Jan" },
    { x: 2, y: 16500, name: "Feb" },
    { x: 3, y: 14250, name: "Mar" },
    { x: 4, y: 19000, name: "Apr" },
    { x: 5, y: 24000, name: "May" },
    { x: 6, y: 24000, name: "Jun" },
  ];
  const data_outcome = [
    { x: 1, y: 8000, name: "Jan" },
    { x: 2, y: 1500, name: "Feb" },
    { x: 3, y: 4250, name: "Mar" },
    { x: 4, y: 12000, name: "Apr" },
    { x: 5, y: 12000, name: "May" },
    { x: 6, y: 32000, name: "Jun" },
  ];

  const BoxAmount = ({
    type,
    amount,
  }: {
    type: "income" | "outcome";
    amount: number;
  }) => {
    return (
      <LayoutCustom style={styles.box} gap={12}>
        <LayoutCustom style={styles.layoutIcon} level="4">
          <Icon pack="assets" name={type} />
        </LayoutCustom>
        <LayoutCustom gap={4}>
          <Text>
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <Text capitalize status="placeholder" category="subhead">
            {type}
          </Text>
        </LayoutCustom>
      </LayoutCustom>
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        style={styles.topNavigation}
        title={"Statistic"}
        accessoryLeft={() => (
          <RoundedButton
            icon={"arrow-left"}
            onPress={() => navigate("FinanceIntro")}
          />
        )}
        accessoryRight={() => <RoundedButton icon={"more"} />}
      />
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom horizontal mh={16} gap={40} itemsCenter>
          <Text category="subhead">Feb 28 - Mar 28, 2020 </Text>
          <Select
            size="small"
            style={styles.selected}
            value={displayValue}
            selectedIndex={selected}
            onSelect={handleSelect}
            status="primary"
          >
            {Select_option.map((item, index) => {
              return <SelectItem title={item} key={index} />;
            })}
          </Select>
        </LayoutCustom>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: [20, 0] }}
          maxDomain={{ y: 35000 }}
          height={256 * (height / 812)}
          width={width}
        >
          <VictoryAxis
            crossAxis
            theme={VictoryTheme.material}
            standalone={false}
            tickValues={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            tickFormat={(t) => `${t}`}
            tickComponent={<></>}
            style={{
              grid: { stroke: 0 },
            }}
          />
          <VictoryAxis
            dependentAxis
            theme={VictoryTheme.material}
            offsetX={50}
            standalone={false}
            tickFormat={(t) => `${Math.round(t / 1000)}k`}
          />
          <VictoryGroup
            offset={16}
            style={{ data: { width: 14 } }}
            x={(datum) => datum.name}
          >
            <VictoryBar
              padding={{ right: 24 }}
              cornerRadius={{ top: ({ datum }) => 4 }}
              barRatio={0.8}
              style={{
                data: { fill: theme["text-success-color"] },
              }}
              x={(datum) => datum.name}
              y={(d) => d.y}
              data={data_income}
            />
            <VictoryBar
              cornerRadius={{ top: ({ datum }) => 4 }}
              barRatio={0.8}
              style={{
                data: { fill: theme["color-danger-400"] },
              }}
              x={(datum) => datum.name}
              y={(d) => d.y}
              data={data_outcome}
            />
          </VictoryGroup>
        </VictoryChart>
        <LayoutCustom
          horizontal
          justify="space-between"
          ph={24}
          gap={24}
          itemsCenter
        >
          <BoxAmount type="income" amount={6542.45} />
          <BoxAmount type="outcome" amount={4742.12} />
        </LayoutCustom>
        <LayoutCustom
          horizontal
          justify="space-between"
          itemsCenter
          ph={24}
          mt={24}
        >
          <Text category="t5">Recent transaction</Text>
          <LayoutCustom horizontal justify="space-between" itemsCenter>
            <Text status="primary" category="c1">
              {" "}
              See All
            </Text>
            <AppIcon
              name={EvaIcons.ChevronRight}
              fill={theme["text-primary-color"]}
              size={16}
            />
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom mt={16}>
          {TRANSACTION.map((trans, index) => {
            return (
              <LayoutCustom
                key={index}
                horizontal
                style={[
                  styles.trans,
                  index < TRANSACTION.length - 1 && styles.divider,
                ]}
              >
                <LayoutCustom horizontal itemsCenter gap={12}>
                  <Avatar source={{ uri: trans.avatar }} size="small" />
                  <LayoutCustom gap={4}>
                    <Text>{trans.title}</Text>
                    <Text category="subhead">{trans.describe}</Text>
                  </LayoutCustom>
                </LayoutCustom>
                <Text>
                  {trans.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Text>
              </LayoutCustom>
            );
          })}
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default StatisticScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: 16,
  },
  content: {
    paddingBottom: 120,
    paddingTop: 24,
  },
  selected: {
    flex: 1,
    paddingHorizontal: 0,
  },
  box: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderColor: "text-placeholder-color",
  },
  layoutIcon: {
    padding: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  trans: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    paddingVertical: 12,
  },
  divider: {
    borderBottomWidth: 0.7,
    borderBottomColor: "background-basic-color-4",
  },
});

const Select_option = ["Weekly", "Monthly", "Yearly"];
const TRANSACTION = [
  {
    title: faker.name.fullName(),
    avatar: faker.image.avatar(),
    describe: "BCA • 2468 3545 ****",
    amount: 433,
  },
  {
    title: faker.name.fullName(),
    avatar: faker.image.avatar(),
    describe: "BCA • 4468 3545 ****",
    amount: 433,
  },
  {
    title: faker.name.fullName(),
    avatar: faker.image.avatar(),
    describe: "BCA • 1234 3545 ****",
    amount: 433,
  },
  {
    title: faker.name.fullName(),
    avatar: faker.image.avatar(),
    describe: "BCA • 2238 1535 ****",
    amount: 433,
  },
];
