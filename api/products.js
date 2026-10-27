import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.POSTGRES_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// 初期デフォルト商品データ
const defaultProducts = [
  {id: 1, name: "奉仕品ピンポン菊 1ロット10本 白", price: 1600, category: "cut", categoryName: "切り花・花材・葉物・枝物", description: "奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。", stock: 20, color: "白", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 2, name: "奉仕品ピンポン菊 1ロット10本 黄色", price: 1600, category: "cut", categoryName: "切り花・花材・葉物・枝物", description: "奉仕価格での販売は1回の発送につき1ロットまで。70cm程度。", stock: 20, color: "黄色", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 3, name: "特価品ガーベラ 1ロット20本 色おまかせ", price: 2000, category: "cut", categoryName: "切り花・花材・葉物・枝物", description: "色おまかせ。1ロット20本。", stock: 15, color: "おまかせ", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 4, name: "特価品ガーベラ 1ロット10本", price: 1000, category: "cut", categoryName: "切り花・花材・葉物・枝物", description: "色を選ぶ切り花特価品。1ロット10本。", stock: 30, color: "白・黄・ピンク・オレンジ・赤", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 5, name: "スプレーカーネーション 1ロット25本", price: 5000, category: "cut", categoryName: "切り花・花材・葉物・枝物", description: "長さ50cm程度。色・希望日はお問い合わせください。", stock: 12, color: "赤・ピンク・黄・オレンジ・赤", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 6, name: "カーネーション 1ロット50本 色おまかせMix", price: 9500, category: "cut", categoryName: "切り花・花材・葉物・枝物", description: "切り花まとめ買い向け商品。", stock: 10, color: "色おまかせMix", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 7, name: "カーネーション 1ロット25本", price: 5000, category: "cut", categoryName: "切り花・花材・葉物・枝物", description: "色を選べる切り花。", stock: 15, color: "ピンク・黄色・赤", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 8, name: "バラ 1ロット20本", price: 3900, category: "rose", categoryName: "バラの花束", description: "複数色から選べるバラ。", stock: 15, color: "ピンク・黄色・オレンジ・赤", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 9, name: "アンスリューム", price: 3500, category: "pot", categoryName: "鉢花・鉢植え", description: "2023年9月29日新春の導入詳細に基づく。", stock: 8, color: "赤・色各色", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 10, name: "胡蝶蘭", price: 8800, category: "orchid", categoryName: "胡蝶蘭", description: "HANTENサイトの商品カテゴリを参考にしたデモ商品。", stock: 5, color: "白など", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 11, name: "観葉植物", price: 2800, category: "green", categoryName: "観葉植物", description: "HANTENサイトの商品カテゴリを参考にしたデモ商品。", stock: 6, color: "商品による", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"},
  {id: 12, name: "お供え・弔事アレンジ", price: 3500, category: "condolence", categoryName: "お供え・弔事", description: "HANTENサイトの商品カテゴリを参考にしたデモ商品。", stock: 8, color: "白・淡色系", shipping: "常温", image: "https://web.archive.org/web/20230930002033im_/http://hananet.jp/image/index/left_ber02.gif"}
];

export default async function handler(req, res) {
  const method = req.method;

  try {
    // 1. 商品一覧の取得 (GET)
    if (method === 'GET') {
      let { data, error } = await supabase.from('products').select('*');
      if (error) throw error;

      // もしデータベースが空の場合、初期データを自動挿入する
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
      const { id, name, price, category, categoryName, image, description, stock, color, shipping } = req.body;
      
      let result;
      if (id) {
        // 更新
        result = await supabase
          .from('products')
          .update({ 
            name, 
            price: Number(price), 
            category, 
            categoryName: categoryName || category,
            image, 
            description, 
            stock: Number(stock) || 0, 
            color, 
            shipping 
          })
          .eq('id', id);
      } else {
        // 新規追加
        const newId = Date.now();
        result = await supabase
          .from('products')
          .insert([{ 
            id: newId, 
            name, 
            price: Number(price), 
            category, 
            categoryName: categoryName || category,
            image, 
            description, 
            stock: Number(stock) || 0, 
            color, 
            shipping 
          }]);
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
