import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { IDivider, LayoutCustom, Text } from "components";
import { formatDate } from "utils/formatDate";
import convertPrice from "utils/convertPrice";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

interface TransactionItemProps {
  title: string;
  image: any;
  balance: number;
  createAt: Date;
}

const TransactionItem: React.FC<{ transaction: TransactionItemProps }> = ({
  transaction,
}) => {
  const styles = useStyleSheet(themedStyles);
  const { title, image, createAt, balance } = transaction;
  return (
    <LayoutCustom style={styles.container} horizontal>
      <Image
        source={image}
        style={{ width: 52, height: 52 }}
        borderRadius={99}
      />
      <LayoutCustom style={styles.content}>
        <LayoutCustom horizontal itemsCenter justify="space-between">
          <Text category="body">{title}</Text>
        </LayoutCustom>
        <LayoutCustom horizontal itemsCenter justify="space-between">
          <Text
            category="subhead"
            status={balance < 0 ? "danger" : "success-dark"}
          >
            {convertPrice(balance)}
          </Text>
          <Text category="c1" status='grey'>{formatDate(createAt)}</Text>
        </LayoutCustom>
      </LayoutCustom>
    </LayoutCustom>
  );
};

export default TransactionItem;

const themedStyles = StyleService.create({
  container: {
    gap: 16,
    marginBottom: 24,
  },
  content: {
    flex: 1,
    gap: 8,
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderBottomColor: "background-basic-color-4",
  },
});
