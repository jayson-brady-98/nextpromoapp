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
    console.log('API Route - Searching for brand:', brandQuery)
    console.log('API Route - Using Supabase URL:', supabaseUrl)
    console.log('API Route - Supabase key exists:', !!supabaseKey)

    let { data, error } = await supabase
      .from('predictions')
      .select('brand_name,sale_start_date,sale_end_date,event,sitewide,yhat')
      .ilike('brand_name', `%${brandQuery}%`)

    if (error) {
      console.error('API Route - Supabase error:', error)
      throw error
    }

    console.log('API Route - Query result:', data)
    return NextResponse.json(data?.[0] || null)
  } catch (error) {
    console.error('API Route - Detailed error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch predictions', 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    )
  }
}