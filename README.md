# Tetris for VS Code

[![VS Marketplace](https://vsmarketplacebadges.dev/version-short/zhanwangfeng.tetris-pro.svg)](https://marketplace.visualstudio.com/items?itemName=zhanwangfeng.tetris-pro)
[![Installs](https://vsmarketplacebadges.dev/installs/zhanwangfeng.tetris-pro.svg)](https://marketplace.visualstudio.com/items?itemName=zhanwangfeng.tetris-pro)

在 VS Code 中直接游玩俄罗斯方块的扩展插件。

- GitHub: https://github.com/zhanwangfeng/TetrisForVSCode
- VSCode: https://marketplace.visualstudio.com/items?itemName=zhanwangfeng.tetris-pro

## 1. 插件说明

- **功能**：通过内置 Webview 在编辑器内运行俄罗斯方块，不离开 VS Code 即可休闲娱乐。
- **入口命令**：`Tetris: Start Game`
- **主要特性**：
  - 标准 10×20 棋盘，7-bag 随机算法，含 Ghost（落点预览）与 Hold 暂存区。
  - NEXT 预览队列（5 个）、自动升级与计分。
  - 每次新游戏随机切换场景配色（含 1984 / 1989 复古主题）。
  - 中英文界面切换。
- **操作按键**：
  - `←` `→`：左右移动
  - `↑`：旋转
  - `↓`：软降
  - `空格`：硬降（直接落底）
  - `C`：Hold 暂存 / 取出

## 2. 插件启动说明

### 方式一：VS Code 插件市场安装（推荐）

1. 打开 VS Code，进入扩展市场（快捷键 `Cmd/Ctrl + Shift + X`）。
2. 搜索 **`Tetris`**（或本插件发布名 `tetris-for-vscode`），点击 **安装**。
3. 安装完成后，按 `Cmd/Ctrl + Shift + P` 打开命令面板。
4. 执行命令 **`Tetris: Start Game`**，即可打开俄罗斯方块游戏面板开始游玩。

> 安装后若命令未出现，可重启 VS Code 重新加载扩展。

### 方式二：本地源码调试运行（F5）

适用于从源码二次开发或本地预览：

1. 安装依赖：

   ```bash
   npm install
   ```

2. 使用 VS Code 打开本项目根目录，按 **F5** 启动调试。
   - 调试前会自动编译 TypeScript（`src` → `out`）并后台监听改动。
   - VS Code 会打开一个新的「扩展开发宿主」窗口。
3. 在扩展开发窗口中，按 `Cmd/Ctrl + Shift + P` 执行 **`Tetris: Start Game`** 即可游玩。

### 其他编译方式

- 单次编译：`npm run compile`
- 监听编译：`npm run watch`（调试时修改代码自动重新编译，重跑命令即生效）
- 打包发布：`npm run vscode:prepublish`
