import {
  Container,
  createStyles,
  SimpleGrid,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import type { TablerIcon } from "@tabler/icons";
import {
  IconDevices,
  IconDownload,
  IconFileText,
  IconLock,
  IconPackage,
} from "@tabler/icons";
import { Section } from "../Shared/Section";
import { SectionTitle } from "../Shared/SectionTitle";

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: 20, height: 20 }} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  description: {
    textAlign: "center",
    fontSize: 16,

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

const title = "特色";
const description = "";
const data: FeatureProps[] = [
  {
    icon: IconLock,
    title: "注重安全",
    description: "用戶端只儲存非敏感資料，且在進行登入流程時不蒐集帳號密碼",
  },
  {
    icon: IconDownload,
    title: "可安裝",
    description: "支援所有平台，透過安裝至手機、平板來獲得更方便的使用體驗",
  },
  {
    icon: IconDevices,
    title: "介面優化",
    description:
      "經過優化的使用者介面讓手機、平板更方便瀏覽。支援黑暗模式來保護你的眼睛<3",
  },
  {
    icon: IconPackage,
    title: "整合服務",
    description:
      "除了成績查詢，另外加入了課表查詢、學年總成績查詢、官網公告和校園行事曆",
  },
  {
    icon: IconFileText,
    title: "開源",
    description:
      "歡迎參與壢中 Scoreboard 的開發，有了你的協助會讓這個專案變得更好",
  },
];

export function FeaturesGrid() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Section>
      <SectionTitle title={title} />

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "xl" },
          { maxWidth: 755, cols: 1, spacing: "xl" },
        ]}
      >
        {features}
      </SimpleGrid>
    </Section>
  );
}
