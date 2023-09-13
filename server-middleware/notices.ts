import { Express } from 'express'
import { SupabaseClient } from '@supabase/supabase-js'
import { authGuard } from './common/helper'

export const initNotices = (
  app: Express,
  supabase: SupabaseClient<any, 'public', any>
) => {
  /**
   * remove notice
   */
  app.delete('/notices/:id', async (req, res) => {
    await authGuard(req, supabase).catch((error) =>
      res.status(error.status).send(error)
    )

    const noticeId = req.params.id

    const resDelete = await supabase.from('Notice').delete().eq('id', noticeId)

    res.json(resDelete)
  })

  /**
   * update notice
   */
  app.put('/notices/:id', async (req, res) => {
    await authGuard(req, supabase).catch((error) =>
      res.status(error.status).send(error)
    )

    try {
      const noticeId = req.params.id
      const notice = req.body

      await supabase
        .from('Notice')
        .update({
          content: notice.content,
          content_en: notice.content_en,
          updated_at: new Date().toISOString(),
        })
        .eq('id', noticeId)

      res.send({ message: 'success' })
    } catch (error) {
      res.status(500).send(error)
    }
  })

  /**
   * add notice
   */
  app.post('/notices', async (req, res) => {
    await authGuard(req, supabase).catch((error) =>
      res.status(error.status).send(error)
    )
    try {
      const notice = req.body

      await supabase.from('Notice').insert({
        content: notice.content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      res.send({ message: 'success' })
    } catch (error) {
      res.status(500).send(error)
    }
  })
}
