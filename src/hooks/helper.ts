import { useEffect, useLayoutEffect } from 'react';
import { isServer } from './ssr';

export const useIsomorphicLayoutEffect = isServer() ? useEffect : useLayoutEffect;
