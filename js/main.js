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

  const summaryText = [
    "【イコノイジョイ野球部（仮）】",
    "・=LOVE / ≠ME / ≒JOYが好きな方",
    "・18歳以上（高校生不可）",
    "・初心者 / ブランクあり歓迎",
    "・超エンジョイ志向、ヤジ厳禁",
    "・東京 / 千葉メイン",
    "・月1〜2回程度（土日祝メイン）",
    "・現場優先OK",
    "・グラウンド代などは当日の参加メンバーで実費割り勘",
    "・ポジションは全員で交代しながら楽しみます",
    "・参加希望：https://x.com/dabio_next115?s=20",
    location.href
  ].join("\n");

  document.getElementById("copySummary")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      result.textContent = "募集要項をクリップボードにコピーしました。";
    } catch {
      result.textContent = "コピーできませんでした。ブラウザの権限設定をご確認ください。";
    }
  });

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