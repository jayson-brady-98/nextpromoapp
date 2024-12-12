import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://papraoywbxpwfqefgyyi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
if (!supabaseKey) {
  console.error('Missing Supabase anon key!')
}
const supabase = createClient(supabaseUrl, supabaseKey)


export async function fetchPredictions(brandQuery) {
  try {
    console.log('Supabase key present:', !!supabaseKey);
    console.log('Searching for brand:', brandQuery);
    
    let { data, error } = await supabase
      .from('predictions')
      .select('brand_name,sale_start_date,sale_end_date,yhat')
      .ilike('brand_name', `%${brandQuery}%`)

    console.log('Query response:', JSON.stringify({ data, error }, null, 2));
    
    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error fetching predictions:', error)
    return null
  }
}
