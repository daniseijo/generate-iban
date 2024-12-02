'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import Dropzone from '@/components/ui/dropzone'
import { useState } from 'react'
import { extractIbanFromN43 } from '@/lib/extractIbanFromN43'
import { Button } from '@/components/ui/button'
import { CopyOrDownloadButton } from '../MultipleCccCard/CopyOrDownloadButton'
import { uniqueIbansFromRecord } from './utils'
import { Separator } from '@/components/ui/separator'
import { formatIban } from '@/lib/utils'

export function Norma43Card() {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [editing, setEditing] = useState(true)
  const [filesRecord, setFilesRecord] = useState<Record<string, string[]>>({})
  const [error, setError] = useState(false)

  const handleGenerate = async () => {
    if (acceptedFiles.length === 0) {
      setError(true)
      return
    }

    for (const file of acceptedFiles) {
      const ibansFromFile = await extractIbanFromN43(file)

      setFilesRecord((previousState) => ({ ...previousState, [file.name]: ibansFromFile }))
    }

    setError(false)
    setEditing(false)
  }

  const handleEdit = () => {
    setFilesRecord({})
    setAcceptedFiles([])
    setEditing(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Norma 43</CardTitle>
        <CardDescription>
          Genera múltiples IBANs a partir de ficheros Norma43. Puedes descargar todos los IBANs directamente o un
          fichero JSON separados por fichero.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {editing ? (
          <>
            <Dropzone setAcceptedFiles={setAcceptedFiles} accept={{ 'text/plain': ['.txt'] }} />
            {error && <p className="text-sm text-destructive">Añade al menos un fichero de Norma43.</p>}
          </>
        ) : (
          <div>
            {Object.entries(filesRecord).map(([key, ibanList]) => (
              <Card key={key} className="mb-4">
                <CardHeader className="px-4 py-2 text-center font-semibold">
                  <div className="truncate">{key}</div>
                </CardHeader>
                <Separator />
                <CardContent className="mt-4 space-y-1">
                  {ibanList.length === 0 ? (
                    <p className="text-center text-lg">No se encontró ningún IBAN</p>
                  ) : (
                    ibanList.map((iban) => (
                      <p className="text-center text-lg" key={iban}>
                        {formatIban(iban)}
                      </p>
                    ))
                  )}
                </CardContent>
              </Card>
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
            <Button variant="outline" onClick={handleEdit}>
              Editar
            </Button>

            <CopyOrDownloadButton text={uniqueIbansFromRecord(filesRecord).join('\n')} json={filesRecord} />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
