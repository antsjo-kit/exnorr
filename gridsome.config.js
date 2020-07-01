module.exports = {
  templates: {
    // Add templates for content types here.
    // Read more: https://gridsome.org/docs/templates/
  },
  plugins: [
    {
      use: "@gridsome/source-contentful",
      options: {
        space: "enk37kpk34s3", // required
        accessToken: "9PuZNP608gt8tE2OmrL9WDnA_Qou3T-byRGscqpiAGg", // required
        typeName: "Contentful",
      },
    },
  ],
};
