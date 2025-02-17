import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchPreviousSales(brandQuery) {
  try {
    // For local development, we need the full URL
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000'
      : 'https://www.nextpromo.io'
      
    const response = await fetch(`${baseUrl}/api/previous-sales?brand=${encodeURIComponent(brandQuery)}`)
    
    // Log the response status
    console.log('API Response Status:', response.status)

    if (!response.ok) {
      console.error('Failed to fetch previous sales:', response.statusText)
      throw new Error('Failed to fetch previous sales')
    }

    const data = await response.json()
    
    // Log the response data
    console.log('API Response Data:', data)

    return data
  } catch (error) {
    console.error('Error fetching previous sales:', error)
    return []
  }
}
