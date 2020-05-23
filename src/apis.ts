import { Apis } from '@traptitech/traq'

export const apis = new Apis({
  basePath: '/api/v3'
})

export const getFileUrl = <T extends string | undefined>(fileId: T): T =>
  (fileId ? `/api/v3/files/${fileId}` : undefined) as T
