import { Anchor, Image } from "@mantine/core";
import { InfoCard } from "./Updates.InfoCard";

export const Updates = () => {
  return (
    <>
      <InfoCard title="2022/5/11 學校公告(我有提醒了喔)">
        <Image src="https://i.imgur.com/WZhmz5y.png" alt="耗子尾汁" />
      </InfoCard>
      {/* <InfoCard title="2022/5/11 系統修復">
        對系統進行初步更新，目前可以正常使用了
      </InfoCard> */}
      {/* <InfoCard title="2022/5/9 悲報">
        學校更新了他們的登入頁面，所以壢中Scoreboard壞掉了
        {">"}:(
      </InfoCard> */}
      <InfoCard title="2022/4/8 UI更新">
        請重新安裝 CLHS Scoreboard 來確保&quot;回到上次離開畫面&quot;功能正常。
        <Anchor href="/installation" target="_blank">
          在新的分頁開啟 CLHS Scoreboard
        </Anchor>
      </InfoCard>{" "}
    </>
  );
};
