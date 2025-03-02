import { sql, randomUUIDv7 } from "bun";
import { parseUser } from "./user.validator";

export type User = {
  id?: string;
  email: string;
  username: string;
};

export async function getUserById(id: string) {
  const rows = await sql`SELECT * FROM users where id = ${id}`.values();
  const user = parseUser(rows[0]);
  return user;
}

export async function getUserByEmail(email: string) {
  const rows = await sql`SELECT * FROM users where email = ${email}`.values();
  const user = parseUser(rows[0]);
  return user;
}

export async function createUser(user: User, password: string) {
  const hashedPassword = await Bun.password.hash(password);

  const [newUser] = await sql`
    INSERT INTO users (id, first_name, last_name, email, username)
    VALUES (${randomUUIDv7()}, ${user.email}, ${user.username})
    RETURNING *
  `;

  const parsedUser = parseUser(newUser);

  await sql`
    INSERT INTO passwords (hash, user_id)
    VALUES (${hashedPassword}, ${newUser.id})
    RETURNING *
  `;

  return { userId: parsedUser.id };
}

export async function deleteUserByEmail(email: string) {
  return await sql`DELETE * FROM users where email = ${email}`;
}

export async function verifyLogin(email: string, password: string) {
  const results = await sql`
    SELECT users.id, passwords.hash FROM users
    LEFT JOIN passwords
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
