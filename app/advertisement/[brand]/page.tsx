import { redirect } from 'next/navigation'
import { AdvertisementClient } from './advertisement-client'
import { fetchPredictions } from '@/lib/api/prediction'

type BrandParams = Promise<{ brand: string }>

// Update validation to check predictions table
async function validateBrand(brand: string) {
  console.log('AdvertisementPage - Validating brand:', brand)
  const prediction = await fetchPredictions(brand)
  console.log('AdvertisementPage - Received prediction:', prediction)
  console.log('AdvertisementPage - Type of prediction:', typeof prediction)
  console.log('AdvertisementPage - Is prediction truthy?:', !!prediction)
  
  if (!prediction) {
    console.log('AdvertisementPage - Redirecting to results')
    redirect(`/results/${brand}`)
  }
  console.log('AdvertisementPage - Validation passed')
}

export default async function AdvertisementPage(props: { params: BrandParams }) {
  const params = await props.params
  
  // Validate brand before rendering
  await validateBrand(params.brand)
  
  return <AdvertisementClient brand={params.brand} />
}
