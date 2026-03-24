<script>
  import { base } from '$app/paths';

  const operatingSignals = [
    {
      title: 'Kill The OS Holy War',
      body: 'Winux exists to remove the cultural dead weight around platform identity and replace it with practical systems work.'
    },
    {
      title: 'Build For Developers And Sysadmins',
      body: 'The target audience is people who write code, run infrastructure, debug strange failures, and care whether a tool survives real usage.'
    },
    {
      title: 'Serious Lab, Not Corporate Theater',
      body: 'Bold claims need inspectable work behind them. Marketing should describe the engine, not conceal the absence of one.'
    }
  ];

  const flagshipProjects = [
    {
      name: 'Winux PTree',
      status: 'Shipping',
      tone: 'Current fact',
      summary: 'A performant filesystem indexer with tree-style CLI integration for fast filesystem traversal and inspection.',
      detail:
        'Positioned as the fastest open-source Windows indexer tool, with indexing paths reported below 100 microseconds.',
      emphasis: 'Built for real operator speed, not benchmark theater.'
    },
    {
      name: 'Winux Termix',
      status: 'In development',
      tone: 'Honest status',
      summary:
        'A next-in-class hackable terminal environment with fakeroot abilities plus Lua, WASM, and Rust bindings for configuration and extension.',
      detail:
        'It uses a virtualized Tauri-based browser environment so users can shape custom terminal experiences with straightforward CSS-driven surface control.',
      emphasis: 'Ambitious architecture exists; shipping surface is still catching up.'
    },
    {
      name: 'Winux One Bit LLM',
      status: 'Coming soon',
      tone: 'Codename Unum',
      summary:
        'A non-ternary single-bit LLM track using layer-based arithmetic operations to define positive and negative bits through metadata and location calculations.',
      detail:
        'The project is described as the first market-grade non-ternary single-bit LLM with a custom inference and training engine built for ROCm.',
      emphasis: 'Research direction with production intent, not a novelty side project.'
    }
  ];

  const truthStack = [
    {
      label: 'True today',
      title: 'PTree is shipping performance work',
      body: 'PTree is the strongest present-tense proof point on the site, so the homepage now treats it as the operational anchor rather than a side mention.'
    },
    {
      label: 'Building now',
      title: 'Termix is early and still architecture-heavy',
      body: 'Termix stays on the page because it matters, but its status is framed honestly: serious direction, unfinished product.'
    },
    {
      label: 'Next frontier',
      title: 'Unum pushes the org beyond tooling',
      body: 'One Bit LLM gives the foundation a research-lab edge, but it is presented as a deliberate systems effort rather than generic AI branding.'
    }
  ];

  const platformPriorities = [
    {
      label: 'Priority Platforms',
      value: 'Windows + Linux',
      body: 'Everything important should work across both without treating either side like an awkward port target.'
    },
    {
      label: 'Secondary Interest',
      value: 'macOS + BSD',
      body: 'Soft support matters, but it is not the main execution priority while Windows/Linux parity is still the central battle.'
    },
    {
      label: 'Primary Outcome',
      value: 'Browse, follow, contribute',
      body: 'Visitors should understand the mission fast, inspect active projects, and decide whether they want to join the work.'
    }
  ];

  const contributionTracks = [
    {
      title: 'Code',
      body: 'Runtime pieces, automation, tooling surfaces, platform integrations, and performance-sensitive systems work.'
    },
    {
      title: 'Operations',
      body: 'Validation paths, release discipline, packaging, CI, and the practical glue that keeps multi-platform tooling believable.'
    },
    {
      title: 'Design + Docs',
      body: 'Information architecture, interface clarity, and documentation that treats technical readers like adults instead of conversion targets.'
    }
  ];
</script>

<svelte:head>
  <title>The Winux Foundation | Cross-Platform Systems Without Holy War</title>
  <meta
    name="description"
    content="The Winux Foundation is a cross-platform systems organization building serious tooling for developers and sysadmins across Windows and Linux."
  />
</svelte:head>

