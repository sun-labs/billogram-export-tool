import axios from 'axios'
import dotenv from 'dotenv'
import to from 'await-to-js'
import { fs } from 'file-system'

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

const getAllCustomers = async () => {
  const pageSize = 100
  let customers = []
  let i = 0
  while (true) {
    const slice = await getCustomers(i + 1, pageSize)
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
    customers = [...customers, ...data]
    if (totalCount !== pageSize) break
    i += 1 // next page
  }
  return customers
}

const handleCSVDownload = (csvContent) => {
  const fileName = `billogram-customerData-${new Date().toISOString()}.csv`
  fs.writeFileSync(fileName, csvContent)
}

const convertJson2CSV = async (json) => {
  const items = json
  // const items = flatten(json)
  // TODO: flat nested layer in json
  //   delivery_address: {
  //     city: '',
  //     name: '',
  //     country: '',
  //     zipcode: '',
  //     careof: '',
  //     street_address: ''
  //   },
  // },
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0])
  let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')
  return csv
}

getAllCustomers().then((res) => {
  convertJson2CSV(res).then((res) => {
    handleCSVDownload(res)
  })
}).catch((err) => {
  console.log('error', err)
})
