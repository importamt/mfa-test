import { MainNavigation } from './MainNavigation'
import { HeroBanner } from './HeroBanner'
import { ContentSection } from './ContentSection'
import { TVINGFestaBanner } from './TVINGFestaBanner'

export function MainPage() {
  return (
    <div className="min-h-screen bg-black">
      <MainNavigation />
      <HeroBanner />
      <ContentSection />
      <TVINGFestaBanner />
    </div>
  )
}