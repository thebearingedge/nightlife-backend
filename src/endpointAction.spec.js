const { expect } = require('chai')
const {describe, it} = require('mocha')
const {
  addUser,
  removeUser,
  authenticate
 } = require('./endpointAction')
const TESTUSER = 'bill'
const TESTPASS = 'password'

describe('Should be able to control user opperations', function () {
  describe('addUser', function () {
    it('should retern success if makeUser is successful', async function () {
      const createUser = () => Promise.resolve(true)
      const result = await addUser(TESTUSER, TESTPASS, {createUser})
      expect(result.success).to.equal(true)
    })

    it('should return err if makeUser errors', async function () {
      const createUser = () => Promise.reject(new Error())
      const result = await addUser(TESTUSER, TESTPASS, {createUser})
      expect(result.success).to.equal(false)
    })
  })

  describe('removeUser', function () {
    it('should return as success when it is a success', async function () {
      const deleteUser = () => Promise.resolve()
      const result = await removeUser(TESTUSER, {deleteUser})
      expect(result.success).to.equal(true)
    })

    it('should git a false success for failed delete', async function () {
      const deleteUser = () => Promise.reject(new Error('some error'))
      const result = await removeUser(TESTUSER, {deleteUser})
      expect(result.success).to.equal(false)
    })
  })

  describe('authenticate', function () {
    it('should return success if correct password', async function () {
      const getUser = () => Promise.resolve({password: TESTPASS})
      const result = await authenticate(['', TESTPASS], {getUser})
      expect(result.success).to.be.equal(true)
    })

    it('should return "success false" if wrong password', async function () {
      const getUser = () => Promise.resove({password: TESTPASS})
      const result = await authenticate(['', 'wrongPass'], {getUser})
      expect(result.success).to.equal(false)
    })

    it('should return "success: false" if callback Errors', async function () {
      const getUser = () => Promise.reject(new Error())
      const result = await authenticate(['', ''], {getUser})
      expect(result.success).to.be.equal(false)
    })
  })
})
