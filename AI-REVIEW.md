# AI Review Form

## AI Tool:
ChatGPT (GPT-4)

## Prompt Used:
"Suggest a TypeScript implementation for converting a student's active/inactive status into a readable label. The status values are 'active' and 'inactive'. The output should be 'Active Student' for active and 'Inactive Student' for inactive. Handle invalid input safely. Do not use the any type."

## AI Recommendation:
```typescript
export type StudentStatus = 'active' | 'inactive';

export function getStudentStatusLabel(status: unknown): string {
  if (typeof status !== 'string') {
    throw new TypeError('Student status must be a string.');
  }

  if (!isStudentStatus(status)) {
    throw new Error(
      `Invalid student status: ${status}. Expected 'active' or 'inactive'.`
    );
  }

  switch (status) {
    case 'active':
      return 'Active Student';
    case 'inactive':
      return 'Inactive Student';
  }
}

function isStudentStatus(value: string): value is StudentStatus {
  return value === 'active' || value === 'inactive';
}
```

The AI suggested a function that accepts `unknown` as the parameter type and uses a type guard (`isStudentStatus`) to validate the input at runtime before processing it. It uses a `switch` statement for the conversion and a union type `StudentStatus` to restrict valid values.

## What I Understood:
The AI's code uses a defensive programming approach:
1. Accepts `unknown` so that callers cannot bypass runtime validation.
2. Uses a type guard (`value is StudentStatus`) to narrow the type after checking.
3. Throws a `TypeError` for non-string input and a regular `Error` for invalid string values.
4. Uses a `switch` statement, which is readable and extensible if more statuses are added later.
5. The function is exported for reuse in other modules.

## Recommendation Accepted:
Yes — I accepted the overall structure, the error-handling strategy (throwing on invalid input), the union type `StudentStatus`, and the acceptance-criteria mapping ('active' → 'Active Student', 'inactive' → 'Inactive Student').

## Recommendation Modified:
I modified the parameter type from `unknown` to `StudentStatus`. Since the `getStudentStatusLabel` function is called only from within the same TypeScript project where the caller already knows the status value, using the typed union provides compile-time safety and is simpler. I kept the runtime guard as a defensive fallback in case the function is ever called with externally-sourced data. I also replaced the `switch` with a ternary expression (`status === 'active' ? 'Active Student' : 'Inactive Student'`) because it is more concise for only two values, and the dead-code branch in the original switch (the missing default) was unreachable. I added JSDoc comments and inline test cases.

## Recommendation Rejected:
The use of `unknown` as the parameter type. The AI correctly identified that `unknown` is the safest input type for data coming from untrusted sources, but for this specific function — where the caller is always internal TypeScript code that already works with the `StudentStatus` union — using `unknown` adds unnecessary complexity. The type guard pattern would be better reserved for the `validateStudent` function (Part 7) that handles data from an external API.

## Reason:
The AI recommendation was well-designed for maximum safety, but the lab's Part 18 example shows a simpler `StudentStatus` union type, and the function's primary callers are internal code (e.g., the sample student objects defined in `src/index.ts`). Using `unknown` here would shift validation logic that the TypeScript compiler can already enforce. The `unknown` + type-guard approach is still the correct pattern for `validateStudent`, and I used it there. For `getStudentStatusLabel`, the simpler typed approach satisfies the requirement that "no `any` type" is used while remaining type-safe and readable.
