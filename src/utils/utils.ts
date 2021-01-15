export async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export const sleep = async (ms: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res('');
    }, ms);
  });
