import React from "react";
import { useGesture } from "@use-gesture/react";

export default function App() {
  const bind = useGesture({
    onPointerDown: () => console.log("goo"),
  });

  return (
    <div className="App" {...bind()}>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
