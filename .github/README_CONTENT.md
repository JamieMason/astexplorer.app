## 📣 Summary

Everything you love about https://astexplorer.net plus:<br><br>✅ Edit
Transforms in your IDE. <br>✅ Organise them into Modules. <br>✅ Hot Reloading.
<br>✅ Work Offline.

## 📸 Screenshot

<center><img src="./static/screenshot.png?raw=true"></center>

## 🌩 Installation

### Mac

📦
[ASTExplorer-0.14.7.dmg](https://github.com/JamieMason/astexplorer.app/releases/download/0.14.7/ASTExplorer-0.14.7.dmg)<br>
📦
[ASTExplorer-darwin-x64-0.14.7.zip](https://github.com/JamieMason/astexplorer.app/releases/download/0.14.7/ASTExplorer-darwin-x64-0.14.7.zip)

### Build From Source

```
git clone https://github.com/JamieMason/astexplorer.app.git astexplorer-app
cd astexplorer-app
yarn install
yarn start
```

## 🕹 Usage

1. Mouse over the **Transform** Menu at the top of AST Explorer.
1. Select [Babel Plugin], [ESLint Rule], [Codemod] etc.
1. Find and open your Transform Script on your machine.

You can now edit your Transform Script in your IDE, such as [VS Code] and
changes will be reloaded automatically in AST Explorer. Organise your transform
using [JavaScript Modules] and they will be bundled together automatically.

[babel plugin]: https://babeljs.io/docs/en/plugins#plugin-development
[codemod]: https://github.com/facebook/jscodeshift
[eslint rule]: https://eslint.org/docs/developer-guide/working-with-rules
[javascript modules]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[vs code]: https://code.visualstudio.com
