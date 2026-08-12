// Define the Student interface
interface Student {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

// Generic API Response interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Example usage with a single student
const singleStudentResponse: ApiResponse<Student> = {
  success: true,
  data: {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    status: 'active',
  },
};

// Example usage with an array of students
const manyStudentsResponse: ApiResponse<Student[]> = {
  success: true,
  data: [
    { id: 1, name: 'John Doe', email: 'john.doe@university.edu', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@university.edu', status: 'inactive' },
  ],
};

console.log('\nSingle Student API Response:');
console.log(singleStudentResponse);

console.log('\nMultiple Students API Response:');
console.log(manyStudentsResponse);

// Function to format a student
function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${student.status})`;
}

// Create a sample student
const sampleStudent: Student = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@university.edu',
  status: 'active',
};

// Display the result
console.log('\nFormatted Student:');
console.log(formatStudent(sampleStudent));

// ============================================
// STUDENT STATUS FORMATTER
// ============================================

/**
 * Type definition for student status
 * Restricts values to only "active" or "inactive"
 */
type StudentStatus = 'active' | 'inactive';

/**
 * Converts a student status to a user-friendly label
 *
 * @param status - The student's status ("active" or "inactive")
 * @returns A formatted label string
 *
 * @example
 * getStudentStatusLabel("active") // Returns "Active Student"
 * getStudentStatusLabel("inactive") // Returns "Inactive Student"
 *
 * @throws {Error} If status is not "active" or "inactive"
 */
function getStudentStatusLabel(status: StudentStatus): string {
  // Runtime validation
  if (status !== 'active' && status !== 'inactive') {
    throw new Error(`Invalid status: "${status}". Status must be "active" or "inactive"`);
  }

  // Return the formatted label
  return status === 'active' ? 'Active Student' : 'Inactive Student';
}

// ============================================
// TEST THE STATUS FORMATTER
// ============================================

console.log('\n--- Status Formatter Tests ---');

// Test valid statuses
try {
  console.log(`✅ "active" → "${getStudentStatusLabel('active')}"`);
  // Expected: "active" → "Active Student"
} catch (error) {
  if (error instanceof Error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

try {
  console.log(`✅ "inactive" → "${getStudentStatusLabel('inactive')}"`);
  // Expected: "inactive" → "Inactive Student"
} catch (error) {
  if (error instanceof Error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

// Test invalid status (should throw error)
try {
  // @ts-expect-error - Testing invalid status
  console.log(`Testing "pending": ${getStudentStatusLabel('pending')}`);
  console.log('❌ This should have thrown an error!');
} catch (error) {
  if (error instanceof Error) {
    console.log(`✅ Caught invalid status: ${error.message}`);
  }
}

// Export if you need to use in other files
export { Student, formatStudent, getStudentStatusLabel };

// ============================================
// RUNTIME VALIDATION FUNCTION - FIXED
// ============================================

/**
 * Validates that unknown data conforms to the Student interface
 * @param data - The unknown data to validate
 * @returns A validated Student object
 * @throws Error if validation fails
 */
function validateStudent(data: unknown): Student {
  // Check if data is an object and not null
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid student data: must be an object');
  }

  const obj = data as Record<string, unknown>;

  // Check id
  if (!('id' in obj) || typeof obj.id !== 'number') {
    throw new Error('Invalid student data: id must be a number');
  }

  // Check name
  if (!('name' in obj) || typeof obj.name !== 'string' || obj.name.trim() === '') {
    throw new Error('Invalid student data: name must be a non-empty string');
  }

  // Check email
  if (!('email' in obj) || typeof obj.email !== 'string' || !obj.email.includes('@')) {
    throw new Error('Invalid student data: email must be a string containing @');
  }

  // Check status
  if (!('status' in obj) || (obj.status !== 'active' && obj.status !== 'inactive')) {
    throw new Error('Invalid student data: status must be "active" or "inactive"');
  }

  // ✅ FIXED: Double cast through unknown to satisfy TypeScript
  return obj as unknown as Student;
}

// ============================================
// TEST CASES - FIXED
// ============================================

console.log('\n--- Runtime Validation Tests ---\n');

// Test 1: Valid object - should succeed
try {
  const validStudent = {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@university.edu',
    status: 'active' as const,
  };
  const validated = validateStudent(validStudent);
  console.log('✅ Valid student passed:', validated);
} catch (error) {
  // ✅ FIXED: Proper error handling
  if (error instanceof Error) {
    console.log('❌ Unexpected error:', error.message);
  } else {
    console.log('❌ Unexpected error:', String(error));
  }
}

// Test 2: Invalid object - incorrect id type (string instead of number)
try {
  const invalidIdStudent = {
    id: '1', // ❌ Should be a number
    name: 'Bob Wilson',
    email: 'bob@university.edu',
    status: 'active' as const,
  };
  const validated = validateStudent(invalidIdStudent);
  console.log('❌ This should have failed:', validated);
} catch (error) {
  // ✅ FIXED: Proper error handling
  if (error instanceof Error) {
    console.log('✅ Caught invalid id:', error.message);
  } else {
    console.log('✅ Caught invalid id:', String(error));
  }
}

// Test 3: Invalid object - missing name
try {
  const missingNameStudent = {
    id: 2,
    // name is missing ❌
    email: 'charlie@university.edu',
    status: 'active' as const,
  };
  const validated = validateStudent(missingNameStudent);
  console.log('❌ This should have failed:', validated);
} catch (error) {
  // ✅ FIXED: Proper error handling
  if (error instanceof Error) {
    console.log('✅ Caught missing name:', error.message);
  } else {
    console.log('✅ Caught missing name:', String(error));
  }
}

// Test 4: Extra - invalid status value
try {
  const invalidStatusStudent = {
    id: 3,
    name: 'Diana Prince',
    email: 'diana@university.edu',
    status: 'pending', // ❌ Invalid status
  };
  const validated = validateStudent(invalidStatusStudent);
  console.log('❌ This should have failed:', validated);
} catch (error) {
  if (error instanceof Error) {
    console.log('✅ Caught invalid status:', error.message);
  } else {
    console.log('✅ Caught invalid status:', String(error));
  }
}

// Additional edge case tests
console.log('\n--- Edge Case Tests ---');

// Test with uppercase values (should fail)
try {
  // @ts-expect-error - Testing uppercase
  console.log(`Testing "ACTIVE": ${getStudentStatusLabel('ACTIVE')}`);
  console.log('❌ This should have failed!');
} catch (error) {
  if (error instanceof Error) {
    console.log(`✅ Caught uppercase status: ${error.message}`);
  }
}

// Test with empty string (should fail)
try {
  // @ts-expect-error - Testing empty string
  console.log(`Testing "": ${getStudentStatusLabel('')}`);
  console.log('❌ This should have failed!');
} catch (error) {
  if (error instanceof Error) {
    console.log(`✅ Caught empty status: ${error.message}`);
  }
}

console.log('\n--- End of Tests ---');
