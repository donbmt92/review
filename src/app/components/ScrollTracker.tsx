'use client';

import { useScrollTracking } from '../hooks/useScrollTracking';

export default function ScrollTracker() {
  useScrollTracking();
  return null; // Component này không render gì, chỉ để track scroll
}
