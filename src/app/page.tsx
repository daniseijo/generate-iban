import { ModeToggle } from './component/ModeToggle'
import { IbanCard } from './component/IbanCard'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-end">
        <ModeToggle className="m-4" />
      </header>
      <main className="flex flex-col items-center justify-center">
        <IbanCard className="mt-8" />
      </main>
    </div>
  )
}
