import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
// ----------------------------- Hooks ---------------------------------------
import { useToggle } from "hooks";
// ----------------------------- Components && Elements -----------------------
import { AppIcon, LayoutCustom, Text } from "components";
import EvaIcons from "types/eva-icon-enum";

interface CreditCardProps {
  color: string;
  balance: number;
  card_number: string;
}

const CreditCard = React.memo(({ item }: { item: CreditCardProps }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [show, toggle] = useToggle(false);
  const card_number =
    show === false
      ? item.card_number
          .replace(/\D/g, "")
          .replace(
            /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g,
            "$1  $2  $3   ****"
          )
      : item.card_number
          .replace(/\D/g, "")
          .replace(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1  $2  $3  $4");

  return (
    <LayoutCustom
      style={{
        backgroundColor: item.color,
        ...styles.card,
        shadowColor: item.color,
      }}
    >
      <LayoutCustom mb={32}>
        <Text status="white" opacity={0.8}>
          Balance
        </Text>
        <Text status="white" category="t5">
          {item.balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </Text>
      </LayoutCustom>
      <LayoutCustom horizontal gap={12} mb={4} itemsCenter>
        <Text status="white" opacity={0.8}>
          {"Card Number"}
        </Text>
        <AppIcon
          onPress={toggle}
          name={!show ? EvaIcons.EyeOff : EvaIcons.Eye}
          size={20}
          fill={theme["text-placeholder-color"]}
        />
      </LayoutCustom>
      <Text status="white" category="t4" opacity={0.6}>
        {card_number}
      </Text>
    </LayoutCustom>
  );
});

export default CreditCard;

const themedStyles = StyleService.create({
  card: {
    padding: 24,
    borderRadius: 16,
    marginVertical: 16,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
});
