"use client";

import React from 'react';
import ProductComparisonPage from '../components/ProductComparisonPage';
import { steamCleanersData } from '../data/steamCleanersData';

export const dynamic = "force-static";

export default function SteamCleanersPage() {
  return <ProductComparisonPage {...steamCleanersData} />;
}
