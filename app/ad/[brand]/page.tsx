import { AdDisplay } from './components/AdDisplay'

type AdPageProps = {
  params: {
    brand: string
  }
}

export default function AdPage({ params }: AdPageProps) {
  return <AdDisplay brand={params.brand} />
}

