import type { SourceContribution } from '../types'

/**
 * Wikipedia, "List of game engines" (https://en.wikipedia.org/wiki/List_of_game_engines, CC BY-SA 4.0, edit date not shown on the text read).
 * Read: about the first half of its table verbatim and most of the next block through a summary; the last part was not read, and the page mixes game and rendering engines and has no status column. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const gameEnginesWikipedia: SourceContribution = {
  source: 'game-engines-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Game development and graphics': {
      Godot: '',
      GameMaker: 'A game engine and editor for 2D games.',
      GDevelop: 'A no-code, open-source game engine.',
      MonoGame: 'An open-source framework for cross-platform .NET games.',
      Phaser: 'A JavaScript framework for 2D browser games.',
      LibGDX: 'A Java framework for cross-platform games.',
      'LÖVE': 'A Lua framework for 2D games.',
      Defold: 'A free game engine for 2D and 3D games.',
      Cocos2d: 'A family of game engines for 2D games.',
      Construct: 'A visual, no-code 2D game engine.',
      CryEngine: 'A game engine known for high-end visuals.',
      'Babylon.js': 'A JavaScript engine for 3D graphics and games on the web.',
      'Three.js': 'A JavaScript library for 3D graphics in the browser.',
      PlayCanvas: 'A web-based engine and editor for 3D web games.',
      O3DE: 'An open-source 3D game engine.',
      Stride: 'An open-source C# game engine.',
      Panda3D: 'An open-source 3D engine for Python and C++.',
    },
  },
}
