import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";

export const formatDate = (date: Date): string => {
  const today = dayjs().startOf("day");
  const lastWeek = today.subtract(1, "week");
  const yesterday = today.subtract(1, "day");
  const givenDate = dayjs(date).startOf("day");

  if (givenDate.isSame(today)) {
    return `Today, ${givenDate.format("DD MMM YYYY hh:mm")}`;
  } else if (givenDate.isSame(yesterday)) {
    return `Yesterday, ${givenDate.format("DD MMM YYYY hh:mm")}`;
  } else if (givenDate.isSame(lastWeek, "week")) {
    return `Last week, ${givenDate.format("DD MMM YYYY hh:mm")}`;
  } else {
    return givenDate.format("DD MMM YYYY hh:mm");
  }
};
