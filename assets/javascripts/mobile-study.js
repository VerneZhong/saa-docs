(() => {
  const state = {
    pageKey: "",
    ticking: false,
    controls: null,
    progress: null,
    progressText: null,
    toc: null,
    tocList: null,
  };

  const enhanceQuiz = () => {
    if (!decodeURI(location.pathname).includes("05-模拟题")) return;
    document.querySelectorAll("article h2").forEach((heading) => {
      if (!/^\d+\./.test(heading.textContent.trim()) || heading.dataset.enhanced) return;
      let node = heading.nextElementSibling;
      while (node && node.tagName !== "H2") {
        const answer = node.querySelector?.("strong");
        if (answer?.textContent.trim().startsWith("答案：")) {
          const details = document.createElement("details");
          details.className = "quiz-answer";
          const summary = document.createElement("summary");
          summary.textContent = "查看答案与解析";
          details.appendChild(summary);
          node.before(details);
          while (node && node.tagName !== "H2" && node.tagName !== "HR") {
            const next = node.nextElementSibling;
            details.appendChild(node);
            node = next;
          }
          heading.dataset.enhanced = "true";
          break;
        }
        node = node.nextElementSibling;
      }
    });
  };

  const closeToc = () => {
    state.toc?.classList.remove("is-open");
    state.controls?.querySelector("[data-action='toc']")?.setAttribute("aria-expanded", "false");
  };

  const ensureReadingUi = () => {
    if (!state.progress) {
      const track = document.createElement("div");
      track.className = "reading-progress";
      track.setAttribute("aria-hidden", "true");
      const bar = document.createElement("div");
      bar.className = "reading-progress__bar";
      track.appendChild(bar);
      document.body.appendChild(track);
      state.progress = bar;
    }

    if (!state.controls) {
      const controls = document.createElement("nav");
      controls.className = "reading-controls";
      controls.setAttribute("aria-label", "阅读快捷操作");
      controls.innerHTML = `
        <button type="button" data-action="toc" aria-expanded="false" aria-label="打开本页目录">目录</button>
        <button type="button" data-action="top" aria-label="回到顶部">↑</button>
        <button type="button" data-action="bottom" aria-label="快速到底部">↓</button>
        <span class="reading-controls__percent" aria-label="阅读进度">0%</span>
      `;
      controls.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        const action = button?.dataset.action;
        if (action === "top") window.scrollTo({ top: 0, behavior: "smooth" });
        if (action === "bottom") window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
        if (action === "toc") {
          const opening = !state.toc.classList.contains("is-open");
          state.toc.classList.toggle("is-open", opening);
          button.setAttribute("aria-expanded", String(opening));
        }
      });
      document.body.appendChild(controls);
      state.controls = controls;
      state.progressText = controls.querySelector(".reading-controls__percent");
    }

    if (!state.toc) {
      const toc = document.createElement("div");
      toc.className = "reading-toc";
      toc.innerHTML = `
        <button class="reading-toc__backdrop" type="button" aria-label="关闭目录"></button>
        <section class="reading-toc__sheet" role="dialog" aria-modal="true" aria-label="本页目录">
          <header><strong>本页目录</strong><button type="button" aria-label="关闭目录">×</button></header>
          <ol></ol>
        </section>
      `;
      toc.querySelector(".reading-toc__backdrop").addEventListener("click", closeToc);
      toc.querySelector("header button").addEventListener("click", closeToc);
      toc.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link) return;
        event.preventDefault();
        document.getElementById(link.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${encodeURIComponent(link.dataset.target)}`);
        closeToc();
      });
      document.body.appendChild(toc);
      state.toc = toc;
      state.tocList = toc.querySelector("ol");
    }
  };

  const rebuildToc = () => {
    const headings = [...document.querySelectorAll("article h2[id], article h3[id]")];
    state.tocList.replaceChildren(...headings.map((heading) => {
      const item = document.createElement("li");
      item.className = heading.tagName === "H3" ? "is-level-3" : "is-level-2";
      const link = document.createElement("a");
      link.href = `#${encodeURIComponent(heading.id)}`;
      link.dataset.target = heading.id;
      link.textContent = heading.textContent.replace(/¶$/, "").trim();
      item.appendChild(link);
      return item;
    }));
    state.controls.querySelector("[data-action='toc']").hidden = headings.length === 0;
  };

  const updateReadingState = () => {
    const scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = scrollable === 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / scrollable));
    const percent = Math.round(progress * 100);
    state.progress.style.transform = `scaleX(${progress})`;
    state.progressText.textContent = `${percent}%`;
    state.controls.classList.toggle("is-hidden", scrollable < window.innerHeight * 0.75);
    if (state.pageKey) localStorage.setItem(state.pageKey, String(Math.round(window.scrollY)));
  };

  const onScroll = () => {
    if (state.ticking) return;
    state.ticking = true;
    requestAnimationFrame(() => {
      updateReadingState();
      state.ticking = false;
    });
  };

  const restorePosition = () => {
    state.pageKey = `saa-scroll:${location.pathname}`;
    if (location.hash) return updateReadingState();
    const saved = Number(localStorage.getItem(state.pageKey) || 0);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (saved > 0 && window.scrollY < 10) window.scrollTo(0, saved);
      updateReadingState();
    }));
  };

  const initializePage = () => {
    ensureReadingUi();
    closeToc();
    enhanceQuiz();
    rebuildToc();
    restorePosition();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeToc();
  });
  document.addEventListener("DOMContentLoaded", initializePage);
  if (typeof document$ !== "undefined") document$.subscribe(initializePage);
})();
