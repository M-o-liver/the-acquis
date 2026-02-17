
import { sql } from '@vercel/postgres';
import { analyzeAgreement } from '../src/lib/ai';
import { Agreement } from '../src/lib/types';
import 'dotenv/config';

async function analyze() {
    try {
        console.log('Fetching agreements to analyze...');
        const agreementsResult = await sql<Agreement>`
      SELECT * FROM agreements 
      WHERE id NOT IN (SELECT agreement_id FROM semantic_scores)
      ORDER BY id ASC;
    `;

        const agreements = agreementsResult.rows;
        console.log(`Found ${agreements.length} agreements to analyze.`);

        for (const agreement of agreements) {
            console.log(`Analyzing: ${agreement.name}...`);
            const score = await analyzeAgreement(agreement.full_text || agreement.summary);

            await sql`
        INSERT INTO semantic_scores (agreement_id, sovereignty_score, binding_score, human_centricity_score, economic_weight, analysis_notes)
        VALUES (${agreement.id}, ${score.sovereignty_score}, ${score.binding_score}, ${score.human_centricity_score}, ${score.economic_weight}, ${score.analysis_notes})
      `;
            console.log(`Saved analysis for ${agreement.name}`);
        }

        console.log('Analysis batch complete.');
    } catch (error) {
        console.error('Error in analysis script:', error);
    }
}

analyze();
