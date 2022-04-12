This directory contains select modules from [@react-three/drei](https://github.com/pmndrs/drei).

Why? Drei relies on [three-stdlib](https://github.com/pmndrs/three-stdlib) as a standalone alternative to [three/examples/jsm](https://github.com/mrdoob/three.js/tree/dev/examples/jsm), however this library seems to have some treeshaking issues, as even a single import causes the entire library to be bundled, notably increasing the overall bundle size. As such, modules in this directory serve to provide the same functionality of Drei but using three/examples/jsm instead.

Code from @react-three/drei is used in accordance with the library's license:

```
MIT License

Copyright (c) 2020 react-spring

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
