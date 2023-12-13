import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";

// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, Text } from "components";
import { VictoryPie } from "victory-native";
// ----------------------------- Utils -----------------------
import convertPrice from "utils/convertPrice";

const ChartPie = React.memo(
  ({ data }: { data: { x: string; y: number }[] }) => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const getLabel = ({ datum }: any) => {
      if (datum.x === "Income") {
        return ` Income\n${convertPrice(datum.y)}`;
      } else {
        return ` Outcome\n${convertPrice(datum.y)}`;
      }
    };

    return (
      <LayoutCustom style={styles.container}>
        <Text category="t5" marginLeft={24}>
          Statistics
        </Text>
        <VictoryPie
          standalone={true}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          data={data}
          labelRadius={({ innerRadius }) => 80}
          labels={getLabel}
          radius={({ datum }) => 152}
          innerRadius={60}
          cornerRadius={({ datum }) => 12}
          padAngle={({ datum }) => 1}
          style={{
            data: {
              fill: ({ datum }) =>
                datum.x === "Income"
                  ? theme["color-success-700"]
                  : theme["color-danger-active"],
            },
            labels: {
              fill: theme["text-white-color"],
              fontSize: 14,
              fontWeight: "700",
            },
          }}
        />
      </LayoutCustom>
    );
  }
);

export default ChartPie;

const themedStyles = StyleService.create({
  container: {
    marginTop: 24,
  },
  content: {},
});
