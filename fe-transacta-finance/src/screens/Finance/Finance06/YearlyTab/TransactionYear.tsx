import React from "react";
import { StyleSheet } from "react-native";

import { LayoutCustom, Text } from "components";
import dayjs from "dayjs";
import { globalStyle } from "styles/globalStyle";
import convertPrice from "utils/convertPrice";

interface TransactionYearProps {
  date: number;
  amount: {
    income: number;
    outcome: number;
  };
}

const TransactionYear: React.FC<{ item: TransactionYearProps }> = ({
  item,
}) => {
  return (
    <LayoutCustom style={styles.container} level="1">
      <Text center>{dayjs(item.date).format("MMMM YYYY")}</Text>
      <LayoutCustom horizontal itemsCenter justify="space-between">
        <LayoutCustom gap={4}>
          <Text category='subhead' status='grey'>Total Income</Text>
          <Text status="success-dark">+{convertPrice(item.amount.income, 2)}</Text>
        </LayoutCustom>
        <LayoutCustom gap={4}>
          <Text right category='subhead' status='grey'>Total Outcome</Text>
          <Text right status="danger">{convertPrice(item.amount.outcome, 2)}</Text>
        </LayoutCustom>
      </LayoutCustom>
    </LayoutCustom>
  );
};

export default TransactionYear;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    ...globalStyle.shadow,
    borderRadius: 16,
    padding: 16,
  },
});
