import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// export function Match(property: string, validationOptions?: ValidationOptions) {
//   return function (object: unknown, propertyName: string) {
//     registerDecorator({
//       name: 'isLongerThan',
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [property],
//       options: validationOptions,
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           const [relatedPropertyName] = args.constraints;
//           const relatedValue = (args.object as any)[relatedPropertyName];
//           return value === relatedValue;
//         },
//       },
//     });
//   };
// }

/**
 * ? reference: https://stackoverflow.com/questions/60451337/password-confirmation-in-typescript-with-class-validator
 * @param property
 * @param validationOptions
 * @returns
 */
export const Match = <T = any>(
  property: (o: T) => any,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [fn] = args.constraints;
          const fieldValue = fn(args.object);

          return fieldValue === value;
        },
        defaultMessage(args: ValidationArguments) {
          const [constraintProperty]: (() => any)[] = args.constraints;
          return `${constraintProperty} and ${args.property} does not match`;
        },
      },
    });
  };
};
