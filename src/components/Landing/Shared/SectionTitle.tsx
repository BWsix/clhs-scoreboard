import { createStyles, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",
    fontSize: 16,

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

interface Props {
  title: string;
}
export const SectionTitle = ({ title }: Props) => {
  const { classes } = useStyles();

  return <Title className={classes.title}>{title}</Title>;
};
