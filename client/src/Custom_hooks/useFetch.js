import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (url, setAlertMsg, credentials = false) => {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(url, {
        withCredentials: credentials,
      });
      if (response.data.succeed) {
        setData(response.data);
      }
    } catch (error) {
      setAlertMsg(error.response.data.msg);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);
  return data.result;
};
