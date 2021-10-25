declare module 'postprocessing' {
    export enum BlendFunction {
        SKIP,
        ADD,
        ALPHA,
        AVERAGE,
        COLOR_BURN,
        COLOR_DODGE,
        DARKEN,
        DIFFERENCE,
        EXCLUSION,
        LIGHTEN,
        MULTIPLY,
        DIVIDE,
        NEGATION,
        NORMAL,
        OVERLAY,
        REFLECT,
        SCREEN,
        SOFT_LIGHT,
        SUBTRACT,
    }

    export enum KernelSize {
        VERY_SMALL,
        SMALL,
        MEDIUM,
        LARGE,
        VERY_LARGE,
        HUGE,
    }

    export class Resizer {
        constructor(resizable: any, width: number, height: number, scale: number);
        get scale(): number;
        set scale(value: number): number;
        get width(): number;
        set width(value: number): number;
        get height(): number;
        set height(value: number): number;
        static get AUTO_SIZE(): number;
    }
}
