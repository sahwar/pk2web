import { Entropy } from '@game/Entropy';
import { GameComposition } from '@game/game/GameComposition';
import { TextureCache } from '@game/game/TextureCache';
import { PK2Map } from '@game/map/PK2Map';
import { PK2Context } from '@game/PK2Context';
import { int } from '../../support/types';

/**
 * The game environment is shared with all game related elements.
 */
export class GameContext {
    protected readonly context: PK2Context;
    
    public readonly map: PK2Map;
    public readonly textureCache: TextureCache;
    public readonly composition: GameComposition;
    protected _camera: { x: number, y: number };
    
    protected _swichTimer1: number;
    protected _swichTimer2: number;
    protected _swichTimer3: number;
    
    public constructor(context: PK2Context, map: PK2Map) {
        this.context = context;
        this.map = map;
        
        this.textureCache = new TextureCache();
        this.composition = new GameComposition();
        this._camera = { x: 0, y: 0 };
        
        this._swichTimer1 = 0;
        this._swichTimer2 = 0;
        this._swichTimer3 = 0;
    }
    
    public get entropy(): Entropy {
        return this.context.entropy;
    }
    
    public get cameraX(): number {
        return this._camera.x;
    }
    public get cameraY(): number {
        return this._camera.y;
    }
    
    public get screenWidth(): number {
        return this.context.screenWidth;
    }
    public get screenHeight(): number {
        return this.context.screenHeight;
    }
    
    
    ///  Switches  ////
    
    /** Returns {@link _swichTimer1}. */
    public get switchTimer1() {
        return this._swichTimer1;
    }
    /** @deprecated */ public get kytkin1() { return this.switchTimer1; }
    /** @deprecated */ public get ajastin1() { return this.switchTimer1; }
    
    /** Returns {@link _swichTimer2}. */
    public get switchTimer2() {
        return this._swichTimer2;
    }
    /** @deprecated */ public get kytkin2() { return this.switchTimer2; }
    /** @deprecated */ public get ajastin2() { return this.switchTimer2; }
    
    /** Returns {@link _swichTimer3}. */
    public get switchTimer3() {
        return this._swichTimer3;
    }
    /** @deprecated */ public get kytkin3() { return this.switchTimer3; }
    /** @deprecated */ public get ajastin3() { return this.switchTimer3; }
    
}