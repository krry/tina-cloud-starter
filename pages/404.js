import Link from "next/link";
import { Wrapper, Page } from "../components/helper-components";

export default function FourOhFour() {
  return (
    <Wrapper data={{}}>
      <Page>
        <h2>OOPS, NOTHING TO SEE HERE...</h2>
        <Link href="/">Go back home</Link>
      </Page>
    </Wrapper>
  );
}
