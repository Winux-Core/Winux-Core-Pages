<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import MarkdownIt from 'markdown-it';

  const ORG = 'Winux-Core';
  const PAGE_SIZE = 100;
  const MAX_PAGES = 10;
  const EMPTY_POINTER = { x: -9999, y: -9999, active: false };
  const compactNumber = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  });
  const fullNumber = new Intl.NumberFormat('en-US');

  const flagshipProjects = [
    {
      name: 'Winux PTree',
      status: 'Shipping',
      statement: 'Filesystem indexer with tree-style CLI integration.',
      detail: 'Presented as the fastest open-source Windows indexer tool, with reported indexing speeds below 100 microseconds.'
    },
    {
      name: 'Winux Termix',
      status: 'In development',
      statement: 'Hackable terminal environment with fakeroot abilities plus Lua, WASM, and Rust bindings.',
      detail: 'Tauri-backed browser virtualization and CSS-driven environments are core to the vision, but the product is still early.'
    },
    {
      name: 'Winux One Bit LLM',
      status: 'Coming soon',
      statement: 'Codename Unum. Non-ternary single-bit LLM work with layer-based arithmetic semantics.',
      detail: 'Framed as a market-grade custom inference and training engine built for ROCm.'
    }
  ];

  const operatingFacts = [
    {
      title: 'Audience',
      body: 'This org is building for developers and sysadmins, not general consumer software buyers.'
    },
    {
      title: 'Platform priority',
      body: 'Windows and Linux are the main line. macOS and BSD matter, but they are not the current center of gravity.'
    },
    {
      title: 'Next action',
      body: 'Browse projects, inspect repos, load READMEs, and decide whether to follow or contribute.'
    }
  ];

  let canvas;
  let surface;
  let status = 'Loading repositories from GitHub...';
  let error = '';
  let repos = [];
  let selected = null;
  let activeRepo = null;
  let query = '';
  let activeFilter = 'all';

  let readmeStatus = 'Select a repository blob to load its README.';
  let readmeError = '';
  let readmeHtml = '';

  let blobs = [];
  let pointer = { ...EMPTY_POINTER };
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  const markdown = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true
  });

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const repoLanguage = (repo) => repo.language || 'Unspecified';
  const formatCompact = (value) => compactNumber.format(value || 0);
  const formatFull = (value) => fullNumber.format(value || 0);

  function repoWeight(repo) {
    return Math.max(1, repo.stargazers_count * 2 + repo.forks_count + Math.floor(repo.size / 60));
  }

  function matchesQuery(repo, value) {
    const normalized = value.trim().toLowerCase();

    if (!normalized) {
      return true;
    }

    return [repo.name, repo.description, repoLanguage(repo), repo.topics?.join(' ')]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(normalized));
  }

  function buildLanguageStats(items) {
    const counts = new Map();

    for (const repo of items) {
      const label = repoLanguage(repo);
      counts.set(label, (counts.get(label) || 0) + 1);
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 6)
      .map(([label, count]) => ({ label, count }));
  }

  function decodeBase64Utf8(base64String) {
    const compact = base64String.replace(/\n/g, '');
    const binary = atob(compact);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  async function fetchAllRepos() {
    const all = [];

    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const url = `https://api.github.com/orgs/${ORG}/repos?per_page=${PAGE_SIZE}&page=${page}&type=public&sort=updated`;
      const response = await fetch(url);

      if (!response.ok) {
        const rate = response.headers.get('x-ratelimit-remaining');
        const message =
          rate === '0'
            ? 'GitHub API rate limit reached. Please refresh in a few minutes.'
            : `GitHub API request failed (${response.status}).`;
        throw new Error(message);
      }

      const batch = await response.json();
      if (!Array.isArray(batch)) {
        throw new Error('GitHub returned an unexpected response.');
      }

      all.push(...batch);

      if (batch.length < PAGE_SIZE) {
        break;
      }
    }

    return all;
  }

  async function fetchReadme(repo) {
    readmeError = '';
    readmeHtml = '';
    readmeStatus = `Loading README for ${repo.name}...`;

    const response = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`);

    if (!response.ok) {
      const rate = response.headers.get('x-ratelimit-remaining');
      if (rate === '0') {
        throw new Error('GitHub API rate limit reached while fetching README. Try again later.');
      }

      if (response.status === 404) {
        throw new Error('README not found for this repository.');
      }

      throw new Error(`Failed to load README (${response.status}).`);
    }

    const payload = await response.json();
    if (!payload?.content) {
      throw new Error('README content is missing from GitHub response.');
    }

    const readmeBody = decodeBase64Utf8(payload.content);
    readmeHtml = markdown.render(readmeBody);
    readmeStatus = `${repo.name}/README loaded (${payload.size ?? readmeBody.length} bytes).`;
  }

  async function selectRepo(repo) {
    activeRepo = repo;

    try {
      await fetchReadme(repo);
    } catch (err) {
      readmeStatus = '';
      readmeHtml = '';
      readmeError = err instanceof Error ? err.message : 'Failed to load README.';
    }
  }

  function buildBlobs(items) {
    const total = Math.min(items.length, 96);
    const selectedRepos = items.slice(0, total);

    return selectedRepos.map((repo, index) => {
      const weight = repoWeight(repo);
      const radius = clamp(24 + Math.sqrt(weight) * 1.85, 24, 82);
      const speed = clamp(0.35 + 130 / (radius * 14), 0.22, 0.75);
      const angle = Math.random() * Math.PI * 2;
      const hue = repo.name.toLowerCase().includes('win')
        ? 207
        : repo.name.toLowerCase().includes('linux')
          ? 39
          : index % 2 === 0
            ? 210
            : 42;

      return {
        id: repo.id,
        repo,
        radius,
        x: Math.random() * Math.max(1, width - radius * 2) + radius,
        y: Math.random() * Math.max(1, height - radius * 2) + radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        hue
      };
    });
  }

  function resolveCollisions() {
    for (let i = 0; i < blobs.length; i += 1) {
      for (let j = i + 1; j < blobs.length; j += 1) {
        const a = blobs[i];
        const b = blobs[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const minDist = a.radius + b.radius + 3;

        if (dist < minDist) {
          const overlap = (minDist - dist) * 0.5;
          const nx = dx / dist;
          const ny = dy / dist;

          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;

          const push = 0.012;
          a.vx -= nx * push;
          a.vy -= ny * push;
          b.vx += nx * push;
          b.vy += ny * push;
        }
      }
    }
  }

  function step() {
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);

    const bg = context.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#07111d');
    bg.addColorStop(0.55, '#0b1625');
    bg.addColorStop(1, '#08101c');
    context.fillStyle = bg;
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'rgba(91, 151, 255, 0.08)';
    context.fillRect(0, 0, width, 1);
    context.fillStyle = 'rgba(255, 189, 86, 0.08)';
    context.fillRect(0, height - 1, width, 1);

    resolveCollisions();

    let nearest = null;
    let nearestDist = Number.POSITIVE_INFINITY;

    for (const blob of blobs) {
      blob.x += blob.vx;
      blob.y += blob.vy;

      if (blob.x - blob.radius <= 0 || blob.x + blob.radius >= width) {
        blob.vx *= -1;
      }

      if (blob.y - blob.radius <= 0 || blob.y + blob.radius >= height) {
        blob.vy *= -1;
      }

      blob.vx *= 0.999;
      blob.vy *= 0.999;

      const dx = pointer.x - blob.x;
      const dy = pointer.y - blob.y;
      const d = Math.hypot(dx, dy);
      const withinPointer = pointer.active && d < blob.radius;

      if (withinPointer && d < nearestDist) {
        nearest = blob;
        nearestDist = d;
      }

      const isActive = activeRepo?.id === blob.repo.id;
      const isHovered = withinPointer;

      const grad = context.createRadialGradient(
        blob.x - blob.radius * 0.3,
        blob.y - blob.radius * 0.3,
        blob.radius * 0.2,
        blob.x,
        blob.y,
        blob.radius * 1.12
      );

      grad.addColorStop(0, `hsla(${blob.hue}, 96%, 71%, 0.95)`);
      grad.addColorStop(1, `hsla(${blob.hue}, 78%, 44%, 0.72)`);

      context.fillStyle = grad;
      context.beginPath();
      context.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = `hsla(${blob.hue}, 96%, 84%, 0.34)`;
      context.lineWidth = 1.1;
      context.stroke();

      if (isActive || isHovered) {
        context.strokeStyle = isActive ? 'rgba(255, 205, 113, 0.9)' : 'rgba(173, 219, 255, 0.85)';
        context.lineWidth = isActive ? 2.6 : 2;
        context.beginPath();
        context.arc(blob.x, blob.y, blob.radius + 5, 0, Math.PI * 2);
        context.stroke();
      }

      context.fillStyle = 'rgba(231, 244, 255, 0.93)';
      context.font = `${clamp(blob.radius * 0.25, 10, 14)}px 'IBM Plex Mono', monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      const label = blob.repo.name.length > 16 ? `${blob.repo.name.slice(0, 14)}..` : blob.repo.name;
      context.fillText(label, blob.x, blob.y);
    }

    selected = nearest ? nearest.repo : null;
    animationFrame = requestAnimationFrame(step);
  }

  function resizeCanvas() {
    if (!canvas || !surface) {
      return;
    }

    const bounds = surface.getBoundingClientRect();
    width = Math.max(320, Math.floor(bounds.width));
    height = Math.max(360, Math.floor(bounds.height));
    canvas.width = width;
    canvas.height = height;
  }

  function handleMove(event) {
    const rect = canvas.getBoundingClientRect();
    pointer = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true
    };
  }

  function handleLeave() {
    pointer = { ...EMPTY_POINTER };
    selected = null;
  }

  async function handleClick() {
    if (selected) {
      await selectRepo(selected);
    }
  }

  onMount(async () => {
    resizeCanvas();

    const onResize = () => resizeCanvas();
    window.addEventListener('resize', onResize);

    try {
      repos = (await fetchAllRepos()).sort((a, b) => repoWeight(b) - repoWeight(a));
      status = `Loaded ${repos.length} repositories from ${ORG}.`;
      step();
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load repositories.';
      status = '';
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', onResize);
    };
  });

  $: languageStats = buildLanguageStats(repos);
  $: filteredRepos = repos.filter(
    (repo) => (activeFilter === 'all' || repoLanguage(repo) === activeFilter) && matchesQuery(repo, query)
  );
  $: visibleRepoCount = filteredRepos.length;
  $: totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  $: totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  $: filteredStars = filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  $: filteredForks = filteredRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
  $: spotlightRepo = activeRepo || selected || filteredRepos[0] || null;
  $: quickList = filteredRepos.slice(0, 12);
  $: if (width && height) {
    blobs = buildBlobs(filteredRepos);
  }
