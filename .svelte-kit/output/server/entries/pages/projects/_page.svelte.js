import { h as head, a as attr, e as escape_html, b as ensure_array_like } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import MarkdownIt from "markdown-it";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let status = "Loading repositories from GitHub...";
    let repos = [];
    let readmeStatus = "Select a repository blob to load its README.";
    new MarkdownIt({ html: false, linkify: true, breaks: true });
    head("rqn88j", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Projects | The Winux Foundation</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Interactive project canvas with repository metadata and README previews from the Winux-Core organization."/>`);
    });
    $$renderer2.push(`<div class="projects-page svelte-rqn88j"><header class="svelte-rqn88j"><a class="back svelte-rqn88j"${attr("href", `${base}/`)}>← Home</a> <h1 class="svelte-rqn88j">Winux-Core Project Blob</h1> <p class="svelte-rqn88j">This is a live systems map of Winux-Core repositories. Blob size reflects repository weight (stars, forks,
      and code footprint), and motion is computed on the client with collision handling.</p> <p class="svelte-rqn88j">Hover to inspect metadata. Click any blob to open an in-page README panel for fast architecture and usage
      context.</p> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="status svelte-rqn88j">${escape_html(status)}</p>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header> <section class="legend svelte-rqn88j"><span class="svelte-rqn88j">Blue bias: Windows-leaning names</span> <span class="svelte-rqn88j">Amber bias: Linux-leaning names</span> <span class="svelte-rqn88j">Click blob: load README</span></section> <section class="surface svelte-rqn88j"><canvas aria-label="Repository blob canvas" class="svelte-rqn88j"></canvas> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section> <section class="readme panel svelte-rqn88j"><h2 class="svelte-rqn88j">README Viewer</h2> `);
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
    }
    $$renderer2.push(`<!--]--></section> `);
    if (repos.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="repo-list svelte-rqn88j"><!--[-->`);
      const each_array = ensure_array_like(repos);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let repo = each_array[$$index];
        $$renderer2.push(`<button type="button" class="svelte-rqn88j">${escape_html(repo.name)}</button>`);
      }
      $$renderer2.push(`<!--]--></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
