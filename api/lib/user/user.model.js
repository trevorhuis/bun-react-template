import { sql, randomUUIDv7 } from "bun";
import { User } from "./user.validator";

export async function getUserById(id) {
  const rows = await sql`SELECT * FROM users where id = ${id}`.values();

  if (rows.length === 0) return null;

  const sqlUser = rows[0];
  const user = await User.safeParseAsync({
    id: sqlUser[0],
    email: sqlUser[1],
    username: sqlUser[2],
  });

  if (!user.success) {
    console.error(user.error);
    return null;
  }

  return user.data;
}

export async function getUserByEmail(email) {
  const rows =
    await sql`SELECT id, email, username FROM users where email = ${email}`.values();

  if (rows.length === 0) return null;

  const sqlUser = rows[0];
  const user = await User.safeParseAsync({
    id: sqlUser[0],
    email: sqlUser[1],
    username: sqlUser[2],
  });

  if (!user.success) {
    console.error(user.error);
    return null;
  }

  return user.data;
}

export async function createUser(user, password) {
  const hashedPassword = await Bun.password.hash(password);

  const [newUser] = await sql`
    INSERT INTO users (id, email, username)
    VALUES (${randomUUIDv7()}, ${user.email}, ${user.username})
    RETURNING *
  `;

  await sql`
    INSERT INTO passwords (hash, user_id)
    VALUES (${hashedPassword}, ${newUser.id})
  `;

  return { userId: newUser.id };
}

export async function deleteUserByEmail(email) {
  return await sql`DELETE * FROM users where email = ${email}`;
}

export async function verifyLogin(email, password) {
  const results = await sql`
    SELECT users.id, passwords.hash FROM users
    LEFT JOIN passwords on users.id = passwords.user_id
    WHERE users.email = ${email}
  `;

  if (results.length === 0 || !results[0].hash) {
    return null;
  }

  const userWithPassword = results[0];

  if (!userWithPassword) {
    return null;
  }

  const isValid = await Bun.password.verify(
    password,
    userWithPassword.hash ?? "",
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hash: _hash, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
