import { redirect } from 'next/navigation'
import { AdvertisementClient } from './advertisement-client'
import { createClient } from '@supabase/supabase-js'

type BrandParams = Promise<{ brand: string }>

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function validateBrand(brand: string) {
  console.log('AdvertisementPage - Validating brand:', brand)
  
  try {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .ilike('brand_name', `%${brand}%`)
      .single()
    
    console.log('AdvertisementPage - Supabase response:', { data, error })
    
    if (error || !data) {
      console.log('AdvertisementPage - Redirecting to results due to:', error || 'No data')
      redirect(`/results/${brand}`)
    }
    
    console.log('AdvertisementPage - Validation passed')
    return data
  } catch (error) {
    console.error('AdvertisementPage - Error:', error)
    redirect(`/results/${brand}`)
  }
}

export default async function AdvertisementPage(props: { params: BrandParams }) {
  const params = await props.params
  await validateBrand(params.brand.toLowerCase())
  return <AdvertisementClient brand={params.brand} />
}
