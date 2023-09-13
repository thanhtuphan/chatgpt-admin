import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { createClient } from '@supabase/supabase-js'
import express from 'express'
import fileUpload from 'express-fileupload'
import { initProducts } from './products'
import { initNotices } from './notices'
import { initStorage } from './storage'
import { initAdminUsers } from './admin-users'

const app = express()

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SERVICE_ROLE || ''
)

app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload())

// Init products routes
initProducts(app, supabase)
initStorage(app, supabase)
initAdminUsers(app, supabase)

// Init notices routes
initNotices(app, supabase)

export default app
