module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {
      // Ensure backdrop-filter is properly handled
      flexbox: 'no-2009',
      grid: true,
    },
  },
}
