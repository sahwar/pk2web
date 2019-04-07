//#########################
//PisteEngine
//by Janne Kivilahti from Piste Gamez
//#########################

import { GameTimer } from '../support/GameTimer';
import { int, bool } from '../support/types';
import { PK2wRenderer } from './PK2wDraw';
import { PK2wSound } from './PK2wSound';

export class Game {
    private gameLogicFnPtr: () => void;
    
    // private ready :bool= false;
    private running: bool = false;
    
    private avrg_fps: number = 0;
    
    private debug: bool = false;
    private draw: bool = true;
    
    private last_time: int = 0;
    // Count how much frames elapsed without draw
    private count: number = 0;
    private real_fps: number = 0;
    
    private readonly _rendr: PK2wRenderer;
    private readonly _audio: PK2wSound;
    
    private _gameTimer: GameTimer;
    
    
    // TODO bx: throw custom error -> printf("PK2    - Failed to init PisteEngine.\n");
    public constructor(width: int, height: int) {
        
        // 	if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO) < 0) {
        // 		printf("Unable to init SDL: %s\n", SDL_GetError());
        // 		return;
        // 	}
        
        this._rendr = new PK2wRenderer(width, height);
        // 	PisteInput_Start();
        this._audio = new PK2wSound(this);
    }
    
    public destroy() {
        
        this.rendr.destroy();
        // 	PisteInput_Exit();
        // 	PisteSound_End();
        // 	SDL_Quit();
        // 	ready = false;
        //
    }
    
    /** @deprecated */
    public loop(gameLogic: () => void) {
        
        let last_time: int = 0;
        let count: int = 0; // Count how much frames elapsed
        let real_fps: number = 0;
        
        this.running = true;
        
        while (this.running) {
            
            count++;
            
            // 		GameLogic();
            // 		logic();
            //
            // 		if (draw) {
            // 			real_fps = 1000.f / (SDL_GetTicks() - last_time);
            // 			real_fps *= count;
            // 			avrg_fps = avrg_fps*0.8 + real_fps*0.2;
            // 			last_time = SDL_GetTicks();
            // 			count = 0;
            // 		}
            
            this.draw = true; // TODO - Set false if the game gets slow
        }
        
    }
    
    public start(gameLogic: () => void, context: any) {
        if (this.running)
            return;
        
        this.gameLogicFnPtr = gameLogic.bind(context);
        this.running = true;
        
        this._gameTimer = new GameTimer(60);
        
        this.loop2();
    }
    
    // TODO: separe gf. loop from gameloop
    private loop2() {
        if (!this.running)
            return;
        
        const ts = Date.now();
        requestAnimationFrame(() => this.loop2());
        
        this.count++;
        
        this.gameLogicFnPtr();
        this.logic();
        
        if (this.draw) {
            this.real_fps = 1000 / (ts - this.last_time);
            this.real_fps *= this.count;
            this.avrg_fps = this.avrg_fps * 0.8 + this.real_fps * 0.2;
            this.last_time = ts;
            this.count = 0;
        }
        
        // this.draw = true; // TODO - Set false if the game gets slow
    }
    
    public stop(): void {
        this.running = false;
    }
    
    public getFPS(): number {
        return this.avrg_fps;
    }
    
    public get rendr(): PK2wRenderer {
        return this._rendr;
    }
    
    public get audio(): PK2wSound {
        return this._audio;
    }
    
    public getRenderer(): PK2wRenderer {
        return this._rendr;
    }
    
    public get gt(): GameTimer {
        return this._gameTimer;
    }
    
    public setDebug(value: bool) {
        this.debug = value;
    }
    
    // void Game::ignore_frame() {
    //
    // 	draw = false;
    //
    // }
    //
    // bool Game::is_ready() {
    //
    // 	return ready;
    //
    // }
    
    private logic() {
        
        // 	SDL_Event event;
        
        // 	while( SDL_PollEvent(&event) ) {
        // 		if(event.type == SDL_QUIT)
        // 			running = false;
        // 		if(event.type == SDL_WINDOWEVENT && event.window.event == SDL_WINDOWEVENT_RESIZED)
        // 			PisteDraw2_AdjustScreen();
        // 	}
        
        // 	PisteSound_Update();
        this._rendr.PisteDraw2_Update(this.draw);
        
        // 	if (debug) {
        // 		//if ( PisteInput_Keydown(PI_Q) ) GDB_Break();
        // 		fflush(stdout);
    }
    
}