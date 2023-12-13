import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Radio,
} from "@ui-kitten/components";
// ----------------------------- Components && Elements -----------------------
import { Formik } from "formik";
import { LayoutCustom, Text } from "components";
import { globalStyle } from "styles/globalStyle";
import convertPrice from "utils/convertPrice";

// ----------------------------- Types ---------------------------------------
interface IAccountProps {
  number: number;
  amount: number;
  name: string;
}
type FormikForm = {
  amount: string;
  account: IAccountProps;
};

const SecondStep = React.memo(
  ({ onNext }: { onNext():void }) => {
    const styles = useStyleSheet(themedStyles);

    const initValues: FormikForm = {
      amount: "",
      account: SAMPLE_ACCOUNT[0],
    };
    return (
      <Formik
        initialValues={initValues}
        onSubmit={(values) => {
          console.log(values);
          onNext();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => {
          return (
            <>
              <LayoutCustom style={styles.container}>
                <LayoutCustom>
                  <Text category="t5" marginVertical={24}>
                    Money Breakdown
                  </Text>
                  <LayoutCustom gap={4}>
                    <Text category="c1" capitalize status="grey" marginLeft={8}>
                      Savings Goal Amount
                    </Text>
                    <Input
                      placeholder="Enter Goal Amount"
                      style={styles.input}
                      value={values.amount}
                      onBlur={handleBlur("amount")}
                      onChangeText={handleChange("amount")}
                    />
                  </LayoutCustom>
                  <Text category="t5" marginVertical={24}>
                    Account
                  </Text>
                  <LayoutCustom gap={16}>
                    {SAMPLE_ACCOUNT.map((item, index) => {
                      return (
                        <LayoutCustom key={index} style={styles.checkbox}>
                          <LayoutCustom
                            gap={8}
                            horizontal
                            onPress={() => {
                              setFieldValue("account", item);
                            }}
                          >
                            <Radio
                              checked={item === values.account}
                              onPress={() => {
                                setFieldValue("account", item);
                              }}
                            />
                            <LayoutCustom gap={4}>
                              <Text>{item.name}</Text>
                              <Text category="subhead" status="grey">
                                **** **** {item.number}
                              </Text>
                            </LayoutCustom>
                          </LayoutCustom>
                          <Text status="success-dark">
                            {convertPrice(item.amount, 2)}
                          </Text>
                        </LayoutCustom>
                      );
                    })}
                  </LayoutCustom>
                </LayoutCustom>
                <Button children={"Next Step"} onPress={() => handleSubmit()} />
              </LayoutCustom>
            </>
          );
        }}
      </Formik>
    );
  }
);

export default SecondStep;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  content: {},
  input: {
    flex: 1,
  },
  checkbox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...globalStyle.shadow,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "background-basic-color-1",
    justifyContent: "space-between",
  },
});

const SAMPLE_ACCOUNT: IAccountProps[] = [
  { number: 4567, amount: 12000, name: "Saving" },
  { number: 1367, amount: 222010, name: "Checking" },
  { number: 6732, amount: 22400, name: "Master Card" },
];
