import { AdDisplay } from './components/AdDisplay'

type AdPageProps = {
  params: {
    brand: string
  }
}

export async function generateStaticParams() {
  // Replace with your logic to fetch available brands
  const brands = ['brand1', 'brand2', 'brand3'] // Example brands
  return brands.map((brand) => ({ brand }))
}

export default function AdPage({ params }: AdPageProps) {
  return <AdDisplay brand={params.brand} />
}

