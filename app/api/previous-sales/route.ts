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
    const currentDate = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('instagram_data')
      .select('sale_date, event, sale_discount')
      .ilike('brand', `%${brandQuery}%`)
      .lte('sale_date', currentDate)

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching previous sales:', error)
    return NextResponse.json({ error: 'Failed to fetch previous sales' }, { status: 500 })
  }
}