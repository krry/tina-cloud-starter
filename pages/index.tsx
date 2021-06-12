import { LandingPage } from "../components/landing-page";
import { Wrapper } from "../components/helper-components";
import type { Cover_Document } from "../.tina/__generated__/types";
import { createLocalClient, AsyncReturnType } from "../utils";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return (
    <>
      <Wrapper data={props.data.coverDocument.data}>
        <LandingPage {...props.data.coverDocument.data} />
      </Wrapper>
    </>
  );
}

export const query = `#graphql
  query ContentQuery {
    # "index.md" is _relative_ to the "Marketing Pages" path property in your schema definition
    # you can inspect this file at "content/cover/index.md"
    coverDocument(relativePath: "index.md") {
      data {
        __typename
        ... on LandingPage_Doc_Data {
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
        coverDocument: Cover_Document;
      }>(query, {
        variables: {},
      }),
      query: query,
      variables: {},
    },
  };
};
