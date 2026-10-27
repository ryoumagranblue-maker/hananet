// 初期デフォルト商品データ
const defaultProducts = [
  {id: 1, name: "奉仕品ピンポン菊 1ロット10本 白", sku: "K011", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 1600, unit: "ロット（10本）", pricePerStem: 160, usual: 180, color: "白", description: "奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。", image: "https://web.archive.org/web/20230929235936im_/http://hananet.jp/image/product/100073.jpg"},
  {id: 2, name: "奉仕品ピンポン菊 1ロット10本 黄色", sku: "K010", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 1600, unit: "ロット（10本）", pricePerStem: 160, usual: 180, color: "黄色", description: "奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。", image: "https://web.archive.org/web/20230929230527im_/http://hananet.jp/image/product/100205.jpg"},
  {id: 3, name: "特価品ガーベラ 1ロット20本 色おまかせ", sku: "K131", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 2000, unit: "ロット（20本）", pricePerStem: 100, usual: 110, color: "色おまかせ", description: "色おまかせ。1ロット20本。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100131.jpg"},
  {id: 4, name: "特価品ガーベラ 1ロット10本", sku: "K110", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 1000, unit: "ロット（10本）", pricePerStem: 100, usual: 110, color: "白・黄・ピンク・オレンジ・赤", description: "色を選ぶ切り花特価品。1ロット10本。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100110.jpg"},
  {id: 5, name: "スプレーカーネーション 1ロット25本", sku: "K179", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 5000, unit: "ロット（25本）", pricePerStem: 200, usual: null, color: "黄・ピンク・白・オレンジ・赤", description: "長さ50cm程度。色の希望はお問い合わせください。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100179.jpg"},
  {id: 6, name: "カーネーション 1ロット50本 色おまかせMix", sku: "K135", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 9500, unit: "ロット（50本）", pricePerStem: 190, usual: null, color: "色おまかせMix", description: "切り花のまとめ買い向け商品。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100135.jpg"},
  {id: 7, name: "カーネーション 1ロット25本", sku: "K025", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 5000, unit: "ロット（25本）", pricePerStem: 200, usual: null, color: "ピンク・黄色・白", description: "色を選べる切り花。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100025.jpg"},
  {id: 8, name: "バラ 1ロット30本", sku: "K003", category: "rose", categoryName: "バラの花束", price: 3900, unit: "ロット（30本）", pricePerStem: 130, usual: null, color: "ピンク・黄色・オレンジ・白", description: "複数色から選べるバラ。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/rose.jpg"},
  {id: 9, name: "アンスリューム", sku: "A3500", category: "pot", categoryName: "鉢花・鉢植え", price: 3500, unit: "商品", pricePerStem: null, usual: null, color: "入荷時期による", description: "新入荷情報の鉢花商品。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
  {id: 10, name: "胡蝶蘭", sku: "ORCHID", category: "orchid", categoryName: "胡蝶蘭", price: 8800, unit: "鉢", pricePerStem: null, usual: null, color: "白など", description: "胡蝶蘭カテゴリ商品。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
  {id: 11, name: "観葉植物", sku: "GREEN", category: "green", categoryName: "観葉植物", price: 2800, unit: "商品", pricePerStem: null, usual: null, color: "商品による", description: "観葉植物カテゴリ商品。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
  {id: 12, name: "お供え・弔事アレンジ", sku: "COND", category: "condolence", categoryName: "お供え・弔事", price: 3500, unit: "個", pricePerStem: null, usual: null, color: "白・淡色系", description: "お供え・弔事カテゴリ商品。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"}
];

let PRODUCTS = JSON.parse(localStorage.getItem('hananet_products') || 'null') || defaultProducts;
const rates = {mainland:{ambient:1300,cool:1900},hokkaido:{ambient:3000,cool:3600},okinawa:{ambient:4200,cool:4800}};
let category = "all", sort = "default", cart = {};

const $ = id => document.getElementById(id), yen = n => Math.round(n).toLocaleString("ja-JP") + "円";
function showToast(msg) {
  const t = $("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

// お気に入りリストの取得・保存
function getFavorites() {
  const user = JSON.parse(localStorage.getItem("hananet_current_user") || "null");
  if (!user) return [];
  const allFavs = JSON.parse(localStorage.getItem("hananet_favorites") || "{}");
  return allFavs[user.userId] || [];
}

function toggleFavorite(productId) {
  const user = JSON.parse(localStorage.getItem("hananet_current_user") || "null");
  if (!user) {
    alert("お気に入り機能を利用するにはログインが必要です。");
    return;
  }
  let allFavs = JSON.parse(localStorage.getItem("hananet_favorites") || "{}");
  let userFavs = allFavs[user.userId] || [];
  
  if (userFavs.includes(productId)) {
    userFavs = userFavs.filter(id => id !== productId);
    showToast("お気に入りから削除しました");
  } else {
    userFavs.push(productId);
    showToast("お気に入りに追加しました ❤");
  }
  allFavs[user.userId] = userFavs;
  localStorage.setItem("hananet_favorites", JSON.stringify(allFavs));
  renderProducts();
  
  // マイページが開いている場合はお気に入り画面を再描画
  const dyn = document.getElementById("mp-dynamic-area");
  if (dyn && dyn.style.display === "block" && dyn.dataset.view === "favorite") {
    showFavoriteView();
  }
}

function filtered() {
  const q = $("search") ? $("search").value.trim().toLowerCase() : "";
  let arr = PRODUCTS.filter(p => (category === "all" || p.category === category) && [p.name, p.sku, p.categoryName, p.color, p.description].join(" ").toLowerCase().includes(q));
  if (sort === "price") arr.sort((a, b) => a.price - b.price);
  if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name, "ja"));
  return arr;
}

function renderProducts() {
  const list = $("product-list");
  if (!list) return;
  const arr = filtered();
  if ($("result-count")) $("result-count").textContent = `${arr.length}件`;
  const favs = getFavorites();

  list.innerHTML = arr.length ? arr.map(p => {
    const isFav = favs.includes(p.id);
    return `<article class="product-row" style="position:relative;">
      <button data-fav="${p.id}" style="position:absolute; top:10px; right:10px; background:${isFav ? '#d96b91' : '#fff'}; color:${isFav ? '#fff' : '#888'}; border:1px solid #ddd; border-radius:50%; width:30px; height:30px; cursor:pointer; font-size:14px;" title="お気に入り">❤</button>
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif'">
      <div>
        <h3>${p.name}</h3>
        <div class="sku">商品番号：${p.sku || 'K-' + p.id} 分類：${p.categoryName || p.category}</div>
        <p>${p.description || ''}</p>
        <p>◇${p.color || 'おまかせ'}</p>
        <div class="price">${yen(p.price)}（税別） <span class="usual">${p.usual ? `通常${p.usual}円/本` : ''}</span></div>
      </div>
      <div class="product-controls">
        <label>数量<select id="qty-${p.id}"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label>
        <button data-add="${p.id}">カートに入れる</button>
        <div>単位：${p.unit || '個'}</div>
      </div>
    </article>`;
  }).join("") : `<p style="padding:15px">該当する商品がありません。</p>`;
}

function lines() { return Object.entries(cart).map(([id, qty]) => ({ p: PRODUCTS.find(p => p.id === +id), qty })).filter(x => x.p); }

function compute() {
  const arr = lines(), subtotal = arr.reduce((s, x) => s + x.p.price * x.qty, 0), pkgs = arr.length ? Math.max(1, Math.min(20, +($("packages") ? $("packages").value : 1) || 1)) : 0;
  const shipping = arr.length ? rates[$("region") ? $("region").value : 'mainland'][$("delivery") ? $("delivery").value : 'ambient'] * pkgs : 0, tax = Math.round((subtotal + shipping) * .1);
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

function renderCart() {
  if (!$("cart-list")) return;
  const arr = lines();
  if ($("top-cart-count")) $("top-cart-count").textContent = arr.reduce((s, x) => s + x.qty, 0);
  $("cart-list").innerHTML = arr.length ? arr.map(({ p, qty }) => `<div class="cart-line"><div><strong>${p.name}</strong><br><small>${p.sku || ''} / ${p.unit || ''}</small></div><label>数量 <input type="number" min="1" max="99" value="${qty}" data-change="${p.id}"></label><strong>${yen(p.price * qty)}</strong><button data-remove="${p.id}">削除</button></div>`).join("") : "カートに商品は入っていません。";
  const t = compute();
  if ($("subtotal")) $("subtotal").textContent = yen(t.subtotal);
  if ($("shipping")) $("shipping").textContent = yen(t.shipping);
  if ($("tax")) $("tax").textContent = yen(t.tax);
  if ($("total")) $("total").textContent = yen(t.total);
}

// ユーザーアクション
document.addEventListener("click", e => {
  const cat = e.target.closest("[data-category]");
  if (cat) {
    e.preventDefault();
    category = cat.dataset.category;
    if ($("category-label")) $("category-label").textContent = cat.textContent;
    renderProducts();
    document.querySelectorAll("[data-category]").forEach(a => a.style.background = "");
    cat.style.background = "#fff4c8";
    return;
  }
  const fav = e.target.closest("[data-fav]");
  if (fav) {
    toggleFavorite(+fav.dataset.fav);
    return;
  }
  const add = e.target.closest("[data-add]");
  if (add) {
    const id = +add.dataset.add;
    // マイページ内のお気に入りから追加された場合に対応するため、id-qty要素がない場合はデフォルト1
    const qtyEl = $(`qty-${id}`) || document.getElementById(`mp-qty-${id}`);
    const qty = qtyEl ? +qtyEl.value : 1;
    cart[id] = (cart[id] || 0) + qty;
    renderCart();
    showToast("カートに追加しました");
    return;
  }
  const rem = e.target.closest("[data-remove]");
  if (rem) { delete cart[+rem.dataset.remove]; renderCart(); return; }
  const s = e.target.closest("[data-sort]");
  if (s) { sort = s.dataset.sort; renderProducts(); }
});

if ($("search-button")) $("search-button").addEventListener("click", renderProducts);
if ($("search")) $("search").addEventListener("keydown", e => { if (e.key === "Enter") renderProducts(); });
if ($("reset-button")) $("reset-button").addEventListener("click", () => { category = "all"; if ($("category-label")) $("category-label").textContent = "すべての商品"; if ($("search")) $("search").value = ""; renderProducts(); });
document.addEventListener("change", e => {
  if (e.target.dataset.change) {
    const id = +e.target.dataset.change, qty = Math.max(1, Math.min(99, +e.target.value || 1));
    cart[id] = qty; renderCart();
  }
});
["region", "delivery", "packages"].forEach(id => { if ($(id)) $(id).addEventListener("change", renderCart); });
if ($("checkout")) $("checkout").addEventListener("click", () => {
  const arr = lines();
  if (!arr.length) { showToast("カートに商品を入れてください"); return; }
  const t = compute();
  alert("【注文内容確認デモ】\n" + arr.map(x => `${x.p.name} × ${x.qty}：${yen(x.p.price * x.qty)}`).join("\n") + `\n\n商品合計：${yen(t.subtotal)}\n送料：${yen(t.shipping)}\n消費税（仮計算）：${yen(t.tax)}\n合計：${yen(t.total)}\n\n注文・決済は実行されていません。`);
});
document.querySelectorAll('a[href="#cart"]').forEach(a => a.addEventListener("click", () => setTimeout(() => { if ($("cart")) $("cart").scrollIntoView({ behavior: "smooth" }); }, 20)));

renderProducts();
renderCart();

// --- マイページの「お気に入り商品一覧」を描画する関数 ---
function showFavoriteView() {
  const dyn = document.getElementById("mp-dynamic-area");
  if (!dyn) return;
  dyn.style.display = "block";
  dyn.dataset.view = "favorite";
  
  const favIds = getFavorites();
  const favProducts = PRODUCTS.filter(p => favIds.includes(p.id));

  if (!favProducts.length) {
    dyn.innerHTML = "<strong>【お気に入りのお花】</strong><br>お気に入り登録された商品はありません。商品カードの ❤ を押すと追加できます。";
    return;
  }

  dyn.innerHTML = `<strong>【お気に入りのお花 (${favProducts.length}件)】</strong><div style="margin-top:10px; display:flex; flex-direction:column; gap:10px;">` + 
    favProducts.map(p => `
      <div style="display:flex; align-items:center; background:#fff; padding:8px; border:1px solid #ddd; border-radius:4px; gap:10px;">
        <img src="${p.image}" style="width:50px; height:50px; object-fit:cover; border-radius:3px;" onerror="this.src='https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif'">
        <div style="flex:1;">
          <div style="font-weight:bold; font-size:12px;">${p.name}</div>
          <div style="color:#b04e5b; font-weight:bold;">${yen(p.price)}（税別）</div>
        </div>
        <div>
          <label style="font-size:11px;">数量<select id="mp-qty-${p.id}" style="margin-left:4px;"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label>
          <button data-add="${p.id}" style="background:#789c55; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer; font-size:11px; margin-left:5px;">カートへ</button>
          <button data-fav="${p.id}" style="background:#d96b91; color:white; border:none; padding:5px 8px; border-radius:3px; cursor:pointer; font-size:11px; margin-left:3px;" title="解除">解除</button>
        </div>
      </div>
    `).join("") + `</div>`;
}

// --- 会員機能・マイページ・認証スクリプト ---
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("auth-modal");
  const modalTitle = document.getElementById("auth-modal-title");
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");
  const formVerify = document.getElementById("form-verify");
  const formMypage = document.getElementById("form-mypage");

  let pendingUser = null;

  function resetAuthForms() {
    ["login-userid", "login-password", "reg-name", "reg-userid", "reg-email", "reg-password", "verify-code"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    ["login-msg", "reg-msg", "verify-msg"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
    const dyn = document.getElementById("mp-dynamic-area");
    if (dyn) { dyn.style.display = "none"; dyn.innerHTML = ""; dyn.removeAttribute("data-view"); }
  }

  function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem("hananet_current_user") || "null");
    const loginNav = document.getElementById("nav-login");
    const regNav = document.getElementById("nav-register");

    if (currentUser) {
      if (loginNav) loginNav.textContent = "マイページ";
      if (regNav) regNav.textContent = currentUser.name + "様";
    } else {
      if (loginNav) loginNav.textContent = "ログイン";
      if (regNav) regNav.textContent = "無料会員登録";
    }
    renderProducts();
  }

  updateAuthUI();

  function openAuthModal(type) {
    if (!modal) return;
    modal.style.display = "flex";
    resetAuthForms();
    const currentUser = JSON.parse(localStorage.getItem("hananet_current_user") || "null");

    if (type === "login") {
      if (currentUser) {
        modalTitle.textContent = "会員様窓口（マイページ）";
        formLogin.style.display = "none";
        formRegister.style.display = "none";
        formVerify.style.display = "none";
        formMypage.style.display = "block";
        document.getElementById("mp-username").textContent = currentUser.name;
        document.getElementById("mp-userid").textContent = currentUser.userId;
        document.getElementById("mp-email").textContent = currentUser.email;
      } else {
        modalTitle.textContent = "ログイン";
        formLogin.style.display = "block";
        formRegister.style.display = "none";
        formVerify.style.display = "none";
        formMypage.style.display = "none";
      }
    } else if (type === "register") {
      if (currentUser) { openAuthModal("login"); return; }
      modalTitle.textContent = "新規会員登録";
      formLogin.style.display = "none";
      formRegister.style.display = "block";
      formVerify.style.display = "none";
      formMypage.style.display = "none";
    }
  }

  document.addEventListener("click", e => {
    if (e.target.id === "nav-login" || e.target.closest("#nav-login")) { e.preventDefault(); openAuthModal("login"); }
    if (e.target.id === "nav-register" || e.target.closest("#nav-register")) { e.preventDefault(); openAuthModal("register"); }
    if (e.target.textContent.includes("ログイン")) { e.preventDefault(); openAuthModal("login"); }
    if (e.target.textContent.includes("無料会員登録")) { e.preventDefault(); openAuthModal("register"); }
  });

  const closeBtn = document.getElementById("btn-close-modal");
  if (closeBtn) closeBtn.addEventListener("click", () => { modal.style.display = "none"; resetAuthForms(); });

  // パスワード長押し表示
  function setupHoldToShow(btnId, inputId) {
    const btn = document.getElementById(btnId), input = document.getElementById(inputId);
    if (!btn || !input) return;
    const show = () => input.type = "text", hide = () => input.type = "password";
    btn.addEventListener("mousedown", show); btn.addEventListener("mouseup", hide); btn.addEventListener("mouseleave", hide);
    btn.addEventListener("touchstart", (e) => { e.preventDefault(); show(); }); btn.addEventListener("touchend", hide);
  }
  setupHoldToShow("btn-show-login-pw", "login-password");
  setupHoldToShow("btn-show-reg-pw", "reg-password");

  function executeLogin() {
    const userId = document.getElementById("login-userid").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const msg = document.getElementById("login-msg");
    let users = JSON.parse(localStorage.getItem("hananet_users") || "[]");
    const found = users.find(u => u.userId === userId && u.password === password);
    if (found) {
      localStorage.setItem("hananet_current_user", JSON.stringify(found));
      alert("ログインしました！");
      modal.style.display = "none"; resetAuthForms(); updateAuthUI();
    } else {
      msg.textContent = "会員IDまたはパスワードが正しくありません。";
    }
  }

  function executeRegister() {
    const name = document.getElementById("reg-name").value.trim();
    const userId = document.getElementById("reg-userid").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const msg = document.getElementById("reg-msg");

    if (!name || !userId || !email || !password) { msg.textContent = "すべての項目を入力してください。"; return; }
    if (!email.includes("@")) { msg.textContent = "有効なメールアドレスを入力してください。"; return; }
    let users = JSON.parse(localStorage.getItem("hananet_users") || "[]");
    if (users.some(u => u.userId === userId)) { msg.textContent = "この会員IDはすでに使用されています。"; return; }

    pendingUser = { name, userId, email, password };
    formRegister.style.display = "none"; formVerify.style.display = "block";
    modalTitle.textContent = "メールアドレス認証";
    alert("【メール認証デモ】\n" + email + " 宛に確認コードを送信しました。\nデモ用確認コード: 1234 を入力してください。");
  }

  function executeVerify() {
    const code = document.getElementById("verify-code").value.trim();
    const verifyMsg = document.getElementById("verify-msg");
    if (code === "1234") {
      let users = JSON.parse(localStorage.getItem("hananet_users") || "[]");
      users.push(pendingUser);
      localStorage.setItem("hananet_users", JSON.stringify(users));
      localStorage.setItem("hananet_current_user", JSON.stringify(pendingUser));
      alert("メール認証が成功し、会員登録が完了しました！");
      modal.style.display = "none"; resetAuthForms(); updateAuthUI(); pendingUser = null;
    } else {
      verifyMsg.textContent = "確認コードが間違っています（デモコードは 1234 です）。";
    }
  }

  if ($("btn-submit-login")) $("btn-submit-login").addEventListener("click", executeLogin);
  if ($("btn-submit-register")) $("btn-submit-register").addEventListener("click", executeRegister);
  if ($("btn-submit-verify")) $("btn-submit-verify").addEventListener("click", executeVerify);

  // エンターキー対応
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && modal && modal.style.display === "flex") {
      if (formLogin.style.display !== "none") { e.preventDefault(); executeLogin(); }
      else if (formRegister.style.display !== "none") { e.preventDefault(); executeRegister(); }
      else if (formVerify.style.display !== "none") { e.preventDefault(); executeVerify(); }
    }
  });

  // マイメニュー操作
 // --- マイメニューの各機能（購入履歴・お気に入り・お届け先・会員情報変更）の完全統合処理 ---
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".mp-menu-btn");
  if (!btn) return;
  const action = btn.dataset.action;
  const dyn = document.getElementById("mp-dynamic-area");
  if (!dyn) return;
  dyn.style.display = "block";
  dyn.removeAttribute("data-view");

  const currentUser = JSON.parse(localStorage.getItem("hananet_current_user") || "null");
  if (!currentUser) return;

  if (action === "history") {
    dyn.innerHTML = `
      <strong>【購入履歴・配送状況】</strong>
      <div style="margin-top:6px; background:#fff; padding:8px; border:1px solid #ddd; border-radius:4px;">
        <p style="margin:0 0 4px; font-weight:bold; color:#5b793f;">注文番号: #HN-2026-1027</p>
        <p style="margin:0; font-size:11px; color:#666;">状態: <span style="color:green; font-weight:bold;">発送準備完了（常温便）</span></p>
        <p style="margin:2px 0 0; font-size:11px; color:#666;">お届け先: 大阪市平野区</p>
      </div>
    `;
  } else if (action === "favorite") {
    showFavoriteView();
  } else if (action === "address") {
    let addresses = JSON.parse(localStorage.getItem(`hananet_addresses_${currentUser.userId}`) || '["大阪市平野区 ご自宅"]');
    dyn.innerHTML = `
      <strong>【お届け先リスト管理】</strong>
      <div style="margin-top:6px;" id="addr-list-container">
        ${addresses.map((addr, idx) => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:6px 8px; border:1px solid #ddd; border-radius:3px; margin-bottom:4px; font-size:11px;">
            <span>🏠 ${addr}</span>
            <button type="button" data-del-addr="${idx}" style="background:#b04e5b; color:white; border:none; padding:2px 6px; border-radius:3px; cursor:pointer; font-size:10px;">削除</button>
          </div>
        `).join("")}
      </div>
      <div style="margin-top:8px; display:flex; gap:5px;">
        <input type="text" id="new-address-input" placeholder="新しいお届け先を入力" style="flex:1; padding:5px; border:1px solid #ccc; border-radius:3px; font-size:11px;">
        <button type="button" id="btn-add-address" style="background:#789c55; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer; font-size:11px;">追加</button>
      </div>
    `;
  } else if (action === "settings") {
    // ここで確実に会員情報の入力フォームを展開します
    dyn.innerHTML = `
      <strong>【会員情報・パスワード変更】</strong>
      <div style="margin-top:8px; display:flex; flex-direction:column; gap:8px;">
        <div>
          <label style="font-size:10px; font-weight:bold; display:block; margin-bottom:2px;">お名前</label>
          <input type="text" id="edit-name" value="${currentUser.name}" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:3px; font-size:11px; box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:10px; font-weight:bold; display:block; margin-bottom:2px;">メールアドレス</label>
          <input type="email" id="edit-email" value="${currentUser.email}" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:3px; font-size:11px; box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:10px; font-weight:bold; display:block; margin-bottom:2px;">新しいパスワード（変更する場合のみ）</label>
          <input type="password" id="edit-password" placeholder="変更しない場合は空欄" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:3px; font-size:11px; box-sizing:border-box;">
        </div>
        <button type="button" id="btn-save-settings" style="background:#789c55; color:white; border:none; padding:8px; border-radius:3px; cursor:pointer; font-weight:bold; margin-top:4px; font-size:11px;">変更を保存する</button>
      </div>
    `;
  }
});
  // ログアウト
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) btnLogout.addEventListener("click", () => {
    localStorage.removeItem("hananet_current_user");
    alert("ログアウトしました。");
    modal.style.display = "none"; resetAuthForms(); updateAuthUI();
  });

  // アカウント削除（退会）
  const btnDelete = document.getElementById("btn-delete-account");
  if (btnDelete) btnDelete.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("hananet_current_user") || "null");
    if (!currentUser) return;
    if (confirm("本当にアカウントを削除（退会）しますか？\nこの操作は元に戻せません。")) {
      let users = JSON.parse(localStorage.getItem("hananet_users") || "[]");
      users = users.filter(u => u.userId !== currentUser.userId);
      localStorage.setItem("hananet_users", JSON.stringify(users));
      localStorage.removeItem("hananet_current_user");
      alert("アカウントを削除しました。ご利用ありがとうございました。");
      modal.style.display = "none"; resetAuthForms(); updateAuthUI();
    }
  });
});

// --- マイメニュー機能（各情報変更フォーム・お届け先・購入履歴の完全実装） ---
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".mp-menu-btn");
  if (!btn) return;
  const action = btn.dataset.action;
  const dyn = document.getElementById("mp-dynamic-area");
  if (!dyn) return;
  dyn.style.display = "block";
  dyn.removeAttribute("data-view");

  const currentUser = JSON.parse(localStorage.getItem("hananet_current_user") || "null");
  if (!currentUser) return;

  if (action === "history") {
    dyn.innerHTML = `
      <strong>【購入履歴・配送状況】</strong>
      <div style="margin-top:6px; background:#fff; padding:8px; border:1px solid #ddd; border-radius:4px;">
        <p style="margin:0 0 4px; font-weight:bold; color:#5b793f;">注文番号: #HN-2026-1027</p>
        <p style="margin:0; font-size:11px; color:#666;">状態: <span style="color:green; font-weight:bold;">発送準備完了（常温便）</span></p>
        <p style="margin:2px 0 0; font-size:11px; color:#666;">お届け先: 大阪市平野区</p>
      </div>
    `;
  } else if (action === "favorite") {
    showFavoriteView();
  } else if (action === "address") {
    let addresses = JSON.parse(localStorage.getItem(`hananet_addresses_${currentUser.userId}`) || '["大阪市平野区 ご自宅"]');
    dyn.innerHTML = `
      <strong>【お届け先リスト管理】</strong>
      <div style="margin-top:6px;" id="addr-list-container">
        ${addresses.map((addr, idx) => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:6px 8px; border:1px solid #ddd; border-radius:3px; margin-bottom:4px; font-size:11px;">
            <span>🏠 ${addr}</span>
            <button type="button" data-del-addr="${idx}" style="background:#b04e5b; color:white; border:none; padding:2px 6px; border-radius:3px; cursor:pointer; font-size:10px;">削除</button>
          </div>
        `).join("")}
      </div>
      <div style="margin-top:8px; display:flex; gap:5px;">
        <input type="text" id="new-address-input" placeholder="新しいお届け先を入力" style="flex:1; padding:5px; border:1px solid #ccc; border-radius:3px; font-size:11px;">
        <button type="button" id="btn-add-address" style="background:#789c55; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer; font-size:11px;">追加</button>
      </div>
    `;
  } else if (action === "settings") {
    dyn.innerHTML = `
      <strong>【会員情報・パスワード変更】</strong>
      <div style="margin-top:6px; display:flex; flex-direction:column; gap:6px;">
        <div>
          <label style="font-size:10px; font-weight:bold; display:block;">お名前</label>
          <input type="text" id="edit-name" value="${currentUser.name}" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:3px; font-size:11px; box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:10px; font-weight:bold; display:block;">メールアドレス</label>
          <input type="email" id="edit-email" value="${currentUser.email}" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:3px; font-size:11px; box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:10px; font-weight:bold; display:block;">新しいパスワード（変更する場合のみ）</label>
          <input type="password" id="edit-password" placeholder="変更しない場合は空欄" style="width:100%; padding:5px; border:1px solid #ccc; border-radius:3px; font-size:11px; box-sizing:border-box;">
        </div>
        <button type="button" id="btn-save-settings" style="background:#789c55; color:white; border:none; padding:6px; border-radius:3px; cursor:pointer; font-weight:bold; margin-top:4px;">変更を保存する</button>
      </div>
    `;
  }
});

