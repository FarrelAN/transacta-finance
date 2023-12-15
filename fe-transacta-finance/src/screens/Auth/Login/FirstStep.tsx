import React from "react";
import { TouchableOpacity } from "react-native";
import axios from "axios";
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
import { navigate } from "navigation/root-navigation";
import * as Yup from "yup";
// ----------------------------- Types ---------------------------------------

type FormikForm = {
  email: string;
  password: string;
};

const FirstStep = React.memo(({ onNext }: { onNext(): void }) => {
  const styles = useStyleSheet(themedStyles);

  const [selected, setSelected] = React.useState(new IndexPath(1));

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
  });

  const initValues: FormikForm = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={(values): void => {
        const requestData = {
          username: values.email, // Assuming your server expects 'username'
          password: values.password,
        };

        axios
          .post("http://172.20.10.2:3000/tr/userlogin", requestData)
          .then((response) => {
            console.log(response.data);
            if (response.data.message === "Login successful") {
              console.log(response.data.message);
              onNext();
            } else {
              console.log(response.data.message);
              // Handle unsuccessful login (e.g., show an error message)
            }
          })
          .catch((error) => {
            console.log(error);
            // Handle other errors (e.g., network issues)
          });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
        return (
          <>
            <LayoutCustom style={styles.container}>
              <LayoutCustom>
                <Text category="t3" marginVertical={24}>
                  Login
                </Text>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    Email
                  </Text>
                  <Input
                    value={values.email}
                    onChangeText={(value) => setFieldValue("email", value)}
                    style={styles.input}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </LayoutCustom>
                <LayoutCustom mb={32} mt={16} gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    Password
                  </Text>
                  <Input
                    value={values.password}
                    onChangeText={(value) => setFieldValue("password", value)}
                    style={styles.input}
                    placeholder="Enter Password"
                    secureTextEntry
                  />
                  <TouchableOpacity onPress={() => navigate("Register")}>
                    <Text
                      right
                      category="c2"
                      capitalize
                      status="grey"
                      marginLeft={8}
                    >
                      Don't have an account? Register Here!
                    </Text>
                  </TouchableOpacity>
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
    justifyContent: "center",
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
