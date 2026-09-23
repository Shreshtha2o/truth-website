"use client";

import { useEffect } from "react";

const CSS = `
/* V87 — cinematic composition layer. Intentionally additive: no particle-engine rules. */
.cinematic-composition-ready .hero,
.cinematic-composition-ready .story-chapter,
.cinematic-composition-ready .finale{
  position:relative;
  isolation:isolate;
}

.cinematic-composition-ready .hero::before,
.cinematic-composition-ready .story-chapter::before,
.cinematic-composition-ready .finale::before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  z-index:-1;
  background:
    radial-gradient(circle at 74% 48%, rgba(125,92,255,.075), transparent 34%),
    radial-gradient(circle at 18% 78%, rgba(255,123,72,.045), transparent 30%);
  opacity:.8;
}

.cinematic-composition-ready .hero-content,
.cinematic-composition-ready .chapter-content,
.cinematic-composition-ready .finale > *{
  position:relative;
  z-index:3;
}

.cinematic-composition-ready .hero-content,
.cinematic-composition-ready .chapter-content{
  transform:translate3d(0,12px,0);
  opacity:.84;
  transition:opacity 700ms cubic-bezier(.2,.75,.2,1),transform 900ms cubic-bezier(.2,.75,.2,1);
}

.cinematic-composition-ready .hero.is-active .hero-content,
.cinematic-composition-ready .story-chapter.is-active .chapter-content{
  transform:translate3d(0,0,0);
  opacity:1;
}

.cinematic-composition-ready .chapter-meta{
  transition:opacity 500ms ease,transform 700ms cubic-bezier(.2,.75,.2,1);
  transform:translateX(-10px);
  opacity:.58;
}
.cinematic-composition-ready .story-chapter.is-active .chapter-meta{
  transform:translateX(0);
  opacity:1;
}

.cinematic-composition-ready .chapter-right{
  transition:opacity 650ms ease,transform 800ms cubic-bezier(.2,.75,.2,1);
  transform:translate3d(0,14px,0);
  opacity:.62;
}
.cinematic-composition-ready .story-chapter.is-active .chapter-right{
  transform:translate3d(0,0,0);
  opacity:1;
}

.cinematic-composition-ready .chapter h2{
  text-wrap:balance;
  letter-spacing:-.025em;
}

.cinematic-composition-ready .chapter h2 span{
  display:inline-block;
  will-change:transform;
  transition:transform 900ms cubic-bezier(.16,1,.3,1);
}
.cinematic-composition-ready .story-chapter.is-active h2 span{
  transform:translateX(5px);
}

.cinematic-composition-ready .phase-mark{
  opacity:.62;
  transition:opacity 400ms ease,letter-spacing 500ms ease;
}
.cinematic-composition-ready .story-chapter.is-active .phase-mark{
  opacity:.9;
  letter-spacing:.12em;
}

.cinematic-composition-ready .site-nav{
  transition:background-color 500ms ease,backdrop-filter 500ms ease,border-color 500ms ease;
}
.cinematic-composition-ready .site-nav.nav-scrolled{
  background:rgba(7,8,14,.42);
  backdrop-filter:blur(14px) saturate(115%);
  -webkit-backdrop-filter:blur(14px) saturate(115%);
  border-bottom-color:rgba(255,255,255,.08);
}

.cinematic-composition-ready .finale{
  min-height:100svh;
  display:grid;
  place-content:center;
  text-align:center;
  overflow:hidden;
}
.cinematic-composition-ready .finale h2{
  text-wrap:balance;
  letter-spacing:-.035em;
}
.cinematic-composition-ready .finale .round-cta{
  transform:translateY(8px);
  opacity:.72;
  transition:transform 650ms cubic-bezier(.16,1,.3,1),opacity 450ms ease;
}
.cinematic-composition-ready .finale.is-active .round-cta{
  transform:translateY(0);
  opacity:1;
}

@media (max-width:900px){
  .cinematic-composition-ready .hero-content,
  .cinematic-composition-ready .chapter-content{transform:translate3d(0,8px,0)}
  .cinematic-composition-ready .story-chapter.is-active h2 span{transform:none}
}

@media (prefers-reduced-motion:reduce){
  .cinematic-composition-ready .hero-content,
  .cinematic-composition-ready .chapter-content,
  .cinematic-composition-ready .chapter-meta,
  .cinematic-composition-ready .chapter-right,
  .cinematic-composition-ready .chapter h2 span,
  .cinematic-composition-ready .phase-mark,
  .cinematic-composition-ready .site-nav,
  .cinematic-composition-ready .finale .round-cta{
    transition:none!important;
    transform:none!important;
  }
}
`;

export default function CinematicComposition(){
  useEffect(()=>{
    const root=document.querySelector(".experience");
    if(!root) return;
    root.classList.add("cinematic-composition-ready");

    const chapters=Array.from(root.querySelectorAll<HTMLElement>(".hero, .story-chapter, .finale"));
    const nav=root.querySelector<HTMLElement>(".site-nav");
    const io=new IntersectionObserver((entries)=>{
      for(const entry of entries){
        if(entry.isIntersecting) entry.target.classList.add("is-active");
        else if(entry.intersectionRatio<.08) entry.target.classList.remove("is-active");
      }
    },{threshold:[.08,.22,.5,.78],rootMargin:"-12% 0px -12% 0px"});
    chapters.forEach((el)=>io.observe(el));

    const onScroll=()=>{ if(nav) nav.classList.toggle("nav-scrolled",window.scrollY>32); };
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});

    return()=>{
      io.disconnect();
      window.removeEventListener("scroll",onScroll);
      root.classList.remove("cinematic-composition-ready");
      nav?.classList.remove("nav-scrolled");
      chapters.forEach((el)=>el.classList.remove("is-active"));
    };
  },[]);

  return <style dangerouslySetInnerHTML={{__html:CSS}}/>;
}
