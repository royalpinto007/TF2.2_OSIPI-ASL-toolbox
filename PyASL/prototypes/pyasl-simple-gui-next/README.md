## PyASL Simple GUI Next.js Prototype

This folder contains a simplified multi-page Next.js version of the PyASL GUI prototype, aimed at non-programmer users.

### Routes

- `/` - landing page
- `/workbench` - simplified workflow setup screen
- `/datasets` - dataset browser
- `/templates` - template resources
- `/runs` - batch execution history
- `/reports` - generated artifacts

### Run locally

```bash
cd /home/royalpinto007/Open-Source/TF2.2_OSIPI-ASL-toolbox/PyASL/prototypes/pyasl-native-gui-next
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Build check

```bash
npm run build
```

### Notes

- This is a static prototype using the Next.js App Router.
- The visual language is based on `pyasl-native-gui-next`, but simplified for a more guided user flow.
- This version keeps the same project setup while reducing interface complexity.
