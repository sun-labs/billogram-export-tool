import axios from 'axios'
import dotenv from 'dotenv'
import to from 'await-to-js'
import fs from 'fs'
import flatten from 'flat'

dotenv.config()

const getAPI = () => {
  const {
    API_USER,
    API_PASSWORD,
    API_ENDPOINT = 'https://billogram.com/api/v2'
  } = process.env

  if (!API_USER || !API_PASSWORD) throw Error('You need to enter details for User and Password')

  // basic auth
  const auth = {
    username: API_USER,
    password: API_PASSWORD
  }

  const instance = axios.create({
    baseURL: API_ENDPOINT,
    auth
  })
  return instance
}

const getCustomers = async (page = 1, pageSize = 100) => {
  const api = getAPI()
  const [err, res] = await to(
    api.get('customer', {
      params: {
        page,
        page_size: pageSize
      }
    })
  )
  if (err) return console.log('ERR', err.message, err.response.data)
  return res.data
}

const getBills = async (page = 1, pageSize = 100) => {
  const api = getAPI()
  const [err, res] = await to(
    api.get('billogram', {
      params: {
        page,
        page_size: pageSize
      }
    })
  )
  if (err) return console.log('ERR', err.message, err.response.data)
  return res.data
}

const getUntilEmpty = async (getFunction) => {
  const pageSize = 100
  let items = []
  let i = 0
  while (true) {
    const slice = await getFunction(i + 1, pageSize)
    const {
      meta: {
        total_count: totalCount
      },
      data = [],
      status
    } = slice
    if (status !== 'OK') {
      console.log(`ERR, got status ${status} from backend. Stopping.`)
      break
    }
    items = [...items, ...data]
    if (totalCount !== pageSize) break
    i += 1 // next page
  }
  return items
}

const getAllCustomers = () =>
  getUntilEmpty(getCustomers)

const getAllBills = () =>
  getUntilEmpty(getBills)

const getPDF = async (invoiceId) => {
  const api = getAPI()
  const [err, res] = await to(
    api.get(`billogram/${invoiceId}.pdf`)
  )
  if (err) return console.log('ERR', err.message, err.response.data)
  return {
    id: invoiceId,
    data: res.data.data.content
  }
}

const getPDFsFromBills = async (invoices) => {
  const promises = invoices.map((invoice) => getPDF(invoice.id))
  const pdfs = await Promise.all(promises)
  return pdfs
}

const saveToFile = (content, fileName, enc = 'utf8') => {
  const filePath = `./export/${fileName}`
  fs.writeFileSync(filePath, content, enc)
}

const arrToCSV = (items = []) => {
  const headers = Object.keys(items[0])
  const rows = items.map((item) => {
    const values = headers.map((header) => item[header])
    const valuesStr = values.join(',')
    return valuesStr
  })
  const headerStr = headers.join(',')
  const csvContent = [headerStr, ...rows]
  const csvStr = csvContent.join('\r\n')
  return csvStr
}

const getEverything = async () => {
  const [
    bills,
    customers
  ] = await Promise.all([
    getAllBills(),
    getAllCustomers()
  ])
  const pdfs = await getPDFsFromBills(bills)
  return {
    bills,
    customers,
    pdfs
  }
}

const cuteMkdir = (path) => {
  try {
    fs.mkdirSync(path)
  } catch (err) {
    console.log('err creating dir', err.message)
  }
}

getEverything()
  .then((everything) => {
    const timestamp = new Date().toISOString()
    console.log('INFO, creating export dir')
    cuteMkdir(`export/${timestamp}`)
    console.log('INFO, saving csv files..')
    const getFileName = (category) => `${timestamp}/${category}`
    const { pdfs, ...rest } = everything
    const keys = Object.keys(rest)
    const flatData = keys.map((key) => rest[key].map(flatten))
    const csvs = keys.map((_, i) => arrToCSV(flatData[i]))
    keys.forEach((key, i) => saveToFile(csvs[i], getFileName(key + '.csv')))
    console.log('INFO, saving pdf files..')
    pdfs.forEach((pdf) => saveToFile(pdf.data, getFileName(pdf.id + '.pdf'), 'base64'))
    console.log(`SUCCESS, export is available at export/${timestamp}/ folder.`)
  })
