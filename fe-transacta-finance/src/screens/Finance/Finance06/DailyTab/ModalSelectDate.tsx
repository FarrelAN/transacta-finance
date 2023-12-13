import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  Calendar,
} from "@ui-kitten/components";
// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, NavigationAction } from "components";
import EvaIcons from "types/eva-icon-enum";
import { globalStyle } from "styles/globalStyle";

interface IModalSelectDateProps {
  date: Date
  close(): void;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const ModalSelectDate = React.memo(
  ({ date, close, setDate }: IModalSelectDateProps) => {
    const styles = useStyleSheet(themedStyles);

    const [day, setDay] = React.useState<Date>(date);

    const _onConfirm = () => {
      setDate(day);
      close();
    };
    return (
      <LayoutCustom level="1" style={styles.contentModal}>
        <TopNavigation
          alignment="center"
          title={"Select Date"}
          accessoryLeft={() => (
            <NavigationAction
              marginLeft={8}
              icon={EvaIcons.CloseOutline}
              onPress={close}
            />
          )}
        />
        <Calendar
          boundingMonth
          date={day}
          max={new Date()}
          onSelect={(nextRange) => setDay(nextRange)}
        />
        <LayoutCustom horizontal gap={24} margin={24}>
          <Button
            children="Cancel"
            status="danger"
            appearance="outline"
            style={styles.buttonConfirm}
            onPress={close}
          />
          <Button
            children="Confirm"
            style={styles.buttonConfirm}
            onPress={_onConfirm}
          />
        </LayoutCustom>
      </LayoutCustom>
    );
  }
);

export default ModalSelectDate;

const themedStyles = StyleService.create({
  contentModal: {
    ...globalStyle.shadow,
    borderRadius: 16,
    overflow: "hidden",
    paddingTop: 8,
  },
  buttonConfirm: {
    flex: 1,
  },
});
