import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.POSTGRES_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const method = req.method;

  try {
    // 1. 商品一覧の取得 (GET)
    if (method === 'GET') {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return res.status(200).json(data);
    }

    // 2. 商品の追加・更新 (POST)
    if (method === 'POST') {
      const { id, name, price, category, image, description } = req.body;
      
      let result;
      if (id) {
        // 更新
        result = await supabase
          .from('products')
          .update({ name, price: Number(price), category, image, description })
          .eq('id', id);
      } else {
        // 新規追加
        const newId = Date.now();
        result = await supabase
          .from('products')
          .insert([{ id: newId, name, price: Number(price), category, image, description }]);
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
