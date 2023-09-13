import { SupabaseClient } from '@supabase/supabase-js'
import { Express } from 'express'
import axios from 'axios'
import { authGuard } from './common/helper'

export const initAdminUsers = (
  app: Express,
  supabase: SupabaseClient<any, 'public', any>
) => {
  /**
   * Handle remove product
   */
  app.post('/admin-users', async (req, res) => {
    await authGuard(req, supabase).catch((error) =>
      res.status(error.status).send(error)
    )

    const { email, password, role } = req.body

    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email,
      password,
    })

    if (error) {
      res.json({
        error,
      })
    }

    const actionLink = data.properties?.action_link

    if (actionLink) {
      try {
        await axios.get(actionLink)

        res.json(
          await supabase.rpc('set_role', {
            uid: data.user?.id,
            new_role: role,
          })
        )
      } catch (err) {
        res.json({
          error: {
            message: 'Verify email failed',
          },
        })
      }
    }
  })

  app.post('/admin-users/toggle-active', async (req, res) => {
    await authGuard(req, supabase).catch((error) =>
      res.status(error.status).send(error)
    )

    const { userId, status } = req.body

    console.log(typeof status)

    res.json(
      await supabase.rpc('toggle_active', {
        uid: userId,
        status,
      })
    )
  })
}
