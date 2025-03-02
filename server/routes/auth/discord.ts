import { isAdminUser } from "~~/server/utils/admin";

export default defineOAuthDiscordEventHandler({
  async onSuccess(event, { user }) {
    const existingUser = await useDrizzle()
      .insert(tables.users)
      .values({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        admin: isAdminUser(user.id),
        createdAt: new Date()
      })
      .onConflictDoUpdate({
        target: tables.users.id,
        set: {
          username: user.username,
          avatar: user.avatar,
          admin: isAdminUser(user.id)
        }
      })
      .returning()
      .get();

    await setUserSession(event, { user: existingUser });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Discord OAuth error", error);
    return sendRedirect("/");
  }
});
