import { Button } from '@/components/ui/button'
import { ModeToggle } from './component/ModeToggle'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-end">
        <ModeToggle className="m-4" />
      </header>
      <main className="flex flex-col items-center justify-center">
        <Button className="mt-16">Click me</Button>
      </main>
    </div>
  )
}
