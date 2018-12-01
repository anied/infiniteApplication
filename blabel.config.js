const presets = [
  [
    "@babel/env",
    {
      targets: "> 0.5%, last 2 versions, Firefox ESR, not dead, ie 8-11, maintained node versions", // https://browserl.ist/?q=%3E+0.5%25%2C+last+2+versions%2C+Firefox+ESR%2C+not+dead%2C+ie+8-11
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };