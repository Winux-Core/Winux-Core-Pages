import { h as head, a as attr, b as ensure_array_like, e as escape_html } from "../../chunks/root.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
function _page($$renderer) {
  const operatingSignals = [
    {
      title: "Kill The OS Holy War",
      body: "Winux exists to remove the cultural dead weight around platform identity and replace it with practical systems work."
    },
    {
      title: "Build For Developers And Sysadmins",
      body: "The target audience is people who write code, run infrastructure, debug strange failures, and care whether a tool survives real usage."
    },
    {
      title: "Serious Lab, Not Corporate Theater",
      body: "Bold claims need inspectable work behind them. Marketing should describe the engine, not conceal the absence of one."
    }
  ];
  const flagshipProjects = [
    {
      name: "Winux PTree",
      status: "Shipping",
      tone: "Current fact",
      summary: "A performant filesystem indexer with tree-style CLI integration for fast filesystem traversal and inspection.",
      detail: "Positioned as the fastest open-source Windows indexer tool, with indexing paths reported below 100 microseconds.",
      emphasis: "Built for real operator speed, not benchmark theater."
    },
    {
      name: "Winux Termix",
      status: "In development",
      tone: "Honest status",
      summary: "A next-in-class hackable terminal environment with fakeroot abilities plus Lua, WASM, and Rust bindings for configuration and extension.",
      detail: "It uses a virtualized Tauri-based browser environment so users can shape custom terminal experiences with straightforward CSS-driven surface control.",
      emphasis: "Ambitious architecture exists; shipping surface is still catching up."
    },
    {
      name: "Winux One Bit LLM",
      status: "Coming soon",
      tone: "Codename Unum",
      summary: "A non-ternary single-bit LLM track using layer-based arithmetic operations to define positive and negative bits through metadata and location calculations.",
      detail: "The project is described as the first market-grade non-ternary single-bit LLM with a custom inference and training engine built for ROCm.",
      emphasis: "Research direction with production intent, not a novelty side project."
    }
  ];
  const truthStack = [
    {
      label: "True today",
      title: "PTree is shipping performance work",
      body: "PTree is the strongest present-tense proof point on the site, so the homepage now treats it as the operational anchor rather than a side mention."
    },
    {
      label: "Building now",
      title: "Termix is early and still architecture-heavy",
      body: "Termix stays on the page because it matters, but its status is framed honestly: serious direction, unfinished product."
    },
    {
      label: "Next frontier",
      title: "Unum pushes the org beyond tooling",
      body: "One Bit LLM gives the foundation a research-lab edge, but it is presented as a deliberate systems effort rather than generic AI branding."
    }
  ];
  const platformPriorities = [
    {
      label: "Priority Platforms",
      value: "Windows + Linux",
      body: "Everything important should work across both without treating either side like an awkward port target."
    },
    {
      label: "Secondary Interest",
      value: "macOS + BSD",
      body: "Soft support matters, but it is not the main execution priority while Windows/Linux parity is still the central battle."
    },
    {
      label: "Primary Outcome",
      value: "Browse, follow, contribute",
      body: "Visitors should understand the mission fast, inspect active projects, and decide whether they want to join the work."
    }
  ];
  const contributionTracks = [
    {
      title: "Code",
      body: "Runtime pieces, automation, tooling surfaces, platform integrations, and performance-sensitive systems work."
    },
    {
      title: "Operations",
      body: "Validation paths, release discipline, packaging, CI, and the practical glue that keeps multi-platform tooling believable."
    },
    {
      title: "Design + Docs",
      body: "Information architecture, interface clarity, and documentation that treats technical readers like adults instead of conversion targets."
    }
  ];
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>The Winux Foundation | Cross-Platform Systems Without Holy War</title>`);
    });
    $$renderer2.push(`<meta name="description" content="The Winux Foundation is a cross-platform systems organization building serious tooling for developers and sysadmins across Windows and Linux."/>`);
  });
  $$renderer.push(`<div class="page-shell svelte-1uha8ag"><header class="hero panel svelte-1uha8ag"><div class="hero-top svelte-1uha8ag"><div class="brand-lockup svelte-1uha8ag"><span class="brand-mark svelte-1uha8ag">WF</span> <div><p class="eyebrow svelte-1uha8ag">Cross-Platform Systems Organization</p> <p class="brand-subtitle svelte-1uha8ag">Serious systems lab. Bold anti-corporate posture. Operator-first output.</p></div></div> <nav class="nav-links svelte-1uha8ag" aria-label="Primary"><a href="#flagships" class="svelte-1uha8ag">Projects</a> <a href="#truth-stack" class="svelte-1uha8ag">Status</a> <a href="#contribute" class="svelte-1uha8ag">Contribute</a></nav></div> <div class="hero-grid svelte-1uha8ag"><div class="hero-copy"><p class="hero-kicker svelte-1uha8ag">Cross-platform systems without ideology, fluff, or platform tribalism.</p> <h1 class="svelte-1uha8ag">The Winux Foundation</h1> <p class="lead svelte-1uha8ag">We are a cross-platform systems org trying to kill the OS holy war by building tools that respect both
          Windows and Linux workflows. The audience is developers and sysadmins. The standard is practical,
          inspectable execution.</p> <div class="chip-row svelte-1uha8ag"><span class="chip windows svelte-1uha8ag">Windows is first-class</span> <span class="chip linux svelte-1uha8ag">Linux is first-class</span> <span class="chip neutral svelte-1uha8ag">macOS + BSD are secondary interests</span></div> <div class="action-row svelte-1uha8ag"><a class="action-link primary svelte-1uha8ag"${attr("href", `${base}/projects`)}>Browse The Project Blob</a> <a class="action-link secondary svelte-1uha8ag" href="https://github.com/orgs/Winux-Core/repositories">Follow On GitHub</a></div> <div class="hero-stats svelte-1uha8ag" aria-label="Foundation signals"><article class="svelte-1uha8ag"><span class="svelte-1uha8ag">Audience</span> <strong class="svelte-1uha8ag">Developers + Sysadmins</strong> <p class="svelte-1uha8ag">People who care how tools behave when they actually touch systems.</p></article> <article class="svelte-1uha8ag"><span class="svelte-1uha8ag">Priority</span> <strong class="svelte-1uha8ag">Windows + Linux</strong> <p class="svelte-1uha8ag">Cross-platform means both are respected, not one translated through the other.</p></article> <article class="svelte-1uha8ag"><span class="svelte-1uha8ag">Stance</span> <strong class="svelte-1uha8ag">Serious systems lab</strong> <p class="svelte-1uha8ag">Bold tone is welcome here, but it still has to survive contact with engineering reality.</p></article></div></div> <aside class="manifesto-card svelte-1uha8ag"><p class="manifesto-label svelte-1uha8ag">Mission Brief</p> <h2 class="svelte-1uha8ag">What a visitor should understand fast</h2> <ul class="svelte-1uha8ag"><li class="svelte-1uha8ag">This org exists to end the OS holy war with actual tools, not neutral language.</li> <li class="svelte-1uha8ag">PTree is the clearest shipping proof. Termix is ambitious and unfinished. Unum is the next research-grade leap.</li> <li class="svelte-1uha8ag">The goal is not broad lifestyle branding. The goal is better systems technology.</li></ul> <div class="manifesto-grid svelte-1uha8ag"><div class="svelte-1uha8ag"><span class="svelte-1uha8ag">Identity</span> <strong class="svelte-1uha8ag">Foundation + Lab</strong></div> <div class="svelte-1uha8ag"><span class="svelte-1uha8ag">Tone</span> <strong class="svelte-1uha8ag">Serious / Anti-corporate</strong></div> <div class="svelte-1uha8ag"><span class="svelte-1uha8ag">CTA</span> <strong class="svelte-1uha8ag">Browse Projects</strong></div> <div class="svelte-1uha8ag"><span class="svelte-1uha8ag">CTA</span> <strong class="svelte-1uha8ag">Contribute</strong></div></div></aside></div></header> <section class="signal-strip svelte-1uha8ag" aria-label="Operating signals"><!--[-->`);
  const each_array = ensure_array_like(operatingSignals);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let signal = each_array[$$index];
    $$renderer.push(`<article class="signal-card panel svelte-1uha8ag"><p class="section-eyebrow svelte-1uha8ag">Signal</p> <h2 class="svelte-1uha8ag">${escape_html(signal.title)}</h2> <p class="svelte-1uha8ag">${escape_html(signal.body)}</p></article>`);
  }
  $$renderer.push(`<!--]--></section> <main class="content-grid svelte-1uha8ag"><section id="flagships" class="panel section-card span-wide svelte-1uha8ag"><div class="section-heading svelte-1uha8ag"><p class="section-eyebrow svelte-1uha8ag">Flagship Projects</p> <h2 class="svelte-1uha8ag">The current program, honestly framed</h2></div> <div class="projects-grid svelte-1uha8ag"><!--[-->`);
  const each_array_1 = ensure_array_like(flagshipProjects);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let project = each_array_1[$$index_1];
    $$renderer.push(`<article class="project-card svelte-1uha8ag"><div class="project-topline svelte-1uha8ag"><span class="status-pill svelte-1uha8ag">${escape_html(project.status)}</span> <span class="project-tone svelte-1uha8ag">${escape_html(project.tone)}</span></div> <h3 class="svelte-1uha8ag">${escape_html(project.name)}</h3> <p class="svelte-1uha8ag">${escape_html(project.summary)}</p> <p class="svelte-1uha8ag">${escape_html(project.detail)}</p> <p class="project-emphasis svelte-1uha8ag">${escape_html(project.emphasis)}</p></article>`);
  }
  $$renderer.push(`<!--]--></div></section> <section id="operating-model" class="panel section-card svelte-1uha8ag"><div class="section-heading svelte-1uha8ag"><p class="section-eyebrow svelte-1uha8ag">Operating Model</p> <h2 class="svelte-1uha8ag">Build for operators, not platform loyalists</h2></div> <div class="stack-copy svelte-1uha8ag"><p class="svelte-1uha8ag">Winux exists to push back on the idea that systems tooling has to pick an ideological camp. We want
          software that feels at home on Windows and Linux because it was designed that way from the start.</p> <p class="svelte-1uha8ag">The model is straightforward: publish code, keep technical claims legible, and let the work itself
          argue for the broader architectural direction.</p></div></section> <section id="truth-stack" class="panel section-card svelte-1uha8ag"><div class="section-heading svelte-1uha8ag"><p class="section-eyebrow svelte-1uha8ag">Truth Stack</p> <h2 class="svelte-1uha8ag">What is shipped, what is forming, what is next</h2></div> <div class="truth-list svelte-1uha8ag"><!--[-->`);
  const each_array_2 = ensure_array_like(truthStack);
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let item = each_array_2[$$index_2];
    $$renderer.push(`<article class="truth-item svelte-1uha8ag"><p class="timeline-label svelte-1uha8ag">${escape_html(item.label)}</p> <h3 class="svelte-1uha8ag">${escape_html(item.title)}</h3> <p class="svelte-1uha8ag">${escape_html(item.body)}</p></article>`);
  }
  $$renderer.push(`<!--]--></div></section> <section class="panel section-card span-wide svelte-1uha8ag"><div class="section-heading svelte-1uha8ag"><p class="section-eyebrow svelte-1uha8ag">Platform Priorities</p> <h2 class="svelte-1uha8ag">Cross-platform means clear priorities, not vague support language</h2></div> <div class="priority-grid svelte-1uha8ag"><!--[-->`);
  const each_array_3 = ensure_array_like(platformPriorities);
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let item = each_array_3[$$index_3];
    $$renderer.push(`<article class="svelte-1uha8ag"><span class="svelte-1uha8ag">${escape_html(item.label)}</span> <h3 class="svelte-1uha8ag">${escape_html(item.value)}</h3> <p class="svelte-1uha8ag">${escape_html(item.body)}</p></article>`);
  }
  $$renderer.push(`<!--]--></div></section> <section id="contribute" class="panel section-card span-wide svelte-1uha8ag"><div class="section-heading svelte-1uha8ag"><p class="section-eyebrow svelte-1uha8ag">Contribute</p> <h2 class="svelte-1uha8ag">Useful people can help immediately</h2></div> <p class="svelte-1uha8ag">If you care about systems clarity, performance, tooling ergonomics, or documentation that says something
        real, there is room here. The org is not optimizing for optics. It is optimizing for output.</p> <div class="contrib-grid svelte-1uha8ag"><!--[-->`);
  const each_array_4 = ensure_array_like(contributionTracks);
  for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
    let track = each_array_4[$$index_4];
    $$renderer.push(`<article class="svelte-1uha8ag"><h3 class="svelte-1uha8ag">${escape_html(track.title)}</h3> <p class="svelte-1uha8ag">${escape_html(track.body)}</p></article>`);
  }
  $$renderer.push(`<!--]--></div> <a class="inline-link svelte-1uha8ag"${attr("href", `${base}/projects`)}>Inspect the live repository surface</a></section> <section id="contact" class="panel section-card svelte-1uha8ag"><div class="section-heading svelte-1uha8ag"><p class="section-eyebrow svelte-1uha8ag">Founder Note</p> <h2 class="svelte-1uha8ag">Strive to be the greatness you wish to see in technology</h2></div> <blockquote class="founder-quote svelte-1uha8ag">“Strive to be the greatness you wish to see in technology, and only then are you a developer.”</blockquote> <p class="svelte-1uha8ag">The foundation is currently built by one person. We are not looking for funding right now. Good-faith
        contributions and marketing-aligned visibility are far more relevant at this stage.</p> <div class="contact-box svelte-1uha8ag"><p class="svelte-1uha8ag"><strong>Organization:</strong> The Winux Foundation</p> <p class="svelte-1uha8ag"><strong>Focus:</strong> Cross-platform systems tooling, terminal environments, and emerging systems AI</p> <p class="svelte-1uha8ag"><strong>GitHub:</strong> <a href="https://github.com/orgs/Winux-Core/repositories">Winux-Core</a></p> <p class="svelte-1uha8ag"><strong>Email:</strong> hello@winux.foundation</p></div></section></main></div>`);
}
export {
  _page as default
};
