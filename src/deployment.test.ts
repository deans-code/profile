import { afterEach, describe, expect, it, vi } from 'vitest'

async function loadBase() {
  vi.resetModules()
  const config = (await import('../vite.config')).default
  return (config as { base?: string }).base
}

describe('site base path', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('defaults to the host root', async () => {
    vi.stubEnv('VITE_BASE', undefined as unknown as string)
    delete process.env.VITE_BASE
    expect(await loadBase()).toBe('/')
  })

  it('can be overridden with VITE_BASE', async () => {
    vi.stubEnv('VITE_BASE', '/profile/')
    expect(await loadBase()).toBe('/profile/')
  })
})
