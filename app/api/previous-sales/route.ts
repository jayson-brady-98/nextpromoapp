import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const brandQuery = searchParams.get('brand')

  if (!brandQuery) {
    return NextResponse.json({ error: 'Brand query is required' }, { status: 400 })
  }

  try {
    const now = new Date()
    const currentDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`
    
    // First, let's try an exact match query to debug
    const { data: exactMatch, error: exactError } = await supabase
      .from('instagram_data')
      .select('brand, sale_date, event, sale_discount')
      .eq('brand', 'terra tonics')
      .limit(1)
    
    console.log('Exact match attempt:', exactMatch)

    // Then try our regular query
    const { data, error } = await supabase
      .from('instagram_data')
      .select('brand, sale_date, event, sale_discount')
      .or(`brand.eq.terra tonics,brand.ilike.%${brandQuery}%`)
      .lte('sale_date', currentDate)
      .order('sale_date', { ascending: false })

    console.log('Query parameters:', {
      brandQuery,
      decodedQuery: decodeURIComponent(brandQuery),
      currentDate
    })
    
    console.log('Query results:', data)

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching previous sales:', error)
    return NextResponse.json({ error: 'Failed to fetch previous sales' }, { status: 500 })
  }
}