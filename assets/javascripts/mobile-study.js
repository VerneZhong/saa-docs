(() => {
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

  const rememberPosition = () => {
    const key = `saa-scroll:${location.pathname}`;
    const saved = Number(sessionStorage.getItem(key) || 0);
    if (saved > 0 && window.scrollY < 10) window.scrollTo(0, saved);
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(key, String(window.scrollY));
        ticking = false;
      });
    }, { passive: true });
  };

  const run = () => {
    enhanceQuiz();
    rememberPosition();
  };

  document.addEventListener("DOMContentLoaded", run);
  if (typeof document$ !== "undefined") document$.subscribe(enhanceQuiz);
})();
