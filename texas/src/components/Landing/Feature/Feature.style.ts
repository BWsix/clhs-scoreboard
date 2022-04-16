import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  description: {
    textAlign: "center",
    fontSize: 16,

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));
