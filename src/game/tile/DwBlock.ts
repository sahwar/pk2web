import { Block } from '@game/tile/Block';
import { BLOCK_SIZE } from '@game/tile/BlockConstants';
import { BlockContext } from '@game/tile/BlockContext';
import { BlockPrototype, TBlockProtoCode } from '@game/tile/BlockPrototype';
import { IDrawable } from '@ng/drawable/IDrawable';
import { PkImageTextureImpl } from '@ng/types/pixi/PkImageTextureImpl';
import * as PIXI from 'pixi.js';

export class DwBlock implements IDrawable {
    private readonly _context: BlockContext;
    private readonly _drawable: PIXI.Container;
    
    // Type of block
    private readonly _proto: BlockPrototype;
    // Id of the texture to use
    private readonly _textureId: string;
    
    private readonly _i: number;
    private readonly _j: number;
    
    // ...facing left
    private _vasemmalle: EBlocks;
    // ...facing right
    private _oikealle: EBlocks;
    // ...faceing up
    private _ylos: EBlocks;
    // ...facing down
    private _alas: EBlocks;
    
    
    public constructor(context: BlockContext, proto: BlockPrototype, i: number, j: number, textureId: string) {
        this._context = context;
        this._proto = proto;
        this._textureId = textureId;
        
        this._i = i;
        this._j = j;
        
        this._drawable = new PIXI.Container();
        this._drawable.x = this.x;
        this._drawable.y = this.y;
        this.relayout();
    }
    
    
    ///  Accessors  ///
    
    public get code(): TBlockProtoCode { return this._proto.code; }
    
    public get i(): number { return this._i; }
    public get j(): number { return this._j; }
    
    public get x(): number { return this._i * BLOCK_SIZE; }
    // public set x(x: number) {
    //     this._x = x;
    //     this._drawable.x = x;
    // }
    public get y(): number { return this._j * BLOCK_SIZE; }
    // public set y(y: number) {
    //     this._y = y;
    //     this._drawable.y = y;
    // }
    
    public get top(): number { return this.y + this._proto.top; }
    public get right(): number { return this.x + BLOCK_SIZE + this._proto.right; }
    public get bottom(): number { return this.y + BLOCK_SIZE + this._proto.bottom; }
    public get left(): number { return this.x + this._proto.left; }
    
    // Never used
    // public get toTheTop(): EBlocks { return this._ylos != null ? this._ylos : this._proto.toTheTop; }
    // public get toTheRight(): EBlocks { return this._oikealle != null ? this._oikealle : this._proto.toTheRight; }
    // public get toTheBottom(): EBlocks { return this._alas != null ? this._alas : this._proto.toTheBottom; }
    // public get toTheLeft(): EBlocks { return this._vasemmalle != null ? this._vasemmalle : this._proto.toTheLeft; }
    
    public get tausta(): boolean { return this._proto.tausta; }
    
    public isWater(): boolean { return this._proto.isWater() === true; }
    
    
    ///  Graphics  ///
    
    public relayout(): void {
        const texture = this._context.textureCache.getTexture(this._textureId, this._proto.getTextureArea());
        const tile = new PIXI.Sprite((texture as PkImageTextureImpl).getPixiTexture());
        this._drawable.addChild(tile);
        
        // Debug
        const graphics = new PIXI.Graphics();
        if (this.tausta) {
            graphics.lineStyle(1, 0xa8a8a8, 0.6);
            graphics.drawRect(3, 3, BLOCK_SIZE - 6, BLOCK_SIZE - 6);
        } else {
            graphics.lineStyle(1, 0x1010ff, 0.6);
            graphics.drawRect(1, 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
        }
        this._drawable.addChild(graphics);
        
        let text = new PIXI.Text(this.code, { fontFamily: 'Arial', fontSize: 10, fill: 0xff1010, align: 'left' });
        text.x = 5;
        text.y = 5;
        this._drawable.addChild(text);
        
        setTimeout(() => {
            this._drawable.cacheAsBitmap = true;
        }, 1500);
    }
    
    public getDrawable(): PIXI.DisplayObject {
        return this._drawable;
    }
    
    public invalidate(propagate: boolean): void {
    }
    
    public isInvalidated(): boolean {
        return false;
    }
    
    
    ///
    
    public getPlainData(): Block {
        // TODO: GEneralize
        return {
            code: this.code,
            
            i: this._i,
            j: this._j,
            x: this.x,
            y: this.y,
            
            toTheLeft: this._proto.toTheLeft,
            toTheRight: this._proto.toTheRight,
            toTheTop: this._proto.toTheTop,
            toTheBottom: this._proto.toTheBottom,
            
            top: this.top,
            right: this.right,
            bottom: this.bottom,
            left: this.left,
            
            topMask: this._proto.topMask,
            bottomMask: this._proto.bottomMask,
            
            tausta: this.tausta,
            edge: null,
            water: this.isWater()
        };
    }
}

export enum EBlocks {
    BLOCK_TAUSTA,          //BLOCK_BACKGROUND
    BLOCK_SEINA,           //BLOCK_WALL
    BLOCK_MAKI_OIKEA_YLOS, //BLOCK_MAX
    BLOCK_MAKI_VASEN_YLOS, //BLOCK_MAX_
    BLOCK_MAKI_OIKEA_ALAS, //BLOCK_MAX_
    BLOCK_MAKI_VASEN_ALAS, //BLOCK_MAX_
    BLOCK_MAKI_YLOS,       //BLOCK_MAX_UP
    BLOCK_MAKI_ALAS        //BLOCK_MAX_DOWN
}
