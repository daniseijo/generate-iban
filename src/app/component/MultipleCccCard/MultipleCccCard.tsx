'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { CopyOrDownloadButton } from './CopyOrDownloadButton'
import { spanishAccountNumberToIBAN } from '@/lib/cccToIban'
import { formatIban } from '@/lib/utils'

export function MultipleCccCard() {
  const [cccList, setCccList] = useState<string[]>([])
  const [ibanList, setIbanList] = useState<string[]>([])

  const [editing, setEditing] = useState(true)
  const [error, setError] = useState(false)

  const handleGenerate = () => {
    if (cccList.length === 0) {
      setError(true)
      return
    }

    const ibanList: string[] = []

    for (const ccc of cccList) {
      if (ccc.length === 0) {
        continue
      }

      if (ccc.length !== 18 || !ccc.match(/^\d+$/)) {
        setError(true)
        return
      }

      try {
        const iban = spanishAccountNumberToIBAN(ccc.slice(0, 4), ccc.slice(4, 8), ccc.slice(8, 18))
        ibanList.push(formatIban(iban))
      } catch (error) {
        console.error(error)
        setError(true)

        return
      }
    }

    setError(false)
    setIbanList(ibanList)
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Múltiples CCC</CardTitle>
        <CardDescription>
          Genera múltiples IBANs a partir de múltiples CCC. Incluye uno por línea y recuerda que cada uno debe tener 18
          dígitos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {editing ? (
          <>
            <Textarea
              value={cccList.join('\n')}
              onChange={(e) => setCccList(e.target.value.split('\n'))}
              placeholder="Pega aquí tantos CCC como quieras, uno por línea."
              rows={7}
            />
            {error && <p className="text-destructive text-sm ">Cada CCC debe tener 18 dígitos.</p>}
          </>
        ) : (
          <div>
            {ibanList.map((iban, index) => (
              <div key={index} className="text-center text-lg font-semibold mb-1">
                {iban}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {editing ? (
          <div className="flex w-full justify-end">
            <Button onClick={handleGenerate}>Generar</Button>
          </div>
        ) : (
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={() => setEditing(true)}>
              Editar
            </Button>

            <CopyOrDownloadButton text={ibanList.join('\n')} />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
