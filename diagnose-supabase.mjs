/**
 * VSOE Supabase Diagnostic Script
 * Usage: node diagnose-supabase.mjs <DATABASE_URL>
 *
 * Pass your Supabase DATABASE_URL as first argument.
 * e.g. node diagnose-supabase.mjs "postgresql://postgres.xxx:PASSWORD@aws-0-region.pooler.supabase.com:6543/postgres"
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const url = process.argv[2];
if (!url) {
    console.error('❌  Usage: node diagnose-supabase.mjs "<SUPABASE_DATABASE_URL>"');
    process.exit(1);
}

// Mask password for safe logging
const masked = url.replace(/:([^@]+)@/, ':****@');
console.log('\n🔍 VSOE Supabase Diagnostic');
console.log('━'.repeat(50));
console.log(`📡 Connecting to: ${masked}\n`);

let pg;
try {
    pg = require('pg');
} catch {
    console.error('❌  Missing dependency: pg');
    console.error('   Run: npm install pg');
    process.exit(1);
}

const { Client } = pg;
const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

async function run() {
    try {
        await client.connect();
        console.log('✅  Connected to Supabase PostgreSQL\n');
    } catch (e) {
        console.error('❌  Connection failed:', e.message);
        process.exit(1);
    }

    const tables = [
        { name: 'Journey', sql: 'SELECT COUNT(*) FROM "Journey"' },
        { name: 'TrainCar', sql: 'SELECT COUNT(*) FROM "TrainCar"' },
        { name: 'Cabin', sql: 'SELECT COUNT(*) FROM "Cabin"' },
        { name: 'RouteSegment', sql: 'SELECT COUNT(*) FROM "RouteSegment"' },
        { name: 'InventoryBucket', sql: 'SELECT COUNT(*) FROM "InventoryBucket"' },
        { name: 'Booking', sql: 'SELECT COUNT(*) FROM "Booking"' },
        { name: 'User', sql: 'SELECT COUNT(*) FROM "User"' },
    ];

    console.log('📊 Row Counts:');
    console.log('─'.repeat(30));

    let anyData = false;
    for (const t of tables) {
        try {
            const res = await client.query(t.sql);
            const count = parseInt(res.rows[0].count);
            const icon = count > 0 ? '✅' : '❌';
            if (count > 0) anyData = true;
            console.log(`  ${icon}  ${t.name.padEnd(18)} ${count} rows`);
        } catch (e) {
            console.log(`  ⚠️   ${t.name.padEnd(18)} ERROR: ${e.message}`);
        }
    }

    console.log('─'.repeat(30));

    // Check journey dates specifically
    try {
        console.log('\n📅 Journey Details (all):');
        const res = await client.query(`
            SELECT id, name, departure, arrival, status
            FROM "Journey"
            ORDER BY departure ASC
        `);
        if (res.rows.length === 0) {
            console.log('  ❌  No journeys found in database.');
        } else {
            const now = new Date();
            res.rows.forEach(r => {
                const dep = new Date(r.departure);
                const future = dep > now;
                console.log(`  ${future ? '✅' : '⚠️ PAST'} [${r.status}] ${r.name} → ${dep.toISOString().slice(0,10)}`);
            });
        }
    } catch (e) {
        console.log('  Could not query Journey table:', e.message);
    }

    console.log('\n' + '━'.repeat(50));
    if (!anyData) {
        console.log('🚨 RESULT: Database is EMPTY — needs seeding.');
        console.log('   → Run supabase-seed.sql in Supabase SQL Editor.');
    } else {
        console.log('✅  RESULT: Database has data.');
    }
    console.log('');

    await client.end();
}

run().catch(async e => {
    console.error('Fatal error:', e);
    await client.end();
    process.exit(1);
});
