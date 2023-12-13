import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { Modal, StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";

// ----------------------------- Components && Elements -----------------------
import dayjs from "dayjs";
import { LayoutCustom, Text } from "components";
import TransactionItem from "./TransactionItem";
import { faker } from "@faker-js/faker";
import ModalSelectDate from "./ModalSelectDate";

const DailyTab = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState<Date>(new Date());

  const _show = () => {
    setVisible(!visible);
  };

  return (
    <LayoutCustom style={styles.container}>
      <LayoutCustom style={styles.date} mt={24} onPress={_show}>
        <Text
          category="c1"
          status="warning"
          children={`${dayjs(date).format("MMM DD")}`}
        />
      </LayoutCustom>
      <LayoutCustom mh={24} gap={16}>
        <Text category="t5" marginBottom={8}>
          Income
        </Text>
        {INCOME.map((income, index) => {
          return <TransactionItem key={index} item={income} />;
        })}
      </LayoutCustom>
      <LayoutCustom mh={24} gap={16} mt={40}>
        <Text category="t5">Outcome</Text>
        {OUTCOME.map((outcome, index) => {
          return <TransactionItem key={index} item={outcome} />;
        })}
      </LayoutCustom>
      <Modal
        visible={visible}
        onBackdropPress={_show}
        backdropStyle={styles.backdropStyle}
      >
        <ModalSelectDate date={date} setDate={setDate} close={_show} />
      </Modal>
    </LayoutCustom>
  );
});

export default DailyTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},
  date: {
    justifyContent: "center",
    alignSelf: "flex-end",
    borderWidth: 1,
    marginRight: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 99,
    borderColor: "color-warning-active",
  },
  backdropStyle:{
    backgroundColor: "color-basic-800",
    opacity: 0.8,
  }
});

const INCOME = [
  {
    user: {
      name: "Tiana Saris",
      avatar: faker.image.avatar(),
    },
    title: "Add Money",
    amount: 56,
    create_at: new Date(new Date().setHours(new Date().getHours())),
  },
  {
    user: {
      name: "Kaiya Baptista",
      avatar: faker.image.avatar(),
    },
    title: "Add Money",
    amount: 56,
    create_at: new Date(new Date().setHours(new Date().getHours() - 1)),
  },
  {
    user: {
      name: "Desirae Bergson",
      avatar: faker.image.avatar(),
    },
    title: "Add Money",
    amount: 56,
    create_at: new Date(new Date().setHours(new Date().getHours() - 1.4)),
  },
  {
    user: {
      name: "Emery Schleifer",
      avatar: faker.image.avatar(),
    },
    title: "Add Money",
    amount: 56,
    create_at: new Date(new Date().setHours(new Date().getHours() - 2)),
  },
];
const OUTCOME = [
  {
    user: {
      name: "Tiana Saris",
      avatar: faker.image.avatar(),
    },
    title: "Shopping",
    amount: -56,
    create_at: new Date(new Date().setHours(new Date().getHours() - 2)),
  },
  {
    user: {
      name: "Kaiya Baptista",
      avatar: faker.image.avatar(),
    },
    title: "Food",
    amount: -156,
    create_at: new Date(new Date().setHours(new Date().getHours() - 3)),
  },
  {
    user: {
      name: "Desirae Bergson",
      avatar: faker.image.avatar(),
    },
    title: "Medicine",
    amount: -156,
    create_at: new Date(new Date().setHours(new Date().getHours() - 4)),
  },
  {
    user: {
      name: "Emery Schleifer",
      avatar: faker.image.avatar(),
    },
    title: "Travel",
    amount: -1256,
    create_at: new Date(new Date().setHours(new Date().getHours() - 10)),
  },
];
