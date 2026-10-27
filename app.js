// 初期デフォルト商品データ（localStorageが空の場合のみ使用）
const defaultProducts = [
  {id: 1, name: "奉仕品ピンポン菊 1ロット10本 白", sku: "K011", category: "cut", categoryName: "切り花・花材", price: 1600, unit: "ロット（10本）", pricePerStem: 160, usual: 180, color: "白", description: "奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。", image: "https://web.archive.org/web/20230929235936im_/http://hananet.jp/image/product/100073.jpg"},
  {id: 2, name: "奉仕品ピンポン菊 1ロット10本 黄色", sku: "K010", category: "cut", categoryName: "切り花・花材", price: 1600, unit: "ロット（10本）", pricePerStem: 160, usual: 180, color: "黄色", description: "奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。", image: "https://web.archive.org/web/20230929230527im_/http://hananet.jp/image/product/100205.jpg"},
  {id: 3, name: "特価品ガーベラ 1ロット20本 色おまかせ", sku: "K131", category: "cut", categoryName: "切り花・花材", price: 2000, unit: "ロット（20本）", pricePerStem: 100, usual: 110, color: "色おまかせ", description: "色おまかせ。1ロット20本。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100131.jpg"},
  {id: 4, name: "特価品ガーベラ 1ロット10本", sku: "K110", category: "cut", categoryName: "切り花・花材", price: 1000, unit: "ロット（10本）", pricePerStem: 100, usual: 110, color: "白・黄・ピンク・オレンジ・赤", description: "色を選ぶ切り花特価品。1ロット10本。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100110.jpg"},
  {id: 5, name: "スプレーカーネーション 1ロット25本", sku: "K179", category: "cut", categoryName: "切り花・花材", price: 5000, unit: "ロット（25本）", pricePerStem: 200, usual: null, color: "黄・ピンク・白・オレンジ・赤", description: "長さ50cm程度。色の希望はお問い合わせください。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100179.jpg"},
  {id: 6, name: "カーネーション 1ロット50本 色おまかせMix", sku: "K135", category: "cut", categoryName: "切り花・花材", price: 9500, unit: "ロット（50本）", pricePerStem: 190, usual: null, color: "色おまかせMix", description: "切り花のまとめ買い向け商品。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100135.jpg"},
  {id: 7, name: "カーネーション 1ロット25本", sku: "K025", category: "cut", categoryName: "切り花・花材", price: 5000, unit: "ロット（25本）", pricePerStem: 200, usual: null, color: "ピンク・黄色・白", description: "色を選べる切り花。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100025.jpg"},
  {id: 8, name: "バラ 1ロット30本", sku: "K003", category: "rose", categoryName: "バラの花束", price: 3900, unit: "ロット（30本）", pricePerStem: 130, usual: null, color: "ピンク・黄色・オレンジ・白", description: "複数色から選べるバラ。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/rose.jpg"},
  {id: 9, name: "アンスリューム", sku: "A3500", category: "pot", categoryName: "鉢花・鉢植え", price: 3500, unit: "商品", pricePerStem: null, usual: null, color: "入荷時期による", description: "2023年9月29日更新の新入荷情報に記載。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
  {id: 10, name: "胡蝶蘭", sku: "ORCHID", category: "orchid", categoryName: "胡蝶蘭", price: 8800, unit: "鉢", pricePerStem: null, usual: null, color: "白など", description: "旧サイトの商品カテゴリを参考にしたデモ商品。価格は仮設定。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
  {id: 11, name: "観葉植物", sku: "GREEN", category: "green", categoryName: "観葉植物", price: 2800, unit: "商品", pricePerStem: null, usual: null, color: "商品による", description: "旧サイトの商品カテゴリを参考にしたデモ商品。価格は仮設定。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
  {id:12, name: "お供え・弔事アレンジ", sku: "COND", category: "condolence", categoryName: "お供え・弔事", price: 3500, unit: "個", pricePerStem: null, usual: null, color: "白・淡色系", description: "旧サイトの商品カテゴリを参考にしたデモ商品。価格は仮設定。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"}
];

// 管理画面と共通のキー 'hananet_products' からデータを読み込む
let PRODUCTS = JSON.parse(localStorage.getItem('hananet_products') || 'null') || defaultProducts;

const rates={mainland:{ambient:1300,cool:1900},hokkaido:{ambient:3000,cool:3600},okinawa:{ambient:4200,cool:4800}};
let category="all", sort="default", cart={};
const $=id=>document.getElementById(id), yen=n=>Math.round(n).toLocaleString("ja-JP")+"円";

function showToast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}

function filtered(){
 const q=$("search").value.trim().toLowerCase();
 let arr=PRODUCTS.filter(p=>(category==="all"||p.category===category)&&[p.name,p.sku,p.categoryName,p.color,p.description].join(" ").toLowerCase().includes(q));
 if(sort==="price")arr.sort((a,b)=>a.price-b.price);
 if(sort==="name")arr.sort((a,b)=>a.name.localeCompare(b.name,"ja"));
 return arr;
}

function renderProducts(){
 const arr=filtered();$("result-count").textContent=`${arr.length}件`;
 $("product-list").innerHTML=arr.length?arr.map(p=>`<article class="product-row">
 <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif'">
 <div><h3>${p.name}</h3><div class="sku">商品番号：${p.sku || 'K-' + p.id} 分類：${p.categoryName || p.category}</div><p>${p.description || ''}</p><p>◇${p.color || 'おまかせ'}</p><div class="price">${yen(p.price)}（税別） <span class="usual">${p.usual?`通常${p.usual}円/本`:''}</span></div></div>
 <div class="product-controls"><label>数量<select id="qty-${p.id}"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label><button data-add="${p.id}">カートに入れる</button><div>単位：${p.unit || '個'}</div></div>
 </article>`).join(""):`<p style="padding:15px">該当する商品がありません。</p>`;
}

function lines(){return Object.entries(cart).map(([id,qty])=>({p:PRODUCTS.find(p=>p.id===+id),qty})).filter(x=>x.p)}

function compute(){
 const arr=lines(),subtotal=arr.reduce((s,x)=>s+x.p.price*x.qty,0),pkgs=arr.length?Math.max(1,Math.min(20,+$("packages").value||1)):0;
 const shipping=arr.length?rates[$("region").value][$("delivery").value]*pkgs:0,tax=Math.round((subtotal+shipping)*.1);
 return {subtotal,shipping,tax,total:subtotal+shipping+tax};
}

function renderCart(){
 const arr=lines();$("top-cart-count").textContent=arr.reduce((s,x)=>s+x.qty,0);
 $("cart-list").innerHTML=arr.length?arr.map(({p,qty})=>`<div class="cart-line"><div><strong>${p.name}</strong><br><small>${p.sku || ''} / ${p.unit || ''}</small></div><label>数量 <input type="number" min="1" max="99" value="${qty}" data-change="${p.id}"></label><strong>${yen(p.price*qty)}</strong><button data-remove="${p.id}">削除</button></div>`).join(""):"カートに商品は入っていません。";
 const t=compute();$("subtotal").textContent=yen(t.subtotal);$("shipping").textContent=yen(t.shipping);$("tax").textContent=yen(t.tax);$("total").textContent=yen(t.total);
}

document.addEventListener("click",e=>{
 const cat=e.target.closest("[data-category]");
 if(cat){
  e.preventDefault();
  category=cat.dataset.category;
  $("category-label").textContent=cat.textContent;
  renderProducts();
  document.querySelectorAll("[data-category]").forEach(a=>a.style.background="");
  cat.style.background="#fff4c8";
  return;
 }
 const add=e.target.closest("[data-add]");if(add){const id=+add.dataset.add,qty=+$(`qty-${id}`).value;cart[id]=(cart[id]||0)+qty;renderCart();showToast("カートに追加しました");return;}
 const rem=e.target.closest("[data-remove]");if(rem){delete cart[+rem.dataset.remove];renderCart();return;}
 const s=e.target.closest("[data-sort]");if(s){sort=s.dataset.sort;renderProducts();}
});

$("search-button").addEventListener("click",renderProducts);
$("search").addEventListener("keydown",e=>{if(e.key==="Enter")renderProducts()});
$("reset-button").addEventListener("click",()=>{category="all";$("category-label").textContent="すべての商品";$("search").value="";renderProducts();});
$("product-list").addEventListener("change",e=>{if(e.target.dataset.change){const id=+e.target.dataset.change,qty=Math.max(1,Math.min(99,+e.target.value||1));cart[id]=qty;renderCart();}});
["region","delivery","packages"].forEach(id=>$(id).addEventListener("change",renderCart));
$("checkout").addEventListener("click",()=>{const arr=lines();if(!arr.length){showToast("カートに商品を入れてください");return;}const t=compute();alert("【注文内容確認デモ】\n"+arr.map(x=>`${x.p.name} × ${x.qty}：${yen(x.p.price*x.qty)}`).join("\n")+`\n\n商品合計：${yen(t.subtotal)}\n送料：${yen(t.shipping)}\n消費税（仮計算）：${yen(t.tax)}\n合計：${yen(t.total)}\n\n注文・決済は実行されていません。`);});
document.querySelectorAll('a[href="#cart"]').forEach(a=>a.addEventListener("click",()=>setTimeout(()=> $("cart").scrollIntoView({behavior:"smooth"}),20)));

renderProducts();renderCart();

// --- 会員機能（エンターキー対応・マイページ機能拡張・入力リセット・長押しパスワード表示） ---
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("auth-modal");
  const modalTitle = document.getElementById("auth-modal-title");
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");
  const formVerify = document.getElementById("form-verify");
  const formMypage = document.getElementById("form-mypage");

  let pendingUser = null;

  // フォームの入力内容を完全にリセット
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
    if (dyn) { dyn.style.display = "none"; dyn.innerHTML = ""; }
  }

  // ログイン状態の確認とボタン表示の更新
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
  }

  updateAuthUI();

  // モーダルを開く共通関数
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
      if (currentUser) {
        openAuthModal("login");
        return;
      }
      modalTitle.textContent = "新規会員登録";
      formLogin.style.display = "none";
      formRegister.style.display = "block";
      formVerify.style.display = "none";
      formMypage.style.display = "none";
    }
  }

  // ヘッダー等のボタンイベント
  document.addEventListener("click", e => {
    if (e.target.id === "nav-login" || e.target.closest("#nav-login")) {
      e.preventDefault();
      openAuthModal("login");
    }
    if (e.target.id === "nav-register" || e.target.closest("#nav-register")) {
      e.preventDefault();
      openAuthModal("register");
    }
    if (e.target.textContent.includes("ログイン")) {
      e.preventDefault();
      openAuthModal("login");
    }
    if (e.target.textContent.includes("無料会員登録")) {
      e.preventDefault();
      openAuthModal("register");
    }
  });

  // モーダル閉じる
  const closeBtn = document.getElementById("btn-close-modal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      resetAuthForms();
    });
  }

  // パスワード「左クリックしている間だけ見える」機能
  function setupHoldToShow(btnId, inputId) {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (!btn || !input) return;
    const show = () => input.type = "text";
    const hide = () => input.type = "password";
    btn.addEventListener("mousedown", show);
    btn.addEventListener("mouseup", hide);
    btn.addEventListener("mouseleave", hide);
    btn.addEventListener("touchstart", (e) => { e.preventDefault(); show(); });
    btn.addEventListener("touchend", hide);
  }
  setupHoldToShow("btn-show-login-pw", "login-password");
  setupHoldToShow("btn-show-reg-pw", "reg-password");

  // ログイン実行関数
  function executeLogin() {
    const userId = document.getElementById("login-userid").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const msg = document.getElementById("login-msg");

    let users = JSON.parse(localStorage.getItem("hananet_users") || "[]");
    const found = users.find(u => u.userId === userId && u.password === password);

    if (found) {
      localStorage.setItem("hananet_current_user", JSON.stringify(found));
      alert("ログインしました！");
      modal.style.display = "none";
      resetAuthForms();
      updateAuthUI();
    } else {
      msg.textContent = "会員IDまたはパスワードが正しくありません。";
    }
  }

  // 新規登録実行関数
  function executeRegister() {
    const name = document.getElementById("reg-name").value.trim();
    const userId = document.getElementById("reg-userid").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const msg = document.getElementById("reg-msg");

    if (!name || !userId || !email || !password) {
      msg.textContent = "すべての項目を入力してください。";
      return;
    }
    if (!email.includes("@")) {
      msg.textContent = "有効なメールアドレスを入力してください。";
      return;
    }

    let users = JSON.parse(localStorage.getItem("hananet_users") || "[]");
    if (users.some(u => u.userId === userId)) {
      msg.textContent = "この会員IDはすでに使用されています。";
      return;
    }

    pendingUser = { name, userId, email, password };
    formRegister.style.display = "none";
    formVerify.style.display = "block";
    modalTitle.textContent = "メールアドレス認証";
    alert("【メール認証デモ】\n" + email + " 宛に確認コードを送信しました。\nデモ用確認コード: 1234 を入力してください。");
  }

  // 認証実行関数
  function executeVerify() {
    const code = document.getElementById("verify-code").value.trim();
    const verifyMsg = document.getElementById("verify-msg");

    if (code === "1234") {
      let users = JSON.parse(localStorage.getItem("hananet_users") || "[]");
      users.push(pendingUser);
      localStorage.setItem("hananet_users", JSON.stringify(users));
      localStorage.setItem("hananet_current_user", JSON.stringify(pendingUser));

      alert("メール認証が成功し、会員登録が完了しました！");
      modal.style.display = "none";
      resetAuthForms();
      updateAuthUI();
      pendingUser = null;
    } else {
      verifyMsg.textContent = "確認コードが間違っています（デモコードは 1234 です）。";
    }
  }

  // ボタンクリックイベント
  const submitLogin = document.getElementById("btn-submit-login");
  if (submitLogin) submitLogin.addEventListener("click", executeLogin);

  const submitReg = document.getElementById("btn-submit-register");
  if (submitReg) submitReg.addEventListener("click", executeRegister);

  const submitVerify = document.getElementById("btn-submit-verify");
  if (submitVerify) submitVerify.addEventListener("click", executeVerify);

  // ★ エンターキー（Enter）対応
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && modal.style.display === "flex") {
      if (formLogin.style.display !== "none") {
        e.preventDefault();
        executeLogin();
      } else if (formRegister.style.display !== "none") {
        e.preventDefault();
        executeRegister();
      } else if (formVerify.style.display !== "none") {
        e.preventDefault();
        executeVerify();
      }
    }
  });

  // マイページの各メニューボタン機能（花EC特有の機能）
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".mp-menu-btn");
    if (!btn) return;
    const action = btn.dataset.action;
    const dyn = document.getElementById("mp-dynamic-area");
    dyn.style.display = "block";

    if (action === "history") {
      dyn.innerHTML = "<strong>【購入履歴】</strong><br>現在、過去の注文履歴はありません。（次回入荷分予約受付中）";
    } else if (action === "favorite") {
      dyn.innerHTML = "<strong>【お気に入りのお花】</strong><br>お気に入りに登録されている商品はありません（商品一覧のハート等から追加可能）。";
    } else if (action === "address") {
      dyn.innerHTML = "<strong>【お届け先リスト】</strong><br>登録されている配送先：ご自宅（大阪市平野区）<br><small>+ 新規お届け先の追加が可能です</small>";
    } else if (action === "settings") {
      dyn.innerHTML = "<strong>【会員情報変更】</strong><br>パスワードや登録メールアドレスの変更を行えます。（現在のアカウントは正常です）";
    }
  });

  // ログアウト処理
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("hananet_current_user");
      alert("ログアウトしました。");
      modal.style.display = "none";
      resetAuthForms();
      updateAuthUI();
    });
  }
});
