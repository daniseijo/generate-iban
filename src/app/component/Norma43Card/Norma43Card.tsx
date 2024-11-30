'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Dropzone from '@/components/ui/dropzone'
import { useState } from 'react'
import { GenerateEditFooter } from '../MultipleCccCard/GenerateEditFooter'
import { extractIbanFromN43 } from '@/lib/extractIbanFromN43'

export function Norma43Card() {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [editing, setEditing] = useState(true)
  const [ibanList, setIbanList] = useState(new Set<string>())

  const handleGenerate = async () => {
    for (const file of acceptedFiles) {
      const ibansFromFile = await extractIbanFromN43(file)

      setIbanList((previousState) => new Set([...previousState, ...ibansFromFile]))
    }

    setEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Norma 43</CardTitle>
        <CardDescription>
          Genera múltiples IBANs a partir de múltiples CCC. Incluye uno por línea y recuerda que cada uno debe tener 18
          dígitos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {editing ? (
          <Dropzone setAcceptedFiles={setAcceptedFiles} accept={{ 'text/plain': ['.txt'] }} />
        ) : (
          <div>
            {[...ibanList].map((iban) => (
              <div key={iban}>{iban}</div>
            ))}
          </div>
        )}
      </CardContent>
      <GenerateEditFooter editing={editing} setEditing={setEditing} handleGenerate={handleGenerate} text="" />
    </Card>
  )
}
