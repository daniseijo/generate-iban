import { ModeToggle } from './component/ModeToggle'
import { GeneratorTabs } from './component/GeneratorTabs'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-end">
        <ModeToggle className="m-4" />
      </header>
      <main className="flex flex-col items-center justify-center">
        <GeneratorTabs className="mt-8 mb-8" />
      </main>
    </div>
  )
}
