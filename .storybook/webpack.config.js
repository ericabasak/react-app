// .storybook/webpack.config.js
module.exports = async ({ config, mode }) => {
    config.stats = {
      errorDetails: true, // --display-error-details
    }
    return config;
  };