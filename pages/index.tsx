import { HomePage } from "../components/home-page";
import { Wrapper } from "../components/helper-components";
import type { Cover_Document } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";

export default function Home(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return (
    <Wrapper data={props.data.getCoverDocument.data}>
      <HomePage {...props.data.getCoverDocument.data} />
    </Wrapper>
  );
}

export const query = `#graphql
  query ContentQuery {
    # "index.md" is _relative_ to the "Marketing Pages" path property in your schema definition
    # you can inspect this file at "content/cover/index.md"
    getCoverDocument(relativePath: "index.md") {
      data {
        __typename
        ... on CoverPage_Doc_Data {
          blocks {
            __typename
            ... on Message_Data {
              messageHeader
              messageBody
            }
            ... on Image_Data {
              heading
              imgDescription
              src
            }
          }
        }
      }
    }
  }
`;

export const getStaticProps = async () => {
  const client = createLocalClient();
  return {
    props: {
      data: await client.request<{
        getCoverDocument: Cover_Document;
      }>(query, {
        variables: {},
      }),
      query: query,
      variables: {},
    },
  };
};
