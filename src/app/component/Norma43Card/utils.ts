export function uniqueIbansFromRecord(filesRecord: Record<string, string[]>) {
  const ibans: string[] = []

  Object.values(filesRecord).forEach((ibanList) => ibans.push(...ibanList))

  return [...new Set(ibans)]
}
