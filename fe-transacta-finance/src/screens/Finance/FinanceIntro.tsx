import React, { memo } from "react";
import { Image, FlatList } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  useTheme,
  Toggle,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
// ----------------------------- Assets -----------------------------------
import { Images } from "assets/images";
// ----------------------------- Hook -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FinanceStackParamList, RootStackParamList } from "types/navigation-types";
// ----------------------------- Components -----------------------------------
import {
  NavigationAction,
  Container,
  ButtonIntro,
  LinearGradientText,
} from "components";
// ----------------------------- Redux -----------------------------------
import {
  appSelector,
  switchTheme,
  ThemeMode,
} from "reduxs/reducers/app-reducer";
import { useAppSelector, useAppDispatch } from "reduxs/store";
// ----------------------------- @Types -----------------------------------
import EvaIcons from "types/eva-icon-enum";

interface IntroListButtonProps {
  title: string;
  subtitle?: string;
  navigate: keyof FinanceStackParamList;
  icon: EvaIcons;
  color: string;
}

const FinanceIntro = memo(() => {
  const { navigate } =
    useNavigation<NavigationProp<FinanceStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const themeMode = useAppSelector(appSelector).theme;
  const dispatch = useAppDispatch();

  const LIST: IntroListButtonProps[] = [
    {
      title: "Finance 01",
      subtitle:"Statistics",
      icon: EvaIcons.Gift,
      color: theme["color-info-300"],
      navigate: "Finance01",
    },
    {
      title: "Finance 02",
      subtitle:"Home Page",
      icon: EvaIcons.Radio,
      color: theme["text-info-color"],
      navigate: "Finance02",
    },
    {
      title: "Finance 03",
      subtitle:"Account Details",
      icon: EvaIcons.ClipboardOutline,
      color: theme["text-success-color"],
      navigate: "Finance03",
    },
    {
      title: "Finance 04",
      subtitle:"Saving Money",
      icon: EvaIcons.KeypadOutline,
      color: theme["text-primary-color"],
      navigate: "Finance04",
    },
    {
      title: "Finance 05",
      subtitle:"Create New Goal",
      icon: EvaIcons.BatteryOutline,
      color: theme["color-danger-800"],
      navigate: "Finance05",
    },
    {
      title: "Finance 06",
      subtitle:"Money Manager",
      icon: EvaIcons.CameraOutline,
      color: theme["text-warning-color"],
      navigate: "Finance06",
    },
    {
      title: "Finance 07",
      subtitle:"Home Page Banking",
      icon: EvaIcons.NpmOutline,
      color: theme["color-info-300"],
      navigate: "Finance07",
    },
    {
      title: "Finance 08",
      subtitle:"Investment",
      icon: EvaIcons.MapOutline,
      color: theme["color-primary-800"],
      navigate: "Finance08",
    },
    {
      title: "Finance 09",
      subtitle:"Home Page",
      icon: EvaIcons.InboxOutline,
      color: theme["color-info-800"],
      navigate: "Finance09",
    },
    {
      title: "Finance 10",
      subtitle:"Create wallet crypto",
      icon: EvaIcons.Globe,
      color: theme["text-danger-color"],
      navigate: "Finance10",
    },
  ];
  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title={() => (
          <LinearGradientText text={"Finance"} textStyle={styles.title} />
        )}
        // accessoryLeft={() => <NavigationAction />}
        accessoryRight={() => (
          <Toggle
            status="success"
            checked={themeMode === ThemeMode.LIGHT}
            onChange={() => {
              dispatch(
                switchTheme(
                  themeMode === ThemeMode.DARK
                    ? ThemeMode.LIGHT
                    : ThemeMode.DARK
                )
              );
            }}
          />
        )}
      />
      <FlatList
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <Image
            source={Images.banner}
            borderBottomLeftRadius={24}
            borderBottomRightRadius={24}
            style={{ width: width - 8, alignSelf: "center", height: 220 }}
          />
        )}
        showsVerticalScrollIndicator={false}
        data={LIST}
        overScrollMode="always"
        renderItem={({ item, index }) => {
          const { icon, title, subtitle, color } = item;
          return (
            <ButtonIntro
              color={color}
              icon={icon}
              title={title}
              subtitle={subtitle}
              onPress={() => {
                navigate(item.navigate);
              }}
            />
          );
        }}
      />
    </Container>
  );
});

export default FinanceIntro;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    gap: 24,
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  indicator: {
    backgroundColor: "red",
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "bold",
  },
});
