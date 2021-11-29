import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from './src/mock/main.mock'

export function setupProdMockServer() {
  createProdMockServer([ ...userMock])
}