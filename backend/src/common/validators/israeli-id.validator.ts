import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsIsraeliIdConstraint implements ValidatorConstraintInterface {
  validate(id: any) {
    if (id === null || id === undefined) return false;
    const s = String(id).trim();
    if (!/^[0-9]{1,9}$/.test(s)) return false;
    const padded = s.padStart(9, '0');
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const num = parseInt(padded[i], 10);
      const mult = i % 2 === 0 ? 1 : 2;
      const prod = num * mult;
      sum += Math.floor(prod / 10) + (prod % 10);
    }
    return sum % 10 === 0;
  }

  defaultMessage() {
    return 'ID Number must be a valid Israeli ID';
  }
}

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