</script>

<svelte:head>
  <title>Projects | The Winux Foundation</title>
  <meta
    name="description"
    content="Interactive project canvas with repository metadata, flagship program context, and README previews from the Winux-Core organization."
  />
</svelte:head>

<div class="projects-page">
  <header class="hero panel">
    <div class="hero-top">
      <a class="back" href={`${base}/`}>← Home</a>
      <span class="live-tag">Live GitHub canvas</span>
    </div>

    <div class="hero-grid">
      <div class="hero-copy">
        <p class="hero-kicker">Project surface for a cross-platform systems org</p>
        <h1>Winux-Core Project Blob</h1>
        <p>
          This page exists to make the org feel inspectable. Browse the repositories, load READMEs in-place, and
          understand where the real weight of the foundation currently sits.
        </p>
        <p>
          The center of gravity is cross-platform systems work for developers and sysadmins. PTree is shipping,
          Termix is still forming, and Unum is the next major research-grade track.
        </p>
        {#if status}
          <p class="status">{status}</p>
        {/if}
        {#if error}
          <p class="error">{error}</p>
        {/if}

        <div class="metric-grid">
          <article>
            <span>Repositories</span>
            <strong>{formatFull(repos.length)}</strong>
            <p>{formatFull(visibleRepoCount)} currently visible</p>
          </article>
          <article>
            <span>Stars</span>
            <strong>{formatCompact(totalStars)}</strong>
            <p>{formatCompact(filteredStars)} in current slice</p>
          </article>
          <article>
            <span>Forks</span>
            <strong>{formatCompact(totalForks)}</strong>
            <p>{formatCompact(filteredForks)} in current slice</p>
          </article>
        </div>
      </div>

      <aside class="spotlight-card">
        <p class="panel-label">Founder note</p>
        <h2>Build what you wish existed</h2>
        <blockquote>
          “Strive to be the greatness you wish to see in technology, and only then are you a developer.”
        </blockquote>
        <p>
          This is currently a one-person effort. The ask right now is not funding. It is attention from people who
          care about systems quality, contribution, and clear technical direction.
        </p>
      </aside>
    </div>
  </header>

  <section class="brief-grid">
    <section class="panel brief-panel">
      <div class="section-heading">
        <p class="panel-label">Flagship Program</p>
        <h2>What the organization is actually building</h2>
      </div>
      <div class="flagship-grid">
        {#each flagshipProjects as project}
          <article class="flagship-card">
            <div class="flagship-top">
              <h3>{project.name}</h3>
              <span class="status-pill">{project.status}</span>
            </div>
            <p>{project.statement}</p>
            <p>{project.detail}</p>
          </article>
        {/each}
      </div>
    </section>

    <section class="panel brief-panel">
      <div class="section-heading">
        <p class="panel-label">Operating Facts</p>
        <h2>How to read this organization</h2>
      </div>
      <div class="facts-list">
        {#each operatingFacts as fact}
          <article class="fact-card">
            <h3>{fact.title}</h3>
            <p>{fact.body}</p>
          </article>
        {/each}
      </div>
    </section>
  </section>

  <section class="controls panel">
    <div class="search-wrap">
      <label for="repo-search">Search repositories</label>
      <input
        id="repo-search"
        bind:value={query}
        type="search"
        placeholder="Search by name, description, topic, or language"
      />
    </div>

    <div class="filter-wrap">
      <p class="panel-label">Language focus</p>
      <div class="filter-row">
        <button
          type="button"
          class={activeFilter === 'all' ? 'filter-pill active' : 'filter-pill'}
          onclick={() => (activeFilter = 'all')}
        >
          All repos
        </button>
        {#each languageStats as stat}
          <button
            type="button"
            class={activeFilter === stat.label ? 'filter-pill active' : 'filter-pill'}
            onclick={() => (activeFilter = stat.label)}
          >
            {stat.label} · {stat.count}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <section class="workspace-grid">
    <div class="panel surface-panel">
      <div class="surface-header">
        <div>
          <p class="panel-label">Canvas</p>
          <h2>Repository motion field</h2>
        </div>
        <div class="legend">
          <span>Blue bias: Windows-leaning names</span>
          <span>Amber bias: Linux-leaning names</span>
          <span>Click any blob to pin and inspect</span>
        </div>
      </div>

      <section class="surface" bind:this={surface}>
        <canvas
          bind:this={canvas}
          onpointermove={handleMove}
          onpointerleave={handleLeave}
          onclick={handleClick}
          aria-label="Repository blob canvas"
        ></canvas>

        {#if !filteredRepos.length}
          <div class="empty-state">
            <h3>No repositories match the current filter</h3>
            <p>Clear the search or switch the language focus to repopulate the canvas.</p>
          </div>
        {/if}

        {#if selected}
          <aside class="tooltip">
            <h3>{selected.name}</h3>
            <p>{selected.description || 'No description provided.'}</p>
            <p>
              {repoLanguage(selected)} · ★ {formatFull(selected.stargazers_count)} · Forks {formatFull(selected.forks_count)}
            </p>
            <div class="tooltip-actions">
              <button type="button" onclick={() => selectRepo(selected)}>Load README</button>
              <a href={selected.html_url} target="_blank" rel="noopener noreferrer">Open Repository ↗</a>
            </div>
          </aside>
        {/if}
      </section>
    </div>

    <aside class="panel inspector">
      <div class="inspector-head">
        <p class="panel-label">Inspector</p>
        <h2>{spotlightRepo ? spotlightRepo.full_name : 'Choose a repository'}</h2>
      </div>

      {#if spotlightRepo}
        <p>{spotlightRepo.description || 'No description provided.'}</p>
        <div class="inspector-meta">
          <span>{repoLanguage(spotlightRepo)}</span>
          <span>{formatFull(spotlightRepo.open_issues_count)} open issues</span>
          <span>{formatCompact(spotlightRepo.size)} KB</span>
        </div>
        <div class="inspector-actions">
          <button type="button" onclick={() => selectRepo(spotlightRepo)}>Load README</button>
          <a href={spotlightRepo.html_url} target="_blank" rel="noopener noreferrer">Repository ↗</a>
        </div>
      {:else}
        <p>Use the canvas, search, or filter controls to choose a repository.</p>
      {/if}

      <div class="quick-list">
        <div class="quick-list-head">
          <p class="panel-label">Quick picks</p>
          <span>{formatFull(visibleRepoCount)} visible</span>
        </div>

        {#each quickList as repo}
          <button type="button" class="quick-item" onclick={() => selectRepo(repo)}>
            <strong>{repo.name}</strong>
            <span>{repoLanguage(repo)} · ★ {formatFull(repo.stargazers_count)}</span>
          </button>
        {/each}
      </div>
    </aside>
  </section>

  <section class="readme panel">
    <div class="readme-head">
      <div>
        <p class="panel-label">README Viewer</p>
        <h2>In-page architecture context</h2>
      </div>
      {#if activeRepo}
        <p class="repo-name">{activeRepo.full_name}</p>
      {/if}
    </div>

    {#if activeRepo}
      <div class="readme-toolbar">
        <button type="button" onclick={() => selectRepo(activeRepo)}>Refresh README</button>
        <a href={activeRepo.html_url} target="_blank" rel="noopener noreferrer">Open repository ↗</a>
      </div>
    {/if}

    {#if readmeStatus}
      <p class="status">{readmeStatus}</p>
    {/if}
    {#if readmeError}
      <p class="error">{readmeError}</p>
    {/if}
    {#if readmeHtml}
      <article class="readme-html">{@html readmeHtml}</article>
    {:else}
      <div class="readme-placeholder">
        <h3>README not loaded yet</h3>
        <p>Select any repository from the canvas or quick list to pull its README into this page.</p>
      </div>
    {/if}
  </section>
</div>

<style>
  :global(:root) {
    --projects-text: #ecf4ff;
    --projects-muted: #b5c8df;
    --projects-line: rgba(148, 181, 241, 0.22);
    --projects-panel: linear-gradient(170deg, rgba(8, 18, 37, 0.84), rgba(8, 12, 22, 0.92));
    --projects-shadow: 0 24px 56px rgba(0, 0, 0, 0.35);
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: 'Space Grotesk', sans-serif;
    background:
      radial-gradient(circle at 8% 3%, rgba(33, 124, 226, 0.26) 0%, transparent 28%),
      radial-gradient(circle at 88% 95%, rgba(246, 186, 78, 0.18) 0%, transparent 30%),
      linear-gradient(160deg, #07101b, #060b12 46%, #08111d);
    color: var(--projects-text);
  }

  .projects-page {
    width: min(1220px, 94vw);
    margin: 1.2rem auto 2rem;
    display: grid;
    gap: 1.05rem;
  }

  .panel {
    border: 1px solid var(--projects-line);
    border-radius: 1.4rem;
    background: var(--projects-panel);
    box-shadow: var(--projects-shadow);
    backdrop-filter: blur(12px);
  }

  .hero {
    position: relative;
    overflow: hidden;
    padding: 1.25rem;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(132, 183, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(132, 183, 255, 0.05) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent 78%);
    pointer-events: none;
  }

  .hero-top,
  .surface-header,
  .quick-list-head,
  .readme-head,
  .inspector-head,
  .flagship-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }

  .hero-grid,
  .brief-grid,
  .workspace-grid,
  .metric-grid,
  .flagship-grid {
    display: grid;
    gap: 1rem;
  }

  .hero-grid {
    position: relative;
    z-index: 1;
    grid-template-columns: minmax(0, 1.5fr) minmax(310px, 0.9fr);
    margin-top: 1rem;
    align-items: start;
  }

  .brief-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .workspace-grid {
    grid-template-columns: minmax(0, 1.65fr) minmax(320px, 0.85fr);
    align-items: start;
  }

  h1 {
    margin: 0.35rem 0 0.55rem;
    font-size: clamp(2.3rem, 4vw, 4.2rem);
    line-height: 0.96;
    letter-spacing: -0.04em;
  }

  h2 {
    margin: 0;
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    line-height: 1.05;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    margin: 0.45rem 0 0;
    color: var(--projects-muted);
    line-height: 1.6;
  }

  .status {
    color: #95e2ff;
  }

  .error {
    color: #ffada2;
  }

  .back {
    color: #9dd8ff;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.86rem;
  }

  .live-tag,
  .panel-label,
  .hero-kicker,
  .metric-grid span,
  .spotlight-card blockquote,
  .inspector-meta span,
  .quick-item span,
  .filter-pill,
  .repo-name,
  .status-pill {
    font-family: 'IBM Plex Mono', monospace;
  }

  .live-tag,
  .panel-label,
  .hero-kicker {
    color: #9ccfff;
    font-size: 0.77rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .live-tag {
    border: 1px solid rgba(160, 198, 255, 0.22);
    border-radius: 999px;
    padding: 0.42rem 0.72rem;
    background: rgba(8, 13, 23, 0.52);
  }

  .metric-grid {
    margin-top: 1.15rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .metric-grid article,
  .spotlight-card,
  .brief-panel,
  .inspector,
  .controls,
  .readme,
  .surface-panel,
  .flagship-card,
  .fact-card {
    position: relative;
  }

  .metric-grid article,
  .flagship-card,
  .fact-card {
    padding: 0.95rem;
    border: 1px solid rgba(170, 203, 255, 0.14);
    border-radius: 1rem;
    background: rgba(8, 13, 22, 0.52);
  }

  .metric-grid strong {
    display: block;
    margin-top: 0.3rem;
    color: #f1f7ff;
    font-size: 1.45rem;
  }

  .metric-grid p {
    margin-top: 0.32rem;
    font-size: 0.9rem;
  }

  .spotlight-card,
  .brief-panel,
  .inspector {
    padding: 1rem;
    border: 1px solid rgba(171, 205, 255, 0.18);
    border-radius: 1.1rem;
    background: rgba(8, 14, 25, 0.56);
  }

  .spotlight-card::before,
  .brief-panel::before,
  .inspector::before,
  .controls::before,
  .readme::before,
  .surface-panel::before,
  .flagship-card::before {
    content: '';
    position: absolute;
    inset: 0 auto auto 0;
    width: 100%;
    height: 0.18rem;
    border-radius: 1.4rem 1.4rem 0 0;
    background: linear-gradient(90deg, rgba(70, 145, 255, 0.88), rgba(255, 182, 77, 0.82));
    opacity: 0.85;
  }

  .spotlight-card blockquote {
    margin: 0.95rem 0 0;
    padding: 1rem 1.05rem;
    border-left: 3px solid rgba(255, 193, 94, 0.72);
    border-radius: 0.8rem;
    background: rgba(9, 15, 25, 0.68);
    color: #edf4ff;
    font-size: 0.94rem;
    line-height: 1.65;
  }

  .brief-panel .section-heading {
    margin-bottom: 0.85rem;
  }

  .flagship-grid,
  .facts-list {
    display: grid;
    gap: 0.8rem;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(173, 209, 255, 0.22);
    border-radius: 999px;
    padding: 0.32rem 0.62rem;
    background: rgba(8, 15, 27, 0.56);
    color: #f0f7ff;
    font-size: 0.76rem;
  }

  .controls {
    padding: 1rem 1.1rem;
  }

  .search-wrap label {
    display: block;
    margin-bottom: 0.45rem;
    color: #dfeeff;
    font-size: 0.92rem;
    font-weight: 500;
  }

  .search-wrap input {
    width: 100%;
    border: 1px solid rgba(154, 193, 255, 0.24);
    border-radius: 0.95rem;
    background: rgba(7, 13, 23, 0.72);
    padding: 0.85rem 0.95rem;
    color: #edf5ff;
    font: inherit;
  }

  .search-wrap input::placeholder {
    color: rgba(183, 204, 232, 0.68);
  }

  .filter-wrap {
    margin-top: 1rem;
  }

  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.45rem;
  }

  .filter-pill {
    padding: 0.48rem 0.72rem;
    border-radius: 999px;
    background: rgba(8, 14, 25, 0.64);
    color: #cbdcf1;
    font-size: 0.76rem;
  }

  .filter-pill.active {
    background: linear-gradient(135deg, rgba(31, 108, 209, 0.52), rgba(24, 73, 136, 0.24));
    border-color: rgba(175, 213, 255, 0.54);
    color: #f0f7ff;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .legend span,
  .inspector-meta span {
    border: 1px solid rgba(171, 208, 255, 0.2);
    border-radius: 999px;
    padding: 0.34rem 0.62rem;
    background: rgba(8, 13, 22, 0.54);
    color: #cce2ff;
    font-size: 0.76rem;
  }

  .surface {
    position: relative;
    border-radius: 1.2rem;
    border: 1px solid rgba(133, 173, 245, 0.2);
    overflow: hidden;
    min-height: 520px;
    background: rgba(5, 10, 18, 0.82);
    box-shadow: inset 0 0 0 1px rgba(172, 210, 255, 0.04);
  }

  .surface-panel {
    padding: 1rem;
  }

  .surface-header {
    margin-bottom: 0.85rem;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
  }

  .tooltip {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    width: min(390px, calc(100% - 2rem));
    border: 1px solid rgba(171, 209, 255, 0.28);
    border-radius: 0.85rem;
    background: rgba(8, 13, 22, 0.92);
    padding: 0.75rem 0.8rem;
    backdrop-filter: blur(8px);
    display: grid;
    gap: 0.45rem;
  }

  .tooltip p {
    margin: 0;
    font-size: 0.92rem;
  }

  .tooltip a {
    color: #b5e2ff;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.79rem;
  }

  .tooltip-actions,
  .inspector-actions,
  .readme-toolbar {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
  }

  button,
  .inspector-actions a,
  .readme-toolbar a,
  .tooltip-actions a {
    border: 1px solid rgba(127, 176, 248, 0.44);
    border-radius: 0.8rem;
    padding: 0.58rem 0.8rem;
    background: rgba(20, 94, 184, 0.22);
    color: #e7f3ff;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78rem;
    text-decoration: none;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease,
      background 0.2s ease;
  }

  button:hover,
  .inspector-actions a:hover,
  .readme-toolbar a:hover,
  .tooltip-actions a:hover {
    transform: translateY(-1px);
    border-color: rgba(176, 214, 255, 0.68);
    background: rgba(28, 107, 204, 0.28);
  }

  .quick-list {
    margin-top: 1rem;
    display: grid;
    gap: 0.6rem;
  }

  .quick-list-head span {
    color: #a8c1de;
    font-size: 0.78rem;
  }

  .quick-item {
    display: grid;
    gap: 0.3rem;
    text-align: left;
    background: rgba(8, 14, 25, 0.58);
  }

  .quick-item strong {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.98rem;
    font-weight: 500;
  }

  .quick-item span {
    color: #a9c9ec;
    font-size: 0.73rem;
  }

  .repo-name {
    color: #cde6ff;
    margin: 0;
    font-size: 0.78rem;
  }

  .readme {
    padding: 1rem 1.1rem;
  }

  .readme-toolbar {
    margin-top: 0.85rem;
  }

  .readme-html {
    margin: 0.75rem 0 0;
    max-height: 600px;
    overflow: auto;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid rgba(142, 178, 242, 0.28);
    background: rgba(6, 10, 18, 0.84);
    color: #d4e6ff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.84rem;
    line-height: 1.6;
  }

  .readme-html :global(h1),
  .readme-html :global(h2),
  .readme-html :global(h3),
  .readme-html :global(h4) {
    margin: 1rem 0 0.5rem;
    font-family: 'Space Grotesk', sans-serif;
    color: #eff6ff;
  }

  .readme-html :global(h1) {
    font-size: 1.35rem;
  }

  .readme-html :global(h2) {
    font-size: 1.15rem;
  }

  .readme-html :global(p),
  .readme-html :global(li) {
    color: #d3e4ff;
    line-height: 1.62;
  }

  .readme-html :global(ul),
  .readme-html :global(ol) {
    margin: 0.55rem 0 0.85rem;
    padding-left: 1.2rem;
  }

  .readme-html :global(pre) {
    overflow: auto;
    padding: 0.75rem;
    border: 1px solid rgba(138, 177, 244, 0.28);
    border-radius: 0.7rem;
    background: rgba(4, 9, 16, 0.85);
  }

  .readme-html :global(code) {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.79rem;
    color: #d4ecff;
  }

  .readme-html :global(a) {
    color: #8fd4ff;
  }

  .readme-html :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 0.75rem 0;
  }

  .readme-html :global(th),
  .readme-html :global(td) {
    border: 1px solid rgba(128, 170, 240, 0.22);
    padding: 0.4rem 0.55rem;
    text-align: left;
  }

  .readme-placeholder,
  .empty-state {
    display: grid;
    place-items: center;
    text-align: center;
    gap: 0.4rem;
    min-height: 220px;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px dashed rgba(160, 198, 255, 0.22);
    background: rgba(8, 13, 22, 0.44);
  }

  .empty-state {
    position: absolute;
    inset: 1rem;
    min-height: auto;
    backdrop-filter: blur(8px);
  }

  @media (max-width: 980px) {
    .hero-grid,
    .brief-grid,
    .workspace-grid,
    .metric-grid {
      grid-template-columns: 1fr;
    }

    .surface-header,
    .readme-head,
    .inspector-head,
    .hero-top,
    .flagship-top {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  @media (max-width: 760px) {
    .projects-page {
      margin: 0.85rem auto 1.2rem;
    }

    .hero,
    .brief-panel,
    .controls,
    .surface-panel,
    .inspector,
    .readme {
      padding: 0.9rem;
    }

    .surface {
      min-height: 420px;
    }

    .tooltip {
      left: 0.7rem;
      right: 0.7rem;
      width: auto;
      bottom: 0.7rem;
    }

    .tooltip-actions,
    .inspector-actions,
    .readme-toolbar {
      flex-direction: column;
    }

    button,
    .inspector-actions a,
    .readme-toolbar a,
    .tooltip-actions a {
      width: 100%;
      justify-content: center;
    }
  }
</style>
