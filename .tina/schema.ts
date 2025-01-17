import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      label: "Blog Posts",
      name: "posts",
      path: "content/posts",
      templates: [
        {
          label: "Article",
          name: "article",
          fields: [
            {
              type: "text",
              label: "Title",
              name: "title",
            },
            {
              type: "reference",
              label: "Author",
              name: "author",
              collection: "authors",
            },
          ],
        },
      ],
    },
    {
      label: "Authors",
      name: "authors",
      path: "content/authors",
      templates: [
        {
          label: "Author",
          name: "author",
          fields: [
            {
              type: "text",
              label: "Name",
              name: "name",
            },
            {
              type: "text",
              label: "Avatar",
              name: "avatar",
            },
          ],
        },
      ],
    },
    {
      label: "Cover",
      name: "cover",
      path: "content/cover",
      templates: [
        {
          label: "Cover Page",
          name: "coverPage",
          fields: [
            {
              type: "blocks",
              name: "blocks",
              label: "Blocks",
              templates: [
                {
                  name: "message",
                  label: "Message",
                  fields: [
                    {
                      type: "text",
                      label: "Message Header",
                      name: "messageHeader",
                    },
                    {
                      type: "textarea",
                      label: "Message Body",
                      name: "messageBody",
                    },
                  ],
                },
                {
                  name: "image",
                  label: "Image",
                  fields: [
                    {
                      type: "text",
                      label: "Heading",
                      name: "heading",
                    },
                    {
                      type: "textarea",
                      label: "Image Description",
                      name: "imgDescription",
                    },
                    {
                      type: "text",
                      label: "Image src",
                      name: "src",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
