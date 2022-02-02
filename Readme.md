# Usage

```bash
# try without install
deno run --unstable --allow-read --allow-env https://raw.githubusercontent.com/kebot/ftil/main/tailwind-color.ts "#fbfbfb"

# install
deno install --unstable --allow-read --allow-env https://raw.githubusercontent.com/kebot/ftil/main/tailwind-color.ts

# under your tailwind project 
tailwind-color "color-name"
```

# Todo
Features
- display colors in terminal with [Ink](https://deno.land/x/ink@1.3)
- auto copy color names with [Clipboard](https://github.com/rsp/deno-clipboard)
  - or commandLine pbcopy in Mac

Other Platform
- vscode plugin(maybe)
- webapp (possible)
- native app with Tauri

