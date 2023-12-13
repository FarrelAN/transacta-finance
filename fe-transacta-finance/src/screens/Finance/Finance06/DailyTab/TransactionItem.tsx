import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
} from "@ui-kitten/components";

// ----------------------------- Components && Elements -----------------------
import { AppIcon, LayoutCustom, Text } from "components";
import EvaIcons from "types/eva-icon-enum";
import convertPrice from "utils/convertPrice";
import dayjs from "dayjs";

export interface ITransactionItemProps {
  user?:
    | {
        name: string;
        avatar: any;
      }
    | undefined;
  title: string;
  amount: number;
  create_at: Date;
}

const TransactionItem = React.memo(
  ({ item }: { item: ITransactionItemProps }) => {
    const { user, title, amount, create_at } = item;
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    return (
      <LayoutCustom style={styles.container} horizontal justify="space-between">
        {user ? (
          <LayoutCustom horizontal gap={12}>
            <Avatar source={{ uri: user.avatar }} size="tiny" />
            <LayoutCustom gap={4} justify="center" maxWidth={120}>
              <Text numberOfLines={1}>{user.name}</Text>
              <Text category="subhead" status="grey" numberOfLines={1} >
                {title}
              </Text>
            </LayoutCustom>
          </LayoutCustom>
        ) : (
          <LayoutCustom horizontal gap={12}>
            <AppIcon
              name={amount >= 0 ? EvaIcons.LogIn : EvaIcons.LogOut}
              layoutIconStyle={styles.layoutIcon}
            />
            <LayoutCustom gap={4} mt={8} maxWidth={120}>
              <Text numberOfLines={1}>{title}</Text>
            </LayoutCustom>
          </LayoutCustom>
        )}
        <LayoutCustom gap={8} alignSelfCenter style={styles.rightField}>
          <LayoutCustom itemsCenter horizontal gap={4}>
            <AppIcon
              size={16}
              fill={
                amount < 0
                  ? theme["text-danger-color"]
                  : theme["color-success-700"]
              }
              name={amount < 0 ? EvaIcons.TrendingDown : EvaIcons.TrendingUp}
            />
            <Text
              category="body"
              status={amount < 0 ? "danger" : "success-dark"}
            >
              {convertPrice(amount, 2)}
            </Text>
          </LayoutCustom>
          <Text category="c1" status="grey">
            {dayjs(create_at).format("MMM DD YYYY HH:mm:ss")}
          </Text>
        </LayoutCustom>
      </LayoutCustom>
    );
  }
);

export default TransactionItem;

const themedStyles = StyleService.create({
  container: {
  },
  rightField: {
    alignItems: "flex-end",
  },
  layoutIcon: {
    padding: 12,
    borderRadius: 99,
    backgroundColor: "background-basic-color-4",
  },
});
