import React from "react";
import { StyleSheet } from "react-native";
import { LayoutCustom, Text } from "components";
import { Icon } from "@ui-kitten/components";

export interface ActivityItemProps {
  id?: string;
  title: string;
  icon: string;
  amount: number;
  create_at: string;
}

const ActivityItem: React.FC<{ item: ActivityItemProps }> = ({ item }) => {
  const { id, title, icon, amount, create_at } = item;
  return (
    <LayoutCustom
      style={styles.container}
      horizontal
      itemsCenter
      justify="space-between"
      key={id}
    >
      <LayoutCustom horizontal itemsCenter gap={12}>
        <LayoutCustom style={styles.layoutIcon} level="3">
          <Icon pack="assets" name={icon} />
        </LayoutCustom>
        <LayoutCustom>
          <Text status="grey">{title}</Text>
          <Text category="subhead" status="placeholder">
            {create_at}
          </Text>
        </LayoutCustom>
      </LayoutCustom>
      <Text category="body" status={amount >= 0 ? "success" : "danger"}>
        {amount.toLocaleString("us-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        })}
      </Text>
    </LayoutCustom>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  layoutIcon: {
    padding: 12,
    borderRadius: 12,
  },
});
