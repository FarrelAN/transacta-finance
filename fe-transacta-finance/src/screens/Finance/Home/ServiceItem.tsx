import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";

import { LayoutCustom, Text } from "components";
import { Icon, useStyleSheet, StyleService } from "@ui-kitten/components";

interface IServiceItemProps {
  icon: string;
  title: string;
}

const ServiceItem: React.FC<{ item: IServiceItemProps }> = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <LayoutCustom style={styles.container}>
      <Icon pack={"assets"} name={item.icon} style={styles.icon} />
      <Text numberOfLines={2} center category='subhead'>
        {item.title}
      </Text>
    </LayoutCustom>
  );
};

export default ServiceItem;

const themedStyles = StyleService.create({
  container: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "background-basic-color-4",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 12,
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
