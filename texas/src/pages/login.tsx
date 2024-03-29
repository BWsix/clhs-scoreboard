import { Alert, Anchor, Container, Title, Image, Code } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { LoginPageForm } from "src/components/Login/Login";
import { getPageLayout } from "src/layouts/PageLayout";

const INFO_LIST: InfoProps[] = [
  {
    title: "2023/04/04 錯誤：帳號密碼無誤，但發生錯誤無法登入",
    children: (
      <>
        學校成績查詢系統又又又更新了登入邏輯。雖然暫時修好了，但有可能是因為最近學校正在更新系統所以才有這次的問題。總之有極大的機率未來還會再出問題。
        <br />
        謝謝
        <Anchor href="https://github.com/weedfish1" target="_blank" size="sm">
          weedfish1
        </Anchor>
        發現這個問題
        <br />
        <Anchor
          href="https://github.com/BWsix/clhs-scoreboard/issues/164"
          target="_blank"
          size="sm"
        >
          https://github.com/BWsix/clhs-scoreboard/issues/164
        </Anchor>
      </>
    ),
  },
  {
    title: "2023/03/25 修改密碼後無法登入的問題",
    children: (
      <>
        原來還可以改密碼👀
        <br />
        謝謝
        <Anchor href="https://github.com/watercatuwu" target="_blank" size="sm">
          溺水貓watercat
        </Anchor>
        發現這個問題
        <br />
        <Anchor
          href="https://github.com/BWsix/clhs-scoreboard/issues/158"
          target="_blank"
          size="sm"
        >
          https://github.com/BWsix/clhs-scoreboard/issues/158
        </Anchor>
      </>
    ),
  },
  {
    title: "2022/07/04 無法登入的問題",
    children: (
      <>
        學校系統更改了登入認證，導致發生無法登入的錯誤。目前錯誤已被排除，詳細情況可以參考這個
        <Anchor
          href="https://github.com/BWsix/clhs-scoreboard/commit/bbc3b1a566c1d0f97d6c68fd8b77356e5c5f777c"
          target="_blank"
          size="sm"
        >
          commit
        </Anchor>
      </>
    ),
  },
  {
    title: "2022/05/22 💥藝術就是爆炸💥",
    children: (
      <>
        💥 <Code>@clhs-scoreboard/lappland</Code>內所有的
        <Code>String.prototype.split()</Code>已被替換為<Code>explode()</Code>.
        <br />
        <Anchor
          href="https://github.com/BWsix/clhs-scoreboard/commit/130afb5eb34fe9ce44b08283ee8eca4a6205da3f"
          target="_blank"
          size="sm"
        >
          💥 explosive commit
        </Anchor>
        <Image src="https://i.imgur.com/1xq2Twm.png" alt="💥" />
      </>
    ),
  },
  {
    title: "2022/05/21 🎉正式版🎉",
    children: (
      <>
        <Title order={4} align="center" my="md">
          🎉壢中Scoreboard正式版🎉
        </Title>
        雖然還有一些需要改善的地方，不過我懶得改了。以下有兩點注意事項：
        <br />
        <br />
        <Title order={5}>1. 請定期關閉應用程式</Title>
        為了可安裝性，我將壢中Scoreboard設定成漸進式網頁應用程式
        {"(Progressive Web App, PWA)"}。缺點是，下載後需要透過
        <b>關閉應用程式</b>
        來取得更新(應該吧)，因此請記得定期關閉應用程式！
        <br />
        <br />
        <Title order={5}>2. 客服專區</Title>
        如果使用上有任何想法、改善建議或是想要問的問題，歡迎使用選單的客服專區，發issue到壢中Scoreboard的github頁面，我看到後會盡量回答。
        如果沒有github帳號，那裡也有一個google表單。
        <br />
        <Title order={4} align="center" my="md">
          👻關於壢中Scoreboard👻
        </Title>
        壢中Scoreboard最一開始是在這學期第一次段考完的周末，抱著「應該做得到！」的心情為了改善成績查詢網站的使用者體驗而開發的。
        從最一開始只有成績查詢的功能，到後來陸續加入了課表、學期成績、官網公告、行事曆查詢等功能。
        其中我最喜歡的是幾天前加入的
        <Anchor href="/resources" size="sm">
          社群資源
        </Anchor>
        ，非常歡迎你在那裡分享自己的創作！
        <br />
        <Title order={4} align="center" my="md">
          👏致謝👏
        </Title>
        最後，我想感謝使用本網站的你，
        以及在開發前期幫助除錯以及提出改善建議的219同學、壢中資培成員以及創客社的成員，謝謝你們的幫助！
      </>
    ),
  },
];

export default function LoginPage() {
  const isCurrentVersion =
    typeof window !== "undefined" &&
    window?.location?.origin === "https://clhs-scoreboard.vercel.app";

  const infoList = INFO_LIST.map(({ children, title }, idx) => (
    <InfoCard title={title} key={idx}>
      {children}
    </InfoCard>
  ));

  return (
    <Container size="xs">
      {!isCurrentVersion && (
        <Alert color="red" mb="sm">
          你正在使用的這個網站並不是正式版，請使用以下網站以確保你的網站內容得到持續更新：
          <Anchor href="http://clhs-scoreboard.vercel.app">
            http://clhs-scoreboard.vercel.app
          </Anchor>
        </Alert>
      )}
      <LoginPageForm />
      {infoList}
    </Container>
  );
}
LoginPage.getLayout = getPageLayout({ title: "登入", onlyPageTitle: true });

interface InfoProps {
  title?: string;
  children?: React.ReactNode;
}

const InfoCard: React.FC<InfoProps> = ({ children, title }) => {
  return (
    <Alert
      title={title}
      radius="md"
      icon={<IconAlertCircle size={16} />}
      variant="outline"
      mt="md"
    >
      {children}
    </Alert>
  );
};
