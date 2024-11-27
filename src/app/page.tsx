import { Button } from '@/components/ui/button'
import { ModeToggle } from './component/ModeToggle'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ModeToggle />
      <Button>Click me</Button>
    </div>
  )
}
