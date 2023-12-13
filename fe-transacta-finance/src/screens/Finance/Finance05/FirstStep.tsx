import React from "react";
import { TransactionCategory } from "./TransactionCategory";
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
} from "@ui-kitten/components";
// ----------------------------- Components && Elements -----------------------
import dayjs from "dayjs";
import { Formik } from "formik";
import { LayoutCustom, Text } from "components";

// ----------------------------- Types ---------------------------------------
type FormikForm = {
  goal_name: string;
  start_date?: Date | undefined;
  completion_date?: Date | undefined;
};

const FirstStep = React.memo(({ onNext }: { onNext(): void }) => {
  const styles = useStyleSheet(themedStyles);
  const [selected, setSelected] = React.useState(new IndexPath(1));

  const handleSelect = (index: IndexPath | IndexPath[]) => {
    if (Array.isArray(index)) {
      // Handle multiple indices
    } else {
      // Handle single index
      setSelected(index);
    }
  };
  const Select_option = ["Food and Drinks", "Health", "Savings"];
  const displayValue = Select_option[selected.row];
  const initValues: FormikForm = {
    goal_name: "",
    start_date: undefined,
    completion_date: undefined,
  };
  return (
    <Formik
      initialValues={initValues}
      onSubmit={(values) => {
        console.log(values);
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
                    Transaction Category
                  </Text>
                  <Select
                    size="small"
                    style={styles.selected}
                    value={displayValue}
                    selectedIndex={selected}
                    onSelect={handleSelect}
                    status="primary"
                  >
                    {Select_option.map((item, index) => {
                      return <SelectItem title={item} key={index} />;
                    })}
                  </Select>
                </LayoutCustom>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    start date
                  </Text>
                  <Datepicker
                    placeholder="Select start date"
                    style={styles.input}
                    date={values.start_date}
                    status={
                      values.start_date === undefined ? "basic" : "primary"
                    }
                    onSelect={(date) =>
                      setFieldValue("start_date", new Date(date))
                    }
                  />
                </LayoutCustom>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    completion date
                  </Text>
                  <Datepicker
                    placeholder="Select completion date"
                    style={styles.input}
                    date={values.completion_date}
                    min={values.start_date ? new Date(values.start_date) : null}
                    status={
                      values.completion_date === undefined ? "basic" : "primary"
                    }
                    onSelect={(date) =>
                      setFieldValue("completion_date", new Date(date))
                    }
                  />
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
});
