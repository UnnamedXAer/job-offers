/**
 * @param {import('axios').AxiosError<{error: string}>} err
 */
export function errorHandler(err, logTxt) {
  console.log(logTxt, err);
  if (err.isAxiosError) {
    const errorMsg = err.response.data ? err.response.data.error : null;

    if (errorMsg) {
      throw new Error(errorMsg);
    }
  }
  throw err;
}
