import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-404">
      <div className="site-404__orb" aria-hidden="true" />
      <div className="site-404__grain" aria-hidden="true" />
      <div className="site-404__content">
        <p className="site-404__index">404 / THE PAGE ISN’T HERE</p>
        <h1>
          NOTHING TO
          <br />
          <em>SEE.</em>
        </h1>
        <p className="site-404__copy">
          The address you followed does not point to a page in this experience.
          Return to the beginning and continue the inquiry.
        </p>
        <Link className="site-404__link" href="/">
          RETURN TO THE BEGINNING <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <style>{`
        .site-404{min-height:100svh;position:relative;overflow:hidden;background:#000;color:#fff;display:grid;place-items:center;padding:32px;font-family:inherit}
        .site-404__content{position:relative;z-index:2;width:min(900px,100%)}
        .site-404__index{margin:0 0 28px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.52}
        .site-404 h1{margin:0;font-size:clamp(58px,11vw,150px);font-weight:400;line-height:.84;letter-spacing:-.055em}
        .site-404 h1 em{font-style:normal;opacity:.42}
        .site-404__copy{max-width:470px;margin:34px 0 30px;font-size:clamp(15px,1.5vw,19px);line-height:1.55;opacity:.62}
        .site-404__link{display:inline-flex;gap:12px;align-items:center;color:#fff;text-decoration:none;font-size:11px;letter-spacing:.16em;border-bottom:1px solid rgba(255,255,255,.35);padding-bottom:9px;transition:opacity .2s ease,border-color .2s ease}
        .site-404__link:hover,.site-404__link:focus-visible{opacity:.65;border-color:#fff}
        .site-404__orb{position:absolute;width:min(52vw,620px);aspect-ratio:1;border-radius:50%;right:-16vw;top:50%;transform:translateY(-50%);background:radial-gradient(circle at 38% 38%,rgba(116,87,255,.28),rgba(61,42,145,.11) 35%,transparent 68%);filter:blur(2px)}
        .site-404__grain{position:absolute;inset:0;opacity:.045;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.8) .5px,transparent .6px);background-size:4px 4px}
        @media (max-width:700px){.site-404{padding:24px}.site-404__orb{width:100vw;right:-55vw;opacity:.65}.site-404__copy{margin-top:28px}.site-404__link{font-size:10px}}
        @media (prefers-reduced-motion:reduce){.site-404__link{transition:none}}
      `}</style>
    </main>
  );
}
