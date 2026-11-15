import { screen } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'

/** Five built-in values, the fewest that lets the user continue past the values page. */
export const FIVE_VALUES = ['Fairness', 'Honesty', 'Integrity', 'Curiosity', 'Accountability']

export async function pickValues(user: UserEvent, names: string[] = FIVE_VALUES) {
  for (const name of names) await user.click(screen.getByRole('button', { name }))
}
