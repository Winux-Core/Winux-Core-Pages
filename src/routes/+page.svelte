<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>The Winux Foundation | Fluff-Free Cross-Platform Open Source</title>
  <meta
    name="description"
    content="The Winux Foundation is building a fluff-free, OS holy war-free cross-platform userspace for developers and sysadmins."
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="page-shell">
  <header class="hero panel">
    <p class="eyebrow">Sole Proprietorship Open Source Org</p>
    <h1>The Winux Foundation</h1>
    <p class="lead">
      Building a fluff-free, OS holy war-free cross-platform userspace where members of both sides can
      develop, design, communicate, and thrive.
    </p>
    <div class="chip-row">
      <span class="chip windows">Windows-grade UX</span>
      <span class="chip linux">Linux-native control</span>
      <span class="chip neutral">Built for developers + sysadmins</span>
    </div>
    <div class="action-row">
      <a class="action-link" href={`${base}/projects`}>Explore Project Blob</a>
    </div>
  </header>

  <main class="content-grid">
    <section id="about" class="panel section-card">
      <h2>About</h2>
      <p>
        The Winux Foundation exists to end platform tribalism at the user-space layer. We build practical,
        openly-developed tooling that respects both Windows and Linux workflows without forcing either side to
        compromise how they work.
      </p>
      <p>
        Our operating model is simple: publish source, keep docs close to code, prioritize deterministic builds,
        and ship utilities that solve real operator pain.
      </p>
    </section>

    <section id="vision" class="panel section-card">
      <h2>Vision</h2>
      <p>
        We are currently focused on tools, moving into dev utilities, then a Linux-based OS track. The long-term
        goal is an XDG, Unix, Linux, and NT32 compliant kernel that intertwines syscall models from both sides
        without relying on a translation layer.
      </p>
      <ul>
        <li>Now: cross-platform tools with clean operator ergonomics</li>
        <li>Next: deeper developer and systems utilities</li>
        <li>End state: unified compliance-driven kernel architecture</li>
      </ul>
    </section>

    <section id="contribute" class="panel section-card">
      <h2>Contribute</h2>
      <p>
        Primary audience is developers and sysadmins. If you care about systems clarity, reproducibility, and
        low-friction collaboration across platform boundaries, we want your input.
      </p>
      <div class="contrib-grid">
        <article>
          <h3>Code</h3>
          <p>Build core tools, runtime pieces, automation, and platform integration paths.</p>
        </article>
        <article>
          <h3>Ops</h3>
          <p>Improve CI, release discipline, packaging, and cross-platform test coverage.</p>
        </article>
        <article>
          <h3>Design + Docs</h3>
          <p>Shape interface clarity and write documentation that respects real operator context.</p>
        </article>
      </div>
      <a class="inline-link" href={`${base}/projects`}>See active repositories</a>
    </section>

    <section id="contact" class="panel section-card">
      <h2>Contact</h2>
      <p>
        Reach out for collaboration, contribution alignment, and partnership discussions tied to cross-platform
        open source systems work.
      </p>
      <div class="contact-box">
        <p><strong>Organization:</strong> The Winux Foundation</p>
        <p><strong>Focus:</strong> Cross-platform systems tooling and architecture</p>
        <p><strong>GitHub:</strong> <a href="https://github.com/orgs/Winux-Core/repositories">Winux-Core</a></p>
        <p><strong>Email:</strong> hello@winux.foundation</p>
      </div>
    </section>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: 'Space Grotesk', sans-serif;
    background:
      radial-gradient(circle at 8% 0%, #1f6feb 0%, transparent 42%),
      radial-gradient(circle at 95% 95%, #f9a826 0%, transparent 38%),
      linear-gradient(145deg, #0f172a 0%, #10131c 45%, #0a0d14 100%);
    color: #e5ecff;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(a) {
    color: #a7ddff;
  }

  .page-shell {
    width: min(1100px, 92vw);
    margin: 2rem auto;
    display: grid;
    gap: 1rem;
  }

  .panel {
    border: 1px solid rgba(158, 186, 255, 0.25);
    border-radius: 18px;
    background: linear-gradient(160deg, rgba(8, 17, 35, 0.78), rgba(11, 15, 24, 0.84));
    backdrop-filter: blur(8px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
  }

  .hero {
    padding: 2.1rem;
    animation: fade-up 0.8s ease-out both;
  }

  .eyebrow {
    margin: 0;
    color: #95c6ff;
    letter-spacing: 0.08em;
    font-size: 0.82rem;
    text-transform: uppercase;
  }

  h1 {
    margin: 0.45rem 0 0.7rem;
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 1.08;
  }

  .lead {
    margin: 0;
    max-width: 74ch;
    color: #d2dcf8;
  }

  .chip-row {
    margin-top: 1.1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .windows {
    background: rgba(42, 154, 255, 0.24);
    border: 1px solid rgba(132, 198, 255, 0.45);
  }

  .linux {
    background: rgba(255, 191, 70, 0.2);
    border: 1px solid rgba(255, 217, 141, 0.45);
  }

  .neutral {
    background: rgba(182, 197, 235, 0.14);
    border: 1px solid rgba(199, 216, 255, 0.28);
  }

  .action-row {
    margin-top: 1rem;
  }

  .action-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #e8f5ff;
    border: 1px solid rgba(137, 196, 255, 0.42);
    padding: 0.5rem 0.95rem;
    border-radius: 0.6rem;
    background: linear-gradient(130deg, rgba(33, 124, 226, 0.35), rgba(27, 88, 164, 0.2));
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .action-link:hover {
    transform: translateY(-1px);
    border-color: rgba(174, 220, 255, 0.65);
    box-shadow: 0 10px 22px rgba(17, 109, 221, 0.25);
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .section-card {
    padding: 1.2rem;
    animation: fade-up 0.85s ease-out both;
  }

  h2 {
    margin: 0;
    font-size: 1.35rem;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    color: #d2dcf8;
  }

  ul {
    margin: 0.9rem 0 0;
    padding-left: 1.1rem;
    color: #c8d6f3;
  }

  li + li {
    margin-top: 0.35rem;
  }

  .contrib-grid {
    margin-top: 0.9rem;
    display: grid;
    gap: 0.7rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .contrib-grid article {
    border: 1px solid rgba(151, 183, 245, 0.24);
    border-radius: 12px;
    padding: 0.75rem;
    background: rgba(9, 16, 30, 0.7);
  }

  .contrib-grid article p {
    margin: 0.45rem 0 0;
    font-size: 0.93rem;
  }

  .inline-link {
    display: inline-block;
    margin-top: 0.85rem;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
  }

  .contact-box {
    margin-top: 0.85rem;
    border: 1px solid rgba(150, 182, 245, 0.24);
    border-radius: 12px;
    padding: 0.8rem;
    background: rgba(8, 14, 25, 0.72);
  }

  .contact-box p {
    margin: 0;
    font-size: 0.94rem;
  }

  .contact-box p + p {
    margin-top: 0.4rem;
  }

  @media (max-width: 900px) {
    .content-grid {
      grid-template-columns: 1fr;
    }

    .contrib-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 760px) {
    .page-shell {
      margin: 1rem auto 1.4rem;
    }

    .hero,
    .section-card {
      padding: 1rem;
    }
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
