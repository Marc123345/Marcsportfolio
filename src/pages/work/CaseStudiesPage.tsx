import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  AutoMarginPage,
  FleetManagementPage,
  MyTubePage,
  ChadLeClosPage,
  IrreplicablePage,
  VideoleapPage,
  FriedmanCohenPage,
  BinnsMediaPage,
  SecureAnnapolisPage,
  UntappedAfricaPage,
  ILightPage,
  AskAfricaPage,
  UzaEntertainmentPage,
} from './case-studies';

export default function CaseStudiesPage() {
  return (
    <Routes>
      <Route path="automarginx" element={<AutoMarginPage />} />
      <Route path="fleet-management" element={<FleetManagementPage />} />
      <Route path="mytube" element={<MyTubePage />} />
      <Route path="chad-le-clos" element={<ChadLeClosPage />} />
      <Route path="irreplicable" element={<IrreplicablePage />} />
      <Route path="videoleap" element={<VideoleapPage />} />
      <Route path="friedman-cohen" element={<FriedmanCohenPage />} />
      <Route path="binns-media" element={<BinnsMediaPage />} />
      <Route path="secure-annapolis" element={<SecureAnnapolisPage />} />
      <Route path="untapped-africa" element={<UntappedAfricaPage />} />
      <Route path="ilight" element={<ILightPage />} />
      <Route path="ask-africa" element={<AskAfricaPage />} />
      <Route path="uza-entertainment" element={<UzaEntertainmentPage />} />
      <Route path="*" element={<Navigate to="/work" replace />} />
    </Routes>
  );
}