<div class="page-shell">
  <header class="hero panel">
    <div class="hero-top">
      <div class="brand-lockup">
        <span class="brand-mark">WF</span>
        <div>
          <p class="eyebrow">Cross-Platform Systems Organization</p>
          <p class="brand-subtitle">Serious systems lab. Bold anti-corporate posture. Operator-first output.</p>
        </div>
      </div>
      <nav class="nav-links" aria-label="Primary">
        <a href="#flagships">Projects</a>
        <a href="#truth-stack">Status</a>
        <a href="#contribute">Contribute</a>
      </nav>
    </div>

    <div class="hero-grid">
      <div class="hero-copy">
        <p class="hero-kicker">Cross-platform systems without ideology, fluff, or platform tribalism.</p>
        <h1>The Winux Foundation</h1>
        <p class="lead">
          We are a cross-platform systems org trying to kill the OS holy war by building tools that respect both
          Windows and Linux workflows. The audience is developers and sysadmins. The standard is practical,
          inspectable execution.
        </p>
        <div class="chip-row">
          <span class="chip windows">Windows is first-class</span>
          <span class="chip linux">Linux is first-class</span>
          <span class="chip neutral">macOS + BSD are secondary interests</span>
        </div>
        <div class="action-row">
          <a class="action-link primary" href={`${base}/projects`}>Browse The Project Blob</a>
          <a class="action-link secondary" href="https://github.com/orgs/Winux-Core/repositories">Follow On GitHub</a>
        </div>
        <div class="hero-stats" aria-label="Foundation signals">
          <article>
            <span>Audience</span>
            <strong>Developers + Sysadmins</strong>
            <p>People who care how tools behave when they actually touch systems.</p>
          </article>
          <article>
            <span>Priority</span>
            <strong>Windows + Linux</strong>
            <p>Cross-platform means both are respected, not one translated through the other.</p>
          </article>
          <article>
            <span>Stance</span>
            <strong>Serious systems lab</strong>
            <p>Bold tone is welcome here, but it still has to survive contact with engineering reality.</p>
          </article>
        </div>
      </div>

      <aside class="manifesto-card">
        <p class="manifesto-label">Mission Brief</p>
        <h2>What a visitor should understand fast</h2>
        <ul>
          <li>This org exists to end the OS holy war with actual tools, not neutral language.</li>
          <li>PTree is the clearest shipping proof. Termix is ambitious and unfinished. Unum is the next research-grade leap.</li>
          <li>The goal is not broad lifestyle branding. The goal is better systems technology.</li>
        </ul>
        <div class="manifesto-grid">
          <div>
            <span>Identity</span>
            <strong>Foundation + Lab</strong>
          </div>
          <div>
            <span>Tone</span>
            <strong>Serious / Anti-corporate</strong>
          </div>
          <div>
            <span>CTA</span>
            <strong>Browse Projects</strong>
          </div>
          <div>
            <span>CTA</span>
            <strong>Contribute</strong>
          </div>
        </div>
      </aside>
    </div>
  </header>

  <section class="signal-strip" aria-label="Operating signals">
    {#each operatingSignals as signal}
      <article class="signal-card panel">
        <p class="section-eyebrow">Signal</p>
        <h2>{signal.title}</h2>
        <p>{signal.body}</p>
      </article>
    {/each}
  </section>

  <main class="content-grid">
    <section id="flagships" class="panel section-card span-wide">
      <div class="section-heading">
        <p class="section-eyebrow">Flagship Projects</p>
        <h2>The current program, honestly framed</h2>
      </div>
      <div class="projects-grid">
        {#each flagshipProjects as project}
          <article class="project-card">
            <div class="project-topline">
              <span class="status-pill">{project.status}</span>
              <span class="project-tone">{project.tone}</span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <p>{project.detail}</p>
            <p class="project-emphasis">{project.emphasis}</p>
          </article>
        {/each}
      </div>
    </section>

    <section id="operating-model" class="panel section-card">
      <div class="section-heading">
        <p class="section-eyebrow">Operating Model</p>
        <h2>Build for operators, not platform loyalists</h2>
      </div>
      <div class="stack-copy">
        <p>
          Winux exists to push back on the idea that systems tooling has to pick an ideological camp. We want
          software that feels at home on Windows and Linux because it was designed that way from the start.
        </p>
        <p>
          The model is straightforward: publish code, keep technical claims legible, and let the work itself
          argue for the broader architectural direction.
        </p>
      </div>
    </section>

    <section id="truth-stack" class="panel section-card">
      <div class="section-heading">
        <p class="section-eyebrow">Truth Stack</p>
        <h2>What is shipped, what is forming, what is next</h2>
      </div>
      <div class="truth-list">
        {#each truthStack as item}
          <article class="truth-item">
            <p class="timeline-label">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        {/each}
      </div>
    </section>

    <section class="panel section-card span-wide">
      <div class="section-heading">
        <p class="section-eyebrow">Platform Priorities</p>
        <h2>Cross-platform means clear priorities, not vague support language</h2>
      </div>
      <div class="priority-grid">
        {#each platformPriorities as item}
          <article>
            <span>{item.label}</span>
            <h3>{item.value}</h3>
            <p>{item.body}</p>
          </article>
        {/each}
      </div>
    </section>

    <section id="contribute" class="panel section-card span-wide">
      <div class="section-heading">
        <p class="section-eyebrow">Contribute</p>
        <h2>Useful people can help immediately</h2>
      </div>
      <p>
        If you care about systems clarity, performance, tooling ergonomics, or documentation that says something
        real, there is room here. The org is not optimizing for optics. It is optimizing for output.
      </p>
      <div class="contrib-grid">
        {#each contributionTracks as track}
          <article>
            <h3>{track.title}</h3>
            <p>{track.body}</p>
          </article>
        {/each}
      </div>
      <a class="inline-link" href={`${base}/projects`}>Inspect the live repository surface</a>
    </section>

    <section id="contact" class="panel section-card">
      <div class="section-heading">
        <p class="section-eyebrow">Founder Note</p>
        <h2>Strive to be the greatness you wish to see in technology</h2>
      </div>
      <blockquote class="founder-quote">
        “Strive to be the greatness you wish to see in technology, and only then are you a developer.”
      </blockquote>
      <p>
        The foundation is currently built by one person. We are not looking for funding right now. Good-faith
        contributions and marketing-aligned visibility are far more relevant at this stage.
      </p>
      <div class="contact-box">
        <p><strong>Organization:</strong> The Winux Foundation</p>
        <p><strong>Focus:</strong> Cross-platform systems tooling, terminal environments, and emerging systems AI</p>
        <p><strong>GitHub:</strong> <a href="https://github.com/orgs/Winux-Core/repositories">Winux-Core</a></p>
        <p><strong>Email:</strong> hello@winux.foundation</p>
      </div>
    </section>
  </main>
</div>

<style>
  :global(:root) {
    --page-text: #edf4ff;
    --page-muted: #b7c7e1;
    --line-soft: rgba(157, 186, 255, 0.22);
    --panel-bg: linear-gradient(160deg, rgba(10, 18, 34, 0.82), rgba(8, 12, 20, 0.92));
    --panel-shadow: 0 24px 55px rgba(0, 0, 0, 0.34);
    --blue-glow: rgba(59, 130, 246, 0.34);
    --amber-glow: rgba(245, 158, 11, 0.24);
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: 'Space Grotesk', sans-serif;
    background:
      radial-gradient(circle at 7% 2%, var(--blue-glow) 0%, transparent 31%),
      radial-gradient(circle at 96% 88%, var(--amber-glow) 0%, transparent 30%),
      linear-gradient(135deg, #08111f 0%, #09131f 38%, #05080f 100%);
    color: var(--page-text);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(a) {
    color: #9bd6ff;
  }

  .page-shell {
    position: relative;
    width: min(1180px, 92vw);
    margin: 1.4rem auto 2.4rem;
    display: grid;
    gap: 1.1rem;
  }

  .page-shell::before {
    content: '';
    position: absolute;
    inset: 2.8rem auto auto -1.6rem;
    width: 9rem;
    height: 9rem;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(96, 165, 250, 0.24), transparent 70%);
    filter: blur(16px);
    pointer-events: none;
  }

  .panel {
    border: 1px solid var(--line-soft);
    border-radius: 24px;
    background: var(--panel-bg);
    backdrop-filter: blur(12px);
    box-shadow: var(--panel-shadow);
  }

  .hero {
    position: relative;
    overflow: hidden;
    padding: 1.4rem 1.4rem 1.6rem;
    animation: fade-up 0.8s ease-out both;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(132, 183, 255, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(132, 183, 255, 0.06) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent 78%);
    pointer-events: none;
  }

  .hero::after {
    content: '';
    position: absolute;
    inset: auto -10% -28% auto;
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.18), transparent 70%);
    pointer-events: none;
  }

  .hero-top,
  .section-heading {
    position: relative;
    z-index: 1;
  }

  .hero-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .brand-lockup {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .brand-mark {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 0.9rem;
    border: 1px solid rgba(173, 210, 255, 0.28);
    background: linear-gradient(145deg, rgba(26, 77, 142, 0.65), rgba(8, 20, 40, 0.75));
    color: #eaf4ff;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .eyebrow,
  .section-eyebrow,
  .manifesto-label,
  .timeline-label,
  .project-tone {
    margin: 0;
    color: #95c6ff;
    letter-spacing: 0.1em;
    font-size: 0.78rem;
    text-transform: uppercase;
  }

  .brand-subtitle {
    margin: 0.2rem 0 0;
    color: var(--page-muted);
    font-size: 0.92rem;
  }

  .nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .nav-links a {
    text-decoration: none;
    border: 1px solid rgba(173, 210, 255, 0.16);
    border-radius: 999px;
    padding: 0.45rem 0.7rem;
    background: rgba(7, 14, 25, 0.42);
    color: #d8e9ff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78rem;
  }

  .hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.9fr);
    gap: 1rem;
    align-items: start;
  }

  .hero-kicker {
    margin: 0;
    max-width: 40rem;
    color: #ffc76c;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0.6rem 0 0.8rem;
    max-width: 12ch;
    font-size: clamp(2.5rem, 5vw, 4.9rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
  }

  .lead {
    margin: 0;
    max-width: 62ch;
    color: #d7e4f7;
    font-size: clamp(1rem, 1.9vw, 1.15rem);
  }

  .chip-row {
    margin-top: 1.2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 0.38rem 0.78rem;
    border-radius: 999px;
    font-size: 0.79rem;
    font-weight: 500;
  }

  .windows {
    background: rgba(42, 154, 255, 0.18);
    border: 1px solid rgba(132, 198, 255, 0.45);
  }

  .linux {
    background: rgba(255, 191, 70, 0.16);
    border: 1px solid rgba(255, 217, 141, 0.45);
  }

  .neutral {
    background: rgba(182, 197, 235, 0.1);
    border: 1px solid rgba(199, 216, 255, 0.28);
  }

  .action-row {
    margin-top: 1.25rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }

  .action-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #e8f5ff;
    border: 1px solid rgba(137, 196, 255, 0.34);
    padding: 0.72rem 1rem;
    border-radius: 0.9rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.82rem;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
  }

  .primary {
    background: linear-gradient(130deg, rgba(32, 109, 213, 0.5), rgba(26, 80, 153, 0.28));
  }

  .secondary {
    background: rgba(8, 15, 27, 0.62);
  }

  .action-link:hover {
    transform: translateY(-1px);
    border-color: rgba(174, 220, 255, 0.65);
    box-shadow: 0 10px 22px rgba(17, 109, 221, 0.25);
  }

  .hero-stats,
  .signal-strip,
  .projects-grid,
  .content-grid,
  .priority-grid,
  .contrib-grid {
    display: grid;
    gap: 0.9rem;
  }

  .hero-stats {
    margin-top: 1.3rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .hero-stats article,
  .signal-card,
  .manifesto-card,
  .project-card,
  .truth-item,
  .priority-grid article,
  .contrib-grid article,
  .contact-box {
    border: 1px solid rgba(175, 206, 255, 0.16);
    background: rgba(8, 14, 25, 0.52);
  }

  .hero-stats article {
    padding: 0.9rem;
    border-radius: 1rem;
  }

  .hero-stats span,
  .manifesto-grid span,
  .priority-grid span {
    display: block;
    margin-bottom: 0.3rem;
    color: #8dbef7;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .hero-stats strong,
  .manifesto-grid strong {
    display: block;
    font-size: 1.08rem;
  }

  .hero-stats p {
    margin: 0.35rem 0 0;
    font-size: 0.92rem;
  }

  .manifesto-card {
    position: relative;
    padding: 1.15rem;
    border-radius: 1.3rem;
    overflow: hidden;
  }

  .manifesto-card::before,
  .project-card::before,
  .truth-item::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 0.16rem;
    background: linear-gradient(90deg, rgba(96, 165, 250, 0.88), rgba(245, 158, 11, 0.84));
  }

  .manifesto-card h2 {
    margin-top: 0.35rem;
  }

  .manifesto-card ul {
    margin: 0.85rem 0 0;
    padding-left: 1rem;
    color: #d5e2f5;
  }

  .manifesto-card li + li {
    margin-top: 0.5rem;
  }

  .manifesto-grid {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .manifesto-grid div {
    padding: 0.8rem;
    border-radius: 0.95rem;
    background: rgba(9, 14, 26, 0.68);
  }

  .signal-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .signal-card {
    padding: 1rem 1.05rem;
    border-radius: 1.25rem;
  }

  .content-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .section-card {
    padding: 1.2rem;
    animation: fade-up 0.85s ease-out both;
  }

  .span-wide {
    grid-column: 1 / -1;
  }

  .section-heading {
    display: grid;
    gap: 0.3rem;
  }

  h2 {
    margin: 0;
    font-size: clamp(1.4rem, 2.2vw, 2rem);
    line-height: 1.05;
  }

  h3 {
    margin: 0;
    font-size: 1.05rem;
  }

  p {
    color: var(--page-muted);
    line-height: 1.65;
  }

  .projects-grid {
    margin-top: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .project-card,
  .truth-item,
  .priority-grid article,
  .contrib-grid article,
  .contact-box {
    position: relative;
    border-radius: 1rem;
    padding: 1rem;
  }

  .project-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(173, 209, 255, 0.22);
    border-radius: 999px;
    padding: 0.32rem 0.62rem;
    background: rgba(8, 15, 27, 0.56);
    color: #f0f7ff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.76rem;
  }

  .project-emphasis {
    margin-top: 0.8rem;
    color: #f1cc7e;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
  }

  .stack-copy,
  .truth-list {
    margin-top: 0.9rem;
    display: grid;
    gap: 0.8rem;
  }

  .priority-grid {
    margin-top: 0.95rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .priority-grid h3,
  .contrib-grid h3 {
    margin-top: 0.1rem;
  }

  .contrib-grid {
    margin-top: 0.9rem;
    grid-template-columns: repeat(3, minmax(220px, 1fr));
    align-items: stretch;
  }

  .inline-link {
    display: inline-block;
    margin-top: 0.95rem;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
    color: #bde2ff;
  }

  .founder-quote {
    margin: 0.95rem 0 0;
    padding: 1rem 1.1rem;
    border-left: 3px solid rgba(255, 193, 94, 0.75);
    border-radius: 0.8rem;
    background: rgba(10, 15, 25, 0.68);
    color: #edf4ff;
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .contact-box {
    margin-top: 0.9rem;
  }

  .contact-box p {
    margin: 0.35rem 0;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(14px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 960px) {
    .hero-grid,
    .signal-strip,
    .projects-grid,
    .content-grid,
    .priority-grid,
    .contrib-grid,
    .hero-stats {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .page-shell {
      width: min(1180px, 94vw);
      margin: 0.9rem auto 1.4rem;
    }

    .hero {
      padding: 1rem;
    }

    .hero-top {
      align-items: flex-start;
      flex-direction: column;
    }

    .manifesto-grid {
      grid-template-columns: 1fr;
    }

    .nav-links {
      width: 100%;
    }

    .nav-links a,
    .action-link {
      width: 100%;
    }
  }
</style>
