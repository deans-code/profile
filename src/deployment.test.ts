import { afterEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

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

describe('deploy workflow', () => {
  const workflow = readFileSync(resolve(__dirname, '../.github/workflows/deploy.yml'), 'utf-8')

  it('does not try to create the Pages project on every run', () => {
    expect(workflow).not.toMatch(/pages project create/)
  })

  it('does not hide failures', () => {
    expect(workflow).not.toMatch(/continue-on-error/)
  })

  it('pins the wrangler version', () => {
    expect(workflow).toMatch(/wranglerVersion:\s*\d+\.\d+\.\d+/)
  })
})
