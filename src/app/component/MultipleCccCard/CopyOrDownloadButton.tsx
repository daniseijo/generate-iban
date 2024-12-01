'use client'

import { Button } from '@/components/ui/button'
import { ChevronDownIcon, DownloadIcon, FileJson2Icon } from 'lucide-react'
import { ButtonGroup } from '@/components/ui/button-group'
import { CopyButton } from '../IbanCard/CopyButton'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { downloadFile } from '@/lib/utils'

type CopyOrDownloadButtonProps = {
  text: string
  json?: Record<string, string[]>
}

export function CopyOrDownloadButton({ text, json }: CopyOrDownloadButtonProps) {
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
          <DropdownMenuItem onClick={() => downloadFile(text.replaceAll(' ', ''))}>
            <DownloadIcon className="mr-2" />
            Descargar
          </DropdownMenuItem>
          {json && (
            <DropdownMenuItem
              onClick={() => downloadFile(JSON.stringify(json, null, 2), 'application/json', 'ibans-per-file.json')}
            >
              <FileJson2Icon className="mr-2" />
              Descargar JSON
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
