import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";

// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";

// ----------------------------- Components && Elements -----------------------
import { LayoutCustom } from "components";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTooltip,
} from "victory-native";

// ----------------------------- Utils -----------------------
import convertPrice from "utils/convertPrice";

const Chart = React.memo(
  ({
    data,
    isOutcome,
  }: {
    isOutcome: boolean;
    data: { x: string; y: number }[];
  }) => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { width } = useLayout();

    const _color = isOutcome
      ? theme["text-danger-color"]
      : theme["text-success-color"];
    return (
      <LayoutCustom mh={16} style={styles.container}>
        <VictoryChart
          animate={{
            duration: 1000,
            onLoad: { duration: 500 },
          }}
          width={width - 24}
          height={200}
          padding={{ left: 36, bottom: 40, right: 20, top: 40 }}
        >
          <VictoryBar
            data={data}
            colorScale={"qualitative"}
            barWidth={(width / data.length) * 0.7}
            cornerRadius={{ bottom: 2, top: 6 }}
            labels={({ datum }) =>
              `${convertPrice(isOutcome ? -datum.y : datum.y, 1)}`
            }
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                flyoutPadding={{ top: 4, bottom: 4, left: 12, right: 12 }}
                flyoutStyle={{
                  stroke: theme["background-basic-color-6"],
                  fill: _color,
                }}
                dy={-2}
                constrainToVisibleArea
              />
            }
            style={{
              data: {
                fill: _color,
              },
              labels: {
                fill: theme["text-white-color"],
                fontSize: 14,
                fontWeight: "700",
                marginLeft: 4,
                marginRight: 24,
              },
            }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent", size: 0 },
              tickLabels: { fill: theme["text-white-color"] },
            }}
          />
        </VictoryChart>
      </LayoutCustom>
    );
  }
);

export default Chart;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},
});
