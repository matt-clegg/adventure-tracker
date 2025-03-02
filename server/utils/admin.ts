export function isAdminUser(userId: string) {
  const rawIds = env.NUXT_ADMIN_USER_IDS;

  if (rawIds === undefined || rawIds.trim().length === 0) {
    console.warn("No admin user ids set");
    return false;
  }

  const userIds = rawIds.split(",").map(id => id.trim());
  return userIds.includes(userId);
}
