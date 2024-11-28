import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IbanCard } from './IbanCard'
import { cn } from '@/lib/utils'
import { MultipleCccCard } from './MultipleCccCard'

export type GeneratorTabsProps = {
  className?: string
}

export function GeneratorTabs({ className }: GeneratorTabsProps) {
  return (
    <Tabs defaultValue="one-ccc" className={cn('w-96', className)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="one-ccc">Generador de IBAN</TabsTrigger>
        <TabsTrigger value="multiple-ccc">Múltiples CCC</TabsTrigger>
      </TabsList>
      <TabsContent value="one-ccc">
        <IbanCard />
      </TabsContent>
      <TabsContent value="multiple-ccc">
        <MultipleCccCard />
      </TabsContent>
    </Tabs>
  )
}
