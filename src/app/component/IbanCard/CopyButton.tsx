'use client'

import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckIcon, ClipboardIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CopyButtonProps = {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text.replaceAll(' ', ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <Button onClick={copy} className={cn(`${copied && 'bg-green-400 hover:bg-green-400'}`, className)}>
      {copied ? (
        <>
          <CheckIcon /> Copiado
        </>
      ) : (
        <>
          <ClipboardIcon /> Copiar
        </>
      )}
    </Button>
  )
}
