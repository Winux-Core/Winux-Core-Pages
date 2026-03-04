<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import MarkdownIt from 'markdown-it';

  const ORG = 'Winux-Core';
  const PAGE_SIZE = 100;
  const MAX_PAGES = 10;

  let canvas;
  let surface;
  let status = 'Loading repositories from GitHub...';
  let error = '';
  let repos = [];
  let selected = null;
  let activeRepo = null;

  let readmeStatus = 'Select a repository blob to load its README.';
  let readmeError = '';
  let readmeBody = '';
  let readmeHtml = '';

  let blobs = [];
  let pointer = { x: -9999, y: -9999, active: false };
  let width = 0;
  let height = 0;
  let animationFrame = 0;
  const markdown = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true
  });

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function repoWeight(repo) {
    return Math.max(1, repo.stargazers_count * 2 + repo.forks_count + Math.floor(repo.size / 60));
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
    readmeBody = '';
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

    readmeBody = decodeBase64Utf8(payload.content);
    readmeHtml = markdown.render(readmeBody);
    readmeStatus = `${repo.name}/README loaded (${payload.size ?? readmeBody.length} bytes).`;
  }

  async function selectRepo(repo) {
    activeRepo = repo;

    try {
      await fetchReadme(repo);
    } catch (err) {
      readmeStatus = '';
      readmeBody = '';
      readmeHtml = '';
      readmeError = err instanceof Error ? err.message : 'Failed to load README.';
    }
  }

  function buildBlobs(items) {
    const total = Math.min(items.length, 120);
    const selectedRepos = items.slice(0, total);

    return selectedRepos.map((repo, index) => {
      const weight = repoWeight(repo);
      const radius = clamp(24 + Math.sqrt(weight) * 1.9, 24, 88);
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
    bg.addColorStop(0, '#0a0f1d');
    bg.addColorStop(1, '#0f1626');
    context.fillStyle = bg;
    context.fillRect(0, 0, width, height);

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

      if (pointer.active && d < blob.radius && d < nearestDist) {
        nearest = blob;
        nearestDist = d;
      }

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
    width = Math.floor(bounds.width);
    height = Math.floor(bounds.height);
    canvas.width = width;
    canvas.height = height;

    if (repos.length) {
      blobs = buildBlobs(repos);
    }
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
    pointer = { x: -9999, y: -9999, active: false };
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
      status = `Loaded ${repos.length} repositories from ${ORG}.`;      blobs = buildBlobs(repos);
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
</script>

<svelte:head>
  <title>Projects | The Winux Foundation</title>
  <meta
    name="description"
    content="Interactive project canvas with repository metadata and README previews from the Winux-Core organization."
  />
</svelte:head>

<div class="projects-page">
  <header>
    <a class="back" href={`${base}/`}>← Home</a>
    <h1>Winux-Core Project Blob</h1>
    <p>
      This is a live systems map of Winux-Core repositories. Blob size reflects repository weight (stars, forks,
      and code footprint), and motion is computed on the client with collision handling.
    </p>
    <p>
      Hover to inspect metadata. Click any blob to open an in-page README panel for fast architecture and usage
      context.
    </p>
    {#if status}
      <p class="status">{status}</p>
    {/if}
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </header>

  <section class="legend">
    <span>Blue bias: Windows-leaning names</span>
    <span>Amber bias: Linux-leaning names</span>
    <span>Click blob: load README</span>
  </section>

  <section class="surface" bind:this={surface}>
    <canvas
      bind:this={canvas}
      on:pointermove={handleMove}
      on:pointerleave={handleLeave}
      on:click={handleClick}
      aria-label="Repository blob canvas"
    ></canvas>
    {#if selected}
      <aside class="tooltip">
        <h2>{selected.name}</h2>
        <p>{selected.description || 'No description provided.'}</p>
        <p>
          ★ {selected.stargazers_count} · Forks {selected.forks_count} · Updated{' '}
          {new Date(selected.updated_at).toLocaleDateString()}
        </p>
        <button type="button" on:click={() => selectRepo(selected)}>Load README</button>
        <a href={selected.html_url} target="_blank" rel="noopener noreferrer">Open Repository ↗</a>
      </aside>
    {/if}
  </section>

  <section class="readme panel">
    <h2>README Viewer</h2>
    {#if activeRepo}
      <p class="repo-name">{activeRepo.full_name}</p>
    {/if}
    {#if readmeStatus}
      <p class="status">{readmeStatus}</p>
    {/if}
    {#if readmeError}
      <p class="error">{readmeError}</p>
    {/if}
    {#if readmeHtml}
      <article class="readme-html">{@html readmeHtml}</article>
    {/if}
  </section>

  {#if repos.length}
    <section class="repo-list">
      {#each repos as repo}
        <button type="button" on:click={() => selectRepo(repo)}>{repo.name}</button>
      {/each}
    </section>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: 'Space Grotesk', sans-serif;
    background:
      radial-gradient(circle at 8% 3%, rgba(33, 124, 226, 0.35) 0%, transparent 36%),
      radial-gradient(circle at 88% 95%, rgba(246, 186, 78, 0.23) 0%, transparent 35%),
      linear-gradient(160deg, #090f1c, #070b13 46%, #0a101c);
    color: #e4efff;
  }

  .projects-page {
    width: min(1120px, 94vw);
    margin: 2rem auto;
    display: grid;
    gap: 1rem;
  }

  header,
  .panel {
    border: 1px solid rgba(138, 180, 255, 0.26);
    border-radius: 1rem;
    background: linear-gradient(170deg, rgba(8, 18, 37, 0.75), rgba(9, 14, 24, 0.86));
    padding: 1rem 1.2rem;
  }

  h1 {
    margin: 0.35rem 0 0.3rem;
    font-size: clamp(1.55rem, 4vw, 2.35rem);
  }

  h2 {
    margin: 0;
    font-size: 1.08rem;
  }

  p {
    margin: 0.45rem 0 0;
    color: #c9dcf8;
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

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .legend span {
    border: 1px solid rgba(144, 180, 246, 0.25);
    border-radius: 999px;
    background: rgba(8, 14, 26, 0.72);
    padding: 0.35rem 0.7rem;
    font-size: 0.8rem;
    color: #bfd5f4;
  }

  .surface {
    position: relative;
    border-radius: 1rem;
    border: 1px solid rgba(133, 173, 245, 0.28);
    overflow: hidden;
    min-height: 520px;
    background: rgba(5, 10, 18, 0.82);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.38);
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
    border: 1px solid rgba(171, 209, 255, 0.35);
    border-radius: 0.85rem;
    background: rgba(8, 13, 22, 0.9);
    padding: 0.75rem 0.8rem;
    backdrop-filter: blur(8px);
    display: grid;
    gap: 0.45rem;
  }

  .tooltip p {
    margin: 0;
    font-size: 0.92rem;
  }

  .tooltip button,
  .repo-list button {
    border: 1px solid rgba(127, 176, 248, 0.44);
    border-radius: 0.6rem;
    padding: 0.42rem 0.7rem;
    background: rgba(20, 94, 184, 0.26);
    color: #e7f3ff;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.78rem;
    text-align: left;
  }

  .tooltip button:hover,
  .repo-list button:hover {
    border-color: rgba(176, 214, 255, 0.68);
  }

  .tooltip a {
    color: #b5e2ff;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.79rem;
  }

  .repo-name {
    font-family: 'IBM Plex Mono', monospace;
    color: #cde6ff;
    margin-top: 0.5rem;
  }

  .readme-html {
    margin: 0.75rem 0 0;
    max-height: 480px;
    overflow: auto;
    padding: 0.85rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(142, 178, 242, 0.28);
    background: rgba(6, 10, 18, 0.84);
    color: #d4e6ff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.82rem;
    line-height: 1.5;
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

  .repo-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.55rem;
  }

  @media (max-width: 760px) {
    .projects-page {
      margin: 1rem auto 1.2rem;
    }

    header,
    .panel {
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
  }
</style>
