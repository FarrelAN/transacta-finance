import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
// ----------------------------- Components && Elements -----------------------
import { Formik } from "formik";
import { LayoutCustom, Text } from "components";
import { goBack } from "navigation/root-navigation";

// ----------------------------- Types ---------------------------------------
type FormikForm = {
  note: string;
  links: string;
};

const ThirdStep = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  const initValues: FormikForm = {
    note: "",
    links: "",
  };
  return (
    <Formik
      initialValues={initValues}
      onSubmit={(values) => {
        console.log(values);
        goBack()
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
        return (
          <>
            <LayoutCustom style={styles.container}>
              <LayoutCustom>
                <Text category="t4" marginVertical={24}>
                  More information
                </Text>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" uppercase status="grey" marginLeft={8}>
                    Comments
                  </Text>
                  <Input
                    placeholder="Enter some comments"
                    style={styles.input}
                    value={values.note}
                    onBlur={handleBlur("note")}
                    onChangeText={handleChange("note")}
                  />
                </LayoutCustom>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" uppercase status="grey" marginLeft={8}>
                    Links
                  </Text>
                  <Input
                    placeholder="Enter some links"
                    style={styles.input}
                    value={values.links}
                    onBlur={handleBlur("links")}
                    onChangeText={handleChange("links")}
                  />
                </LayoutCustom>
              </LayoutCustom>
              <Button children={"Create Goal"} onPress={() => handleSubmit()} />
            </LayoutCustom>
          </>
        );
      }}
    </Formik>
  );
});

export default ThirdStep;

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
