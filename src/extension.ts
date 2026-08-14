import * as vscode from 'vscode';
import * as fs from 'fs';

class TetrisWebviewViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    const webview = webviewView.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, 'src', 'webview'),
        vscode.Uri.joinPath(this.context.extensionUri, 'resources')
      ]
    };

    webview.html = this.getHtml(webview);

    webview.onDidReceiveMessage((message) => {
      if (message.command === 'start') {
        openGame(this.context);
      }
    });
  }

  private getHtml(webview: vscode.Webview): string {
    const iconUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'resources', 'tetris-icon-high.svg')
    );

    return /* html */ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            padding: 12px;
            color: var(--vscode-foreground);
            font-family: var(--vscode-font-family);
            font-size: 13px;
          }
          .header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
          }
          .header img { width: 28px; height: 28px; }
          .header h2 { margin: 0; font-size: 16px; }
          button {
            width: 100%;
            padding: 8px;
            margin-bottom: 16px;
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
          }
          button:hover { background: var(--vscode-button-hoverBackground); }
          .keys { margin: 0; padding: 0; list-style: none; }
          .keys li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
            border-bottom: 1px solid var(--vscode-panel-border);
          }
          .keys li:last-child { border-bottom: none; }
          kbd {
            background: var(--vscode-textCodeBlock-background);
            border-radius: 3px;
            padding: 2px 6px;
            font-family: var(--vscode-editor-font-family);
            font-size: 12px;
            min-width: 22px;
            text-align: center;
          }
          .title { opacity: 0.7; margin-bottom: 6px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${iconUri}" alt="Tetris" />
          <h2>Tetris</h2>
        </div>
        <button id="startBtn">Start Game</button>
        <div class="title">Controls</div>
        <ul class="keys">
          <li><span>Move Left</span><kbd>←</kbd></li>
          <li><span>Move Right</span><kbd>→</kbd></li>
          <li><span>Rotate</span><kbd>↑</kbd></li>
          <li><span>Soft Drop</span><kbd>↓</kbd></li>
          <li><span>Hard Drop</span><kbd>Space</kbd></li>
          <li><span>Hold</span><kbd>C</kbd></li>
        </ul>
        <div class="title" style="margin-top:12px;"><a href="https://codejson.cn/games/tetris/" target="_blank" rel="noopener noreferrer">Website For Tetris →</a></div>
        <script>
          const vscode = acquireVsCodeApi();
          document.getElementById('startBtn').addEventListener('click', () => {
            vscode.postMessage({ command: 'start' });
          });
        </script>
      </body>
      </html>
    `;
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
    vscode.window.registerWebviewViewProvider(
      'tetrisView',
      new TetrisWebviewViewProvider(context)
    )
  );
}

export function deactivate() {}