[![](/texas/public/assets/dark.png)](https://clhs-scoreboard.vercel.app/)

# clhs scoreboard

## About

一直覺得學校的成績查詢系統很糟糕，於是自己做了一個

## Structure

| Codebase             |         Description          |
| :------------------- | :--------------------------: |
| [lappland](lappland) | API client for school portal |
| [texas](texas)       |       Next.js frontend       |

## 流程圖

### 登入

![](/assets/login-flow.drawio.png)

### 取得當次段考成績

![](/assets/exam-flow.drawio.png)

### auth guard

![](/assets/auth-guard.drawio.png)

## How can I contribute?

**I'm using [Yarn](https://yarnpkg.com/) for this project, do not use npm for the following commands**

You can start developing by executing the following commands:

```bash
yarn
yarn dev
```

Compile both `@clhs-scoreboard/lappland` and `@clhs-scoreboard/texas` by executing the following commands:

```bash
yarn
yarn build
```

## Special Thanks

謝謝你們的幫助，讓壢中 scoreboard 變得更好

- [@Austin0914](https://github.com/Austin0914)
- [@ian05012](https://github.com/ian05012)
- [@Yong1230](https://github.com/Yong1230)
