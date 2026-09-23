"use client";
import { useEffect } from "react";

export default function ProductionReadiness(){
  useEffect(()=>{
    if(process.env.NODE_ENV!=="production") return;
    const report=()=>{
      const nav=performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming|undefined;
      if(nav) console.info("[experience] navigation",{domReady:Math.round(nav.domContentLoadedEventEnd),load:Math.round(nav.loadEventEnd)});
    };
    if(document.readyState==="complete") report(); else window.addEventListener("load",report,{once:true});
    return()=>window.removeEventListener("load",report);
  },[]);
  return null;
}
