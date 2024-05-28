"use client";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-c";

export default function PrismLoader({checker,enable}) {
  useEffect(() => {
    if(enable){
      Prism.highlightAll();
    }
  }, [checker,enable]);
  return <div className="hidden"></div>;
}
