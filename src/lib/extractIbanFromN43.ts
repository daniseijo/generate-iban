import { spanishCCCToIBAN } from './cccToIban'

const START_REGISTRY_NUMBER = '11'

export async function extractIbanFromN43(file: File) {
  const text = await file.text()

  const lines = text.split('\n')

  const ibans = []

  for (const line of lines) {
    if (line.startsWith(START_REGISTRY_NUMBER)) {
      const ccc = line.substring(2, 20)

      if (ccc.length !== 18 || !Number.isInteger(Number(ccc))) {
        throw new Error(`Invalid ccc: ${ccc}`)
      }

      const iban = spanishCCCToIBAN(ccc)
      ibans.push(iban)
    }
  }

  return ibans
}
