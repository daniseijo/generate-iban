import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { MouseEventHandler } from 'react'
import { CopyOrDownloadButton } from './CopyOrDownloadButton'

type GenerateEditFooterProps = {
  editing: boolean
  setEditing: (value: boolean) => void
  handleGenerate: MouseEventHandler<HTMLButtonElement>
  text: string
}

export function GenerateEditFooter({ editing, setEditing, handleGenerate, text }: GenerateEditFooterProps) {
  return (
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

          <CopyOrDownloadButton text={text} />
        </div>
      )}
    </CardFooter>
  )
}
