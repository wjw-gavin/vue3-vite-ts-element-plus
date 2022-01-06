module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    // colors: {
    //   white: '#ffffff',
    //   primary: '#062c6e',
    //   success: '#67c23a',
    //   warning: '#e6a23c',
    //   error: '#f56c6c',
    //   textColor: '#0b1527'
    // },
    extend: {}
  },
  variants: {
    appearance: []
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
