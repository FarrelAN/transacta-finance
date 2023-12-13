import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout, useToggle } from "hooks";

// ----------------------------- Components && Elements -----------------------
import { AppIcon, LayoutCustom, Text } from "components";
import convertPrice from "utils/convertPrice";

// ----------------------------- Types ---------------------------------------
import EvaIcons from "types/eva-icon-enum";
import { Images } from "assets/images";
import { Image } from "react-native";

interface IBalanceCardProps {
  balance: number;
  grow: number;
}

const BalanceCard = React.memo(({ balance, grow }: IBalanceCardProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [show, toggle] = useToggle(false);

  return (
    <LayoutCustom style={styles.container}>
      {/* @ts-ignore */}
      <Image source={Images.finance.line} style={styles.imageCard} />
      <LayoutCustom horizontal gap={8} itemsCenter>
        <Text status="basic">Your Balance</Text>
        <AppIcon
          onPress={toggle}
          name={show ? EvaIcons.Eye : EvaIcons.EyeOff}
          fill={theme["text-basic-color"]}
          size={20}
        />
      </LayoutCustom>
      <LayoutCustom mt={16} horizontal gap={12}>
        <Text status="basic" category="t2">
          {show ? convertPrice(balance) : "$***********"}
        </Text>
        <LayoutCustom style={styles.grow}>
          <Text category="c1" status={grow >= 0 ? "success-dark" : "danger"}>
            {grow >= 0 ? "+ " : "-"}
            {grow.toFixed(1)} %
          </Text>
        </LayoutCustom>
      </LayoutCustom>
      <LayoutCustom horizontal justify="space-between" mt={32}>
        <LayoutCustom horizontal itemsCenter style={styles.button}>
          <AppIcon
            name={EvaIcons.CloudUploadOutline}
            fill={theme["text-white-color"]}
            size={16}
          />
          <Text category="subhead" status="white">
            Transfer
          </Text>
        </LayoutCustom>
        <LayoutCustom horizontal itemsCenter style={styles.button}>
          <AppIcon
            name={EvaIcons.CloudDownloadOutline}
            fill={theme["text-white-color"]}
            size={16}
          />
          <Text category="subhead" status="white">
            Deposit
          </Text>
        </LayoutCustom>
        <LayoutCustom horizontal itemsCenter style={styles.button}>
          <AppIcon
            name={EvaIcons.Swap}
            fill={theme["text-white-color"]}
            size={16}
          />
          <Text category="subhead" status="white">
            Swap
          </Text>
        </LayoutCustom>
      </LayoutCustom>
    </LayoutCustom>
  );
});

export default BalanceCard;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    backgroundColor: "background-basic-color-3",
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  grow: {
    borderRadius: 99,
    alignSelf: "flex-end",
    marginBottom: 4,
    backgroundColor: "background-basic-color-1",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  imageCard: {
    position: "absolute",
    zIndex: -100,
    top: -120,
    right: -120,
    opacity: 0.5,
  },
  button: {
    backgroundColor: "color-primary-default",
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
  },
});
