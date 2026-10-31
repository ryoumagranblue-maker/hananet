import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bemeursptcubwjeziazw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlbWV1cnNwdGN1YndqZXppYXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMDA2MDEsImV4cCI6MjEwODY3NjYwMX0.30spbk1qkFyfKIVPEdu4O-0FWH8Xq29651POqylfMmw';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const method = req.method;

  try {
    // 1. データベースから商品一覧を取得 (GET)
    if (method === 'GET') {
      const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    // 2. 商品の追加・更新 (POST)
    if (method === 'POST') {
      const { id, name, price, category, image, description } = req.body;
      
      const payload = { 
        name, 
        price: Number(price), 
        category, 
        image, 
        description 
      };

      let result;
      if (id) {
        // 既存データの更新
        result = await supabase.from('products').update(payload).eq('id', id);
      } else {
        // 新規データの追加
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
