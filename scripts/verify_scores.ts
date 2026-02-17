
import { sql } from '../src/lib/db';
import 'dotenv/config';

async function verify() {
    try {
        const count = await sql`SELECT COUNT(*) FROM semantic_scores`;
        console.log('Semantic Scores count:', count.rows[0].count);

        // Check distribution
        const sovereignty = await sql`SELECT AVG(sovereignty_score) as avg_sov FROM semantic_scores`;
        console.log('Avg Sovereignty Score:', sovereignty.rows[0].avg_sov);
    } catch (err) {
        console.error(err);
    }
}

verify();
