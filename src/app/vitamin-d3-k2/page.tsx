"use client";

import React from 'react';
import ProductComparisonPage from '../components/ProductComparisonPage';
import { vitaminD3K2Data } from '../data/vitaminD3K2Data';

export const dynamic = "force-static";

export default function VitaminD3K2Page() {
  return <ProductComparisonPage {...vitaminD3K2Data} />;
}
