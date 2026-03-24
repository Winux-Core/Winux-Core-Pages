import { h as head, a as attr, e as escape_html, b as ensure_array_like, c as attr_class, d as clsx } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import MarkdownIt from "markdown-it";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let languageStats, filteredRepos, visibleRepoCount, totalStars, totalForks, filteredStars, filteredForks, spotlightRepo, quickList;
    const compactNumber = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
    const fullNumber = new Intl.NumberFormat("en-US");
    const flagshipProjects = [
      {
        name: "Winux PTree",
        status: "Shipping",
        statement: "Filesystem indexer with tree-style CLI integration.",
        detail: "Presented as the fastest open-source Windows indexer tool, with reported indexing speeds below 100 microseconds."
      },
      {
        name: "Winux Termix",
        status: "In development",
        statement: "Hackable terminal environment with fakeroot abilities plus Lua, WASM, and Rust bindings.",
        detail: "Tauri-backed browser virtualization and CSS-driven environments are core to the vision, but the product is still early."
      },
      {
        name: "Winux One Bit LLM",
        status: "Coming soon",
        statement: "Codename Unum. Non-ternary single-bit LLM work with layer-based arithmetic semantics.",
        detail: "Framed as a market-grade custom inference and training engine built for ROCm."
      }
    ];
    const operatingFacts = [
      {
        title: "Audience",
        body: "This org is building for developers and sysadmins, not general consumer software buyers."
      },
      {
        title: "Platform priority",
        body: "Windows and Linux are the main line. macOS and BSD matter, but they are not the current center of gravity."
      },
      {
        title: "Next action",
        body: "Browse projects, inspect repos, load READMEs, and decide whether to follow or contribute."
      }
    ];
    let status = "Loading repositories from GitHub...";
    let repos = [];
    let query = "";
    let activeFilter = "all";
    let readmeStatus = "Select a repository blob to load its README.";
    new MarkdownIt({ html: false, linkify: true, breaks: true });
    const repoLanguage = (repo) => repo.language || "Unspecified";
    const formatCompact = (value) => compactNumber.format(value || 0);
    const formatFull = (value) => fullNumber.format(value || 0);
    function matchesQuery(repo, value) {
      const normalized = value.trim().toLowerCase();
      if (!normalized) {
        return true;
      }
      return [
        repo.name,
        repo.description,
        repoLanguage(repo),
        repo.topics?.join(" ")
      ].filter(Boolean).some((field) => field.toLowerCase().includes(normalized));
    }
    function buildLanguageStats(items) {
      const counts = /* @__PURE__ */ new Map();
      for (const repo of items) {
        const label = repoLanguage(repo);
        counts.set(label, (counts.get(label) || 0) + 1);
      }
      return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 6).map(([label, count]) => ({ label, count }));
    }
    languageStats = buildLanguageStats(repos);
    filteredRepos = repos.filter((repo) => matchesQuery(repo, query));
    visibleRepoCount = filteredRepos.length;
    totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    filteredStars = filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    filteredForks = filteredRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
    spotlightRepo = filteredRepos[0] || null;
    quickList = filteredRepos.slice(0, 12);
    head("rqn88j", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Projects | The Winux Foundation</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Interactive project canvas with repository metadata, flagship program context, and README previews from the Winux-Core organization."/>`);
    });
    $$renderer2.push(`<div class="projects-page svelte-rqn88j"><header class="hero panel svelte-rqn88j"><div class="hero-top svelte-rqn88j"><a class="back svelte-rqn88j"${attr("href", `${base}/`)}>← Home</a> <span class="live-tag svelte-rqn88j">Live GitHub canvas</span></div> <div class="hero-grid svelte-rqn88j"><div class="hero-copy"><p class="hero-kicker svelte-rqn88j">Project surface for a cross-platform systems org</p> <h1 class="svelte-rqn88j">Winux-Core Project Blob</h1> <p class="svelte-rqn88j">This page exists to make the org feel inspectable. Browse the repositories, load READMEs in-place, and
          understand where the real weight of the foundation currently sits.</p> <p class="svelte-rqn88j">The center of gravity is cross-platform systems work for developers and sysadmins. PTree is shipping,
          Termix is still forming, and Unum is the next major research-grade track.</p> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="status svelte-rqn88j">${escape_html(status)}</p>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="metric-grid svelte-rqn88j"><article class="svelte-rqn88j"><span class="svelte-rqn88j">Repositories</span> <strong class="svelte-rqn88j">${escape_html(formatFull(repos.length))}</strong> <p class="svelte-rqn88j">${escape_html(formatFull(visibleRepoCount))} currently visible</p></article> <article class="svelte-rqn88j"><span class="svelte-rqn88j">Stars</span> <strong class="svelte-rqn88j">${escape_html(formatCompact(totalStars))}</strong> <p class="svelte-rqn88j">${escape_html(formatCompact(filteredStars))} in current slice</p></article> <article class="svelte-rqn88j"><span class="svelte-rqn88j">Forks</span> <strong class="svelte-rqn88j">${escape_html(formatCompact(totalForks))}</strong> <p class="svelte-rqn88j">${escape_html(formatCompact(filteredForks))} in current slice</p></article></div></div> <aside class="spotlight-card svelte-rqn88j"><p class="panel-label svelte-rqn88j">Founder note</p> <h2 class="svelte-rqn88j">Build what you wish existed</h2> <blockquote class="svelte-rqn88j">“Strive to be the greatness you wish to see in technology, and only then are you a developer.”</blockquote> <p class="svelte-rqn88j">This is currently a one-person effort. The ask right now is not funding. It is attention from people who
          care about systems quality, contribution, and clear technical direction.</p></aside></div></header> <section class="brief-grid svelte-rqn88j"><section class="panel brief-panel svelte-rqn88j"><div class="section-heading svelte-rqn88j"><p class="panel-label svelte-rqn88j">Flagship Program</p> <h2 class="svelte-rqn88j">What the organization is actually building</h2></div> <div class="flagship-grid svelte-rqn88j"><!--[-->`);
    const each_array = ensure_array_like(flagshipProjects);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let project = each_array[$$index];
      $$renderer2.push(`<article class="flagship-card svelte-rqn88j"><div class="flagship-top svelte-rqn88j"><h3 class="svelte-rqn88j">${escape_html(project.name)}</h3> <span class="status-pill svelte-rqn88j">${escape_html(project.status)}</span></div> <p class="svelte-rqn88j">${escape_html(project.statement)}</p> <p class="svelte-rqn88j">${escape_html(project.detail)}</p></article>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="panel brief-panel svelte-rqn88j"><div class="section-heading svelte-rqn88j"><p class="panel-label svelte-rqn88j">Operating Facts</p> <h2 class="svelte-rqn88j">How to read this organization</h2></div> <div class="facts-list svelte-rqn88j"><!--[-->`);
    const each_array_1 = ensure_array_like(operatingFacts);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let fact = each_array_1[$$index_1];
      $$renderer2.push(`<article class="fact-card svelte-rqn88j"><h3 class="svelte-rqn88j">${escape_html(fact.title)}</h3> <p class="svelte-rqn88j">${escape_html(fact.body)}</p></article>`);
    }
    $$renderer2.push(`<!--]--></div></section></section> <section class="controls panel svelte-rqn88j"><div class="search-wrap svelte-rqn88j"><label for="repo-search" class="svelte-rqn88j">Search repositories</label> <input id="repo-search"${attr("value", query)} type="search" placeholder="Search by name, description, topic, or language" class="svelte-rqn88j"/></div> <div class="filter-wrap svelte-rqn88j"><p class="panel-label svelte-rqn88j">Language focus</p> <div class="filter-row svelte-rqn88j"><button type="button"${attr_class(clsx("filter-pill active"), "svelte-rqn88j")}>All repos</button> <!--[-->`);
    const each_array_2 = ensure_array_like(languageStats);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let stat = each_array_2[$$index_2];
      $$renderer2.push(`<button type="button"${attr_class(clsx(activeFilter === stat.label ? "filter-pill active" : "filter-pill"), "svelte-rqn88j")}>${escape_html(stat.label)} · ${escape_html(stat.count)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="workspace-grid svelte-rqn88j"><div class="panel surface-panel svelte-rqn88j"><div class="surface-header svelte-rqn88j"><div><p class="panel-label svelte-rqn88j">Canvas</p> <h2 class="svelte-rqn88j">Repository motion field</h2></div> <div class="legend svelte-rqn88j"><span class="svelte-rqn88j">Blue bias: Windows-leaning names</span> <span class="svelte-rqn88j">Amber bias: Linux-leaning names</span> <span class="svelte-rqn88j">Click any blob to pin and inspect</span></div></div> <section class="surface svelte-rqn88j"><canvas aria-label="Repository blob canvas" class="svelte-rqn88j"></canvas> `);
    if (!filteredRepos.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty-state svelte-rqn88j"><h3 class="svelte-rqn88j">No repositories match the current filter</h3> <p class="svelte-rqn88j">Clear the search or switch the language focus to repopulate the canvas.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section></div> <aside class="panel inspector svelte-rqn88j"><div class="inspector-head svelte-rqn88j"><p class="panel-label svelte-rqn88j">Inspector</p> <h2 class="svelte-rqn88j">${escape_html(spotlightRepo ? spotlightRepo.full_name : "Choose a repository")}</h2></div> `);
    if (spotlightRepo) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="svelte-rqn88j">${escape_html(spotlightRepo.description || "No description provided.")}</p> <div class="inspector-meta svelte-rqn88j"><span class="svelte-rqn88j">${escape_html(repoLanguage(spotlightRepo))}</span> <span class="svelte-rqn88j">${escape_html(formatFull(spotlightRepo.open_issues_count))} open issues</span> <span class="svelte-rqn88j">${escape_html(formatCompact(spotlightRepo.size))} KB</span></div> <div class="inspector-actions svelte-rqn88j"><button type="button" class="svelte-rqn88j">Load README</button> <a${attr("href", spotlightRepo.html_url)} target="_blank" rel="noopener noreferrer" class="svelte-rqn88j">Repository ↗</a></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="svelte-rqn88j">Use the canvas, search, or filter controls to choose a repository.</p>`);
    }
    $$renderer2.push(`<!--]--> <div class="quick-list svelte-rqn88j"><div class="quick-list-head svelte-rqn88j"><p class="panel-label svelte-rqn88j">Quick picks</p> <span class="svelte-rqn88j">${escape_html(formatFull(visibleRepoCount))} visible</span></div> <!--[-->`);
    const each_array_3 = ensure_array_like(quickList);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let repo = each_array_3[$$index_3];
      $$renderer2.push(`<button type="button" class="quick-item svelte-rqn88j"><strong class="svelte-rqn88j">${escape_html(repo.name)}</strong> <span class="svelte-rqn88j">${escape_html(repoLanguage(repo))} · ★ ${escape_html(formatFull(repo.stargazers_count))}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></aside></section> <section class="readme panel svelte-rqn88j"><div class="readme-head svelte-rqn88j"><div><p class="panel-label svelte-rqn88j">README Viewer</p> <h2 class="svelte-rqn88j">In-page architecture context</h2></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="status svelte-rqn88j">${escape_html(readmeStatus)}</p>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="readme-placeholder svelte-rqn88j"><h3 class="svelte-rqn88j">README not loaded yet</h3> <p class="svelte-rqn88j">Select any repository from the canvas or quick list to pull its README into this page.</p></div>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
