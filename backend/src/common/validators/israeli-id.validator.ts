import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * Validator constraint that checks if a value is a valid Israeli ID number.
 */
@ValidatorConstraint({ async: false })
export class IsIsraeliIdConstraint implements ValidatorConstraintInterface {
    /**
   * Validates if the provided value is a valid Israeli ID number.
   * 
   * @param id - The value to validate
   * @returns boolean indicating whether the value is a valid ID
   */
  validate(id: any) {
    if (id === null || id === undefined) return false;
    const s = String(id).trim();
    if (!/^[0-9]{1,9}$/.test(s)) return false;
    const padded = s.padStart(9, '0');
    let sum = 0;

    // Compute checksum using Israeli ID rules
    for (let i = 0; i < 9; i++) {
      const num = parseInt(padded[i], 10);
      const mult = i % 2 === 0 ? 1 : 2;
      const prod = num * mult;
      sum += Math.floor(prod / 10) + (prod % 10);
    }
    return sum % 10 === 0;
  }

    /**
   * Default error message if validation fails.
   */
  defaultMessage() {
    return 'ID Number must be a valid Israeli ID';
  }
}

/**
 * Decorator function to use the IsIsraeliId validator on class properties.
 * 
 * Usage:
 * @IsIsraeliId()
 * idNumber: string;
 * 
 * @param validationOptions Optional Class-Validator options (e.g., message)
 */
export function IsIsraeliId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIsraeliIdConstraint,
    });
  };
}
