import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Leaf } from "lucide-react";

export default function NotFound() {
  useEffect(() => { document.title = "Page not found — Petwise"; }, []);
  return <main className="section section-light" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}><div className="container" style={{ maxWidth: 620, textAlign: "center" }}><div className="brand" style={{ justifyContent: "center", marginBottom: 36 }}><span className="brand-mark"><Leaf size={17} /></span><span>petwise</span></div><span className="eyebrow">404 · wrong turn</span><h1 style={{ fontSize: "clamp(48px, 8vw, 86px)", marginTop: 15 }}>This page wandered off.</h1><p className="lede" style={{ margin: "24px auto 30px" }}>The link may be outdated, or this little page is hiding somewhere else. Let’s get you back to useful ground.</p><Link href="/" className="button button-dark"><ArrowLeft size={17} /> Back to Petwise</Link></div></main>;
}
