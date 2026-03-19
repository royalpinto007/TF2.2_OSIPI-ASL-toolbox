## PyASL Workbench Next.js Prototype

This folder contains a multi-page Next.js version of the `pyasl-native-gui` prototype.

### Routes

- `/` - landing page
- `/workbench` - pipeline builder and inspector
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
- The visual language is based on the final light-theme `pyasl-native-gui` static prototype.
- The current version keeps the same UI structure while splitting the experience into separate pages.
