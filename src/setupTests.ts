import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';

// TODO Remove this once https://github.com/aelbore/esbuild-jest/issues/61 is fixed.
global.React = React;

// TODO: Remove this once https://github.com/nickcolley/jest-axe/issues/147 is fixed.
const {getComputedStyle} = global;
global.getComputedStyle = elt => getComputedStyle?.(elt);
