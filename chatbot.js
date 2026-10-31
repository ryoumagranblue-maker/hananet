/* 花ネット：API料金不要のシナリオ型デモチャットボット（Supabase・新仕様対応版） */
(() => {
  "use strict";

  const boot = () => {
    if (document.getElementById("hn-chat-widget")) return;
    if (typeof PRODUCTS === "undefined" || typeof renderProducts !== "function" ||
        typeof renderCart !== "function" || typeof cart === "undefined") {
      console.warn("花ネットチャット：app.js の読み込み後に配置してください。");
      return;
    }

    const root = document.createElement("div");
    root.id = "hn-chat-widget";
    root.innerHTML = `
      <button class="hn-chat-launcher" type="button" aria-label="花ネットチャットを開く" aria-expanded="false">
        <span class="hn-chat-launcher-icon" aria-hidden="true">✿</span>
        <span>商品選びをお手伝い</span>
      </button>
      <section class="hn-chat-panel" aria-label="花ネット商品案内チャット" hidden>
        <header class="hn-chat-header">
          <div><strong>花ネット商品案内</strong><small>シナリオ型デモ｜自動応答</small></div>
          <button class="hn-chat-close" type="button" aria-label="チャットを閉じる">×</button>
        </header>
        <div class="hn-chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
        <div class="hn-chat-quick">
          <button type="button" data-prompt="バラを探して">🌹 バラを探す</button>
          <button type="button" data-prompt="安い商品を探して">🏷️ 特価品</button>
          <button type="button" data-prompt="送料を教えて">🚚 送料</button>
          <button type="button" data-prompt="カートを見せて">🛒 カート</button>
        </div>
        <form class="hn-chat-form">
          <label class="hn-sr-only" for="hn-chat-input">質問を入力</label>
          <input id="hn-chat-input" type="text" maxlength="160" autocomplete="off" placeholder="例：ピンクの花を探して">
          <button type="submit">送信</button>
        </form>
        <p class="hn-chat-disclaimer">自動応答のデモです。</p>
      </section>`;
    document.body.appendChild(root);

    const launcher = root.querySelector(".hn-chat-launcher");
    const panel = root.querySelector(".hn-chat-panel");
    const close = root.querySelector(".hn-chat-close");
    const messages = root.querySelector(".hn-chat-messages");
    const form = root.querySelector(".hn-chat-form");
    const input = root.querySelector("#hn-chat-input");

    const yen = value => `${Math.round(value).toLocaleString("ja-JP")}円`;
    const norm = value => String(value || "").toLowerCase().replace(/\s+/g, "");
    
    const say = (text, who = "bot") => {
      const bubble = document.createElement("div");
      bubble.className = `hn-chat-bubble hn-chat-${who}`;
      bubble.textContent = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
      return bubble;
    };

    const actionButton = (container, label, action) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hn-chat-action";
      button.textContent = label;
      button.addEventListener("click", action);
      container.appendChild(button);
      return button;
    };

    const productMatches = query => {
      const q = norm(query);
      const words = q.replace(/(商品|探して|探す|見せて|見たい|おすすめ|ありますか|ください|を|が|は|の|安い|安価|特価|商品一覧|検索|買いたい|カートに入れて|入れて)/g, "");
      const tokens = [];
      if (/バラ|ばら|rose/.test(q)) tokens.push("rose", "バラ");
      if (/ガーベラ/.test(q)) tokens.push("ガーベラ");
      if (/菊|きく|キク/.test(q)) tokens.push("菊");
      if (/カーネーション/.test(q)) tokens.push("カーネーション");
      if (/胡蝶蘭|こちょうらん/.test(q)) tokens.push("胡蝶蘭");
      if (/観葉|グリーン|植物/.test(q)) tokens.push("観葉植物", "植物");
      if (/鉢|アンスリューム/.test(q)) tokens.push("鉢", "アンスリューム");
      if (/ピンク/.test(q)) tokens.push("ピンク");
      if (/白|ホワイト/.test(q)) tokens.push("白");
      if (/黄色|黄|イエロー/.test(q)) tokens.push("黄", "黄色");
      if (/オレンジ/.test(q)) tokens.push("オレンジ");
      if (/赤|レッド/.test(q)) tokens.push("赤");
      if (/切り花|切花/.test(q)) tokens.push("切り花", "切花");
      
      if (/特価|安い|安価|奉仕|お得/.test(q)) {
        const cheap = [...PRODUCTS].sort((a,b)=>a.price-b.price).slice(0,4);
        return cheap;
      }
      if (tokens.length) {
        return PRODUCTS.filter(p => {
          const haystack = norm([p.name, p.sku, p.categoryName, p.color, p.description, p.category].join(" "));
          return tokens.some(token => haystack.includes(norm(token)));
        }).slice(0,5);
      }
      if (words.length >= 2) {
        return PRODUCTS.filter(p => norm([p.name, p.sku, p.categoryName, p.color, p.description].join(" ")).includes(words)).slice(0,5);
      }
      return [];
    };

    const showProducts = (items, title = "こちらの商品が見つかりました。") => {
      const bubble = say(title);
      if (!items.length) {
        say("該当する商品を特定できませんでした。商品名・色・分類を変えてお試しください。");
        actionButton(messages.lastElementChild, "商品一覧を開く", () => {
          document.getElementById("products")?.scrollIntoView({behavior:"smooth"});
        });
        return;
      }
      items.forEach(product => {
        const card = document.createElement("div");
        card.className = "hn-chat-product";
        const name = document.createElement("strong");
        name.textContent = product.name;
        const meta = document.createElement("span");
        meta.textContent = `${product.categoryName || product.category} · ${product.unit || '個'}`;
        const price = document.createElement("b");
        price.textContent = `${yen(product.price)}（税別）`;
        card.append(name, meta, price);
        
        actionButton(card, "商品一覧で見る", () => {
          const search = document.getElementById("search");
          if (search) search.value = product.name;
          if (typeof category !== "undefined") category = "all";
          const label = document.getElementById("category-label");
          if (label) label.textContent = "すべての商品";
          renderProducts();
          document.getElementById("products")?.scrollIntoView({behavior:"smooth"});
          panel.hidden = true;
          launcher.setAttribute("aria-expanded", "false");
        });

        actionButton(card, "カートに追加", () => {
          cart[product.id] = (cart[product.id] || 0) + 1;
          renderCart();
          const toast = document.getElementById("toast");
          if (toast) {
            toast.textContent = `${product.name} を1点カートに追加しました`;
            toast.classList.add("show");
            window.setTimeout(() => toast.classList.remove("show"), 2200);
          }
          say(`${product.name}を1点カートに追加しました。`);
        });

        bubble.appendChild(card);
      });
    };

    const showCart = () => {
      const entries = Object.entries(cart).map(([id, qty]) => ({
        product: PRODUCTS.find(p => String(p.id) === String(id)), qty
      })).filter(item => item.product);

      if (!entries.length) {
        say("カートは空です。商品を探すか、商品一覧から「カートに入れる」を押してください。");
      } else {
        say("現在のカート内容です。");
        entries.forEach(({product, qty}) => say(`${product.name} × ${qty}：${yen(product.price * qty)}（税別）`));
        const bubble = say("送料・税込の合計は、ページ下部のカートで確認できます。");
        actionButton(bubble, "カートを開く", () => {
          document.getElementById("cart")?.scrollIntoView({behavior:"smooth"});
          panel.hidden = true;
          launcher.setAttribute("aria-expanded", "false");
        });
      }
    };

    const respond = raw => {
      const q = norm(raw);
      if (!q) return;
      say(raw, "user");

      if (/カート|買い物かご/.test(q)) { showCart(); return; }
      if (/送料|配送|クール|常温|発送/.test(q)) {
        say("送料は梱包数・配送方法・地域で変わります。本州・四国・九州は常温1,300円／クール1,900円、北海道は3,000円／3,600円、沖縄は4,200円／4,800円（税抜）です。");
        actionButton(messages.lastElementChild, "送料計算・カートを開く", () => {
          document.getElementById("cart")?.scrollIntoView({behavior:"smooth"});
          panel.hidden = true;
          launcher.setAttribute("aria-expanded", "false");
        });
        return;
      }
      if (/会員|ログイン|登録|パスワード/.test(q)) {
        say("上部の「無料会員登録」や「ログイン」から、マイページの利用やお気に入り登録が可能です！");
        return;
      }
      if (/注文|決済|支払|購入手続き/.test(q)) {
        say("商品をカートに入れ、ページ下部の「注文内容を確認」で仮計算や送料の確認ができます。");
        actionButton(messages.lastElementChild, "カート・注文確認を開く", () => {
          document.getElementById("cart")?.scrollIntoView({behavior:"smooth"});
          panel.hidden = true;
          launcher.setAttribute("aria-expanded", "false");
        });
        return;
      }

      const products = productMatches(raw);
      if (products.length) {
        showProducts(products, /特価|安い|安価|奉仕|お得/.test(q) ? "価格の低い商品をピックアップしました。" : "条件に近い商品はこちらです。");
        return;
      }
      say("商品名・花の色・分類で検索できます。たとえば「バラ」「ピンクの花」「ガーベラ」「特価品」「送料」「カート」と入力してください。");
    };

    const openPanel = () => {
      panel.hidden = false;
      launcher.setAttribute("aria-expanded", "true");
      input.focus();
      if (!messages.childElementCount) {
        say("こんにちは、花ネット商品案内です。商品探しやカート操作をお手伝いします。下のボタンからも選べます。");
      }
    };

    launcher.addEventListener("click", () => panel.hidden ? openPanel() : (panel.hidden = true, launcher.setAttribute("aria-expanded", "false")));
    close.addEventListener("click", () => {
      panel.hidden = true;
      launcher.setAttribute("aria-expanded", "false");
      launcher.focus();
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      input.value = "";
      respond(value);
    });
    root.querySelectorAll("[data-prompt]").forEach(button => button.addEventListener("click", () => respond(button.dataset.prompt)));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !panel.hidden) {
        panel.hidden = true;
        launcher.setAttribute("aria-expanded", "false");
        launcher.focus();
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
