"use client";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-c";

export default function PrismLoader({enable}) {
  useEffect(() => {
    if(enable){
      Prism.highlightAll();
    }
  }, [enable]);
  return <div className="hidden"></div>;
}
