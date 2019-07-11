module.exports = {
  presets: [
    ['@babel/preset-env', { targets: "> 0.25%, not dead" }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
};
