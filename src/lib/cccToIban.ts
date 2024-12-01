/**
 * Generates IBAN control digits from only the data from the entity, office and account number as a ccc.
 *
 * @param ccc 18 digits with all account info.
 * @returns the complete IBAN.
 */
export function spanishCCCToIBAN(ccc: string) {
  if (ccc.length !== 18) {
    throw new Error('CCC must have 18 characters')
  }

  return spanishAccountNumberToIBAN(ccc.slice(0, 4), ccc.slice(4, 8), ccc.slice(8, 18))
}

/**
 * Generates IBAN control digits from only the data from the entity, office and account number.
 *
 * @param entityKey 4 digits entity number as string.
 * @param officeKey 4 digits office number as string.
 * @param accountNumber 10 digits account number as string.
 * @returns the complete IBAN.
 */
export function spanishAccountNumberToIBAN(entityKey: string, officeKey: string, accountNumber: string): string {
  const countryCode = 'ES'

  const firstDigit = calculateFirstDigit(entityKey, officeKey)
  const secondDigit = calculateSecondDigit(accountNumber)

  const ccc = `${entityKey}${officeKey}${firstDigit}${secondDigit}${accountNumber}`

  return generateIBANCheckDigit(countryCode, ccc)
}

function calculateFirstDigit(entityKey: string, officeKey: string): string {
  return calculateDigit(entityKey + officeKey)
}

function calculateSecondDigit(accountNumber: string): string {
  return calculateDigit(accountNumber)
}

/**
 * Calculate the control digits with the modular multiplier.
 *
 * Check the url for more info on how to recover the control digits:
 *
 * https://melchordemacanaz.es/elbauldelasmates/0_material/02_numeros/1eso/1ESO_T1_T2_Naturales_Potencias_08_Otros_Materiales/Calcular_digitos_control_bancos.pdf
 *
 * @param charString
 * @returns Control Digit
 */
function calculateDigit(charString: string): string {
  const multiplier = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6]

  const modularCalculation = charString.split('').reduce((prev, char, index) => {
    const charMultiplierIndex = multiplier.length - charString.length + index

    return prev + parseInt(char) * multiplier[charMultiplierIndex]
  }, 0)

  const remainder = 11 - (modularCalculation % 11)

  // Exceptions for 10 and 11
  if (remainder === 10) {
    return '1'
  }
  if (remainder === 11) {
    return '0'
  }

  return remainder.toString()
}

/**
 * Generates the check digits for an IBAN from a CCC.
 *
 * Check the url for more info on how to recover the check digits:
 *
 * https://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
 *
 * @param countryCode
 * @param ccc
 * @returns complete IBAN
 */
export function generateIBANCheckDigit(countryCode: string, ccc: string): string {
  if (countryCode.toUpperCase() === 'ES' && ccc.length !== 20) {
    throw new Error(`CCC should have 20 characters for country code ES. Current length: ${ccc.length}`)
  }
  if (countryCode.length !== 2) {
    throw new Error('Country code must have 2 characters')
  }

  // Concat country code as number and 00 to the end of CCC
  const countryCodeNumbers = countryCode
    .split('')
    .map((char) => characterIBANToNumber(char))
    .concat([0, 0])

  const concatCountryCodeCCC = ccc + countryCodeNumbers.join('')

  // Calculate the checkDigits
  const checkDigits = 98 - largeNumberMod(concatCountryCodeCCC, 97)

  return `${countryCode.toUpperCase()}${checkDigits.toLocaleString('en-EN', { minimumIntegerDigits: 2 })}${ccc}`
}

/**
 * Transforms a character from the IBAN prefix to a number going from A=10 to Z=35
 *
 * @param character case insensitive character from A to Z
 * @returns number from 10 to 35
 */
function characterIBANToNumber(character: string) {
  const OFFSET = 87

  const lowerCaseCharacter = character.toLowerCase()

  if (/^[a-z]$/.test(lowerCaseCharacter)) {
    return lowerCaseCharacter.charCodeAt(0) - OFFSET
  }
  throw new Error('Invalid character')
}

/**
 * Calculates module of a large number represented as a string
 *
 * @param largeNumber string representation of a large number
 * @param divisor number to calculate the module
 * @returns module of the large number
 */
function largeNumberMod(largeNumber: string, divisor: number) {
  let remainder = 0

  // One by one processing all digits of the large number
  for (const digit of largeNumber) {
    remainder = (remainder * 10 + parseInt(digit)) % divisor
  }

  return remainder
}
