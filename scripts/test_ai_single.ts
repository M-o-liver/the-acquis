
import { analyzeAgreement } from '../src/lib/ai';
import 'dotenv/config';

async function test() {
    const text = "This agreement establishes a framework for cooperation on trade and environmental protection, creating a joint committee with binding decision-making powers.";
    console.log("Testing analysis with sample text...");
    const result = await analyzeAgreement(text);
    console.log("Result:", result);
}

test();
