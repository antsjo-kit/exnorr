module.exports = {
  templates: {
    // Add templates for content types here.
    // Read more: https://gridsome.org/docs/templates/
  },
  plugins: [
    {
      use: "@gridsome/source-contentful",
      options: {
        space: process.env.CONTENTFUL_SPACE, // required
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // required
        typeName: "Contentful",
      },
    },
  ],
};
