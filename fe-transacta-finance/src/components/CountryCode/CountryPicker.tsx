import React from "react";
import {
  FlatList,
  TextInput,
  View,
  Text,
  Animated,
  Dimensions,
  Easing,
  Platform,
  Keyboard,
  Modal,
  TextStyle,
  StyleSheet,
} from "react-native";
import {
  CountryItem,
  ItemTemplateProps,
  ListHeaderComponentProps,
  StyleCountryCodesButton,
} from "types/component-types";
import { CountryButton } from "./CountryButton";
import { AppIcon } from "components/AppIcon";
import EvaIcons from "types/eva-icon-enum";
import { useTheme } from "@ui-kitten/components";
import { countryCodes } from "constants/data/countryCodes/countryCodes";
import { useKeyboardStatus } from "hooks";

const height = Dimensions.get("window").height;

interface Props {
  excludedCountries?: string[];
  showOnly?: string[];
  popularCountries?: string[];

  style?: StyleCountryCodesButton;

  show: boolean;
  enableModalAvoiding?: boolean;
  disableBackdrop?: boolean;

  onBackdropPress?: (...args: any) => any;
  pickerButtonOnPress: (item: CountryItem) => any;
  itemTemplate?: (props: ItemTemplateProps) => JSX.Element;
  ListHeaderComponent?: (props: ListHeaderComponentProps) => JSX.Element;
  onRequestClose?: (...args: any) => any;

  titleResult?: string;
  lang: string;
  inputPlaceholder?: string;
  inputPlaceholderTextColor?: TextStyle["color"];
  searchMessage?: string;
  androidWindowSoftInputMode?: string;
  initialState?: string;
}

export const CountryPicker = ({
  show,
  popularCountries,
  pickerButtonOnPress,
  inputPlaceholder,
  inputPlaceholderTextColor,
  searchMessage,
  lang = "en",
  style,
  enableModalAvoiding,
  androidWindowSoftInputMode,
  onBackdropPress,
  disableBackdrop,
  excludedCountries,
  initialState,
  onRequestClose,
  showOnly,
  ListHeaderComponent,
  itemTemplate: ItemTemplate = CountryButton,
  titleResult,
  ...rest
}: Props) => {
  const theme = useTheme();
  // ToDo refactor exclude and showOnly props to objects
  let filteredCodes = countriesRemover(excludedCountries);
  const keyboardStatus = useKeyboardStatus();
  const animationDriver = React.useRef(new Animated.Value(0)).current;
  const animatedMargin = React.useRef(new Animated.Value(0)).current;
  const [searchValue, setSearchValue] = React.useState<string>(
    initialState || ""
  );
  const [showModal, setShowModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (show) {
      setShowModal(true);
    } else {
      closeModal();
    }
  }, [show]);

  React.useEffect(() => {
    if (
      enableModalAvoiding &&
      (keyboardStatus.keyboardPlatform === "ios" ||
        (keyboardStatus.keyboardPlatform === "android" &&
          androidWindowSoftInputMode === "pan"))
    ) {
      if (keyboardStatus.isOpen)
        Animated.timing(animatedMargin, {
          toValue: keyboardStatus.keyboardHeight,
          duration: 190,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();

      if (!keyboardStatus.isOpen)
        Animated.timing(animatedMargin, {
          toValue: 0,
          duration: 190,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
    }
  }, [keyboardStatus.isOpen]);

  const preparedPopularCountries = React.useMemo(() => {
    return filteredCodes?.filter((country) => {
      return popularCountries?.find(
        (short) => country?.code === short?.toUpperCase()
      );
    });
  }, [popularCountries]);

  const codes = React.useMemo(() => {
    let newCodes = filteredCodes;

    if (showOnly?.length) {
      newCodes = filteredCodes?.filter((country) => {
        return showOnly?.find(
          (short) => country?.code === short?.toUpperCase()
        );
      });
    }

    return newCodes;
  }, [showOnly, excludedCountries]);

  const resultCountries = React.useMemo(() => {
    const lowerSearchValue = searchValue.toLowerCase();

    return codes.filter((country) => {
      if (
        country?.dial_code.includes(searchValue) ||
        country?.name[lang || "en"].toLowerCase().includes(lowerSearchValue)
      ) {
        return country;
      }
    });
  }, [searchValue]);

  const modalPosition = animationDriver.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
    extrapolate: "clamp",
  });

  const modalBackdropFade = animationDriver.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  const openModal = () => {
    Animated.timing(animationDriver, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animationDriver, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: CountryItem;
    index: number;
  }) => {
    let itemName = item?.name[lang];
    let checkName = itemName.length ? itemName : item?.name["en"];

    return (
      <ItemTemplate
        key={index}
        item={item}
        style={style}
        name={checkName}
        onPress={() => {
          Keyboard.dismiss();
          typeof pickerButtonOnPress === "function" &&
            pickerButtonOnPress(item);
        }}
      />
    );
  };

  const onStartShouldSetResponder = () => {
    onBackdropPress?.();
    return false;
  };
  const clearValue = () => {
    setSearchValue("");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onShow={openModal}
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        {!disableBackdrop && (
          <Animated.View
            onStartShouldSetResponder={onStartShouldSetResponder}
            style={[
              {
                flex: 1,
                opacity: modalBackdropFade,
                backgroundColor: "rgba(0,0,0,0.45)",
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "flex-end",
              },
              style?.backdrop,
            ]}
          />
        )}
        <Animated.View
          style={[
            styles.modal,
            style?.modal,
            {
              transform: [
                {
                  translateY: modalPosition,
                },
              ],
            },
          ]}
        >
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <TextInput
                style={[styles.searchBar, style?.textInput]}
                value={searchValue}
                onChangeText={setSearchValue}
                placeholder={inputPlaceholder || "Search your country"}
                placeholderTextColor={inputPlaceholderTextColor || "#8c8c8c"}
                {...rest}
              />
              <View
                style={{
                  position: "absolute",
                  right: 12,
                  zIndex: 100,
                }}
              >
                {searchValue ? (
                  <AppIcon
                    onPress={clearValue}
                    name={EvaIcons.CloseCircle}
                    fill={theme["text-platinum-color"]}
                  />
                ) : (
                  <Text
                    style={{ color: "#246BFD", fontWeight: "700" }}
                    onPress={onRequestClose}
                  >
                    Close Modal
                  </Text>
                )}
              </View>
            </View>
          </>
          <View style={[styles.line, style?.line]} />
          {resultCountries.length === 0 ? (
            <View
              style={[styles.countryMessage, style?.countryMessageContainer]}
            >
              <Text
                style={[
                  {
                    color: "#8c8c8c",
                    fontSize: 16,
                  },
                  style?.searchMessageText,
                ]}
              >
                {searchMessage || "Sorry we cant find your country :("}
              </Text>
            </View>
          ) : (
            <>
              {searchValue && (
                <Text style={[styles.titleResult, style?.titleResultStyle]}>
                  {titleResult ? titleResult : `Result for "${searchValue}"`}
                </Text>
              )}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={resultCountries || codes}
                keyExtractor={(item, index) => "" + item + index}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                style={[style?.itemsList]}
                keyboardShouldPersistTaps={"handled"}
                renderItem={renderItem}
                ListHeaderComponent={
                  popularCountries && ListHeaderComponent && !searchValue ? (
                    <>
                      <ListHeaderComponent
                        countries={preparedPopularCountries}
                        lang={lang}
                      />
                    </>
                  ) : null
                }
                {...rest}
              />
            </>
          )}
        </Animated.View>
        <Animated.View
          style={[
            styles.modalInner,
            style?.modalInner,
            {
              height: animatedMargin,
            },
          ]}
        />
      </View>
    </Modal>
  );
};

interface CountryListProps {
  lang: string;
  searchValue?: string;
  excludedCountries?: string[];
  popularCountries?: string[];
  showOnly?: string[];

  ListHeaderComponent?: (props: ListHeaderComponentProps) => JSX.Element;
  itemTemplate?: (props: ItemTemplateProps) => JSX.Element;
  pickerButtonOnPress: (item: CountryItem) => any;

  style?: StyleCountryCodesButton;
}

export const CountryList = ({
  showOnly,
  popularCountries,
  lang = "en",
  searchValue = "",
  excludedCountries,
  style,
  pickerButtonOnPress,
  ListHeaderComponent,
  itemTemplate: ItemTemplate = CountryButton,
  ...rest
}: CountryListProps) => {
  // ToDo refactor exclude and showOnly props to objects
  let filteredCodes = countriesRemover(excludedCountries);

  const preparedPopularCountries = React.useMemo(() => {
    return filteredCodes?.filter((country) => {
      return popularCountries?.find(
        (short) => country?.code === short?.toUpperCase()
      );
    });
  }, [popularCountries]);

  const codes = React.useMemo(() => {
    let newCodes = filteredCodes;

    if (showOnly?.length) {
      newCodes = filteredCodes?.filter((country) => {
        return showOnly?.find(
          (short) => country?.code === short?.toUpperCase()
        );
      });
    }

    return newCodes;
  }, [showOnly, excludedCountries]);

  const resultCountries = React.useMemo(() => {
    const lowerSearchValue = searchValue.toLowerCase();

    return codes.filter((country) => {
      if (
        country?.dial_code.includes(searchValue) ||
        country?.name[lang || "en"].toLowerCase().includes(lowerSearchValue)
      ) {
        return country;
      }
    });
  }, [searchValue]);

  const renderItem = ({
    item,
    index,
  }: {
    item: CountryItem;
    index: number;
  }) => {
    let itemName = item?.name[lang];
    let checkName = itemName.length ? itemName : item?.name["en"];

    return (
      <ItemTemplate
        key={index}
        item={item}
        style={style}
        name={checkName}
        onPress={() => {
          Keyboard.dismiss();
          typeof pickerButtonOnPress === "function" &&
            pickerButtonOnPress(item);
        }}
      />
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={resultCountries || codes}
      keyExtractor={(item, index) => "" + item + index}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      style={[style?.itemsList]}
      keyboardShouldPersistTaps={"handled"}
      renderItem={renderItem}
      ListHeaderComponent={
        popularCountries &&
        ListHeaderComponent && (
          <ListHeaderComponent
            countries={preparedPopularCountries}
            lang={lang}
          />
        )
      }
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 600 : undefined,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    bottom: 0,
    zIndex: 10,
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 10,
  },
  modalInner: {
    zIndex: 99,
    backgroundColor: "white",
    width: "100%",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    height: 40,
    padding: 5,
  },
  countryMessage: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  line: {
    width: "100%",
    height: 1.5,
    borderRadius: 2,
    backgroundColor: "#eceff1",
    alignSelf: "center",
    marginVertical: 5,
  },
  titleResult: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
  },
});
const countriesRemover = (
  excludedCountries: string[] | undefined
): CountryItem[] => {
  return countryCodes?.filter((country) => {
    return !excludedCountries?.find(
      (short) => country?.code === short?.toUpperCase()
    );
  });
};
