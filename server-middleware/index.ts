import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { createClient } from '@supabase/supabase-js'
import express from 'express'
import fileUpload from 'express-fileupload'
import { initStorage } from './storage'

const app = express()

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SERVICE_ROLE || ''
)

app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload())

// Init products routes
initStorage(app, supabase)

// Init notices routes
export default app
