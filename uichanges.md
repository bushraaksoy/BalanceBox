# Activity Page – UI/UX Redesign

Redesign the existing Activity page of the personal finance application.

## Purpose

This page allows users to monitor their spending against allocated monthly budgets and record new spending activities.

The existing functionality must remain intact:

1. Users see their current combined bank balance.
2. Users see their spending categories and allocated budgets.
3. Users tap a category to log a new expense.
4. Users enter the amount spent.
5. Users select which bank card was used.
6. Upon submission, the transaction is recorded, the selected card's balance is updated, and the relevant category's spending progress is updated.

## 1. Balance Summary

Transform the plain current balance text into a compact, attractive financial summary card.

Display:

- Current combined balance across connected accounts.
- Balance visibility toggle.
- Optional income and spending summaries.

Use a dark charcoal or neutral background with a subtle gold accent.

Do not confuse current bank balance with the amount left to budget. They represent different financial metrics.

## 2. Spending Categories

Redesign each spending category into an interactive card.

Each card must display:

- Category icon.
- Category name.
- Current amount spent.
- Allocated monthly budget.
- Remaining budget or excess spending.
- Progress bar.
- Spending status.

Example:
Groceries
₮500,000 / ₮400,000
₮100,000 over budget
125% used.

Design:

- White cards.
- Soft rounded corners.
- Subtle shadows.
- Consistent spacing.
- Clear monetary typography.
- Minimal icons inside soft grey backgrounds.

Progress indicators:

- Green: Within budget.
- Amber: Approaching the allocated limit.
- Red: Over budget.
- Grey: No spending recorded.

When spending exceeds the allocated amount, cap the progress bar at 100% and show the excess amount separately.

Do not allow progress bars to overflow their containers.

## 3. Logging an Expense

Each category card must be fully clickable.

When tapped, open a bottom sheet for recording a transaction.

The bottom sheet should contain:

- Selected spending category.
- Amount input with appropriate currency formatting.
- Bank card selection.
- Optional transaction note.
- Log Expense button.

Bank card selection must show the available accounts, such as NMB and Absa.

On successful submission:

- Create the transaction.
- Deduct the amount from the selected card's balance.
- Update the combined current balance.
- Increase the spending total for the selected category.
- Update its progress bar and spending status.
- Refresh the recent transaction list.

Include validation for empty, zero, negative, or invalid amounts and prevent spending more than the selected account's available balance unless the application explicitly supports overdrafts.

Provide clear confirmation and an option to undo or reverse an accidental entry.

## 4. Header and Layout

- Retain the Activity page title.
- Add a month selector.
- Reduce unnecessary vertical spacing.
- Improve alignment and typography.
- Keep the balance summary visually distinct.
- Use the available screen space more effectively.

## 5. Visual Design System

Use the existing application's visual identity.

Colours:

- Background: #F8F9FB
- Card surfaces: #FFFFFF
- Primary accent: #E6B33D
- Secondary accent: #F5D36B
- Primary text: #171717
- Secondary text: #737987
- Borders: #E8E9ED
- Success: Muted green
- Warning: Amber
- Over budget: Soft red

Use:

- Rounded corners of approximately 16–20px.
- Subtle shadows.
- Consistent icon sizes.
- Clear typography hierarchy.
- Minimal borders.
- Responsive mobile-first layouts.

## 6. Functional Requirements

Preserve existing data structures and functionality.

All balances, spending totals, and progress percentages must be calculated dynamically.

Ensure that:

- A transaction is associated with the correct category and payment card.
- The combined balance reflects changes to individual card balances.
- Editing or deleting a transaction correctly reverses and recalculates its effects.
- Spending progress is calculated against the relevant category's allocated budget.
- Transactions are associated with the correct budgeting period.
- The interface updates immediately after successful transactions.

Do not hardcode demonstration amounts into the actual application.

## Final Goal

Create a polished, interactive spending dashboard that makes it effortless for users to monitor their spending and log purchases.

The most important interaction is recording an expense. Make it fast, intuitive, and visually satisfying.
