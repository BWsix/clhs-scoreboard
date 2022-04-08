import { Container, createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
  },
}));

export const Section: React.FC = ({ children }) => {
  const { classes } = useStyles();

  return <Container className={classes.wrapper}>{children}</Container>;
};
