/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist/electron',
  },
  publish: null,
  npmRebuild: false,
  icon: 'src/main/assets/report.png',
  files: [
    'dist/main/**/*',
    'dist/preload/**/*',
    'dist/render/**/*',
  ],
  win: {
    target: {
      target: 'nsis',
      arch: ['ia32'],
    }
  },
  defaultArch: 'ia32',
  extraResources: [
    {
      from: "src/main/assets/",
      to: "assets/",
    },
    {
      from: "src/main/temp",
      to: "temp",
    }
  ],
  nsis: {
    oneClick: false,
    perMachine: true,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
}

module.exports = config
