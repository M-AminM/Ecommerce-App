import React, { type FC } from "react";
import { Spin } from "antd";

type SuspenseWrapperProps = {
  path: string;
};

const SuspenseWrapper: FC<SuspenseWrapperProps> = ({ path }) => {
  const LazyComponent = React.lazy(() => import(`../../pages/${path}`));

  return (
    <React.Suspense
      fallback={
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      }
    >
      <LazyComponent />
    </React.Suspense>
  );
};

export default SuspenseWrapper;
