const cache = new Map();

export async function fetchData(
  endpoint: string,
  formData: Record<string, string>,
  options: RequestInit
): Promise<any> {
  const cacheKey = endpoint + JSON.stringify(formData);

  if (cache.has(cacheKey)) {
    return Promise.resolve(cache.get(cacheKey));
  };
  try {
    const response = await fetch(endpoint, {
      ...options,
      body: JSON.stringify(formData),
    });
    return await handleResponse(response, cacheKey);
  } catch (error) {
    if ((error as any).isServerError) {
      console.error("Server Error: ", error);
    } else {
      console.error("Client Error: ", error);
    }
    throw error;
  };
}

async function handleResponse(response: Response, cacheKey: string) {
  if (response.status === 200) {
    const returnString = await response.text();
    cache.set(cacheKey, returnString);
    return returnString;
  } else {
    const invalidResponse = await response.text();
    let unknownErrMsg = 'Unknown server error'
    try {
      const parsed = JSON.parse(invalidResponse);
      const errorMessage = parsed.detail || parsed.message || unknownErrMsg;
      const serverError = new Error(errorMessage) as Error & {isServerError: boolean};
      serverError.isServerError = true;
      throw serverError;
    } catch {
      const fallbackMessage = invalidResponse || unknownErrMsg;
      const unknownServerError = new Error(fallbackMessage) as Error & {isServerError: boolean};
      throw unknownServerError
    }
  };
}