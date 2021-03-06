import { PkColor } from '@ng/types/PkColor';
import { PkTexture } from '@ng/types/PkTexture';
import { uint } from '@sp/types';
import * as PIXI from 'pixi.js';

export interface PkBaseTexture {
    /**
     * Image width.
     */
    readonly width: uint;
    /**
     * Image height.
     */
    readonly height: uint;
    
    readonly pixi: PIXI.BaseTexture;
    
    /**
     * Returns a copy of this instance which can be modified without affecting the original instance..
     */
    clone(): PkBaseTexture;
    
    getTexture(frame?: PIXI.Rectangle): PkTexture<PkBaseTexture>;
    
    getPixelColor(i: uint, j: uint): PkColor;
}