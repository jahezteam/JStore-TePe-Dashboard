// export function convertToFormData(
//   data: any,
//   formData: FormData = new FormData(),
//   parentKey: string | null = null,
// ): FormData {
//   if (data instanceof File) {
//     // Handle files explicitly
//     if (parentKey) {
//       console.log('parentKey', parentKey);
//       console.log('data.name', data.name);
//       formData.append(parentKey, data, data.name);
//     }
//   } else if (Array.isArray(data)) {
//     // Handle arrays explicitly
//     data.forEach((item, index) => {
//       const key = parentKey ? `${parentKey}[${index}]` : `${index}`;
//       convertToFormData(item, formData, key);
//     });
//   } else if (typeof data === 'object' && data !== null) {
//     // Handle objects
//     Object.keys(data).forEach((key) => {
//       const value = data[key];
//       const newKey = parentKey ? `${parentKey}.${key}` : key;
//       convertToFormData(value, formData, newKey);
//     });
//   } else {
//     // Handle primitive types
//     if (parentKey) {
//       formData.append(parentKey, data);
//     }
//   }
//   return formData;
// }
export function convertToFormData(
  data: any,
  formData: FormData = new FormData(),
  parentKey: string | null = null,
): FormData {
  // Helper function to check if a value is valid
  const hasValue = (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
  };

  if (!hasValue(data)) {
    // Skip if the data itself is invalid
    return formData;
  }

  if (data instanceof File) {
    // Handle files explicitly
    if (parentKey) {
      console.log('parentKey', parentKey);
      console.log('data.name', data.name);
      formData.append(parentKey, data, data.name);
    }
  } else if (Array.isArray(data)) {
    // Handle arrays explicitly
    data.forEach((item, index) => {
      const key = parentKey ? `${parentKey}[${index}]` : `${index}`;
      convertToFormData(item, formData, key); // Recursive call
    });
  } else if (typeof data === 'object' && data !== null) {
    // Handle objects explicitly
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (hasValue(value)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        convertToFormData(value, formData, newKey); // Recursive call
      }
    });
  } else {
    // Handle primitive types
    if (parentKey && hasValue(data)) {
      formData.append(parentKey, data);
    }
  }

  return formData;
}
