const PRODUCTS = [
{id:1,name:"奉仕品ピンポン菊 1ロット10本 白",sku:"K011",category:"cut",categoryName:"切り花・花材",price:1600,unit:"ロット（10本）",pricePerStem:160,usual:180,color:"白",description:"奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。",image:"https://web.archive.org/web/20230929235936im_/http://hananet.jp/image/product/100073.jpg"},
{id:2,name:"奉仕品ピンポン菊 1ロット10本 黄色",sku:"K010",category:"cut",categoryName:"切り花・花材",price:1600,unit:"ロット（10本）",pricePerStem:160,usual:180,color:"黄色",description:"奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。",image:"https://web.archive.org/web/20230929230527im_/http://hananet.jp/image/product/100205.jpg"},
{id:3,name:"特価品ガーベラ 1ロット20本 色おまかせ",sku:"K131",category:"cut",categoryName:"切り花・花材",price:2000,unit:"ロット（20本）",pricePerStem:100,usual:110,color:"色おまかせ",description:"色おまかせ。1ロット20本。",image:"https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100131.jpg"},
{id:4,name:"特価品ガーベラ 1ロット10本",sku:"K110",category:"cut",categoryName:"切り花・花材",price:1000,unit:"ロット（10本）",pricePerStem:100,usual:110,color:"白・黄・ピンク・オレンジ・赤",description:"色を選べる切り花特価品。1ロット10本。",image:"https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100110.jpg"},
{id:5,name:"スプレーカーネーション 1ロット25本",sku:"K179",category:"cut",categoryName:"切り花・花材",price:5000,unit:"ロット（25本）",pricePerStem:200,usual:null,color:"黄・ピンク・白・オレンジ・赤",description:"長さ50cm程度。色の希望はお問い合わせください。",image:"https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100179.jpg"},
{id:6,name:"カーネーション 1ロット50本 色おまかせMix",sku:"K135",category:"cut",categoryName:"切り花・花材",price:9500,unit:"ロット（50本）",pricePerStem:190,usual:null,color:"色おまかせMix",description:"切り花のまとめ買い向け商品。",image:"https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100135.jpg"},
{id:7,name:"カーネーション 1ロット25本",sku:"K025",category:"cut",categoryName:"切り花・花材",price:5000,unit:"ロット（25本）",pricePerStem:200,usual:null,color:"ピンク・黄色・白",description:"色を選べる切り花。",image:"https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100025.jpg"},
{id:8,name:"バラ 1ロット30本",sku:"K003",category:"rose",categoryName:"バラの花束",price:3900,unit:"ロット（30本）",pricePerStem:130,usual:null,color:"ピンク・黄色・オレンジ・白",description:"複数色から選べるバラ。",image:"https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/rose.jpg"},
{id:9,name:"アンスリューム",sku:"A3500",category:"pot",categoryName:"鉢花・鉢植え",price:3500,unit:"商品",pricePerStem:null,usual:null,color:"入荷時期による",description:"2023年9月29日更新の新入荷情報に記載。",image:"https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
{id:10,name:"胡蝶蘭",sku:"ORCHID",category:"orchid",categoryName:"胡蝶蘭",price:8800,unit:"鉢",pricePerStem:null,usual:null,color:"白など",description:"旧サイトの商品カテゴリを参考にしたデモ商品。価格は仮設定。",image:"https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
{id:11,name:"観葉植物",sku:"GREEN",category:"green",categoryName:"観葉植物",price:2800,unit:"商品",pricePerStem:null,usual:null,color:"商品による",description:"旧サイトの商品カテゴリを参考にしたデモ商品。価格は仮設定。",image:"https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"},
{id:12,name:"お供え・弔事アレンジ",sku:"COND",category:"condolence",categoryName:"お供え・弔事",price:3500,unit:"個",pricePerStem:null,usual:null,color:"白・淡色系",description:"旧サイトの商品カテゴリを参考にしたデモ商品。価格は仮設定。",image:"https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif"}
];
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
 <div><h3>${p.name}</h3><div class="sku">商品番号：${p.sku}　分類：${p.categoryName}</div><p>${p.description}</p><p>◇${p.color}</p><div class="price">${yen(p.price)}（税別） <span class="usual">${p.usual?`通常${p.usual}円/本`:''}</span></div></div>
 <div class="product-controls"><label>数量<select id="qty-${p.id}"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></label><button data-add="${p.id}">カートに入れる</button><div>単位：${p.unit}</div></div>
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
 $("cart-list").innerHTML=arr.length?arr.map(({p,qty})=>`<div class="cart-line"><div><strong>${p.name}</strong><br><small>${p.sku} / ${p.unit}</small></div><label>数量 <input type="number" min="1" max="99" value="${qty}" data-change="${p.id}"></label><strong>${yen(p.price*qty)}</strong><button data-remove="${p.id}">削除</button></div>`).join(""):"カートに商品は入っていません。";
 const t=compute();$("subtotal").textContent=yen(t.subtotal);$("shipping").textContent=yen(t.shipping);$("tax").textContent=yen(t.tax);$("total").textContent=yen(t.total);
}
document.addEventListener("click",e=>{
 const cat=e.target.closest("[data-category]");
if(cat){
  e.preventDefault(); // リンクによる強制スクロールを防止
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
