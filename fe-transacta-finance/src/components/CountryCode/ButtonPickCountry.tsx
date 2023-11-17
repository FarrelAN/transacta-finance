import React, { memo } from "react";
import { StyleProp, ViewStyle, Keyboard } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
// ----------------------------- @Types -------------------------------------
import EvaIcons from "types/eva-icon-enum";
import { CountryItem, StyleCountryCodesButton } from "types/component-types";
// ----------------------------- Hook -------------------------------------------
import { useLayout, useToggle } from "hooks";
// ----------------------------- Reanimated 2 -----------------------------------
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
// ----------------------------- Components && Elements -------------------------
import { AppIcon } from "components/AppIcon";
import { CountryButton } from "./CountryButton";
import { CountryPicker } from "./CountryPicker";
import LayoutCustom from "../LayoutCustom";
import Text from "../Text";

interface IButtonPickCountryProps {
  country: CountryItem;
  onSave: React.Dispatch<React.SetStateAction<CountryItem>>;
  style?: StyleProp<ViewStyle>;
  styleActive?: StyleProp<ViewStyle>;
}

const ButtonPickCountry = memo(
  ({ country, onSave, style, styleActive }: IButtonPickCountryProps) => {
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();
    const { top } = useLayout();
    const [show, toggle] = useToggle(false);

    const progress = useDerivedValue(() => {
      if (show) {
        return withTiming(1);
      } else {
        return withTiming(0);
      }
    });
    const styledIcon = useAnimatedStyle(() => {
      const _rotate = interpolate(progress.value, [0, 1], [0, 180]);
      return {
        transform: [{ rotateZ: `${_rotate}deg` }],
      };
    });

    const StylesCountryCodes: StyleCountryCodesButton = {
      modal: { ...styles.modal, paddingTop: top + 12 },
      countryButtonStyles: styles.item,
      countryName: styles.country,
      dialCode: styles.country,
      flag: styles.flagButton,
      line: styles.divider,
      textInput: styles.textInput,
      titleResultStyle: styles.titleResult,
    };

    const ListHeaderComponent = ({
      countries,
      lang,
    }: {
      countries: CountryItem[];
      lang: string;
    }) => {
      return (
        <LayoutCustom
          style={{
            paddingBottom: 20,
          }}
        >
          <Text category="t5" marginBottom={16}>
            Popular countries
          </Text>
          {countries?.map((country, index) => {
            let itemName = country?.name[lang];
            let checkName = itemName.length ? itemName : country?.name["en"];
            return (
              <CountryButton
                onPress={() => {
                  onSave(country);
                  toggle();
                  Keyboard.dismiss();
                }}
                key={index}
                item={country}
                name={checkName}
                style={StylesCountryCodes}
              />
            );
          })}
          <Text category="t5" marginTop={24}>
            Result
          </Text>
        </LayoutCustom>
      );
    };
    return (
      <>
        <LayoutCustom
          style={[styles.button, style, show && styles.buttonShow, styleActive]}
          onPress={() => {
            toggle();
            Keyboard.dismiss();
          }}
          horizontal
          itemsCenter
        >
          <Text style={styles.flag}>{country.flag}</Text>
          <Animated.View style={styledIcon}>
            <AppIcon name={EvaIcons.ChevronDownOutline} size={24} />
          </Animated.View>
        </LayoutCustom>
        <CountryPicker
          lang="en"
          inputPlaceholderTextColor={theme["text-placeholder-color"]}
          ListHeaderComponent={ListHeaderComponent}
          popularCountries={["US", "VN", "RU", "ES", "DE"]}
          show={show}
          onRequestClose={() => {
            toggle();
            Keyboard.dismiss();
          }}
          style={StylesCountryCodes}
          pickerButtonOnPress={(item) => {
            onSave(item);
            toggle();
            Keyboard.dismiss();
          }}
          onBackdropPress={toggle}
        />
      </>
    );
  }
);

export default ButtonPickCountry;

const themedStyles = StyleService.create({
  modal: {
    height: "100%",
    backgroundColor: "background-basic-color-1",
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 4,
    borderRadius: 16,
    borderColor: "background-basic-color-3",
    minWidth: 20,
    backgroundColor: "background-basic-color-2",
  },
  buttonShow: {
    borderColor: "color-primary-default",
    backgroundColor: "background-basic-color-1",
  },
  item: {
    backgroundColor: "background-basic-color-2",
    paddingVertical: 0,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  country: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: "text-basic-color",
  },
  flagButton: {
    fontSize: 40,
    lineHeight: 48,
    marginRight: 12,
  },
  icon: {},
  flag: {
    fontSize: 24,
    lineHeight: 32,
    marginLeft: 4,
    textAlign: "center",
  },
  divider: {
    backgroundColor: `${"background-basic-color-1"}`,
  },
  textInput: {
    height: 48,
    backgroundColor: "background-basic-color-4",
    color: "text-basic-color",
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  titleResult: {
    color: "text-basic-color",
  },
});
