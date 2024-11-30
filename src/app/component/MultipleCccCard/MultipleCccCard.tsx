'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { formatIban } from '@/lib/utils'
import { GenerateEditFooter } from './GenerateEditFooter'
import { spanishCCCToIBAN } from '@/lib/cccToIban'

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
        const iban = spanishCCCToIBAN(ccc)
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
            {error && <p className="text-sm text-destructive">Cada CCC debe tener 18 dígitos.</p>}
          </>
        ) : (
          <div>
            {ibanList.map((iban, index) => (
              <div key={index} className="mb-1 text-center text-lg font-semibold">
                {iban}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <GenerateEditFooter
        editing={editing}
        setEditing={setEditing}
        handleGenerate={handleGenerate}
        text={ibanList.join('\n')}
      />
    </Card>
  )
}
