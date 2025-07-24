import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-3xl font-bold">{children}</h2>;
};

export default Heading;
