import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * Validator constraint that checks if a value is a valid universal ID.
 * Supports alphanumeric identifiers, optional dashes/underscores, length 5-20.
 */
@ValidatorConstraint({ async: false })
export class IsUniversalIdConstraint implements ValidatorConstraintInterface {
  validate(id: any) {
    if (id === null || id === undefined) return false;

    const s = String(id).trim();
    // Validate allowed characters (letters, digits, dash, underscore)
    if (!/^[a-zA-Z0-9-_]{5,20}$/.test(s)) return false;

    return true;
  }

  defaultMessage() {
    return 'ID must be 5-20 characters long and contain only letters, numbers, dash or underscore';
  }
}

/**
 * Decorator function to use the IsUniversalId validator on class properties.
 * 
 * Usage:
 * @IsUniversalId()
 * userId: string;
 * 
 * @param validationOptions Optional Class-Validator options (e.g., message)
 */
export function IsUniversalId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniversalIdConstraint,
    });
  };
}
