import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetch = ({ url, setAlertMsg, credentials = false }) => {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState('');

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(url, {
        withCredentials: credentials,
      });
      if (response.data.succeed) {
        setData(response.data);
      } else {
        setAlertMsg ? setAlertMsg(res.data.msg) : setAlert(res.data.msg);
      }
    } catch (error) {
      setAlertMsg
        ? setAlertMsg(error.response.data.msg)
        : setAlert(error.response.data.msg);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);
  return data.result;
};
