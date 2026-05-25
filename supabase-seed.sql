-- ============================================================
--  VSOE Supabase Seed SQL
--  Generated from prisma/seed.ts
--  Run this in Supabase SQL Editor: https://supabase.com/dashboard
--  
--  IMPORTANT: Run the full script in one shot.
--  It is idempotent — safe to re-run (deletes first).
-- ============================================================

-- ─── 0. CLEANUP (order matters due to FK constraints) ────────
DELETE FROM "Passenger";
DELETE FROM "Booking";
DELETE FROM "InventoryBucket";
DELETE FROM "Cabin";
DELETE FROM "TrainCar";
DELETE FROM "RouteSegment";
DELETE FROM "Journey";
DELETE FROM "User";

-- ─── 1. TRAIN CARS ────────────────────────────────────────────
INSERT INTO "TrainCar" (id, name, type) VALUES
  ('tc-etoile-001',   'Etoile du Nord',   'dining'),
  ('tc-cote-001',     'Côte d''Azur',     'dining'),
  ('tc-oriental-001', 'L''Oriental',      'dining'),
  ('tc-bar-001',      '''3674'' Bar Car', 'bar'),
  ('tc-3309-001',     '3309',             'sleeping'),
  ('tc-3425-001',     '3425',             'sleeping'),
  ('tc-3544-001',     '3544',             'sleeping'),
  ('tc-gs-001',       'Grand Suites',     'sleeping'),
  ('tc-suite-001',    'Suite Car',        'sleeping');

-- ─── 2. CABINS ────────────────────────────────────────────────

-- Grand Suites (named)
INSERT INTO "Cabin" (id, "carId", number, type, capacity) VALUES
  ('cabin-gs-paris',     'tc-gs-001', 'Paris',    'grand_suite', 2),
  ('cabin-gs-venice',    'tc-gs-001', 'Venice',   'grand_suite', 2),
  ('cabin-gs-istanbul',  'tc-gs-001', 'Istanbul', 'grand_suite', 2),
  ('cabin-gs-vienna',    'tc-gs-001', 'Vienna',   'grand_suite', 2),
  ('cabin-gs-prague',    'tc-gs-001', 'Prague',   'grand_suite', 2),
  ('cabin-gs-budapest',  'tc-gs-001', 'Budapest', 'grand_suite', 2);

-- Historic Car 3309 (A1-A9)
INSERT INTO "Cabin" (id, "carId", number, type, capacity) VALUES
  ('cabin-a1', 'tc-3309-001', 'A1', 'historic', 2),
  ('cabin-a2', 'tc-3309-001', 'A2', 'historic', 2),
  ('cabin-a3', 'tc-3309-001', 'A3', 'historic', 2),
  ('cabin-a4', 'tc-3309-001', 'A4', 'historic', 2),
  ('cabin-a5', 'tc-3309-001', 'A5', 'historic', 2),
  ('cabin-a6', 'tc-3309-001', 'A6', 'historic', 2),
  ('cabin-a7', 'tc-3309-001', 'A7', 'historic', 2),
  ('cabin-a8', 'tc-3309-001', 'A8', 'historic', 2),
  ('cabin-a9', 'tc-3309-001', 'A9', 'historic', 2);

-- Historic Car 3425 (B1-B9)
INSERT INTO "Cabin" (id, "carId", number, type, capacity) VALUES
  ('cabin-b1', 'tc-3425-001', 'B1', 'historic', 2),
  ('cabin-b2', 'tc-3425-001', 'B2', 'historic', 2),
  ('cabin-b3', 'tc-3425-001', 'B3', 'historic', 2),
  ('cabin-b4', 'tc-3425-001', 'B4', 'historic', 2),
  ('cabin-b5', 'tc-3425-001', 'B5', 'historic', 2),
  ('cabin-b6', 'tc-3425-001', 'B6', 'historic', 2),
  ('cabin-b7', 'tc-3425-001', 'B7', 'historic', 2),
  ('cabin-b8', 'tc-3425-001', 'B8', 'historic', 2),
  ('cabin-b9', 'tc-3425-001', 'B9', 'historic', 2);

-- Historic Car 3544 (C1-C9)
INSERT INTO "Cabin" (id, "carId", number, type, capacity) VALUES
  ('cabin-c1', 'tc-3544-001', 'C1', 'historic', 2),
  ('cabin-c2', 'tc-3544-001', 'C2', 'historic', 2),
  ('cabin-c3', 'tc-3544-001', 'C3', 'historic', 2),
  ('cabin-c4', 'tc-3544-001', 'C4', 'historic', 2),
  ('cabin-c5', 'tc-3544-001', 'C5', 'historic', 2),
  ('cabin-c6', 'tc-3544-001', 'C6', 'historic', 2),
  ('cabin-c7', 'tc-3544-001', 'C7', 'historic', 2),
  ('cabin-c8', 'tc-3544-001', 'C8', 'historic', 2),
  ('cabin-c9', 'tc-3544-001', 'C9', 'historic', 2);

-- Suite Car (S1-S6)
INSERT INTO "Cabin" (id, "carId", number, type, capacity) VALUES
  ('cabin-s1', 'tc-suite-001', 'S1', 'suite', 2),
  ('cabin-s2', 'tc-suite-001', 'S2', 'suite', 2),
  ('cabin-s3', 'tc-suite-001', 'S3', 'suite', 2),
  ('cabin-s4', 'tc-suite-001', 'S4', 'suite', 2),
  ('cabin-s5', 'tc-suite-001', 'S5', 'suite', 2),
  ('cabin-s6', 'tc-suite-001', 'S6', 'suite', 2);

-- ─── 3. JOURNEYS ──────────────────────────────────────────────
-- NOTE: All dates are set to 2026/2027 to ensure they are in the future.
-- The query filters departure > NOW(), so past dates return nothing.

INSERT INTO "Journey" (id, name, departure, arrival, status) VALUES
  ('journey-p2v-jun26',  'Paris to Venice',    '2026-06-20 21:30:00+00', '2026-06-21 18:00:00+00', 'scheduled'),
  ('journey-p2v-sep26',  'Paris to Venice',    '2026-09-15 21:30:00+00', '2026-09-16 18:00:00+00', 'scheduled'),
  ('journey-l2v-jun26',  'London to Venice',   '2026-06-10 10:00:00+00', '2026-06-11 18:00:00+00', 'scheduled'),
  ('journey-p2i-aug26',  'Paris to Istanbul',  '2026-08-25 14:00:00+00', '2026-08-30 16:00:00+00', 'scheduled'),
  ('journey-p2v-apr27',  'Paris to Venice',    '2027-04-18 21:30:00+00', '2027-04-19 18:00:00+00', 'scheduled'),
  ('journey-l2v-may27',  'London to Venice',   '2027-05-12 10:00:00+00', '2027-05-13 18:00:00+00', 'scheduled');

-- ─── 4. ROUTE SEGMENTS ────────────────────────────────────────

-- Paris to Venice (Jun 2026)
INSERT INTO "RouteSegment" (id, "journeyId", origin, destination, departure, arrival, "order") VALUES
  ('seg-p2v-jun26-1', 'journey-p2v-jun26', 'Paris', 'Venice', '2026-06-20 21:30:00+00', '2026-06-21 18:00:00+00', 0);

-- Paris to Venice (Sep 2026)
INSERT INTO "RouteSegment" (id, "journeyId", origin, destination, departure, arrival, "order") VALUES
  ('seg-p2v-sep26-1', 'journey-p2v-sep26', 'Paris', 'Venice', '2026-09-15 21:30:00+00', '2026-09-16 18:00:00+00', 0);

-- London to Venice (Jun 2026)
INSERT INTO "RouteSegment" (id, "journeyId", origin, destination, departure, arrival, "order") VALUES
  ('seg-l2v-jun26-1', 'journey-l2v-jun26', 'London', 'Calais', '2026-06-10 10:00:00+00', '2026-06-10 14:00:00+00', 0),
  ('seg-l2v-jun26-2', 'journey-l2v-jun26', 'Calais', 'Venice', '2026-06-10 15:00:00+00', '2026-06-11 18:00:00+00', 1);

-- Paris to Istanbul (Aug 2026)
INSERT INTO "RouteSegment" (id, "journeyId", origin, destination, departure, arrival, "order") VALUES
  ('seg-p2i-aug26-1', 'journey-p2i-aug26', 'Paris', 'Istanbul', '2026-08-25 14:00:00+00', '2026-08-30 16:00:00+00', 0);

-- Paris to Venice (Apr 2027)
INSERT INTO "RouteSegment" (id, "journeyId", origin, destination, departure, arrival, "order") VALUES
  ('seg-p2v-apr27-1', 'journey-p2v-apr27', 'Paris', 'Venice', '2027-04-18 21:30:00+00', '2027-04-19 18:00:00+00', 0);

-- London to Venice (May 2027)
INSERT INTO "RouteSegment" (id, "journeyId", origin, destination, departure, arrival, "order") VALUES
  ('seg-l2v-may27-1', 'journey-l2v-may27', 'London', 'Calais', '2027-05-12 10:00:00+00', '2027-05-12 14:00:00+00', 0),
  ('seg-l2v-may27-2', 'journey-l2v-may27', 'Calais', 'Venice', '2027-05-12 15:00:00+00', '2027-05-13 18:00:00+00', 1);

-- ─── 5. INVENTORY BUCKETS ─────────────────────────────────────
-- Pricing: historic=base, suite=2x, grand_suite=2.8x
-- Paris to Venice base: 3530 EUR
-- London to Venice base: 4100 EUR
-- Paris to Istanbul base: 17500 EUR

-- Helper: Each journey gets buckets for ALL cabin types.
-- Using the FIRST segment per journey for segmentId.

-- ── JOURNEY: Paris to Venice Jun 2026 (base: 3530) ──

-- Grand Suites (2.8x = 9884)
INSERT INTO "InventoryBucket" (id, "journeyId", "segmentId", "cabinId", status, price, currency) VALUES
  ('ib-p2v-jun26-gs-paris',    'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-gs-paris',    'available', 9884, 'EUR'),
  ('ib-p2v-jun26-gs-venice',   'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-gs-venice',   'booked',    9884, 'EUR'),
  ('ib-p2v-jun26-gs-istanbul', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-gs-istanbul', 'available', 9884, 'EUR'),
  ('ib-p2v-jun26-gs-vienna',   'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-gs-vienna',   'booked',    9884, 'EUR'),
  ('ib-p2v-jun26-gs-prague',   'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-gs-prague',   'available', 9884, 'EUR'),
  ('ib-p2v-jun26-gs-budapest', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-gs-budapest', 'booked',    9884, 'EUR');

-- Suites (2x = 7060)
INSERT INTO "InventoryBucket" (id, "journeyId", "segmentId", "cabinId", status, price, currency) VALUES
  ('ib-p2v-jun26-s1', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-s1', 'available', 7060, 'EUR'),
  ('ib-p2v-jun26-s2', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-s2', 'available', 7060, 'EUR'),
  ('ib-p2v-jun26-s3', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-s3', 'booked',    7060, 'EUR'),
  ('ib-p2v-jun26-s4', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-s4', 'available', 7060, 'EUR'),
  ('ib-p2v-jun26-s5', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-s5', 'booked',    7060, 'EUR'),
  ('ib-p2v-jun26-s6', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-s6', 'available', 7060, 'EUR');

-- Historic (1x = 3530)
INSERT INTO "InventoryBucket" (id, "journeyId", "segmentId", "cabinId", status, price, currency) VALUES
  ('ib-p2v-jun26-a1', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a1', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-a2', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a2', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-a3', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a3', 'booked',    3530, 'EUR'),
  ('ib-p2v-jun26-a4', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a4', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-a5', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a5', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-a6', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a6', 'booked',    3530, 'EUR'),
  ('ib-p2v-jun26-a7', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a7', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-a8', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a8', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-a9', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-a9', 'booked',    3530, 'EUR'),
  ('ib-p2v-jun26-b1', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b1', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-b2', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b2', 'booked',    3530, 'EUR'),
  ('ib-p2v-jun26-b3', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b3', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-b4', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b4', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-b5', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b5', 'booked',    3530, 'EUR'),
  ('ib-p2v-jun26-b6', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b6', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-b7', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b7', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-b8', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b8', 'booked',    3530, 'EUR'),
  ('ib-p2v-jun26-b9', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-b9', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-c1', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c1', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-c2', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c2', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-c3', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c3', 'booked',    3530, 'EUR'),
  ('ib-p2v-jun26-c4', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c4', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-c5', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c5', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-c6', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c6', 'booked',    3530, 'EUR'),
  ('ib-p2v-jun26-c7', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c7', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-c8', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c8', 'available', 3530, 'EUR'),
  ('ib-p2v-jun26-c9', 'journey-p2v-jun26', 'seg-p2v-jun26-1', 'cabin-c9', 'available', 3530, 'EUR');

-- ── JOURNEY: Paris to Venice Sep 2026 (base: 3530) ──

INSERT INTO "InventoryBucket" (id, "journeyId", "segmentId", "cabinId", status, price, currency) VALUES
  ('ib-p2v-sep26-gs-paris',    'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-gs-paris',    'available', 9884, 'EUR'),
  ('ib-p2v-sep26-gs-venice',   'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-gs-venice',   'available', 9884, 'EUR'),
  ('ib-p2v-sep26-gs-istanbul', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-gs-istanbul', 'booked',    9884, 'EUR'),
  ('ib-p2v-sep26-gs-vienna',   'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-gs-vienna',   'available', 9884, 'EUR'),
  ('ib-p2v-sep26-gs-prague',   'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-gs-prague',   'booked',    9884, 'EUR'),
  ('ib-p2v-sep26-gs-budapest', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-gs-budapest', 'available', 9884, 'EUR'),
  ('ib-p2v-sep26-s1', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-s1', 'available', 7060, 'EUR'),
  ('ib-p2v-sep26-s2', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-s2', 'booked',    7060, 'EUR'),
  ('ib-p2v-sep26-s3', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-s3', 'available', 7060, 'EUR'),
  ('ib-p2v-sep26-s4', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-s4', 'available', 7060, 'EUR'),
  ('ib-p2v-sep26-s5', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-s5', 'available', 7060, 'EUR'),
  ('ib-p2v-sep26-s6', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-s6', 'booked',    7060, 'EUR'),
  ('ib-p2v-sep26-a1', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a1', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-a2', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a2', 'booked',    3530, 'EUR'),
  ('ib-p2v-sep26-a3', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a3', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-a4', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a4', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-a5', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a5', 'booked',    3530, 'EUR'),
  ('ib-p2v-sep26-a6', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a6', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-a7', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a7', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-a8', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a8', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-a9', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-a9', 'booked',    3530, 'EUR'),
  ('ib-p2v-sep26-b1', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b1', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-b2', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b2', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-b3', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b3', 'booked',    3530, 'EUR'),
  ('ib-p2v-sep26-b4', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b4', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-b5', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b5', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-b6', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b6', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-b7', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b7', 'booked',    3530, 'EUR'),
  ('ib-p2v-sep26-b8', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b8', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-b9', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-b9', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-c1', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c1', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-c2', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c2', 'booked',    3530, 'EUR'),
  ('ib-p2v-sep26-c3', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c3', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-c4', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c4', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-c5', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c5', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-c6', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c6', 'booked',    3530, 'EUR'),
  ('ib-p2v-sep26-c7', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c7', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-c8', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c8', 'available', 3530, 'EUR'),
  ('ib-p2v-sep26-c9', 'journey-p2v-sep26', 'seg-p2v-sep26-1', 'cabin-c9', 'available', 3530, 'EUR');

-- ── JOURNEY: London to Venice Jun 2026 (base: 4100) ──

INSERT INTO "InventoryBucket" (id, "journeyId", "segmentId", "cabinId", status, price, currency) VALUES
  ('ib-l2v-jun26-gs-paris',    'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-gs-paris',    'available', 11480, 'EUR'),
  ('ib-l2v-jun26-gs-venice',   'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-gs-venice',   'booked',    11480, 'EUR'),
  ('ib-l2v-jun26-gs-istanbul', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-gs-istanbul', 'available', 11480, 'EUR'),
  ('ib-l2v-jun26-gs-vienna',   'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-gs-vienna',   'available', 11480, 'EUR'),
  ('ib-l2v-jun26-gs-prague',   'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-gs-prague',   'booked',    11480, 'EUR'),
  ('ib-l2v-jun26-gs-budapest', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-gs-budapest', 'available', 11480, 'EUR'),
  ('ib-l2v-jun26-s1', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-s1', 'available', 8200, 'EUR'),
  ('ib-l2v-jun26-s2', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-s2', 'available', 8200, 'EUR'),
  ('ib-l2v-jun26-s3', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-s3', 'booked',    8200, 'EUR'),
  ('ib-l2v-jun26-s4', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-s4', 'available', 8200, 'EUR'),
  ('ib-l2v-jun26-s5', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-s5', 'available', 8200, 'EUR'),
  ('ib-l2v-jun26-s6', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-s6', 'booked',    8200, 'EUR'),
  ('ib-l2v-jun26-a1', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a1', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-a2', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a2', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-a3', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a3', 'booked',    4100, 'EUR'),
  ('ib-l2v-jun26-a4', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a4', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-a5', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a5', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-a6', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a6', 'booked',    4100, 'EUR'),
  ('ib-l2v-jun26-a7', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a7', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-a8', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a8', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-a9', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-a9', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-b1', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b1', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-b2', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b2', 'booked',    4100, 'EUR'),
  ('ib-l2v-jun26-b3', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b3', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-b4', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b4', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-b5', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b5', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-b6', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b6', 'booked',    4100, 'EUR'),
  ('ib-l2v-jun26-b7', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b7', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-b8', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b8', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-b9', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-b9', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-c1', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c1', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-c2', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c2', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-c3', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c3', 'booked',    4100, 'EUR'),
  ('ib-l2v-jun26-c4', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c4', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-c5', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c5', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-c6', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c6', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-c7', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c7', 'booked',    4100, 'EUR'),
  ('ib-l2v-jun26-c8', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c8', 'available', 4100, 'EUR'),
  ('ib-l2v-jun26-c9', 'journey-l2v-jun26', 'seg-l2v-jun26-1', 'cabin-c9', 'available', 4100, 'EUR');

-- ── JOURNEY: Paris to Istanbul Aug 2026 (base: 17500) ──

INSERT INTO "InventoryBucket" (id, "journeyId", "segmentId", "cabinId", status, price, currency) VALUES
  ('ib-p2i-aug26-gs-paris',    'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-gs-paris',    'available', 49000, 'EUR'),
  ('ib-p2i-aug26-gs-venice',   'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-gs-venice',   'booked',    49000, 'EUR'),
  ('ib-p2i-aug26-gs-istanbul', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-gs-istanbul', 'available', 49000, 'EUR'),
  ('ib-p2i-aug26-gs-vienna',   'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-gs-vienna',   'booked',    49000, 'EUR'),
  ('ib-p2i-aug26-gs-prague',   'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-gs-prague',   'available', 49000, 'EUR'),
  ('ib-p2i-aug26-gs-budapest', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-gs-budapest', 'booked',    49000, 'EUR'),
  ('ib-p2i-aug26-s1', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-s1', 'available', 35000, 'EUR'),
  ('ib-p2i-aug26-s2', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-s2', 'available', 35000, 'EUR'),
  ('ib-p2i-aug26-s3', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-s3', 'booked',    35000, 'EUR'),
  ('ib-p2i-aug26-s4', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-s4', 'available', 35000, 'EUR'),
  ('ib-p2i-aug26-s5', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-s5', 'booked',    35000, 'EUR'),
  ('ib-p2i-aug26-s6', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-s6', 'available', 35000, 'EUR'),
  ('ib-p2i-aug26-a1', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a1', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-a2', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a2', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-a3', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a3', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-a4', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a4', 'booked',    17500, 'EUR'),
  ('ib-p2i-aug26-a5', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a5', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-a6', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a6', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-a7', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a7', 'booked',    17500, 'EUR'),
  ('ib-p2i-aug26-a8', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a8', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-a9', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-a9', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-b1', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b1', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-b2', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b2', 'booked',    17500, 'EUR'),
  ('ib-p2i-aug26-b3', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b3', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-b4', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b4', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-b5', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b5', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-b6', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b6', 'booked',    17500, 'EUR'),
  ('ib-p2i-aug26-b7', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b7', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-b8', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b8', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-b9', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-b9', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-c1', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c1', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-c2', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c2', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-c3', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c3', 'booked',    17500, 'EUR'),
  ('ib-p2i-aug26-c4', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c4', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-c5', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c5', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-c6', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c6', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-c7', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c7', 'booked',    17500, 'EUR'),
  ('ib-p2i-aug26-c8', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c8', 'available', 17500, 'EUR'),
  ('ib-p2i-aug26-c9', 'journey-p2i-aug26', 'seg-p2i-aug26-1', 'cabin-c9', 'available', 17500, 'EUR');

-- ── JOURNEY: Paris to Venice Apr 2027 (base: 3530) ──

INSERT INTO "InventoryBucket" (id, "journeyId", "segmentId", "cabinId", status, price, currency) VALUES
  ('ib-p2v-apr27-gs-paris',    'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-gs-paris',    'available', 9884, 'EUR'),
  ('ib-p2v-apr27-gs-venice',   'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-gs-venice',   'available', 9884, 'EUR'),
  ('ib-p2v-apr27-gs-istanbul', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-gs-istanbul', 'available', 9884, 'EUR'),
  ('ib-p2v-apr27-gs-vienna',   'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-gs-vienna',   'available', 9884, 'EUR'),
  ('ib-p2v-apr27-gs-prague',   'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-gs-prague',   'available', 9884, 'EUR'),
  ('ib-p2v-apr27-gs-budapest', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-gs-budapest', 'available', 9884, 'EUR'),
  ('ib-p2v-apr27-s1', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-s1', 'available', 7060, 'EUR'),
  ('ib-p2v-apr27-s2', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-s2', 'available', 7060, 'EUR'),
  ('ib-p2v-apr27-s3', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-s3', 'available', 7060, 'EUR'),
  ('ib-p2v-apr27-s4', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-s4', 'available', 7060, 'EUR'),
  ('ib-p2v-apr27-s5', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-s5', 'available', 7060, 'EUR'),
  ('ib-p2v-apr27-s6', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-s6', 'available', 7060, 'EUR'),
  ('ib-p2v-apr27-a1', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a1', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-a2', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a2', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-a3', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a3', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-a4', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a4', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-a5', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a5', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-a6', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a6', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-a7', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a7', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-a8', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a8', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-a9', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-a9', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b1', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b1', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b2', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b2', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b3', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b3', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b4', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b4', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b5', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b5', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b6', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b6', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b7', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b7', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b8', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b8', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-b9', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-b9', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c1', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c1', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c2', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c2', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c3', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c3', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c4', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c4', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c5', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c5', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c6', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c6', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c7', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c7', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c8', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c8', 'available', 3530, 'EUR'),
  ('ib-p2v-apr27-c9', 'journey-p2v-apr27', 'seg-p2v-apr27-1', 'cabin-c9', 'available', 3530, 'EUR');

-- ── JOURNEY: London to Venice May 2027 (base: 4100) ──

INSERT INTO "InventoryBucket" (id, "journeyId", "segmentId", "cabinId", status, price, currency) VALUES
  ('ib-l2v-may27-gs-paris',    'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-gs-paris',    'available', 11480, 'EUR'),
  ('ib-l2v-may27-gs-venice',   'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-gs-venice',   'available', 11480, 'EUR'),
  ('ib-l2v-may27-gs-istanbul', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-gs-istanbul', 'available', 11480, 'EUR'),
  ('ib-l2v-may27-gs-vienna',   'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-gs-vienna',   'available', 11480, 'EUR'),
  ('ib-l2v-may27-gs-prague',   'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-gs-prague',   'available', 11480, 'EUR'),
  ('ib-l2v-may27-gs-budapest', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-gs-budapest', 'available', 11480, 'EUR'),
  ('ib-l2v-may27-s1', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-s1', 'available', 8200, 'EUR'),
  ('ib-l2v-may27-s2', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-s2', 'available', 8200, 'EUR'),
  ('ib-l2v-may27-s3', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-s3', 'available', 8200, 'EUR'),
  ('ib-l2v-may27-s4', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-s4', 'available', 8200, 'EUR'),
  ('ib-l2v-may27-s5', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-s5', 'available', 8200, 'EUR'),
  ('ib-l2v-may27-s6', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-s6', 'available', 8200, 'EUR'),
  ('ib-l2v-may27-a1', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a1', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-a2', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a2', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-a3', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a3', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-a4', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a4', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-a5', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a5', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-a6', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a6', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-a7', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a7', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-a8', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a8', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-a9', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-a9', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b1', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b1', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b2', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b2', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b3', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b3', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b4', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b4', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b5', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b5', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b6', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b6', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b7', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b7', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b8', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b8', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-b9', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-b9', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c1', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c1', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c2', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c2', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c3', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c3', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c4', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c4', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c5', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c5', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c6', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c6', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c7', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c7', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c8', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c8', 'available', 4100, 'EUR'),
  ('ib-l2v-may27-c9', 'journey-l2v-may27', 'seg-l2v-may27-1', 'cabin-c9', 'available', 4100, 'EUR');

-- ─── VERIFY ───────────────────────────────────────────────────
SELECT 'Journey'         AS table_name, COUNT(*) AS rows FROM "Journey"
UNION ALL
SELECT 'TrainCar',        COUNT(*) FROM "TrainCar"
UNION ALL
SELECT 'Cabin',           COUNT(*) FROM "Cabin"
UNION ALL
SELECT 'RouteSegment',    COUNT(*) FROM "RouteSegment"
UNION ALL
SELECT 'InventoryBucket', COUNT(*) FROM "InventoryBucket";

-- ═════════════════════════════════════════════════════════════
-- Expected counts after running this script:
--   Journey         →  6
--   TrainCar        →  9
--   Cabin           → 33 (6 grand_suite + 27 historic + 6 suite)
--   RouteSegment    →  8
--   InventoryBucket → 198 (33 cabins × 6 journeys)
-- ═════════════════════════════════════════════════════════════
