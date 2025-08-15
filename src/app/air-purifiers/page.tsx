"use client";

import React from 'react';
import ProductComparisonPage from '../components/ProductComparisonPage';
import { airPurifiersData } from '../data/airPurifiersData';

export const dynamic = "force-static";

export default function AirPurifiersPage() {
  return <ProductComparisonPage {...airPurifiersData} />;
}
