/** Modules */
const _ = require('lodash');
const chroma = require('chroma-js');
const pluginWithDefaultConfig = require('./utils/plugin-with-default-config');

const opacities = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

/**
 * Colors
 */
module.exports = pluginWithDefaultConfig(({ addComponents, theme }) => {
  const options = theme('gutenberg.colors');

  const colors = _.map(options, (color, name) => ({
    [`.has-${name}-color`]: {
      color,
    },

    [`.has-${name}-background-color`]: {
      backgroundColor: color,
    },

    [`.has-${name}-background-color.has-background-dim`]: {
      backgroundColor: color,
    },
  }));

  const validColors = _.filter(options, (color) => _.isNumber(color) || color.trim().match(/^(#|rgb|hsl|hsv|hsi|lab|lch|hcl|lrgb)/));

  const shades = _.map(validColors, (color, name) =>
    _.map(opacities, (opacity) => ({
      [`.has-${name}-background-color.has-background-dim-${opacity}`]: {
        backgroundColor: `rgba(${chroma(color)
          .alpha(opacity * 0.01)
          .rgba()})`,
        zIndex: 10,
      },
    })),
  );

  addComponents([colors, ...shades], { respectPrefix: false });
});
