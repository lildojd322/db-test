const config = {
  plugins: {
  
    'postcss-hover-media-feature': {},

    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    'autoprefixer': {},
  },
}

export default config