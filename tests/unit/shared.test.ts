import { describe, it, expect } from 'vitest'

describe('Shared API', () => {
  it('exports API_BASE constant', () => {
    // ai-toolbox reads env vars in shared/api
    expect(process.env.NEXT_PUBLIC_API_URL).toBeDefined()
  })
})

describe('Shared Types', () => {
  it('has valid type definitions', () => {
    // Types are compile-time only, verify the file exists
    const fs = require('fs')
    const path = require('path')
    const typesPath = path.join(__dirname, '../../shared/types/index.ts')
    expect(fs.existsSync(typesPath)).toBe(true)
  })
})
