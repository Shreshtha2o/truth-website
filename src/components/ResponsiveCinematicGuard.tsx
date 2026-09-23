"use client";
import { useEffect } from "react";

/** Final responsive guard: exposes stable viewport state without changing the page's narrative text. */
export default function ResponsiveCinematicGuard(){
  useEffect(()=>{
    const root=document.documentElement;
    const sync=()=>{
      const w=window.innerWidth;
      root.dataset.viewport=w<600?"mobile":w<1024?"tablet":"desktop";
      root.style.setProperty("--safe-vh",`${window.innerHeight*0.01}px`);
    };
    sync(); window.addEventListener("resize",sync,{passive:true});
    return()=>window.removeEventListener("resize",sync);
  },[]);
  return null;
}
