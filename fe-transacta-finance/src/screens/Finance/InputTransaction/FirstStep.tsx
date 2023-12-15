import React from "react";
import { TransactionCategory } from "./TransactionCategory";
import CurrencyInput from "react-native-currency-input";

// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Datepicker,
  Button,
  Radio,
} from "@ui-kitten/components";
// ----------------------------- Components && Elements -----------------------
import dayjs from "dayjs";
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
  amount: number | null;
  category: string;
  date: Date | undefined;
  account: IAccountProps;
};

const FirstStep = React.memo(({ onNext }: { onNext(): void }) => {
  const styles = useStyleSheet(themedStyles);

  const [selected, setSelected] = React.useState(new IndexPath(1));

  const handleSelect = (index: IndexPath | IndexPath[], setFieldValue: any) => {
    if (Array.isArray(index)) {
      // Handle multiple indices
    } else {
      // Handle single index
      setSelected(index);
      setFieldValue("category", Select_option[index.row]);
    }
  };

  const Select_option = [
    "Food",
    "Clothes",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const displayValue = Select_option[selected.row];
  const initValues: FormikForm = {
    amount: null,
    category: "",
    date: undefined,
    account: SAMPLE_ACCOUNT[0],
  };
  return (
    <Formik
      initialValues={initValues}
      onSubmit={(values) => {
        console.log(
          values.amount,
          values.category,
          values.date,
          values.account
        );
        onNext();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
        return (
          <>
            <LayoutCustom style={styles.container}>
              <LayoutCustom>
                <Text category="t4" marginVertical={24}>
                  Transaction Detail
                </Text>
                <LayoutCustom gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    Transaction Amount
                  </Text>
                  <CurrencyInput
                    value={Number(values.amount)}
                    onChangeValue={(value) => setFieldValue("amount", value)}
                    renderTextInput={(textInputProps) => (
                      <Input {...textInputProps} variant="filled" />
                    )}
                    prefix="Rp "
                    delimiter=","
                    precision={0}
                  />
                </LayoutCustom>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    Transaction Category
                  </Text>
                  <Select
                    size="small"
                    style={styles.selected}
                    value={displayValue}
                    selectedIndex={selected}
                    onSelect={(index) => handleSelect(index, setFieldValue)}
                    status="primary"
                  >
                    {Select_option.map((item, index) => {
                      return <SelectItem title={item} key={index} />;
                    })}
                  </Select>
                </LayoutCustom>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    Transaction Date
                  </Text>
                  <Datepicker
                    placeholder="Select Date"
                    style={styles.input}
                    date={values.date}
                    status={values.date === undefined ? "basic" : "primary"}
                    onSelect={(date) => setFieldValue("date", new Date(date))}
                    onChangeText={(value) => handleChange("date")(value)}
                  />
                </LayoutCustom>
                <Text category="t5" marginVertical={24}>
                  Account
                </Text>
                <LayoutCustom mb={50} gap={16}>
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
});

export default FirstStep;

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
