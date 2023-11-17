import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import { Container, Content, LayoutCustom, Text } from "components";
import dayjs from "dayjs";
import convertPrice from "utils/convertPrice";

interface ITransactionItemProps {
  image?: ImageSourcePropType | undefined;
  title: string;
  created_at: Date;
  amount: number;
}

const TransactionItem: React.FC<{ data: ITransactionItemProps }> = ({
  data,
}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  return (
    <LayoutCustom style={styles.container} horizontal>
      <LayoutCustom horizontal gap={12} itemsCenter>
        {data.image ? (
          // @ts-ignore
          <Image source={data.image} style={styles.image} />
        ) : (
          <LayoutCustom style={styles.image}>
            <Text category="t1" status="primary" marginTop={4}>
              {data.title.charAt(0)}
            </Text>
          </LayoutCustom>
        )}
        <LayoutCustom gap={4}>
          <Text>{data.title}</Text>
          <Text category="subhead" status="placeholder">
            {dayjs(data.created_at).format("MMM DD YYYY hh:mm A")}
          </Text>
        </LayoutCustom>
      </LayoutCustom>
      <Text category='body' status={data.amount > 0 ? "success-dark" : "danger"}>
        {convertPrice(data.amount)}
      </Text>
    </LayoutCustom>
  );
};

export default TransactionItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {},
  image: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: "background-basic-color-4",
    backgroundColor: "text-white-color",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
