import React, { memo } from "react";
import { View } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
} from "@ui-kitten/components";
// ----------------------------- Hooks -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Lodash -----------------------------------
import _ from "lodash";
// ----------------------------- Components -----------------------------------
import { Text, LayoutCustom } from "components";
// ----------------------------- LinearGradient -----------------------------------
import { LinearGradient } from "expo-linear-gradient";
// ----------------------------- Victory Chart -----------------------------------
import { VictoryLine, VictoryStack } from "victory-native";
// ----------------------------- Util -----------------------------------
import formater from "utils/formatNumber";
// ----------------------------- @Types -----------------------------------
import AnimatedAppearance, {
  Animation_Types_Enum,
} from "components/AnimatedAppearance";
// ----------------------------- Reduxs -----------------------------------
import { useAppSelector } from "reduxs/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "types/navigation-types";
import { CurrencyTypeEnum } from "types/element-types";

export interface ICoinProps {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number | null;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  max_supply: number | null;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number | null;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: {
    currency: string;
    percentage: number;
    times: number;
  } | null;
  symbol: string;
  total_supply: number;
  total_volume: number;
  sparkline_in_7d: { price: Array<number> };
}

const CoinItem = memo(
  ({ data, index }: { data: ICoinProps; index: number }) => {
    const { width } = useLayout();
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const prices = _.map(
      data.sparkline_in_7d.price.slice(-30),
      (index, item) => {
        return { y: item, x: index };
      }
    );

    const status_price =
      data.market_cap_change_percentage_24h >= 0 ? true : false;
    const max_width = 100 * (width / 375);
    const currency = {
      title: "US Dollar",
      symbol: "$",
      value: CurrencyTypeEnum.USD,
    };
    return (
      <AnimatedAppearance type={Animation_Types_Enum.SlideInLeft} index={index}>
        <LayoutCustom
          style={styles.item}
          // onPress={goBack}
        >
          <LayoutCustom
            style={[
              styles.divider,
              {
                backgroundColor: status_price
                  ? theme["color-success-default"]
                  : theme["color-danger-default"],
              },
            ]}
          />
          <LayoutCustom horizontal mh={16} mt={8}>
            <LayoutCustom
              horizontal
              justify="space-between"
              style={styles.content}
            >
              <LayoutCustom horizontal itemsCenter gap={8}>
                <Avatar source={{ uri: data.image }} size="tiny" />
                <LayoutCustom gap={8}>
                  <Text status="basic" maxWidth={max_width} numberOfLines={1}>
                    {data.name}
                  </Text>
                  <Text
                    maxWidth={max_width}
                    uppercase
                    numberOfLines={1}
                    category="c1"
                    opacity={0.7}
                  >
                    {data.symbol}
                  </Text>
                </LayoutCustom>
              </LayoutCustom>
              <LayoutCustom gap={8}>
                {data.current_price && (
                  <Text right status="basic">
                    {formater(data.current_price, currency.value)}
                  </Text>
                )}
                <Text
                  status={status_price ? "success" : "danger"}
                  category="c1"
                  right
                >
                  {data.market_cap_change_percentage_24h
                    ? data.market_cap_change_percentage_24h.toFixed(4)
                    : 0}
                  %
                </Text>
              </LayoutCustom>
            </LayoutCustom>
          </LayoutCustom>
          <LayoutCustom justify="space-between" style={styles.chart} pl={40}>
            <LinearGradient
              colors={[
                `${theme["background-basic-color-3"]}10`,
                theme["background-basic-color-3"],
              ]}
              style={styles.linear}
              end={{ x: 0.2, y: 1 }}
              start={{ x: 1.1, y: 0.2 }}
            />
            <VictoryStack
              maxDomain={{ y: 12 }}
              width={80}
              height={36}
              padding={0}
              style={{
                data: {
                  stroke: status_price
                    ? theme["text-success-color"]
                    : theme["text-danger-color"],
                },
              }}
            >
              <VictoryLine
                scale={{ x: "linear", y: "time" }}
                domainPadding={{ x: [-1, 2], y: 32 }}
                padding={0}
                interpolation="bundle"
                animate={{
                  duration: 1200,
                  onLoad: { duration: 1200 },
                }}
                style={{
                  data: {
                    stroke: status_price
                      ? theme["text-success-color"]
                      : theme["text-danger-color"],
                  },
                }}
                data={prices}
                width={24}
                height={24}
              />
            </VictoryStack>
          </LayoutCustom>
        </LayoutCustom>
      </AnimatedAppearance>
    );
  }
);

export default CoinItem;

const themedStyles = StyleService.create({
  item: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "background-basic-color-3",
    marginBottom: 12,
    gap: 8,
    marginHorizontal: 16,
    // shadow
    shadowColor: "background-basic-color-5",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  divider: {
    height: "100%",
    width: 6,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  chart: {
    position: "absolute",
    zIndex: -100,
    alignSelf: "center",
    top: 12,
    bottom: 12,
  },
  linear: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 100,
    left: 24,
  },
});
