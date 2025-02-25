import { redirect } from 'next/navigation'
import { AdvertisementClient } from './advertisement-client'
import { createClient } from '@supabase/supabase-js'

type BrandParams = Promise<{ brand: string }>
type SearchParams = Promise<{ data?: string }>

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function validateBrand(brand: string) {
  console.log("1. Starting brand validation for:", brand)
  
  try {
    console.log("2. About to query Supabase with brand:", brand)
    const { data, error } = await supabase
      .from("previous_sales")
      .select("*")
      .ilike("brand", `%${brand}%`)

    console.log("3. Supabase response:", { data, error })
    
    if (error) {
      console.error("4a. Supabase error:", error)
      return null
    }
    
    if (!data || data.length === 0) {
      console.log("4b. No data found")
      return null
    }
    
    console.log("4c. Validation passed, returning data")
    return data
  } catch (error) {
    console.error("5. Error during validation:", error)
    return null
  }
}

export default async function AdvertisementPage(props: {
  params: BrandParams
  searchParams: SearchParams
}) {
  const rawParams = await props.params
  const decodedBrand = decodeURIComponent(rawParams.brand).toLowerCase()

  const sParams = await props.searchParams

  let brandData
  if (sParams.data) {
    brandData = JSON.parse(decodeURIComponent(sParams.data))
  } else {
    brandData = await validateBrand(decodedBrand)
  }

  if (!brandData) {
    redirect(`/results/${encodeURIComponent(decodedBrand)}`)
  }

  return <AdvertisementClient brand={decodedBrand} brandData={brandData} />
}
