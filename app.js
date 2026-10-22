const products = [
  {id:1,name:"ピンポン菊",category:"sale",categoryName:"特価品・切り花",price:160,unit:"本",tag:"特価品",description:"丸い花姿がかわいらしい、アレンジにも人気の菊。",image:"https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:2,name:"ガーベラ",category:"cut",categoryName:"切り花・花材",price:100,unit:"本",tag:"特価品",description:"明るい色合いで花束や店頭ディスプレイに。",image:"https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:3,name:"アンスリューム",category:"pot",categoryName:"鉢花・鉢植え",price:3500,unit:"鉢",tag:"入荷情報",description:"艶のある花姿が印象的な観賞用植物。",image:"https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:4,name:"赤いバラの花束",category:"bouquet",categoryName:"バラの花束",price:4800,unit:"束",tag:"人気商品",description:"本数や色の相談を想定したギフト向け商品。",image:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:5,name:"季節の花束",category:"gift",categoryName:"お祝い用花束",price:3300,unit:"束",tag:"ギフト",description:"季節の花を組み合わせた華やかな花束。",image:"https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:6,name:"ナチュラルアレンジ",category:"arrangement",categoryName:"アレンジメント",price:4200,unit:"個",tag:"ギフト",description:"やさしい色合いでまとめたアレンジメント。",image:"https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:7,name:"観葉植物・グリーン",category:"green",categoryName:"観葉植物",price:2800,unit:"鉢",tag:"グリーン",description:"お部屋や店舗のアクセントになる観葉植物。",image:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:8,name:"季節の花苗セット",category:"seedling",categoryName:"花苗・野菜苗",price:1200,unit:"セット",tag:"園芸",description:"寄せ植えや花壇づくりにおすすめの苗セット。",image:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:9,name:"胡蝶蘭・白",category:"orchid",categoryName:"胡蝶蘭",price:8800,unit:"鉢",tag:"お祝い",description:"開店祝いや記念日に向けた定番の胡蝶蘭。",image:"https://images.unsplash.com/photo-1566920316081-7f7e7d2c0e2d?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:10,name:"お供え用アレンジ",category:"condolence",categoryName:"お供え・弔事",price:3500,unit:"個",tag:"お供え",description:"落ち着いた色合いのお供え用アレンジメント。",image:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:11,name:"プリザーブドフラワー",category:"preserved",categoryName:"プリザーブド",price:2600,unit:"個",tag:"長く楽しめる",description:"水やり不要で長く飾れるフラワーギフト。",image:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=700&q=80",packages:1},
  {id:12,name:"仏花・墓花セット",category:"memorial",categoryName:"仏花・墓花",price:780,unit:"束",tag:"仏花",description:"お供え用に使いやすい花材のセット。",image:"https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=80",packages:1}
];
const shippingRates = {
  mainland:{ambient:1300,cool:1900},
  hokkaido:{ambient:3000,cool:3600},
  okinawa:{ambient:4200,cool:4800}
};
let activeCategory = "all";
let cart = {};
let toastTimer;
const $ = id => document.getElementById(id);
const yen = n => `${Math.round(n).toLocaleString("ja-JP")}円`;

function renderProducts(){
  const q = $("search-input").value.trim().toLocaleLowerCase("ja");
  const sort = $("sort-select").value;
  let list = products.filter(p => (activeCategory==="all" || p.category===activeCategory) &&
    [p.name,p.categoryName,p.description,p.tag].join(" ").toLocaleLowerCase("ja").includes(q));
  if(sort==="price-asc") list.sort((a,b)=>a.price-b.price);
  if(sort==="price-desc") list.sort((a,b)=>b.price-a.price);
  if(sort==="name") list.sort((a,b)=>a.name.localeCompare(b.name,"ja"));
  $("product-heading").textContent = activeCategory==="all" ? (q ? "検索結果" : "おすすめ商品") : document.querySelector(`[data-category="${activeCategory}"]`)?.textContent || "商品一覧";
  $("result-count").textContent = `${list.length}商品`;
  $("empty-state").hidden = list.length>0;
  $("product-grid").innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80'">
      <span class="tag ${p.category==='sale'?'':'green'}">${p.tag}</span></div>
      <div class="product-body"><span class="product-category">${p.categoryName}</span><h3 class="product-name">${p.name}</h3>
      <p class="product-description">${p.description}</p><div class="price-line"><strong class="price">${yen(p.price)}</strong><span class="unit">／${p.unit}</span></div>
      <button class="add-button" data-add="${p.id}">＋ カートに入れる</button></div>
    </article>`).join("");
}
function showToast(message){
  $("toast").textContent=message;$("toast").classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2400);
}
function addToCart(id){
  cart[id]=(cart[id]||0)+1;renderCart();showToast(`${products.find(p=>p.id===id).name}をカートに追加しました`);
}
function changeQty(id,delta){
  cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart();
}
function removeItem(id){delete cart[id];renderCart();}
function getCartLines(){return Object.entries(cart).map(([id,qty])=>({product:products.find(p=>p.id===Number(id)),qty})).filter(x=>x.product);}
function totals(){
  const lines=getCartLines();
  const subtotal=lines.reduce((s,l)=>s+l.product.price*l.qty,0);
  const region=$("region-select").value, method=$("shipping-select").value;
  const packageCount=Math.max(1,Math.min(20,Number($("package-count").value)||1));
  const shipping=lines.length?shippingRates[region][method]*packageCount:0;
  const tax=Math.round((subtotal+shipping)*0.1);
  return {subtotal,shipping,tax,total:subtotal+shipping+tax,packageCount};
}
function renderCart(){
  const lines=getCartLines();
  $("cart-count").textContent=lines.reduce((s,l)=>s+l.qty,0);
  $("cart-items").innerHTML=lines.length?lines.map(({product:p,qty})=>`
    <div class="cart-item"><img src="${p.image}" alt="" onerror="this.style.opacity=.25">
      <div><h3>${p.name}</h3><div class="cart-unit-price">${yen(p.price)} ／${p.unit}</div>
      <div class="qty-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="数量を減らす">−</button><span>${qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="数量を増やす">＋</button></div></div>
      <button class="remove-item" data-remove="${p.id}">削除</button></div>`).join(""):`<div class="cart-empty">カートは空です。<br>気になるお花を追加してください。</div>`;
  const t=totals();$("subtotal").textContent=yen(t.subtotal);$("shipping-cost").textContent=yen(t.shipping);$("tax-cost").textContent=yen(t.tax);$("grand-total").textContent=yen(t.total);
}
function openCart(){
  $("cart-drawer").classList.add("open");$("cart-drawer").setAttribute("aria-hidden","false");$("overlay").hidden=false;document.body.style.overflow="hidden";
}
function closeCart(){
  $("cart-drawer").classList.remove("open");$("cart-drawer").setAttribute("aria-hidden","true");$("overlay").hidden=true;document.body.style.overflow="";
}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add){addToCart(Number(add.dataset.add));return;}
  const qty=e.target.closest("[data-qty]");if(qty){changeQty(Number(qty.dataset.qty),Number(qty.dataset.delta));return;}
  const remove=e.target.closest("[data-remove]");if(remove){removeItem(Number(remove.dataset.remove));return;}
  const cat=e.target.closest("[data-category]");if(cat){activeCategory=cat.dataset.category;document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b===cat));renderProducts();if(window.innerWidth<720)$("products").scrollIntoView({behavior:"smooth"});}
});
$("search-input").addEventListener("input",renderProducts);
$("clear-search").addEventListener("click",()=>{$("search-input").value="";renderProducts();$("search-input").focus();});
$("sort-select").addEventListener("change",renderProducts);
["region-select","shipping-select","package-count"].forEach(id=>$(id).addEventListener("change",renderCart));
$("open-cart").addEventListener("click",openCart);
$("close-cart").addEventListener("click",closeCart);
$("continue-shopping").addEventListener("click",closeCart);
$("overlay").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
$("demo-checkout").addEventListener("click",()=>{
  const lines=getCartLines();if(!lines.length){showToast("先に商品をカートに入れてください");return;}
  const t=totals();
  alert("【注文確認デモ】\n\n"+lines.map(l=>`${l.product.name} × ${l.qty} = ${yen(l.product.price*l.qty)}`).join("\n")+
    `\n\n商品小計：${yen(t.subtotal)}\n送料（税抜）：${yen(t.shipping)}\n消費税（仮計算）：${yen(t.tax)}\n合計：${yen(t.total)}\n\nこれはデモです。注文・決済は実行されていません。`);
});
renderProducts();renderCart();
