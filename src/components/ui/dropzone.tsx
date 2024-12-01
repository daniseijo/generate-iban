import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
import { type DropzoneProps as _DropzoneProps, type DropzoneState } from 'react-dropzone'
import { FileTextIcon, ImageIcon, Trash2Icon, UploadIcon } from 'lucide-react'

export interface DropzoneProps extends Omit<_DropzoneProps, 'children'> {
  containerClassName?: string
  dropZoneClassName?: string
  children?: (dropzone: DropzoneState) => React.ReactNode
  showFilesList?: boolean
  showErrorMessage?: boolean
  setAcceptedFiles: (value: React.SetStateAction<File[]>) => void
}

const Dropzone = ({
  containerClassName,
  dropZoneClassName,
  children,
  showFilesList = true,
  setAcceptedFiles,
  ...props
}: DropzoneProps) => {
  // Constants:
  const dropzone = useDropzone({
    ...props,
    onDrop(acceptedFiles, fileRejections, event) {
      if (props.onDrop) props.onDrop(acceptedFiles, fileRejections, event)
      else {
        setFilesUploaded((_filesUploaded) => [..._filesUploaded, ...acceptedFiles])
        setAcceptedFiles((_filesUploaded) => [..._filesUploaded, ...acceptedFiles])
        if (fileRejections.length > 0) {
          let _errorMessage = `No se pudo subir: ${fileRejections[0].file.name}`
          if (fileRejections.length > 1) {
            _errorMessage += ` y otros ${fileRejections.length - 1} archivos`
          }

          _errorMessage += '. Por favor, carga solamente archivos .txt de Norma43.'
          setErrorMessage(_errorMessage)
        } else {
          setErrorMessage('')
        }
      }
    },
  })

  // State:
  const [filesUploaded, setFilesUploaded] = useState<File[]>([])
  const [errorMessage, setErrorMessage] = useState<string>()

  // Functions:
  const deleteUploadedFile = (index: number) => {
    setFilesUploaded((_uploadedFiles) => [..._uploadedFiles.slice(0, index), ..._uploadedFiles.slice(index + 1)])
    setAcceptedFiles((_uploadedFiles) => [..._uploadedFiles.slice(0, index), ..._uploadedFiles.slice(index + 1)])
  }

  // Return:
  return (
    <div className={cn('flex flex-col gap-2', containerClassName)}>
      <div
        {...dropzone.getRootProps()}
        className={cn(
          'flex h-32 w-full cursor-pointer select-none items-center justify-center rounded-lg border-2 border-dashed border-gray-200 transition-all hover:bg-accent hover:text-accent-foreground',
          dropZoneClassName,
        )}
      >
        <input {...dropzone.getInputProps()} />
        {children ? (
          children(dropzone)
        ) : dropzone.isDragAccept ? (
          <div className="text-sm font-medium">Drop your files here!</div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex flex-row items-center gap-0.5 text-sm font-medium">
              <UploadIcon className="mr-2 h-4 w-4" /> Upload files
            </div>
            {props.maxSize && (
              <div className="text-xs font-medium text-gray-400">
                Max. file size: {(props.maxSize / 1024).toFixed(2)} KB
              </div>
            )}
          </div>
        )}
      </div>
      {errorMessage && <span className="mt-3 text-xs text-red-600">{errorMessage}</span>}
      {showFilesList && filesUploaded.length > 0 && (
        <div className={`'h-fit' mt-2 flex w-full flex-col gap-2 ${filesUploaded.length > 0 ? 'pb-2' : ''}`}>
          <div className="h-full w-full">
            {filesUploaded.map((fileUploaded, index) => (
              <div
                key={index}
                className="mt-2 flex h-16 w-full flex-row items-center justify-between rounded-lg border-2 border-solid border-gray-200 px-4 shadow-sm"
              >
                <div className="flex h-full flex-row items-center gap-4 overflow-hidden">
                  {fileUploaded.type === 'text/plain' ? (
                    <FileTextIcon className="h-6 w-6 min-w-6 text-rose-700" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-rose-700" />
                  )}
                  <div className="flex flex-col gap-0 overflow-hidden">
                    <div className="truncate text-[0.85rem] font-medium leading-snug">
                      {fileUploaded.name.split('.').slice(0, -1).join('.')}
                    </div>
                    <div className="text-[0.7rem] leading-tight text-gray-500">
                      .{fileUploaded.name.split('.').pop()} • {(fileUploaded.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                </div>
                <div
                  className="ml-2 cursor-pointer select-none rounded-full border-2 border-solid border-gray-100 p-2 shadow-sm transition-all hover:bg-accent"
                  onClick={() => deleteUploadedFile(index)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Exports:
export default Dropzone
