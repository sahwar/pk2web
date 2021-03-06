import { DwContainer } from '@ng/drawable/dw/DwContainer';
import { DwSprite } from '@ng/drawable/dw/DwSprite';
import { pathJoin } from '@ng/support/utils';
import { PkAssetTk } from '@ng/toolkit/PkAssetTk';
import { PkFont } from '@ng/types/font/PkFont';
import { PkBaseTexture } from '@ng/types/image/PkBaseTexture';
import { PkBitmapBT } from '@ng/types/image/PkBitmapBT';
import { PkParameters } from '@ng/types/PkParameters';
import { PkRectangle } from '@ng/types/PkRectangle';
import { PkTexture } from '@ng/types/PkTexture';

export class PkFontAsset implements PkFont {
    private readonly _url: string;
    private _parameters: PkParameters;
    
    private _bitmap: PkBitmapBT;
    private readonly _textureCache: { [char: string]: PkTexture<PkBaseTexture> };
    private readonly _charIndex: { [char: string]: number };
    
    private _sourceX: number;
    private _sourceY: number;
    private sourceW: number;
    
    private _sourceH: number;
    private _chars: string;
    private _charW: number;
    private _charH: number;
    private _charCount: number;
    
    public static async from(url: string): Promise<PkFontAsset> {
        const font = new PkFontAsset(url);
        return await font.load();
    }
    
    private constructor(url: string) {
        this._url = url;
        
        this._charIndex = {};
        this._textureCache = {};
        
        this._charW = 0;
        this._charH = 0;
        this._charCount = 0;
    }
    
    // Never used
    // PisteFont2::PisteFont2(int img_source, int x, int y, int width, int height, int count);
    
    // public GetImage(x: int, y: int, texture: PIXI.BaseTexture): PIXI.Texture {
    //     return new PIXI.Texture(texture, new PIXI.Rectangle(x, y, this._charW * this._charCount, this._charH * this._charCount));
    //     //	ImageIndex = PisteDraw2_Image_Cut(img_source, x, y, _charW*_charCount, _charH*_charCount);
    // }
    
    private async load(): Promise<PkFontAsset> {
        this._parameters = await PkAssetTk.getParamFile(this._url);
        
        // let buf_width: int;
        //let font_index[256] int;
        
        // buf_width = Number(paramFile.get('image width'));
        
        this._sourceX = Number(this._parameters.get('image x'));
        this._sourceY = Number(this._parameters.get('image y'));
        
        this._charCount = this._parameters.get('letters').length;
        this._charW = Number(this._parameters.get('letter width'));
        this._charH = Number(this._parameters.get('letter height'));
        this._chars = this._parameters.get('letters');
        
        this.sourceW = this._charW * this._charCount;
        this._sourceH = this._charH;
        
        const path = this._url.substring(0, this._url.lastIndexOf('/')) + '/';
        const imagePath = this._parameters.get('image');
        
        this._bitmap = await PkAssetTk.getBitmap(pathJoin(path, imagePath));
        this._bitmap.makeColorTransparent();
        // TODO: Control error
        //	temp_image = PisteDraw2_Image_Load(_uri,false);
        //	if (temp_image == -1) return -1;
        
        // Generate characters index
        for (let i = 0; i < this._charCount; i++) {
            const key = this._chars[i];
            this._charIndex[key] = i;
        }
        
        return this;
    }
    
    private getCharTexture(char: string): PkTexture<PkBaseTexture> {
        let character = this._textureCache[char];
        
        if (typeof character === 'undefined') {
            const index = this._charIndex[char];
            
            if (index != null) {
                // In-atlas x => char position * char width
                const x = this._charIndex[char] * this._charW;
                character = this._bitmap.getTexture(PkRectangle.$(this._sourceX + x, this._sourceY, this._charW, this._charH));
            } else {
                character = null;
            }
            
            this._textureCache[char] = character;
        }
        
        return character;
    }
    
    public writeText(text: string, target?: DwContainer, x: number = 0, y: number = 0): DwContainer {
        if (target == null) {
            target = (new DwContainer() as DwContainer);
        }
        
        let char: string;
        let texture: PkTexture<PkBaseTexture>;
        let sprite: DwSprite;
        
        let i;
        for (i = 0; i < text.length; i++) {
            char = text[i];
            
            // Every character is an individual drawable
            sprite = new DwSprite()
                .setPosition(i * this._charW + x, y)
                .addTo(target);
            
            // A texture is assigned only if it exists (spaces for example are exceptions)
            texture = this.getCharTexture(char);
            if (texture != null) {
                sprite.setTexture(texture);
            }
        }
        
        return target;
    }
    
    public get charWidth(): number { return this._charW; }
}
