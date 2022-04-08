import { InfoCard } from "./Updates.InfoCard";

export function SecurityUpdate() {
  return (
    <InfoCard title="2022/3/29 安全性更新">
      為了讓 CLHS Scoreboard 更加安全，用戶端自動登入功能已經被移除了。
      <br />
      <br />
      所有先前儲存在用戶端的資料皆刪除完畢 (
      不過這並不影響瀏覽器的密碼自動填入功能 )。
      <br />
      <br />
      往後使用 CLHS Scoreboard
      時會需要在大約閒置15~20分鐘後使用瀏覽器的密碼自動填入功能重新登入。
    </InfoCard>
  );
}
