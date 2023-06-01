import React, { useState } from 'react'
import axios from 'axios';

export const useFetch = (URL, setData) => {
    
    axios
    .get(URL, {
      headers: {
        'X-CSCAPI-KEY' : 'NjVhMzdaajl2VkpPanBmYlMyWUdGalAyenNUNWdyUWt4aDNjZFFFZQ=='
      },
    })
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => {
      console.log(err);
    });

}
export default useFetch