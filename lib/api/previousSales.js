import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://papraoywbxpwfqefgyyi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchPreviousSales(brandQuery) {
  try {
    // For server-side calls
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      : window.location.origin
      
    const response = await fetch(`${baseUrl}/api/previous-sales?brand=${encodeURIComponent(brandQuery)}`)
    if (!response.ok) throw new Error('Failed to fetch previous sales')
    return response.json()
  } catch (error) {
    console.error('Error fetching previous sales:', error)
    return []
  }
}
