import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
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
import * as Yup from "yup";
// ----------------------------- Types ---------------------------------------

type FormikForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
    confirmPassword: Yup.string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      })
      .required("Confirm password is required"),
    // phoneNumber: Yup.string().required("Required"),
  });

  const Select_option = ["Food and Drinks", "Health", "Savings"];
  const displayValue = Select_option[selected.row];

  const initValues: FormikForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={(values): void => {
        const requestData = {
          username: values.name, // Assuming your server expects 'username'
          // Assuming your server expects 'username'
          pass: values.password,
          email: values.email,
          // phoneNumber: values.phoneNumber,
        };

        axios
          .post("http://172.20.10.2:3000/tr/userregister", requestData)
          .then((response) => {
            console.log(response.data);
            if (response.data.message === "User Created") {
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
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <LayoutCustom style={styles.container}>
                <LayoutCustom>
                  <Text category="t3" marginVertical={24}>
                    Register
                  </Text>
                  <LayoutCustom mt={16} gap={4}>
                    <Text category="c1" capitalize status="grey" marginLeft={8}>
                      Name
                    </Text>
                    <Input
                      value={values.name}
                      onChangeText={(value) => setFieldValue("name", value)}
                      style={styles.input}
                      placeholder="Enter Name"
                    />
                  </LayoutCustom>
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
                  <LayoutCustom mt={16} gap={4}>
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
                  </LayoutCustom>
                  <LayoutCustom mt={16} gap={4}>
                    <Text category="c1" capitalize status="grey" marginLeft={8}>
                      Confirm Password
                    </Text>
                    <Input
                      value={values.confirmPassword}
                      onChangeText={(value) =>
                        setFieldValue("confirmPassword", value)
                      }
                      style={styles.input}
                      placeholder="Confirm Password"
                      secureTextEntry
                    />
                  </LayoutCustom>
                  {/* <LayoutCustom mb={32} mt={16} gap={4}>
                    <Text category="c1" capitalize status="grey" marginLeft={8}>
                      Phone Number
                    </Text>
                    <Input
                      value={values.phoneNumber}
                      onChangeText={(value) =>
                        setFieldValue("phoneNumber", value)
                      }
                      style={styles.input}
                      placeholder="Enter Phone Number"
                      keyboardType="phone-pad"
                    />
                  </LayoutCustom> */}
                </LayoutCustom>
                <Button children={"Next Step"} onPress={() => handleSubmit()} />
              </LayoutCustom>
            </KeyboardAvoidingView>
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
