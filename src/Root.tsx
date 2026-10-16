import React from 'react';
import { Composition } from 'remotion';
import { LiquidChrome } from './archetypes/01_LiquidChrome';
import { IridescentSilk } from './archetypes/02_IridescentSilk';
import { ObsidianFacets } from './archetypes/03_ObsidianFacets';
import { CyberGrid } from './archetypes/04_CyberGrid';
import { ChampagneBokeh } from './archetypes/05_ChampagneBokeh';
import { DarkConcentric } from './archetypes/06_DarkConcentric';
import { CosmicNebula } from './archetypes/07_CosmicNebula';
import { Bioluminescent } from './archetypes/08_Bioluminescent';
import { QuantumWaveguide } from './archetypes/09_QuantumWaveguide';
import { SacredGeometry } from './archetypes/10_SacredGeometry';
import { PaperTopography } from './archetypes/11_PaperTopography';

export const RemotionRoot: React.FC = () => {
  const default4K = {
    durationInFrames: 600, // 10 seconds seamless loop
    fps: 60,
    width: 3840,
    height: 2160,
  };

  return (
    <>
      <Composition
        id="liquid-chrome"
        component={LiquidChrome}
        {...default4K}
      />
      <Composition
        id="iridescent-silk"
        component={IridescentSilk}
        {...default4K}
      />
      <Composition
        id="obsidian-gold"
        component={ObsidianFacets}
        {...default4K}
      />
      <Composition
        id="cyber-grid"
        component={CyberGrid}
        {...default4K}
      />
      <Composition
        id="champagne-bokeh"
        component={ChampagneBokeh}
        {...default4K}
      />
      <Composition
        id="dark-concentric"
        component={DarkConcentric}
        {...default4K}
      />
      <Composition
        id="cosmic-nebula"
        component={CosmicNebula}
        {...default4K}
      />
      <Composition
        id="bioluminescent"
        component={Bioluminescent}
        {...default4K}
      />
      <Composition
        id="quantum-waveguide"
        component={QuantumWaveguide}
        {...default4K}
      />
      <Composition
        id="sacred-geometry"
        component={SacredGeometry}
        {...default4K}
      />
      <Composition
        id="paper-topography"
        component={PaperTopography}
        {...default4K}
      />
    </>
  );
};
