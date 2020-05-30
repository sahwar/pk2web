import { EInputAction } from '@game/enum/EInputAction';
import { PkEngine } from '@ng/PkEngine';
import { Log } from '@ng/support/log/LoggerImpl';
import { Key } from 'ts-key-enum';

export { Key } from 'ts-key-enum';

export class PkInput {
    private readonly _engine: PkEngine;
    
    private pressedKeys: Set<string>;
    private actionToInput;
    public keyCooldown: number;
    
    public constructor(engine: PkEngine) {
        this._engine = engine;
        
        this.pressedKeys = new Set;
        this.keyCooldown = 0;
        
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
        
        // HARCODED
        //this.attatchAction();
    }
    
    public listenKeys(keys: string, fn: () => any) {
        /* hotkeys(keys, fn);*/
    }
    
    public unlistenKeys(keys: string, fn: () => any) {
    
    }
    
    public attatchAction(keyCode: number, action: number | string) {
        
    }
    
    public isActing(action: number | string): boolean {
        if (action === EInputAction.INPUT_LEFT)
            return this.pressedKeys.has(Key.ArrowLeft);
        if (action === EInputAction.INPUT_RIGHT)
            return this.pressedKeys.has(Key.ArrowRight);
        if (action === EInputAction.INPUT_JUMP)
            return this.pressedKeys.has(Key.ArrowUp);
        if (action === EInputAction.INPUT_DOWN)
            return this.pressedKeys.has(Key.ArrowDown);
        
        if (action === EInputAction.INPUT_WALK_SLOW)
            return this.pressedKeys.has(Key.AltGraph);
        
        if (action === EInputAction.INPUT_ATTACK1)
            return this.pressedKeys.has(Key.Control);
        if (action === EInputAction.INPUT_ATTACK2)
            return this.pressedKeys.has(Key.Alt);
        
        if (action === EInputAction.INPUT_SUICIDE)
            return this.pressedKeys.has(Key.Delete);
        if (action === EInputAction.INPUT_PAUSE)
            return this.pressedKeys.has('P');
        
        if (action === EInputAction.INPUT_GIFT_NEXT)
            return this.pressedKeys.has(Key.Tab);
        if (action === EInputAction.INPUT_GIFT_USE)
            return this.pressedKeys.has(' ');
        
        return false;
    }
    
    
    ///  Events  ///
    
    private onKeyDown(ev: KeyboardEvent): void {
        if (ev.key == Key.Tab) {
            ev.preventDefault();
        }
        
        this.pressedKeys.add(ev.key);
        Log.v('[~Input] Key down: "', ev.key, '", cooldown is ', this.keyCooldown);
    }
    
    private onKeyUp(ev: KeyboardEvent): void {
        if (ev.key == Key.Tab) {
            ev.preventDefault();
        }
        
        this.pressedKeys.delete(ev.key);
        Log.v('[~Input] Key up: "', ev.key, '", cooldown is ', this.keyCooldown);
    }
    
    private onVisibilityChange(): void {
        if (document.hidden) {
            this.pressedKeys.clear();
        }
    }
}
