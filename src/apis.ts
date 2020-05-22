import { Apis } from '@traptitech/traq'

export const apis = new Apis({
  basePath: '/api/v3'
})

export const getFileUrl = (fileId: string | undefined): string | undefined =>
  fileId ? `/api/v3/files/${fileId}` : undefined
