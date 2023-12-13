import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet } from "@ui-kitten/components";

// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, Text } from "components";

interface ITabBarProps {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  tabs: string[];
}

const TabBar = React.memo(
  ({ tabs, selectedIndex, setSelectedIndex }: ITabBarProps) => {
    const styles = useStyleSheet(themedStyles);

    return (
      <LayoutCustom style={styles.container} horizontal>
        {tabs.map((tab, index) => {
          const isActive = index === selectedIndex;
          return (
            <LayoutCustom
              style={[styles.button, isActive && styles.activeButton]}
              key={index}
              onPress={() => setSelectedIndex(index)}
            >
              <Text category="c1" status={!isActive ? "white" : "warning"}>
                {tab}
              </Text>
            </LayoutCustom>
          );
        })}
      </LayoutCustom>
    );
  }
);

export default TabBar;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "color-primary-800",
    borderRadius: 99,
    padding: 2,
    marginRight: 24,
  },
  content: {},
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "background-basic-color-1",
    borderRadius: 99,
  },
});