// お届け先・会員情報の保存や削除操作のハンドリング
document.addEventListener("click", (e) => {
  const currentUser = JSON.parse(localStorage.getItem("hananet_current_user") || "null");
  if (!currentUser) return;

  // お届け先追加
  if (e.target.id === "btn-add-address") {
    const input = document.getElementById("new-address-input");
    const val = input ? input.value.trim() : "";
    if (!val) return;
    let addresses = JSON.parse(localStorage.getItem(`hananet_addresses_${currentUser.userId}`) || '["大阪市平野区 ご自宅"]');
    addresses.push(val);
    localStorage.setItem(`hananet_addresses_${currentUser.userId}`, JSON.stringify(addresses));
    document.querySelector('[data-action="address"]').click(); // 再描画
    showToast("お届け先を追加しました");
  }

  // お届け先削除
  if (e.target.dataset.delAddr !== undefined) {
    const idx = +e.target.dataset.delAddr;
    let addresses = JSON.parse(localStorage.getItem(`hananet_addresses_${currentUser.userId}`) || '["大阪市平野区 ご自宅"]');
    addresses.splice(idx, 1);
    localStorage.setItem(`hananet_addresses_${currentUser.userId}`, JSON.stringify(addresses));
    document.querySelector('[data-action="address"]').click(); // 再描画
    showToast("お届け先を削除しました");
  }

  // 会員情報保存
  if (e.target.id === "btn-save-settings") {
    const name = document.getElementById("edit-name").value.trim();
    const email = document.getElementById("edit-email").value.trim();
    const password = document.getElementById("edit-password").value.trim();

    if (!name || !email) {
      alert("お名前とメールアドレスは必須です。");
      return;
    }

    currentUser.name = name;
    currentUser.email = email;
    if (password) currentUser.password = password;

    // ユーザー一覧も更新
    let users = JSON.parse(localStorage.getItem("hananet_users") || "[]");
    users = users.map(u => u.userId === currentUser.userId ? currentUser : u);
    localStorage.setItem("hananet_users", JSON.stringify(users));
    localStorage.setItem("hananet_current_user", JSON.stringify(currentUser));

    document.getElementById("mp-username").textContent = currentUser.name;
    document.getElementById("mp-email").textContent = currentUser.email;
    
    // ヘッダー表示も更新
    const regNav = document.getElementById("nav-register");
    if (regNav) regNav.textContent = currentUser.name + "様";

    alert("会員情報を更新しました！");
  }
});
