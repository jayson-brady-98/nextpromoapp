import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://papraoywbxpwfqefgyyi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
if (!supabaseKey) {
  console.error('Missing Supabase anon key!')
}
const supabase = createClient(supabaseUrl, supabaseKey)


export async function fetchPredictions(brandQuery) {
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      : window.location.origin
      
    console.log('Client - Fetching predictions for:', brandQuery)
    console.log('Client - Using base URL:', baseUrl)
    
    const response = await fetch(`${baseUrl}/api/predictions?brand=${encodeURIComponent(brandQuery)}`)
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Client - API Error:', errorData)
      throw new Error(errorData.error || 'Failed to fetch predictions')
    }
    
    const data = await response.json()
    console.log('Client - Received data:', data)
    return data
  } catch (error) {
    console.error('Client - Error fetching predictions:', error)
    return null
  }
}
