'use client'

import { Button } from '@/components/ui/button'
import { ChevronDownIcon, DownloadIcon } from 'lucide-react'
import { ButtonGroup } from '@/components/ui/button-group'
import { CopyButton } from '../IbanCard/CopyButton'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function CopyOrDownloadButton({ text }: Readonly<{ text: string }>) {
  const downloadFile = (text: string) => {
    const blob = new Blob([text.replaceAll(' ', '')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'generated-ibans.txt'
    link.href = url
    link.click()
  }

  return (
    <ButtonGroup>
      <CopyButton text={text} className="active:bg-primary/75" />
      <Separator orientation="vertical" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-9 rounded-l-none border-l-0 active:bg-primary/75">
            <ChevronDownIcon className="h-9 w-9" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => downloadFile(text)}>
            <DownloadIcon className="mr-2" />
            Descargar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
