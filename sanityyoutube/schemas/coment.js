export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
    },

    // To restrict harmfull message, we neee dto take the 'approval' section
    {
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Comments won't show on the site without approval"
    },
    {
      name: "email",
      type: "string",
    },
    {
        name: "comment",
        type: "string",
    },
    {
      name: "post",
      type: "reference",
      to: [{ type: "post" }]
    },
  ],
};

// Now go to schema.js and import this file
