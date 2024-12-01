'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { BackgroundPattern } from '@/components/background-pattern'

export default function AdPage({ params }: { params: { brand: string } }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          router.push(`/results/${params.brand}`)
          return 100
        }
        return Math.min(oldProgress + 1, 100)
      })
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [router, params.brand])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf0]">
      <BackgroundPattern />
      <div className="w-full max-w-4xl p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 aspect-video flex items-center justify-center">
          <p className="text-2xl text-gray-400">Advertisement Placeholder</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 mr-4">
            <CircularProgressbar
              value={progress}
              styles={buildStyles({
                pathColor: `url(#orangePurpleGradient)`,
                trailColor: '#d1d5db',
              })}
            >
              <defs>
                <linearGradient id="orangePurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </CircularProgressbar>
          </div>
          <p className="text-lg text-gray-600">We're preparing your results now.</p>
        </div>
      </div>
    </div>
  )
}

