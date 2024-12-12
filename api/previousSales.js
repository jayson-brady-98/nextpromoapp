import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://papraoywbxpwfqefgyyi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchPreviousSales(brandQuery) {
  try {
    const currentDate = new Date().toISOString();
    
    if (!brandQuery) {
      console.error('Brand query is required');
      return [];
    }

    const { data, error } = await supabase
      .from('instagram_data')
      .select('sale_date, event, sale_discount')
      .ilike('brand', `%${brandQuery}%`)
      .lte('sale_date', currentDate)
      .order('sale_date', { ascending: false })

    if (error) {
      console.error('Supabase error details:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching previous sales:', error.message || error);
    throw error;
  }
}
