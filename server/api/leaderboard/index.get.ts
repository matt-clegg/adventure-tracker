type RawEntry = {
  user: string;
  totalXp: number;
  totalGold: number;
  firstCreatedAt: Date;
};

export default eventHandler(async () => {
  const rawEntries: RawEntry[] = await useDrizzle()
    .select({
      user: tables.completions.user,
      totalXp: sql`sum(${tables.completions.xp})`.as("totalXp"),
      totalGold: sql`sum(${tables.completions.gold})`.as("totalGold"),
      firstCreatedAt: sql`min(${tables.completions.createdAt})`.as("firstCreatedAt")
    })
    .from(tables.completions)
    .groupBy(tables.completions.user)
    .orderBy(sql`totalXp DESC`, sql`totalGold DESC`, sql`firstCreatedAt ASC`)
    .limit(10)
    .get();

  const userIds = rawEntries.map(e => e.user);

  const entries = rawEntries.map((e, index) => ({
    position: index + 1,
    totalXp: e.totalXp,
    totalGold: e.totalGold,
    user: {
      id: e.user,
      username: "",
      avatar: ""
    }
  }));

  for (const id of userIds) {
    const user = await useDrizzle()
      .query
      .users
      .findFirst({
        where: eq(tables.users.id, id),
        with: {
          id: true,
          username: true,
          avatar: true
        }
      });

    if (user) {
      const entry = entries.find(e => e.user.id === id);
      entry!.user = user;
    }
    else {
      console.warn("User not found", id);
    }
  }

  return entries;
});
