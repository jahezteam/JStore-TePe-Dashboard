export function convertToFormData(
  data: any,
  formData: FormData = new FormData(),
  parentKey: string | null = null,
): FormData {
  if (data instanceof File) {
    // Handle files explicitly
    if (parentKey) {
      formData.append(parentKey, data);
    }
  } else if (Array.isArray(data)) {
    // Handle arrays explicitly
    data.forEach((item, index) => {
      const key = parentKey ? `${parentKey}[${index}]` : `${index}`;
      convertToFormData(item, formData, key);
    });
  } else if (typeof data === 'object' && data !== null) {
    // Handle objects
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      convertToFormData(value, formData, newKey);
    });
  } else {
    // Handle primitive types
    if (parentKey) {
      formData.append(parentKey, data);
    }
  }
  return formData;
}
