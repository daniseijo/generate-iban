'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { CopyButton } from './CopyButton'

export type IbanCardProps = {
  className?: string
}

export function IbanCard({ className }: IbanCardProps) {
  const iban = 'ES63 0081 5168 80 5183341899'

  return (
    <Card className={cn('w-96', className)}>
      <CardHeader>
        <CardTitle>Generador de IBAN</CardTitle>
        <CardDescription>
          Conoce los dígitos de seguridad de tu IBAN a partir de los datos de tu cuenta bancaria.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="text-sm">Pega aquí los datos de tu cuenta:</div>
          <div className="flex w-full items-center gap-2">
            <div className="basis-1/3 flex flex-col space-y-1">
              <Input maxLength={4} id="bank" placeholder="Banco" />
            </div>
            <div className="basis-1/3 flex flex-col space-y-1">
              <Input maxLength={4} id="entity" placeholder="Entidad" />
            </div>
            <div className="basis-2/3 flex flex-col space-y-1">
              <Input maxLength={10} id="account" placeholder="Número de cuenta" />
            </div>
          </div>
          <div className="text-sm">O bien, pega aquí directamente el CCC:</div>
          <div className="flex flex-col space-y-1">
            <Input maxLength={18} placeholder="Código de la cuenta cliente" />
          </div>
          <Separator />
          <div className="text-center text-lg font-semibold">{iban}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <CopyButton text={iban} />
      </CardFooter>
    </Card>
  )
}
