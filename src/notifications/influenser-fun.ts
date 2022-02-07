import cheerio from 'cheerio'

import { axiosService } from '../utils/axiosService'
import { logger }  from '../utils/logger'

export interface Postlist {
  url: string;
  label: string
}

export const getLastInfluenserFun = async (): Promise<Postlist[]> => {
  const targetUrl: string = 'https://zoso.ro/'
  const fetchHtml = async (url: string) => {
    const {data} = await axiosService(url, {
      method: 'GET',
    })
    return cheerio.load(data)
  }
  let postList: Postlist[] = []

  const getPosts = async () => {
    let $: any
    try {
      $ = await fetchHtml(targetUrl)
    } catch (error) {
      logger.info(`[+] fetch posts error: ${error.message}`)
    }
    const urlList = $('h3.post-title a')
    urlList.each((idx: number, el: any) => {
      const url = $(el).attr('href')
      const text = $(el).text()
      let urlObj = {
        url: url,
        label: text
      }
      postList.push(urlObj)
    })
    return postList
  }

  try {
    let urls = await getPosts()
    urls
  } catch (error) {
    logger.error(`[+] fetch posts error2: ${error}`)
  }

  return postList
}