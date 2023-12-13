import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { Text, LayoutCustom } from "components";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import { useLayout } from "hooks";
import convertPrice from "utils/convertPrice";

interface LayoutCurrencyProps {
  title: string;
  currency: number;
}

const LayoutCurrency: React.FC<LayoutCurrencyProps> = ({ title, currency }) => {
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();

  return (
    <LayoutCustom
      style={[styles.container, { width: 148 * (width / 375), height: 60 }]}
      level="1"
    >
      <LayoutCustom style={styles.title}>
        <Text status="grey" category="subhead">
          {title}
        </Text>
      </LayoutCustom>
      <Text
        center
        marginTop={16}
        status={currency < 0 ? "danger" : "success-dark"}
      >
        {convertPrice(currency)}
      </Text>
    </LayoutCustom>
  );
};

export default LayoutCurrency;

const themedStyles = StyleService.create({
  container: {
    ...globalStyle.shadow,
    borderRadius: 12,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    top: -12,
    left: 12,
    zIndex: 100,
  },
});
