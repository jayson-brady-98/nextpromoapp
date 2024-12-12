import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://papraoywbxpwfqefgyyi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
if (!supabaseKey) {
  console.error('Missing Supabase anon key!')
}
const supabase = createClient(supabaseUrl, supabaseKey)


export async function fetchPredictions(brandQuery) {
  try {
    // For server-side calls
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      : window.location.origin
      
    const response = await fetch(`${baseUrl}/api/predictions?brand=${encodeURIComponent(brandQuery)}`)
    if (!response.ok) throw new Error('Failed to fetch predictions')
    return response.json()
  } catch (error) {
    console.error('Error fetching predictions:', error)
    return null
  }
}
