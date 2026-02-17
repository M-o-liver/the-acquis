
import { sql } from '../src/lib/db';
import 'dotenv/config';

async function verify() {
    try {
        const count = await sql`SELECT COUNT(*) FROM agreements`;
        console.log('Agreements count:', count.rows[0].count);

        const sample = await sql`SELECT name, year FROM agreements LIMIT 3`;
        console.log('Sample agreements:', sample.rows);
    } catch (err) {
        console.error(err);
    }
}

verify();
