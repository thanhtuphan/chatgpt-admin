import { SupabaseClient } from '@supabase/supabase-js'
import { Request } from 'express'
import { ParsedQs } from 'qs'

export const authGuard = (
  req: Request<{}, any, any, ParsedQs, Record<string, any>>,
  supabase: SupabaseClient<any, 'public', any>
) => {
  return new Promise(async (resolve, reject) => {
    const token = req.cookies.access_token
    const unauthorize = {
      status: 401,
      message: 'Unauthorized',
    }

    if (!token) {
      reject(unauthorize)
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token)

    if (!user) {
      reject(unauthorize)
    }

    resolve(user)
  })
}
