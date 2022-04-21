import { Anchor } from "@mantine/core";
import { InfoCard } from "./Updates.InfoCard";

export function UI_Refactor() {
  return (
    <InfoCard title="2022/4/8 UI更新">
      請重新安裝 CLHS Scoreboard 來確保&quot;回到上次離開畫面&quot;功能正常。
      <Anchor href="/installation" target="_blank">
        在新的分頁開啟 CLHS Scoreboard
      </Anchor>
    </InfoCard>
  );
}
