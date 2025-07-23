import React from "react";
import { FadeLoader, BarLoader, ScaleLoader } from "react-spinners";

type IPropType = {
  loading: boolean;
  spinner?: "bar" | "fade" | "scale";
  color?: string;
};
const Loading = ({ loading, spinner = "bar", color = "0989FF" }: IPropType) => {
  return (
    <>
      {spinner === "bar" && (
        <BarLoader
          color={`#${color}`}
          loading={loading}
          height={8}
          width={100}
        />
      )}
      {spinner === "fade" && <FadeLoader loading={loading} color="#0989FF" />}
      {spinner === "scale" && <ScaleLoader loading={loading} color="#0989FF" />}
    </>
  );
};

export default Loading;
