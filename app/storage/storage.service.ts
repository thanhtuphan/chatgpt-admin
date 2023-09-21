// import { v4 as uuid } from 'uuid'

// const StorageService = {
//   async upload(file: File, path: string) {
//     const fileId = uuid()

//     const { error } = await supabase.storage.from(path).upload(fileId, file, {
//       upsert: true,
//     })

//     if (error) {
//       console.log('StorageService.upload', error)
//       throw error
//     }

//     const { data } = supabase.storage.from(path).getPublicUrl(fileId)

//     return {
//       url: data.publicUrl,
//       id: fileId,
//     }
//   },
// }

// export default StorageService
