import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.POSTGRES_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// app.js と完全に一致させた初期デフォルト商品データ
const defaultProducts = [
  {id: 1, name: "奉仕品ピンポン菊 1ロット10本 白", sku: "K011", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 1600, unit: "ロット（10本）", pricePerStem: 160, usual: 180, color: "白", description: "奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。", image: "https://web.archive.org/web/20230929235936im_/http://hananet.jp/image/product/100073.jpg", stock: 20, shipping: "常温"},
  {id: 2, name: "奉仕品ピンポン菊 1ロット10本 黄色", sku: "K010", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 1600, unit: "ロット（10本）", pricePerStem: 160, usual: 180, color: "黄色", description: "奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。", image: "https://web.archive.org/web/20230929230527im_/http://hananet.jp/image/product/100205.jpg", stock: 20, shipping: "常温"},
  {id: 3, name: "特価品ガーベラ 1ロット20本 色おまかせ", sku: "K131", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 2000, unit: "ロット（20本）", pricePerStem: 100, usual: 110, color: "色おまかせ", description: "色おまかせ。1ロット20本。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100131.jpg", stock: 15, shipping: "常温"},
  {id: 4, name: "特価品ガーベラ 1ロット10本", sku: "K110", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 1000, unit: "ロット（10本）", pricePerStem: 100, usual: 110, color: "白・黄・ピンク・オレンジ・赤", description: "色を選ぶ切り花特価品。1ロット10本。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100110.jpg", stock: 30, shipping: "常温"},
  {id: 5, name: "スプレーカーネーション 1ロット25本", sku: "K179", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 5000, unit: "ロット（25本）", pricePerStem: 200, usual: null, color: "黄・ピンク・白・オレンジ・赤", description: "長さ50cm程度。色の希望はお問い合わせください。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100179.jpg", stock: 12, shipping: "常温"},
  {id: 6, name: "カーネーション 1ロット50本 色おまかせMix", sku: "K135", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 9500, unit: "ロット（50本）", pricePerStem: 190, usual: null, color: "色おまかせMix", description: "切り花のまとめ買い向け商品。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100135.jpg", stock: 10, shipping: "常温"},
  {id: 7, name: "カーネーション 1ロット25本", sku: "K025", category: "cut", categoryName: "切り花・花材・葉物・枝物", price: 5000, unit: "ロット（25本）", pricePerStem: 200, usual: null, color: "ピンク・黄色・白", description: "色を選べる切り花。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/100025.jpg", stock: 15, shipping: "常温"},
  {id: 8, name: "バラ 1ロット30本", sku: "K003", category: "rose", categoryName: "バラの花束", price: 3900, unit: "ロット（30本）", pricePerStem: 130, usual: null, color: "ピンク・黄色・オレンジ・白", description: "複数色から選べるバラ。", image: "https://web.archive.org/web/20230929233224im_/http://hananet.jp/image/product/rose.jpg", stock: 15, shipping: "常温"},
  {id: 9, name: "アンスリューム", sku: "A3500", category: "pot", categoryName: "鉢花・鉢植え", price: 3500, unit: "商品", pricePerStem: null, usual: null, color: "入荷時期による", description: "新入荷情報の鉢花商品。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif", stock: 8, shipping: "常温"},
  {id: 10, name: "胡蝶蘭", sku: "ORCHID", category: "orchid", categoryName: "胡蝶蘭", price: 8800, unit: "鉢", pricePerStem: null, usual: null, color: "白など", description: "胡蝶蘭カテゴリ商品。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif", stock: 5, shipping: "常温"},
  {id: 11, name: "観葉植物", sku: "GREEN", category: "green", categoryName: "観葉植物", price: 2800, unit: "商品", pricePerStem: null, usual: null, color: "商品による", description: "観葉植物カテゴリ商品。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif", stock: 6, shipping: "常温"},
  {id: 12, name: "お供え・弔事アレンジ", sku: "COND", category: "condolence", categoryName: "お供え・弔事", price: 3500, unit: "個", pricePerStem: null, usual: null, color: "白・淡色系", description: "お供え・弔事カテゴリ商品。", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/main_2_3.gif", stock: 8, shipping: "常温"}
];

export default async function handler(req, res) {
  const method = req.method;

  try {
    // 1. 商品一覧の取得 (GET)
    if (method === 'GET') {
      let { data, error } = await supabase.from('products').select('*');
      if (error) throw error;

      // データベースが空の場合、完全な初期データを自動挿入する
      if (!data || data.length === 0) {
        const { error: insertError } = await supabase.from('products').insert(defaultProducts);
        if (!insertError) {
          data = defaultProducts;
        }
      }

      return res.status(200).json(data);
    }

    // 2. 商品の追加・更新 (POST)
    if (method === 'POST') {
      const { id, name, price, category, sku, unit, pricePerStem, usual, categoryName, image, description, stock, color, shipping } = req.body;
      
      let result;
      const payload = { 
        name, 
        price: Number(price), 
        category, 
        sku,
        unit,
        pricePerStem: pricePerStem ? Number(pricePerStem) : null,
        usual: usual ? Number(usual) : null,
        categoryName,
        image, 
        description, 
        stock: Number(stock) || 0, 
        color, 
        shipping 
      };

      if (id) {
        // 更新
        result = await supabase.from('products').update(payload).eq('id', id);
      } else {
        // 新規追加
        const newId = Date.now();
        result = await supabase.from('products').insert([{ id: newId, ...payload }]);
      }

      if (result.error) throw result.error;
      return res.status(200).json({ success: true });
    }

    // 3. 商品の削除 (DELETE)
    if (method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error("Supabase API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
