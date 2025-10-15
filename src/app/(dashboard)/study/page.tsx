import { Suspense } from "react";

import { StudyPage } from "@/modules/course/pages";
import { Heading } from "@/shared/components/common";

const StudyPageRoot = () => {
  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <Suspense>
        <StudyPage />
      </Suspense>
    </div>
  );
};

export default StudyPageRoot;
