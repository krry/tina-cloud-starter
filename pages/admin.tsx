import { useEffect } from "react";
import { useRouter } from "next/router";

import { Wrapper, Page } from "../components/helper-components";
import { useEditState } from "../utils/editState";

const GoToEditPage: React.FC = () => {
  const { setEdit } = useEditState();
  const router = useRouter();
  useEffect(() => {
    setEdit(true);
    router.back();
  }, []);
  return (
    <Wrapper data={{}}>
      <Page data={{}}>
        <div>Going into edit mode...</div>
      </Page>
    </Wrapper>
  );
};

export default GoToEditPage;
