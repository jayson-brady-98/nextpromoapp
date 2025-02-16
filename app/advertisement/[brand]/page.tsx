import { redirect } from 'next/navigation'
import { AdvertisementClient } from './advertisement-client'
import { createClient } from '@supabase/supabase-js'

type BrandParams = Promise<{ brand: string }>
type SearchParams = Promise<{ data?: string }>

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function validateBrand(brand: string) {
  console.log("AdvertisementPage - Validating brand:", brand)
  
  try {
    // Switch from .single() to a list-based check:
    const { data, error } = await supabase
      .from("previous_sales")
      .select("*")
      .ilike("brand", `%${brand}%`)

    console.log("AdvertisementPage - Supabase response:", { data, error })
    
    if (error || !data || data.length === 0) {
      console.log("AdvertisementPage - Redirecting to results due to:", error || "No data")
      redirect(`/results/${brand}`)
    }
    
    console.log("AdvertisementPage - Validation passed")
    return data
  } catch (error) {
    console.error("AdvertisementPage - Error:", error)
    redirect(`/results/${brand}`)
  }
}

export default async function AdvertisementPage(props: {
  params: BrandParams
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams

  let brandData
  if (searchParams.data) {
    // Use any data passed from the search
    brandData = JSON.parse(decodeURIComponent(searchParams.data))
  } else {
    // Fallback: validate the brand by looking for it in previous_sales
    brandData = await validateBrand(params.brand.toLowerCase())
  }

  return <AdvertisementClient brand={params.brand} brandData={brandData} />
}
