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
    
    if (error || !data || data.length === 0) {
      console.log("4a. Redirecting to results because:", error || "No data found")
      redirect(`/results/${brand}`)
    }
    
    console.log("4b. Validation passed, returning data")
    return data
  } catch (error) {
    console.error("5. Error during validation:", error)
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
