export const attempts = new Map()

export const checkLimit = (key) => {
    const now = Date.now()
    const userAttempts = attempts.get(key) || []

    const recentAttempts = userAttempts.filter(time => time > now - 60000)


    if (recentAttempts.length >= 5) {
        return { allowed: false }
    }

    recentAttempts.push(now)
    attempts.set(key, recentAttempts)

    return { allowed: true, remaining: 5 - recentAttempts.length }
}
