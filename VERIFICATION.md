# AI Recommendation Verification

## Claim or Code Verified:
TypeScript union type syntax: `type StudentStatus = 'active' | 'inactive';`

## Source:
TypeScript Handbook — "Everyday Types" chapter, "Union types" section
URL: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types

## Result:
Verified. Union types allow a value to be one of several types or literal values. `'active' | 'inactive'` is the correct syntax for restricting a variable to exactly those two string literals. This is the recommended TypeScript approach for representing a fixed set of status values.

---

## Claim or Code Verified:
Type guard with `is` operator: `function isStudentStatus(value: string): value is StudentStatus`

## Source:
TypeScript Handbook — "Narrowing" chapter, "Using type predicates" section
URL: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

## Result:
Verified. A type predicate (`parameterName is Type`) is the correct TypeScript mechanism for telling the compiler that a function narrows a type. After `isStudentStatus(status)` returns `true`, TypeScript knows `status` is of type `StudentStatus` within the branch. This is the documented way to perform runtime type checks on string-literal unions.

---

## Claim or Code Verified:
`unknown` type as a safer alternative to `any`

## Source:
TypeScript Handbook — "Everyday Types" chapter, "The primitives: unknown" section
URL: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives

## Result:
Verified. The `unknown` type represents a value whose type is not known at compile time. Unlike `any`, TypeScript does not allow unsafe operations on `unknown` values without first performing type narrowing (e.g., `typeof` checks or type guards). The AI's suggestion to use `unknown` as the parameter type for data from untrusted sources is correct and follows TypeScript best practices. The ESLint configuration in this project already enforces `@typescript-eslint/no-explicit-any: "error"`, confirming that `unknown` is the proper alternative.

---

## Claim or Code Verified:
`@ts-expect-error` compiler directive

## Source:
TypeScript Documentation — "TypeScript for JavaScript Programmers" → "Type Checking" → "Suppressing errors"
URL: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppressing-errors-with-ts-expect-error

## Result:
Verified. The `@ts-expect-error` directive suppresses a compile-time error on the next line. It is commonly used in test code to intentionally pass an invalid value (e.g., `'pending'` or `'ACTIVE'`) to verify that runtime validation catches it. If TypeScript does not report an error on that line, the build will fail with "Unused '@ts-expect-error' directive", which serves as a safety check to ensure the suppression is actually needed.
