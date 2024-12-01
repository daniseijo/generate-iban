import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IbanCard } from './IbanCard'
import { cn } from '@/lib/utils'
import { MultipleCccCard } from './MultipleCccCard'
import { Norma43Card } from './Norma43Card'

export type GeneratorTabsProps = {
  className?: string
}

export function GeneratorTabs({ className }: GeneratorTabsProps) {
  return (
    <Tabs defaultValue="one-ccc" className={cn('w-96', className)}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="one-ccc">IBAN</TabsTrigger>
        <TabsTrigger value="multiple-ccc">Múltiples CCC</TabsTrigger>
        <TabsTrigger value="norma43">Norma43</TabsTrigger>
      </TabsList>
      <TabsContent value="one-ccc">
        <IbanCard />
      </TabsContent>
      <TabsContent value="multiple-ccc">
        <MultipleCccCard />
      </TabsContent>
      <TabsContent value="norma43">
        <Norma43Card />
      </TabsContent>
    </Tabs>
  )
}
