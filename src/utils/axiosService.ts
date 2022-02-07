import axios from 'axios'
import config from 'config'

let http: string = ''
if (config.has('proxy')) {
  const conf: any = config.get('proxy')
  http = conf.http
} 

const httpsProxyAgent = require('https-proxy-agent');

const axiosInstance = axios.create({
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (http != '') {
      // logger.info(appConfig.proxy)
      const proxyAgent = new httpsProxyAgent(http)
      config.httpsAgent = proxyAgent,
      config.proxy = false
    }
    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
    }
    return config;
  }
);
  
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosService = axiosInstance