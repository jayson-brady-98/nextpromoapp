import { redirect } from 'next/navigation'
import { AdvertisementClient } from './advertisement-client'
import { fetchPredictions } from '@/lib/api/prediction'

type BrandParams = Promise<{ brand: string }>

// Update validation to check predictions table
async function validateBrand(brand: string) {
  const prediction = await fetchPredictions(brand)
  if (!prediction) {
    redirect(`/results/${brand}`)
  }
}

export default async function AdvertisementPage(props: { params: BrandParams }) {
  const params = await props.params
  
  // Validate brand before rendering
  await validateBrand(params.brand)
  
  return <AdvertisementClient brand={params.brand} />
}
