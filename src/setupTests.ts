// https://github.com/aelbore/esbuild-jest/issues/61
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';

global.React = React;
