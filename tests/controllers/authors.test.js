const request = require('supertest')
const faker = require('faker')
const httpStatus = require('http-status')
const app = require('../../src/app')

const baseURL = '/authors'

let _id

beforeAll(async () => {
    const response = await request(app).post(baseURL).send({ firstName: faker.name.firstName(), lastName: faker.name.lastName() })

    _id = response.body.insertedId
})

describe('Authors controller', () => {
    describe('List', () => {
        it('When list end point is called', async () => {
            const response = await request(app).get(baseURL)

            expect(response.statusCode).toBe(httpStatus.OK)
        })
    })

    describe('Create', () => {
        it('When create end point is called', async () => {
            const firstName = faker.name.firstName()
            const lastName = faker.name.lastName()

            const response = await request(app).post(baseURL).send({ firstName, lastName })

            expect(response.statusCode).toBe(httpStatus.CREATED)
        })  
    })

    describe('Show', () => {
        it('When show end point is called', async () => {
            const response = await request(app).get(`${baseURL}/${_id}`)

            expect(response.statusCode).toBe(httpStatus.OK)
        })  
    })

    describe('Update', () => {
        it('When update end point is called', async () => {
            const newFirstName = faker.name.firstName()
            const newLastName = faker.name.lastName()

            const response = await request(app).patch(`${baseURL}/${_id}`).send({ firstName: newFirstName, lastName: newLastName })

            expect(response.statusCode).toBe(httpStatus.OK)
            expect(response.body.value.firstName).toBe(newFirstName)
            expect(response.body.value.lastName).toBe(newLastName)
        })
    })

    describe('Destroy', () => {
        it('When delete end point is called', async () => {
            const response = await request(app).delete(`${baseURL}/${_id}`)

            expect(response.statusCode).toBe(httpStatus.NO_CONTENT)
        })  
    })
})