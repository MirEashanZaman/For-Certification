import { Account, Goal, Transaction } from './types'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export async function getAccounts(): Promise<Account[] | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/Account`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    return null
  }
}

export async function getTransactions(): Promise<Transaction[] | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/Transaction`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch transactions:', error)
    return null
  }
}

export async function getGoals(): Promise<Goal[] | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/Goal`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch goals:', error)
    return null
  }
}

export async function createGoal(goal: Omit<Goal, 'id'>): Promise<Goal | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/Goal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goal),
    })
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to create goal:', error)
    return null
  }
}

export async function updateGoal(id: string, goal: Goal): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/api/Goal/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goal),
    })
    return response.ok
  } catch (error) {
    console.error('Failed to update goal:', error)
    return false
  }
}
