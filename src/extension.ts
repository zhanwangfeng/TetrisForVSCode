import * as vscode from 'vscode';
import * as fs from 'fs';

interface TreeNode {
  label: string;
  description?: string;
  icon?: string;
  command?: string;
  children?: TreeNode[];
  collapsible?: vscode.TreeItemCollapsibleState;
}

const CONTROLS: TreeNode[] = [
  { label: '向左移动', description: '←' },
  { label: '向右移动', description: '→' },
  { label: '旋转', description: '↑' },
  { label: '软降', description: '↓' },
  { label: '硬降', description: '空格' },
  { label: '暂存', description: 'C' }
];

const TREE: TreeNode[] = [
  { label: '开始游戏', icon: 'play', command: 'tetris.start' },
  { label: '操作说明', icon: 'keyboard', collapsible: vscode.TreeItemCollapsibleState.Expanded, children: CONTROLS },
  { label: '访问网站', icon: 'link', command: 'tetris.openWebsite' }
];

class TetrisTreeDataProvider implements vscode.TreeDataProvider<TreeNode> {
  getTreeItem(element: TreeNode): vscode.TreeItem {
    const item = new vscode.TreeItem(
      element.label,
      element.collapsible ?? vscode.TreeItemCollapsibleState.None
    );
    if (element.description) {
      item.description = element.description;
    }
    if (element.icon) {
      item.iconPath = new vscode.ThemeIcon(element.icon);
    }
    if (element.command) {
      item.command = { command: element.command, title: element.label };
    }
    return item;
  }

  getChildren(element?: TreeNode): TreeNode[] {
    if (!element) {
      return TREE;
    }
    return element.children ?? [];
  }
}

function openGame(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'tetrisGame',
    'Tetris',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.joinPath(context.extensionUri, 'src', 'webview')
      ]
    }
  );

  const htmlPath = vscode.Uri.joinPath(
    context.extensionUri,
    'src',
    'webview',
    'game.html'
  );

  const html = fs.readFileSync(htmlPath.fsPath, 'utf-8');
  panel.webview.html = html;
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('tetris.start', () => openGame(context))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('tetris.openWebsite', () => {
      vscode.env.openExternal(vscode.Uri.parse('https://codejson.cn/games/tetris/'));
    })
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('tetrisView', new TetrisTreeDataProvider())
  );
}

export function deactivate() {}
