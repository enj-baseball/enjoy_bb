(() => {
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector(".nav-links");
  const result = document.getElementById("copyResult");

  menuButton?.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
      if (menuButton) {
        menuButton.setAttribute("aria-label", "メニューを開く");
        menuButton.textContent = "☰";
      }
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  document.getElementById("sharePage")?.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "イコノイジョイ野球部（仮）",
          text: "推しも、野球も、どっちも楽しむ。東京・千葉メインのエンジョイ野球コミュニティ。",
          url: location.href
        });
        result.textContent = "";
      } catch (error) {
        if (error?.name !== "AbortError") result.textContent = "共有できませんでした。";
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(location.href);
      result.textContent = "ページURLをクリップボードにコピーしました。";
    } catch {
      result.textContent = "共有機能を利用できませんでした。";
    }
  });
})();