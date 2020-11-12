import axios from 'axios'
import dotenv from 'dotenv'
import to from 'await-to-js'
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

getAllCustomers().then(console.log)
