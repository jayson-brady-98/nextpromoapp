import { redirect } from 'next/navigation'
import { sampleBrands } from '@/lib/sample-data'
import { AdvertisementClient } from './advertisement-client'

type BrandParams = Promise<{ brand: string }>

// Add server-side validation
async function validateBrand(brand: string) {
  const brandExists = sampleBrands[brand.toLowerCase()]
  if (!brandExists) {
    redirect(`/results/${brand}`)
  }
}

export default async function AdvertisementPage(props: { params: BrandParams }) {
  const params = await props.params
  
  // Validate brand before rendering
  validateBrand(params.brand)
  
  return <AdvertisementClient brand={params.brand} />
}
