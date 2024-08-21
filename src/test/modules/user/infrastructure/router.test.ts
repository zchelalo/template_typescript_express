import { app } from 'src/server'
import request from 'supertest'

describe('User router', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app).get('/api/users').send()

      expect(response.status).toBe(200)
      expect(response.body.status).toBe(200)

      expect(response.body.message).toBe('success')

      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThan(0)
      expect(response.body.data[0]).toHaveProperty('id')
      expect(response.body.data[0]).toHaveProperty('name')
      expect(response.body.data[0]).toHaveProperty('email')

      expect(response.body.meta).not.toBeNull()

      expect(response.body.meta).toHaveProperty('page')
      expect(response.body.meta).toHaveProperty('perPage')
      expect(response.body.meta).toHaveProperty('pageCount')
      expect(response.body.meta).toHaveProperty('totalCount')

      expect(response.body.meta.page).toBe(1)
      expect(response.body.meta.perPage).toBeGreaterThan(1)
      expect(response.body.meta.pageCount).toBe(1)
      expect(response.body.meta.totalCount).toBeGreaterThan(1)
    })

    it('should return a list of users with pagination', async () => {
      const response = await request(app).get('/api/users').query({ page: 1, limit: 2 }).send()

      expect(response.status).toBe(200)
      expect(response.body.status).toBe(200)

      expect(response.body.message).toBe('success')

      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThan(0)
      expect(response.body.data[0]).toHaveProperty('id')
      expect(response.body.data[0]).toHaveProperty('name')
      expect(response.body.data[0]).toHaveProperty('email')

      expect(response.body.meta).not.toBeNull()

      expect(response.body.meta).toHaveProperty('page')
      expect(response.body.meta).toHaveProperty('perPage')
      expect(response.body.meta).toHaveProperty('pageCount')
      expect(response.body.meta).toHaveProperty('totalCount')

      expect(response.body.meta.page).toBe(1)
      expect(response.body.meta.perPage).toBe(2)
      expect(response.body.meta.pageCount).toBeGreaterThan(1)
      expect(response.body.meta.totalCount).toBeGreaterThan(1)
    })

    it('should return a list of users with pagination and page 2', async () => {
      const response = await request(app).get('/api/users').query({ page: 2, limit: 2 }).send()

      expect(response.status).toBe(200)
      expect(response.body.status).toBe(200)

      expect(response.body.message).toBe('success')

      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThan(0)
      expect(response.body.data[0]).toHaveProperty('id')
      expect(response.body.data[0]).toHaveProperty('name')
      expect(response.body.data[0]).toHaveProperty('email')

      expect(response.body.meta).not.toBeNull()

      expect(response.body.meta).toHaveProperty('page')
      expect(response.body.meta).toHaveProperty('perPage')
      expect(response.body.meta).toHaveProperty('pageCount')
      expect(response.body.meta).toHaveProperty('totalCount')

      expect(response.body.meta.page).toBe(2)
      expect(response.body.meta.perPage).toBe(2)
      expect(response.body.meta.pageCount).toBeGreaterThan(1)
      expect(response.body.meta.totalCount).toBeGreaterThan(1)
    })

    it('should return a list of users with an invalid pagination (with zero values)', async () => {
      const response = await request(app).get('/api/users').query({ page: 0, limit: 0 }).send()

      expect(response.status).toBe(200)
      expect(response.body.status).toBe(200)

      expect(response.body.message).toBe('success')

      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThan(0)
      expect(response.body.data[0]).toHaveProperty('id')
      expect(response.body.data[0]).toHaveProperty('name')
      expect(response.body.data[0]).toHaveProperty('email')

      expect(response.body.meta).not.toBeNull()

      expect(response.body.meta).toHaveProperty('page')
      expect(response.body.meta).toHaveProperty('perPage')
      expect(response.body.meta).toHaveProperty('pageCount')
      expect(response.body.meta).toHaveProperty('totalCount')

      expect(response.body.meta.page).toBe(1)
      expect(response.body.meta.perPage).toBeGreaterThan(1)
      expect(response.body.meta.pageCount).toBe(1)
      expect(response.body.meta.totalCount).toBeGreaterThan(1)
    })

    it('should return a list of users with an invalid pagination (with negative values)', async () => {
      const response = await request(app).get('/api/users').query({ page: -1, limit: -1 }).send()

      expect(response.status).toBe(200)
      expect(response.body.status).toBe(200)

      expect(response.body.message).toBe('success')

      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThan(0)
      expect(response.body.data[0]).toHaveProperty('id')
      expect(response.body.data[0]).toHaveProperty('name')
      expect(response.body.data[0]).toHaveProperty('email')

      expect(response.body.meta).not.toBeNull()

      expect(response.body.meta).toHaveProperty('page')
      expect(response.body.meta).toHaveProperty('perPage')
      expect(response.body.meta).toHaveProperty('pageCount')
      expect(response.body.meta).toHaveProperty('totalCount')

      expect(response.body.meta.page).toBe(1)
      expect(response.body.meta.perPage).toBeGreaterThan(1)
      expect(response.body.meta.pageCount).toBe(1)
      expect(response.body.meta.totalCount).toBeGreaterThan(1)
    })

    it('should return a list of users with an invalid pagination (with high values)', async () => {
      const response = await request(app).get('/api/users').query({ page: 1000, limit: 1000 }).send()

      expect(response.status).toBe(200)
      expect(response.body.status).toBe(200)

      expect(response.body.message).toBe('success')

      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThan(0)
      expect(response.body.data[0]).toHaveProperty('id')
      expect(response.body.data[0]).toHaveProperty('name')
      expect(response.body.data[0]).toHaveProperty('email')

      expect(response.body.meta).not.toBeNull()

      expect(response.body.meta).toHaveProperty('page')
      expect(response.body.meta).toHaveProperty('perPage')
      expect(response.body.meta).toHaveProperty('pageCount')
      expect(response.body.meta).toHaveProperty('totalCount')

      expect(response.body.meta.page).toBe(1)
      expect(response.body.meta.perPage).toBeGreaterThan(1)
      expect(response.body.meta.pageCount).toBe(1)
      expect(response.body.meta.totalCount).toBeGreaterThan(1)
    })
  })
})