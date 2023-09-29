import { useCallback, useState } from "react";

function useHttp() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const sendRequest = useCallback(async (requestFunction, requestData) => {
    setIsLoading(true);
    try {
      const resData = await requestFunction(requestData);

      setData(resData);
      setHttpError(null);
    } catch (err) {
      setHttpError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return { sendRequest, isLoading, httpError, data };
}

export default useHttp;
