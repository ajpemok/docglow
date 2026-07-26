import { readFileSync } from 'node:fs'
import type { Page } from '@playwright/test'

const fixturePath = new URL('../fixtures/docglow-data.json', import.meta.url)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FixtureData = Record<string, any>

export function loadFixture(mutate?: (fixture: FixtureData) => void): FixtureData {
  const fixture = JSON.parse(readFileSync(fixturePath, 'utf-8')) as FixtureData
  mutate?.(fixture)
  return fixture
}

export function existingUi(fixture: FixtureData): Record<string, unknown> {
  const ui = fixture.ui
  return ui && typeof ui === 'object' && !Array.isArray(ui)
    ? ui as Record<string, unknown>
    : {}
}

export async function routeFixtureData(
  page: Page,
  mutate?: (fixture: FixtureData) => void,
): Promise<void> {
  const fixture = loadFixture(mutate)
  await page.route('**/docglow-data.json', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(fixture),
  }))
}
