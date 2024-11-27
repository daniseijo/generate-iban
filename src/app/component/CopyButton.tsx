'use client'

import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckIcon, ClipboardIcon } from 'lucide-react'

export function CopyButton({ text }: Readonly<{ text: string }>) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text.replaceAll(' ', ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])
  return (
    <Button onClick={copy}>
      {copied ? (
        <>
          <CheckIcon /> Copiado
        </>
      ) : (
        <>
          <ClipboardIcon /> Copiar al portapapeles
        </>
      )}
    </Button>
  )
}
