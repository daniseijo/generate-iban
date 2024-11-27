'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { CopyButton } from './CopyButton'
import { useEffect, useState } from 'react'
import { spanishAccountNumberToIBAN } from '@/lib/cccToIban'

export type IbanCardProps = {
  className?: string
}

export function IbanCard({ className }: IbanCardProps) {
  const [bank, setBank] = useState('')
  const [entity, setEntity] = useState('')
  const [account, setAccount] = useState('')
  const [ccc, setCcc] = useState('')
  const [iban, setIban] = useState('')

  useEffect(() => {
    if (ccc.length === 18 && Number.isInteger(Number(ccc)) && !ccc.includes('X')) {
      const iban = spanishAccountNumberToIBAN(ccc.slice(0, 4), ccc.slice(4, 8), ccc.slice(8, 18))
      setIban(`${iban.slice(0, 4)} ${iban.slice(4, 8)} ${iban.slice(8, 12)} ${iban.slice(12, 14)} ${iban.slice(14)}`)
    } else {
      setIban('')
    }
  }, [ccc])

  const handleBankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBank(event.target.value)
    const bankValue = event.target.value.padEnd(4, 'X')
    setCcc(bankValue + ccc.slice(4, 18))
  }

  const handleEntityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntity(event.target.value)
    const entityValue = event.target.value.padEnd(4, 'X')
    setCcc(bank + entityValue + ccc.slice(8, 18))
  }
  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(event.target.value)
    setCcc(bank + entity + event.target.value.padEnd(10, 'X'))
  }
  const handleCccChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCcc(event.target.value)
    setBank(event.target.value.slice(0, 4))
    setEntity(event.target.value.slice(4, 8))
    setAccount(event.target.value.slice(8, 18))
  }

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
              <Input maxLength={4} id="bank" placeholder="Banco" value={bank} onChange={handleBankChange} />
            </div>
            <div className="basis-1/3 flex flex-col space-y-1">
              <Input maxLength={4} id="entity" placeholder="Entidad" value={entity} onChange={handleEntityChange} />
            </div>
            <div className="basis-2/3 flex flex-col space-y-1">
              <Input
                maxLength={10}
                id="account"
                placeholder="Número de cuenta"
                value={account}
                onChange={handleAccountChange}
              />
            </div>
          </div>
          <div className="text-sm">O bien, pega aquí directamente el CCC:</div>
          <div className="flex flex-col space-y-1">
            <Input maxLength={18} placeholder="Código de la cuenta cliente" value={ccc} onChange={handleCccChange} />
          </div>
          {iban && (
            <>
              <Separator />
              <div className="text-center text-lg font-semibold">{iban}</div>
            </>
          )}
        </div>
      </CardContent>
      {iban && (
        <CardFooter className="flex justify-end">
          <CopyButton text={iban} />
        </CardFooter>
      )}
    </Card>
  )
}
