//#########################
//Pekka Kana 2
//by Janne Kivilahti from Piste Gamez (2003)
//-------------------------
//PK2 main code
//
//This is the main code of the game,
//it interacts with the Piste Engine
//to do the entire game logic.
//This code does everything, except the
//sprite and map managing, that are made
//in a separated code to be used in the Level Editor.
//-------------------------
//It can be started with the "dev" argument to start the
//cheats and "test" follown by the episode and level to
//open directely on the level.
//	Exemple:
//	"./PK2 dev test rooster\ island\ 2/level13.map"
//	Starts the level13.map on dev mode
//#########################

import { Entropy } from '@game/Entropy';
import { Episode } from '@game/episodes/Episode';
import { Game } from '@game/game/Game';
import { InputAction } from '@game/InputActions';
import { LevelMap } from '@game/map/LevelMap';
import { PekkaContext } from '@game/PekkaContext';
import { PK2Settings } from '@game/settings/PK2Settings';
import { int, CBYTE, uint, str, cvect, CVect } from '@game/support/types';
import { TX } from '@game/texts';
import { GameScreen } from '@game/ui/screen/game/GameScreen';
import { IntroScreen } from '@game/ui/screen/intro/IntroScreen';
import { MapScreen } from '@game/ui/screen/map/MapScreen';
import { MenuScreen } from '@game/ui/screen/menu/MenuScreen';
import { GameTimer } from '@ng/core/GameTimer';
import { kbAction } from '@ng/core/input/PkKeyboardAction';
import { PK2wSound } from '@ng/core/PK2wSound';
import { PkDevice } from '@ng/core/PkDevice';
import { PkEngine } from '@ng/core/PkEngine';
import { Key, PkInput } from '@ng/core/PkInput';
import { PkAssetCache } from '@ng/PkAssetCache';
import { PkLanguage } from '@ng/PkLanguage';
import { PkRenderer, FADE } from '@ng/render/PkRenderer';
import { Log } from '@ng/support/log/LoggerImpl';
import { PkTickable } from '@ng/support/PkTickable';
import { pathJoin } from '@ng/support/utils';
import { PkAssetTk } from '@ng/toolkit/PkAssetTk';
import { PkFont } from '@ng/types/font/PkFont';
import { PkFontHolder } from '@ng/types/font/PkFontHolder';
import { PkParameters } from '@ng/types/PkParameters';
import { PkScreen } from '@ng/ui/PkScreen';
import {
    RESOURCES_PATH,
    STUFF_CKEY,
    SWITCH_SOUND_CKEY,
    JUMP_SOUND_CKEY,
    SPLASH_SOUND_CKEY,
    LOCK_OPEN_SOUND_CKEY,
    MENU_SOUND_CKEY,
    ammuu_SOUND_CKEY,
    kieku_SOUND_CKEY,
    LAND_SOUND_CKEY,
    pistelaskuri_SOUND_CKEY
} from '@sp/constants';
import { i18nSchema } from '@sp/i18nSchema';
import { RECT } from './Map_';

PIXI.settings.ROUND_PIXELS = true;

// #ifndef _WIN32
// void itoa(int n, char s[], int radix){
// 	sprintf(s, "%i", n);
// }
// void ltoa(long n, char s[], int radix){
// 	sprintf(s, "%ld", n);
// }
// #endif
//
//
// //#### Classes
// Piste::PkEngine* Engine;
//
// //#### Constants
// const int MAX_SAVES = 10;
// const BYTE BLOCK_MAX_MASKEJA = 150;

enum UI_MODE {
    UI_TOUCH_TO_START,
    UI_CURSOR,
    UI_GAME_BUTTONS
}


type PK2BLOCKMASKI = {
    // 	short int	ylos[32];
    // 	short int	alas[32];
    // 	short int	vasemmalle[32];
    // 	short int	oikealle[32];
};


//Episode
const EPISODI_MAX_LEVELS: int = 100; //50;
const MAX_EPISODEJA: int = 300;

const MAX_ILMOITUKSENNAYTTOAIKA: int = 700;

type PK2EPISODESCORES = {
    // 	uint best_score[EPISODI_MAX_LEVELS];        // the best score of each level in episode
    // 	char top_player[EPISODI_MAX_LEVELS][20];     // the name of the player with more score in each level on episode
    // 	uint best_time[EPISODI_MAX_LEVELS];         // the best time of each level
    // 	char fastest_player[EPISODI_MAX_LEVELS][20]; // the name of the fastest player in each level
    //
    // 	uint episode_top_score;
    // 	char  episode_top_player[20];
};

//Screen ID
enum SCREEN {
    SCREEN_NOT_SET = 'SCREEN_NOT_SET',
    SCREEN_BASIC_FORMAT = 'SCREEN_BASIC_FORMAT',
    SCREEN_INTRO = 'SCREEN_INTRO',
    SCREEN_MENU = 'SCREEN_MENU',
    SCREEN_MAP = 'SCREEN_MAP',
    SCREEN_GAME = 'SCREEN_GAME',
    SCREEN_SCORING = 'SCREEN_SCORING',
    SCREEN_END = 'SCREEN_END'
}

// //Menu ID
enum MENU {
    MENU_MAIN,
    MENU_EPISODES,
    MENU_CONTROLS,
    MENU_GRAPHICS,
    MENU_SOUNDS,
    MENU_NAME,
    MENU_LOAD,
    MENU_TALLENNA,
    MENU_LANGUAGE
}

export enum FONT {
    F1 = 1,
    F2,
    F3,
    F4,
    F5,
}


//#### Structs
type PK2LEVEL = {
    // 	char	tiedosto[PE_PATH_SIZE];
    // 	char	nimi[40];
    // 	int		x,y;
    // 	int		jarjestys;
    // 	bool	lapaisty;
    // 	int		ikoni;
};

const MAX_FADETEKSTEJA: int = 50; //40;

class PK2FADETEXT {
    public teksti: str<20>;
    public fontti: int;
    public x: int;
    public y: int;
    public ajastin: int;
    public ui: boolean;
}

type PK2SAVE = {
    jakso: int;
    // 	char  episodi[PE_PATH_SIZE];
    // 	char  nimi[20];
    kaytossa: boolean;
    // 	bool  jakso_lapaisty[EPISODI_MAX_LEVELS];
    // 	uint pisteet;
};


///...


//
// //��NIEFEKTIT
// int kytkin_aani,
// 	hyppy_aani,
// 	loiskahdus_aani,
// 	avaa_lukko_aani,
// 	menu_aani,
// 	ammuu_aani,
// 	kieku_aani,
// 	tomahdys_aani,
// 	pistelaskuri_aani;
//
// int sprite_aanet[50]; // spritejen k�ytt�m�t ��nibufferit
//
// //TALLENNUKSET
// PK2SAVE tallennukset[MAX_SAVES];
let lataa_peli: int = -1;
//
//...time
// //PISTEIDEN LASKEMINEN
// PK2EPISODESCORES episodipisteet;
//
let pistelaskuvaihe: int = 0;
let pistelaskudelay: int = 0;
// uint	bonuspisteet = 0,
// 		aikapisteet = 0,
// 		energiapisteet = 0,
// 		esinepisteet = 0,
// 		pelastuspisteet = 0;
//
// bool jakso_uusi_ennatys = false;
// bool jakso_uusi_ennatysaika = false;
// bool episodi_uusi_ennatys = false;
// bool episodi_uusi_ennatys_naytetty = false;


//

export class Pekka implements PkTickable, PekkaContext {
    //#### Global Variables
    private test_level: boolean = false;
    private dev_mode: boolean = false;
    
    private PK2_error: boolean = false;
    // const char* PK2_error_msg = NULL;
    
    private unload: boolean = false;
    
    // Sound
    private music_volume: int = 64;
    private music_volume_now: int = 64;
    
    // Debug info
    private draw_dubug_info: boolean = false;
    private debug_sprites: int = 0;
    private debug_drawn_sprites: int = 0;
    private debug_active_sprites: int = 0;
    
    // MUUTA
    //
    private degree_temp: int = 0;
    
    // Time
    // const int TIME_FPS = 100;
    private increase_time: int = 0;
    private sekunti: int = 0;
    //
    private kytkin_tarina: int = 0;
    //
    private item_paneeli_x: int = 10;
    //
    private info_timer: int = 0;
    // char info[80] = " ";
    //
    
    // MAPA
    
    /** @deprecated */
    private seuraava_kartta: string;
    
    //
    // //PELIN MUUTTUJAT
    /** @deprecated */
    private tyohakemisto: string;
    private game_screen: int = SCREEN.SCREEN_NOT_SET;
    private game_next_screen: int = SCREEN.SCREEN_BASIC_FORMAT;
    private episode_started: boolean = false;
    private going_to_game: boolean = false;
    private siirry_pistelaskusta_karttaan: boolean = false;
    
    //Fade Text
    private fadetekstit: CVect<PK2FADETEXT> = cvect(MAX_FADETEKSTEJA, () => new PK2FADETEXT());
    private fadeteksti_index: int = 0;
    
    //Screen Buffers
    // int  kuva_peli  = -1;
    // int  kuva_peli2 = -1;
    // int  kuva_tausta = -1;
    
    // Controls
    private hiiri_x: int = 10;
    private hiiri_y: int = 10;
    private key_delay: int = 0;
    
    // Sections and episodes
    /** Screen time, equivalent to time elapsed from {@link PkScreen._lastResumeTime} */
    private jakso: int = 1;
    private jaksoja: int = 1;
    private episodi_lkm: int = 0;
    private jakso_indeksi_nyt: int = 1;
    
    // char episodit[MAX_EPISODEJA][PE_PATH_SIZE];
    // char episodi[PE_PATH_SIZE];
    private episodisivu: int = 0;
    // PK2LEVEL jaksot[EPISODI_MAX_LEVELS];
    //private jakso_lapaisty: bool = false;
    private uusinta: boolean = false;
    private lopetusajastin: uint = 0;
    private jakso_pisteet: uint = 0;
    private fake_pisteet: uint = 0;
    
    // Player
    private pisteet: uint = 0;
    private pelaajan_nimi: str<20> = ' ';
    
    private nimiedit: boolean = false;
    
    // Screens
    private readonly _screens: Map<int, PkScreen>;
    
    // INTRO
    
    // Intro counter
    private introCounter: uint = 0;
    private siirry_introsta_menuun: boolean = false;
    
    //LOPPURUUTU
    private loppulaskuri: uint = 0;
    private siirry_lopusta_menuun: boolean = false;
    
    // GRAPHICS
    
    private doublespeed: boolean = false;
    private skip_frame: boolean = false;
    
    // Menus
    private menu_nyt: int = MENU.MENU_MAIN;
    private menu_lue_kontrollit: int = 0;
    private menu_name_index: int = 0;
    // char menu_name_last_mark = '\0';
    private menu_valittu_id: int = 0;
    private menu_valinta_id: int = 1;
    private menunelio: RECT;
    
    // Framerate
    private fps: number = 0;
    private show_fps: boolean = false;
    
    // LANGUAGE AND TEXTS OF THE GAME
    
    private tekstit: PkLanguage;
    // char langlist[60][PE_PATH_SIZE];
    // char langmenulist[10][PE_PATH_SIZE];
    private langlistindex: int = 0;
    private totallangs: int = 0;
    
    /////////////
    
    // Settings
    private _settings: PK2Settings;
    
    // Translated texts
    private _tx = i18nSchema;
    private _language: PkParameters;
    
    // Assets
    private readonly _stuff: PkAssetCache;
    private readonly _gameStuff: PkAssetCache;
    // Fonts
    private readonly _font1: PkFontHolder;
    private readonly _font2: PkFontHolder;
    private readonly _font3: PkFontHolder;
    private readonly _font4: PkFontHolder;
    private readonly _font5: PkFontHolder;
    // Algebra
    private readonly _entropy: Entropy;
    
    // Game engine
    private _engine: PkEngine;
    // User interface (TODO move)
    private renderer: PkRenderer;
    // Current episode and game
    private _episode: Episode;
    private _game: Game;
    
    
    public constructor() {
        this._entropy = new Entropy();
        
        this._font1 = new PkFontHolder('1');
        this._font2 = new PkFontHolder('2');
        this._font3 = new PkFontHolder('3');
        this._font4 = new PkFontHolder('4');
        this._font5 = new PkFontHolder('5');
        
        
        this._screens = new Map();
        
        this._stuff = new PkAssetCache();
        this._gameStuff = new PkAssetCache();
    }
    
    
    ///  Accessors  ///
    
    public get entropy(): Entropy { return this._entropy; }
    protected get ng(): PkEngine {
        return this._engine;
    }
    
    public get device(): PkDevice { return this.ng.device; };
    
    public get font1(): PkFont { return this._font1; }
    public get font2(): PkFont { return this._font2; }
    public get font3(): PkFont { return this._font3; }
    public get font4(): PkFont { return this._font4; }
    public get font5(): PkFont { return this._font5; }
    
    public get tx(): PkParameters {
        return this._language;
    }
    /** @deprecated */
    public get time(): GameTimer {
        return this._engine.gt;
    }
    public get input(): PkInput {
        return this._engine.input;
    }
    public get audio(): PK2wSound {
        return this._engine.audio;
    }
    
    public get stuff(): PkAssetCache {
        return this._stuff;
    }
    public get gameStuff(): PkAssetCache {
        return this._gameStuff;
    }
    
    
    /**
     * SDL: PK_Load_Font
     */
    private async loadFonts(): Promise<void> {
        Log.d('[Pekka] Preparing game fonts');
        
        let ind_font: string;
        let ind_path: string = this.tx.get(TX.FONT_PATH);
        
        // 	PisteDraw2_Clear_Fonts();
        
        ind_font = this.tx.get(TX.FONT_SMALL_FONT);
        if (ind_path == null || ind_font == null) {
            this._font1.update(await PkAssetTk.getFont(pathJoin(RESOURCES_PATH, 'language/fonts', 'ScandicSmall.txt')));
            // PK2_error = true;
            // PK2_error_msg = 'Can\'t create font 1 from ScandicSmall.txt';
        } else {
            // this._fonts.set(FONT.F1, this.renderer.createFont(tekstit->Hae_Teksti(ind_path), tekstit->Hae_Teksti(ind_font)))
            //     PK2_error = true;
            //     PK2_error_msg = 'Can\'t create font 1';
            // }
        }
        
        ind_font = this.tx.get(TX.FONT_BIG_FONT_NORMAL);
        if (ind_path == null || ind_font == null) {
            this._font2.update(await PkAssetTk.getFont(pathJoin(RESOURCES_PATH, 'language/fonts', 'ScandicBig1.txt')));
            // PK2_error = true;
            // PK2_error_msg = 'Can\'t create font 1 from ScandicBig1.txt';
        } else {
            // this._fonts.set(FONT.F2, this.renderer.createFont(tekstit->Hae_Teksti(ind_path), tekstit->Hae_Teksti(ind_font)))
            //     PK2_error = true;
            //     PK2_error_msg = 'Can\'t create font 2';
            // }
        }
        
        ind_font = this.tx.get(TX.FONT_BIG_FONT_HILITE);
        if (ind_path == null || ind_font == null) {
            this._font3.update(await PkAssetTk.getFont(pathJoin(RESOURCES_PATH, 'language/fonts', 'ScandicBig2.txt')));
            // PK2_error = true;
            // PK2_error_msg = 'Can\'t create font 3 from ScandicBig2.txt';
        } else {
            // this._fonts.set(FONT.F3, this.renderer.createFont(tekstit->Hae_Teksti(ind_path), tekstit->Hae_Teksti(ind_font)))
            //     PK2_error = true;
            //     PK2_error_msg = 'Can\'t create font 3';
            // }
        }
        
        ind_font = this.tx.get(TX.FONT_BIG_FONT_SHADOW);
        if (ind_path == null || ind_font == null) {
            this._font4.update(await PkAssetTk.getFont(pathJoin(RESOURCES_PATH, 'language/fonts', 'ScandicBig3.txt')));
            // PK2_error = true;
            // PK2_error_msg = 'Can\'t create font 4 from ScandicBig3.txt';
        } else {
            // this._fonts.set(FONT.F4, this.renderer.createFont(tekstit->Hae_Teksti(ind_path), tekstit->Hae_Teksti(ind_font)))
            //     PK2_error = true;
            //     PK2_error_msg = 'Can\'t create font 4';
            // }
        }
    }
    
    /**
     * SDL: PK_Load_Language
     */
    private async _loadLanguage(): Promise<void> {
        Log.d('[Pekka] Loading language for "', this._settings.kieli, '"');
        // 	char tiedosto[PE_PATH_SIZE];
        // 	int i;
        //
        // 	strcpy(tiedosto,"language/");
        //
        // 	if(totallangs == 0){
        // 		totallangs = PisteUtils_Scandir(".txt", tiedosto, langlist, 60);
        // 		for(i=0;i<10;i++)
        // 			strcpy(langmenulist[i],langlist[i]);
        // 	}
        //
        // 	strcat(tiedosto,settings.kieli);
        //
        // 	if (!tekstit->Read_File(tiedosto))
        // 		return false;
        
        //  await this.tx.load(`language/${ this._settings.kieli }.txt`);
        this._language = await PkAssetTk.getParamFile(pathJoin(RESOURCES_PATH, 'language', `${ this._settings.kieli }.txt`));
        
        await this.loadFonts();
    }
    
    private PK_Draw_Menu_Square(vasen: int, yla: int, oikea: int, ala: int, pvari: CBYTE) {
        //	if (this.episode_started)
        // 		return 0;
        //
        // 	//pvari = 224;
        //
        // 	if (menunelio.left < vasen)
        // 		menunelio.left++;
        //
        // 	if (menunelio.left > vasen)
        // 		menunelio.left--;
        //
        // 	if (menunelio.right < oikea)
        // 		menunelio.right++;
        //
        // 	if (menunelio.right > oikea)
        // 		menunelio.right--;
        //
        // 	if (menunelio.top < yla)
        // 		menunelio.top++;
        //
        // 	if (menunelio.top > yla)
        // 		menunelio.top--;
        //
        // 	if (menunelio.bottom < ala)
        // 		menunelio.bottom++;
        //
        // 	if (menunelio.bottom > ala)
        // 		menunelio.bottom--;
        //
        // 	vasen = (int)menunelio.left;
        // 	oikea = (int)menunelio.right;
        // 	yla	= (int)menunelio.top;
        // 	ala = (int)menunelio.bottom;
        //
        // 	vasen += (int)(sin_table[(_degree*2)%359]/2.0);
        // 	oikea += (int)(cos_table[(_degree*2)%359]/2.0);
        // 	yla	+= (int)(sin_table[((_degree*2)+20)%359]/2.0);
        // 	ala += (int)(cos_table[((_degree*2)+40)%359]/2.0);
        //
        // 	//PisteDraw2_ScreenFill(vasen,yla,oikea,ala,38);
        //
        // 	double kerroin_y = (ala - yla) / 19.0;
        // 	double kerroin_x = (oikea - vasen) / 19.0;
        // 	double dbl_y = yla;
        // 	double dbl_x = vasen;
        // 	bool tumma = true;
        // 	int vari = 0;
        //
        // 	for (int y=0;y<19;y++) {
        //
        // 		dbl_x = vasen;
        //
        // 		for (int x=0;x<19;x++) {
        // 			//vari = (x+y) / 6;
        // 			vari = (x/4)+(y/3);
        // 			if (tumma) vari /= 2;
        //
        // 			PisteDraw2_ScreenFill(int(dbl_x),int(dbl_y),int(dbl_x+kerroin_x),int(dbl_y+kerroin_y),pvari+vari);
        // 			dbl_x += kerroin_x;
        // 			tumma = !tumma;
        // 		}
        // 		dbl_y += kerroin_y;
        // 	}
        //
        // 	PisteDraw2_ScreenFill(vasen-1,yla-1,oikea+1,yla+2,0);
        // 	PisteDraw2_ScreenFill(vasen-1,yla-1,vasen+2,ala+1,0);
        // 	PisteDraw2_ScreenFill(vasen-1,ala-2,oikea+1,ala+1,0);
        // 	PisteDraw2_ScreenFill(oikea-2,yla-1,oikea+1,ala+1,0);
        //
        // 	PisteDraw2_ScreenFill(vasen-1+1,yla-1+1,oikea+1+1,yla+2+1,0);
        // 	PisteDraw2_ScreenFill(vasen-1+1,yla-1+1,vasen+2+1,ala+1+1,0);
        // 	PisteDraw2_ScreenFill(vasen-1+1,ala-2+1,oikea+1+1,ala+1+1,0);
        // 	PisteDraw2_ScreenFill(oikea-2+1,yla-1+1,oikea+1+1,ala+1+1,0);
        //
        // 	PisteDraw2_ScreenFill(vasen,yla,oikea,yla+1,153);
        // 	PisteDraw2_ScreenFill(vasen,yla,vasen+1,ala,144);
        // 	PisteDraw2_ScreenFill(vasen,ala-1,oikea,ala,138);
        // 	PisteDraw2_ScreenFill(oikea-1,yla,oikea,ala,138);
    }
    
    private PK_Draw_Menu_Text(active: boolean, teksti: string, x: int, y: int): boolean {
        // 	if(!active){
        // 		PK_WavetextSlow_Draw(teksti, fontti2, x, y);
        // 		return false;
        // 	}
        //
        // 	int pituus = strlen(teksti)*15;
        //
        // 	if ((hiiri_x > x && hiiri_x < x+pituus && hiiri_y > y && hiiri_y < y+15) ||
        // 		(menu_valittu_id == menu_valinta_id)){
        // 		menu_valittu_id = menu_valinta_id;
        //
        // 		if ((
        // 			(PisteInput_Hiiri_Vasen() && hiiri_x > x && hiiri_x < x+pituus && hiiri_y > y && hiiri_y < y+15)
        // 			|| PisteInput_Keydown(PI_SPACE) || PisteInput_Ohjain_Nappi(PI_PELIOHJAIN_1,PI_OHJAIN_NAPPI_1))
        // 			&& key_delay == 0){
        // 			PK_Play_MenuSound(menu_aani, 100);
        // 			key_delay = 20;
        // 			menu_valinta_id++;
        // 			return true;
        // 		}
        //
        // 		PK_Wavetext_Draw(teksti, fontti3, x, y);
        // 	}
        // 	else
        // 		PK_WavetextSlow_Draw(teksti, fontti2, x, y);
        //
        // 	menu_valinta_id++;
        
        return false;
    }
    
    private PK_Draw_Menu_Main(): void {
        let my: int = 240; // 250;
        
        this.PK_Draw_Menu_Square(160, 200, 640 - 180, 410, 224);
        
        if (this.episode_started) {
            // 		if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_continue),180,my)){
            // 			if ((!peli_ohi && !jakso_lapaisty) || lopetusajastin > 1)
            // 				game_next_screen = SCREEN_GAME;
            // 			else
            // 				game_next_screen = SCREEN_MAP;
            //
            // 		}
            // 		my += 20;
        }
        
        if (this.PK_Draw_Menu_Text(true, this.tx.get(TX.MAINMENU_NEW_GAME), 180, my)) {
            // 	nimiedit = true;
            // 	menu_name_index = strlen(pelaajan_nimi);//   0;
            // 	menu_name_last_mark = ' ';
            // 	menu_nyt = MENU_NAME;
            // 	key_delay = 30;
        }
        my += 20;
        
        if (this.episode_started) {
            // 		if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_save_game),180,my)){
            // 			menu_nyt = MENU_TALLENNA;
            // 		}
            my += 20;
        }
        
        // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_load_game),180,my)){
        // 		menu_nyt = MENU_LOAD;
        // 	}
        my += 20;
        
        // 	if (PK_Draw_Menu_Text(true,"load language",180,my)){
        // 		menu_nyt = MENU_LANGUAGE;
        // 	}
        my += 20;
        
        // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_graphics),180,my)){
        // 		menu_nyt = MENU_GRAPHICS;
        // 	}
        my += 20;
        
        // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_sounds),180,my)){
        // 		menu_nyt = MENU_SOUNDS;
        // 	}
        my += 20;
    }
    
    private PK_Draw_Menu(): void {
        // 	PisteDraw2_ScreenFill(0);
        // 	PisteDraw2_Image_Clip(kuva_tausta, (episode_started && settings.isWide)? -80 : 0, 0);
        
        this.menu_valinta_id = 1;
        
        switch (this.menu_nyt) {
            // case MENU.MENU_MAIN     : PK_Draw_Menu_Main();     break;
            // case MENU.MENU_EPISODES : PK_Draw_Menu_Episodes(); break;
            // case MENU.MENU_GRAPHICS : PK_Draw_Menu_Graphics(); break;
            // case MENU.MENU_SOUNDS   : PK_Draw_Menu_Sounds();   break;
            // case MENU.MENU_CONTROLS : PK_Draw_Menu_Controls(); break;
            // case MENU.MENU_NAME     : PK_Draw_Menu_Name();     break;
            // case MENU.MENU_LOAD     : PK_Draw_Menu_Load();     break;
            // case MENU.MENU_TALLENNA : PK_Draw_Menu_Save();     break;
            // case MENU.MENU_LANGUAGE : PK_Draw_Menu_Language(); break;
            default:
                this.PK_Draw_Menu_Main();
                break;
        }
        
        // 	PK_Draw_Cursor(hiiri_x,hiiri_y);
    }
    
    private PK_Draw_Intro(): void {
        let pistelogoIni: uint = 300;
        let pistelogoEnd: uint = pistelogoIni + 500;
        let tekijat_alku: uint = pistelogoEnd + 80;
        let tekijat_loppu: uint = tekijat_alku + 720;
        let testaajat_alku: uint = tekijat_loppu + 80;
        let testaajat_loppu: uint = testaajat_alku + 700;
        let kaantaja_alku: uint = testaajat_loppu + 100;
        
        
        // if ((this.introCounter / 10) % 50 == 0)
        // 	PisteDraw2_Image_CutClip(kuva_tausta,353, 313, 242, 313, 275, 432);
        
        if (this.introCounter > pistelogoIni && this.introCounter < pistelogoEnd) {
            
            //int x = this.introCounter - pistelogoIni - 194;
            let kerroin: int = 120 / (this.introCounter - pistelogoIni);
            let x: int = 120 - kerroin;
            
            if (x > 120)
                x = 120;
            
            // 		PisteDraw2_Image_CutClip(kuva_tausta,/*120*/x,230, 37, 230, 194, 442);
            
            // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.intro_presents), fontti1, 230, 400, pistelogoIni, pistelogoEnd-20);
            
        }
        
        if (this.introCounter > tekijat_alku) {
            // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.intro_a_game_by),fontti1, 120, 200, tekijat_alku, tekijat_loppu);
            // 		PK_Draw_Intro_Text("janne kivilahti 2003",		            fontti1, 120, 220, tekijat_alku+20, tekijat_loppu+20);
            // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.intro_original), fontti1, 120, 245, tekijat_alku+40, tekijat_loppu+40);
            // 		PK_Draw_Intro_Text("antti suuronen 1998",		            fontti1, 120, 265, tekijat_alku+50, tekijat_loppu+50);
            // 		PK_Draw_Intro_Text("sdl porting by",		                fontti1, 120, 290, tekijat_alku+70, tekijat_loppu+70);
            // 		PK_Draw_Intro_Text("samuli tuomola 2010",		            fontti1, 120, 310, tekijat_alku+80, tekijat_loppu+80);
            // 		PK_Draw_Intro_Text("sdl2 port and bug fixes",               fontti1, 120, 335, tekijat_alku + 90, tekijat_loppu + 90);
            // 		PK_Draw_Intro_Text("danilo lemos 2017",                     fontti1, 120, 355, tekijat_alku + 100, tekijat_loppu + 100);
        }
        
        if (this.introCounter > testaajat_alku) {
            // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.intro_tested_by),fontti1, 120, 230, testaajat_alku, testaajat_loppu);
            // 		PK_Draw_Intro_Text("antti suuronen",			fontti1, 120, 250, testaajat_alku+10, testaajat_loppu+10);
            // 		PK_Draw_Intro_Text("toni hurskainen",			fontti1, 120, 260, testaajat_alku+20, testaajat_loppu+20);
            // 		PK_Draw_Intro_Text("juho rytk�nen",				fontti1, 120, 270, testaajat_alku+30, testaajat_loppu+30);
            // 		PK_Draw_Intro_Text("annukka korja",				fontti1, 120, 280, testaajat_alku+40, testaajat_loppu+40);
            // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.intro_thanks_to),fontti1, 120, 300, testaajat_alku+70, testaajat_loppu+70);
            // 		PK_Draw_Intro_Text("oskari raunio",				fontti1, 120, 310, testaajat_alku+70, testaajat_loppu+70);
            // 		PK_Draw_Intro_Text("assembly organization",		fontti1, 120, 320, testaajat_alku+70, testaajat_loppu+70);
        }
        
        if (this.introCounter > kaantaja_alku) {
            // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.intro_translation), fontti1, 120, 230, kaantaja_alku, kaantaja_loppu);
            // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.intro_translator),  fontti1, 120, 250, kaantaja_alku+20, kaantaja_loppu+20);
        }
    }
    
    
    private async createScreens(): Promise<void> {
        // Intro screen
        this._screens.set(SCREEN.SCREEN_INTRO, await IntroScreen.create(this));
        // Menu screen
        this._screens.set(SCREEN.SCREEN_MENU, await MenuScreen.create(this));
        // Map screen
        this._screens.set(SCREEN.SCREEN_MAP, await MapScreen.create(this));
        // Game screen
        this._screens.set(SCREEN.SCREEN_GAME, await GameScreen.create(this));
        
        this._engine.rendr.add(SCREEN.SCREEN_INTRO, this._screens.get(SCREEN.SCREEN_INTRO));
        this._engine.rendr.add(SCREEN.SCREEN_MENU, this._screens.get(SCREEN.SCREEN_MENU));
        this._engine.rendr.add(SCREEN.SCREEN_MAP, this._screens.get(SCREEN.SCREEN_MAP));
        this._engine.rendr.add(SCREEN.SCREEN_GAME, this._screens.get(SCREEN.SCREEN_GAME));
    }
    
    private PK_MainScreen_Intro(): void {
        // this.PK_Draw_Intro();
        
        this._entropy.degree = 1 + this._entropy.degree % 360;
        
        this.introCounter++;
        
        if (this.siirry_introsta_menuun && !this.renderer.PisteDraw2_IsFading()) {
            console.log('Changing to screen menu');
            this.game_next_screen = SCREEN.SCREEN_MENU;
            this.episode_started = false;
        }
        // if (key_delay > 0) key_delay--;
        // if (key_delay == 0)
        if (/*PisteInput_Keydown(PI_RETURN) || PisteInput_Keydown(PI_SPACE) ||*/ this.introCounter === 3500) {
            this.siirry_introsta_menuun = true;
            this.renderer.fadeOut(FADE.FADE_SLOW);
        }
    }
    
    private PK_MainScreen_ScoreCount(): void {
        // 	PK_Draw_ScoreCount();
        //
        // 	_degree = 1 + _degree % 360;
        //
        // 	// PISTELASKU
        //
        // 	int energy = PkEngine::Sprites->player->energy;
        //
        // 	if (pistelaskudelay == 0){
        // 		if (bonuspisteet < jakso_pisteet){
        // 			pistelaskuvaihe = 1;
        // 			pistelaskudelay = 0;
        // 			bonuspisteet += 10;
        //
        // 			if (_degree%7==1)
        // 				PK_Play_MenuSound(pistelaskuri_aani, 70);
        //
        // 			if (bonuspisteet >= jakso_pisteet){
        // 				bonuspisteet = jakso_pisteet;
        // 				pistelaskudelay = 50;
        // 			}
        //
        // 		} else if (timeout > 0){
        // 			pistelaskuvaihe = 2;
        // 			pistelaskudelay = 0;
        // 			aikapisteet+=5;
        // 			timeout--;
        //
        // 			if (_degree%10==1)
        // 				PK_Play_MenuSound(pistelaskuri_aani, 70);
        //
        // 			if (timeout == 0)
        // 				pistelaskudelay = 50;
        //
        // 		} else if (PkEngine::Sprites->player->energy > 0){
        // 			pistelaskuvaihe = 3;
        // 			pistelaskudelay = 10;
        // 			energiapisteet+=300;
        // 			PkEngine::Sprites->player->energy--;
        //
        // 			PK_Play_MenuSound(pistelaskuri_aani, 70);
        //
        // 		} else if (PkEngine::Gifts->count() > 0){
        // 			pistelaskuvaihe = 4;
        // 			pistelaskudelay = 30;
        // 			for (int i = 0; i < MAX_GIFTS; i++)
        // 				if (PkEngine::Gifts->get(i) != -1) {
        // 					esinepisteet += PkEngine::Gifts->get_protot(i)->pisteet + 500;
        // 					//esineet[i] = NULL;
        // 					PK_Play_MenuSound(hyppy_aani, 100);
        // 					break;
        // 				}
        // 		}
        // 		else pistelaskuvaihe = 5;
        // 	}
        //
        // 	if (pistelaskudelay > 0)
        // 		pistelaskudelay--;
        //
        // 	if (siirry_pistelaskusta_karttaan && !PisteDraw2_IsFading()){
        // 		/*tarkistetaan oliko viimeinen jakso*/
        //
        // 		if (jakso_indeksi_nyt == EPISODI_MAX_LEVELS-1) { // ihan niin kuin joku tekisi n�in monta jaksoa...
        // 			game_next_screen = SCREEN_END;
        // 		}
        // 		else if (jaksot[jakso_indeksi_nyt+1].jarjestys == -1)
        // 			    game_next_screen = SCREEN_END;
        // 		else // jos ei niin palataan karttaan...
        // 		{
        // 			game_next_screen = SCREEN_MAP;
        // 			//episode_started = false;
        // 			menu_nyt = MENU_MAIN;
        // 		}
        // 	}
        //
        // 	if (key_delay > 0)
        // 		key_delay--;
        //
        // 	if (key_delay == 0){
        // 		if (PisteInput_Keydown(PI_RETURN) && pistelaskuvaihe == 5){
        // 			siirry_pistelaskusta_karttaan = true;
        // 			music_volume = 0;
        // 			PisteDraw2_FadeOut(PD_FADE_SLOW);
        // 			key_delay = 20;
        // 		}
        //
        // 		if (PisteInput_Keydown(PI_RETURN) && pistelaskuvaihe < 5){
        // 			pistelaskuvaihe = 5;
        // 			bonuspisteet = jakso_pisteet;
        // 			aikapisteet += timeout*5;
        // 			timeout = 0;
        // 			energiapisteet += PkEngine::Sprites->player->energy * 300;
        // 			PkEngine::Sprites->player->energy = 0;
        // 			for (int i=0;i<MAX_GIFTS;i++)
        // 				if (PkEngine::Gifts->get(i) != -1)
        // 					esinepisteet += PkEngine::Gifts->get_protot(i)->pisteet + 500;
        //
        // 			PkEngine::Gifts->clean(); //TODO esineita = 0;
        //
        // 			key_delay = 20;
        // 		}
        // 	}
        //
    }
    
    private PK_MainScreen_Map(): void {
        // 	PK_Draw_Map();
        //
        // 	_degree = 1 + _degree % 360;
        //
        // 	if (going_to_game && !PisteDraw2_IsFading()) {
        // 		game_next_screen = SCREEN_GAME;
        //
        // 		episode_started = false;
        //
        // 		//Draw "loading" text
        // 		PisteDraw2_SetXOffset(0);
        // 		PisteDraw2_ScreenFill(0);
        // 		PisteDraw2_Font_Write(fontti2, tekstit->Hae_Teksti(PK_txt.game_loading), screen_width / 2 - 82, screen_height / 2 - 9);
        // 		PisteDraw2_FadeOut(0);
        // 	}
        //
        // 	if (key_delay > 0)
        // 		key_delay--;
        //
    }
    
    private PK_MainScreen_Menu(): void {
        
        if (!this.nimiedit && this.key_delay === 0 && this.menu_lue_kontrollit === 0) {
            // 		if (PisteInput_Keydown(PI_UP) || PisteInput_Keydown(PI_LEFT) ||
            // 			PisteInput_Ohjain_X(PI_PELIOHJAIN_1) < 0 || PisteInput_Ohjain_Y(PI_PELIOHJAIN_1) < 0){
            // 			menu_valittu_id--;
            //
            // 			if (menu_valittu_id < 1)
            // 				menu_valittu_id = menu_valinta_id-1;
            //
            // 			key_delay = 15;
            // 		}
            //
            // 		if (PisteInput_Keydown(PI_DOWN) || PisteInput_Keydown(PI_RIGHT) ||
            // 			PisteInput_Ohjain_X(PI_PELIOHJAIN_1) > 0 || PisteInput_Ohjain_Y(PI_PELIOHJAIN_1) > 0){
            // 			menu_valittu_id++;
            //
            // 			if (menu_valittu_id > menu_valinta_id-1)
            // 				menu_valittu_id = 1;
            //
            // 			key_delay = 15;
            // 			//hiiri_y += 3;
            // 		}
        }
        
        // 	if (nimiedit || menu_lue_kontrollit > 0){
        // 		menu_valittu_id = 0;
        // 	}
        //
        // 	if (menu_nyt != MENU_NAME){
        // 		nimiedit = false;
        // 	}
        // 	int menu_ennen = menu_nyt;
        
        this.PK_Draw_Menu();
        
        // 	if (menu_nyt != menu_ennen)
        // 		menu_valittu_id = 0;
        //
        // 	_degree = 1 + _degree % 360;
        //
        // 	if (doublespeed)
        // 		_degree = 1 + _degree % 360;
        //
        // 	if (key_delay > 0)
        // 		key_delay--;
        //
    }
    
    private PK_MainScreen_End(): void {
        //
        // 	PK_Draw_EndGame();
        //
        // 	_degree = 1 + _degree % 360;
        //
        // 	loppulaskuri++;
        // 	this.introCounter = loppulaskuri; // introtekstej� varten
        //
        // 	if (siirry_lopusta_menuun && !PisteDraw2_IsFading())
        // 	{
        // 		game_next_screen = SCREEN_MENU;
        // 		menu_nyt = MENU_MAIN;
        // 		episode_started = false;
        // 	}
        //
        // 	if (key_delay > 0)
        // 		key_delay--;
        //
        // 	if (key_delay == 0)
        // 	{
        // 		if (PisteInput_Keydown(PI_RETURN) || PisteInput_Keydown(PI_SPACE))
        // 		{
        // 			siirry_lopusta_menuun = true;
        // 			music_volume = 0;
        // 			PisteDraw2_FadeOut(PD_FADE_SLOW);
        // 		}
        // 	}
        //
    }
    
    private PK_MainScreen_Change(): int {
        
        this.renderer.fadeIn(FADE.FADE_FAST);
        
        // First start
        if (this.game_next_screen === SCREEN.SCREEN_BASIC_FORMAT) {
            this.PK_MainScreen_Change__SCREEN_BASIC_FORMAT();
        }
        
        // Start map
        if (this.game_next_screen === SCREEN.SCREEN_MAP) {
            // 		PK_UI_Change(UI_CURSOR);
            // 		if (settings.isWide)
            // 			PisteDraw2_SetXOffset(80);
            // 		else
            // 			PisteDraw2_SetXOffset(0);
            // 		PisteDraw2_ScreenFill(0);
            //
            // 		if (!episode_started)
            // 		{
            // 			if (lataa_peli != -1)
            // 			{
            // 				PK_Search_File();
            //
            // 				for (int j = 0; j < EPISODI_MAX_LEVELS; j++)
            // 					jaksot[j].lapaisty = tallennukset[lataa_peli].jakso_lapaisty[j];
            //
            // 				lataa_peli = -1;
            // 				episode_started = true;
            // 				peli_ohi = true;
            // 				jakso_lapaisty = true;
            // 				lopetusajastin = 0;
            // 			}
            // 			else
            // 			{
            // 				PK_Start_Saves(); // jos ladataan peli, asetetaan l�p�istyarvot jaksoille aikaisemmin
            // 				PK_Search_File();
            // 			}
            // 			char topscoretiedosto[PE_PATH_SIZE] = "scores.dat";
            // 			PK_EpisodeScore_Open(topscoretiedosto);
            // 		}
            //
            // 		/* Ladataan kartan taustakuva ...*/
            // 		char mapkuva[PE_PATH_SIZE] = "map.bmp";
            // 		PK_Load_EpisodeDir(mapkuva);
            // 		//PisteLog_Kirjoita("  - Loading map picture ");
            // 		//PisteLog_Kirjoita(mapkuva);
            // 		//PisteLog_Kirjoita(" from episode folder \n");
            //
            // 		PisteDraw2_Image_Delete(kuva_tausta);
            // 		kuva_tausta = PisteDraw2_Image_Load(mapkuva, true);
            // 		if (kuva_tausta == -1)
            // 			kuva_tausta = PisteDraw2_Image_Load("gfx/map.bmp", true);
            //
            // 		/* Ladataan kartan musiikki ...*/
            // 		char mapmusa[PE_PATH_SIZE] = "map.mp3";
            // 		do
            // 		{
            // 			PK_Load_EpisodeDir(mapmusa);
            // 			if (PK_Check_File(mapmusa))
            // 				break;
            // 			strcpy(mapmusa, "map.ogg");
            // 			PK_Load_EpisodeDir(mapmusa);
            // 			if (PK_Check_File(mapmusa))
            // 				break;
            // 			strcpy(mapmusa, "map.xm");
            // 			PK_Load_EpisodeDir(mapmusa);
            // 			if (PK_Check_File(mapmusa))
            // 				break;
            // 			strcpy(mapmusa, "map.mod");
            // 			PK_Load_EpisodeDir(mapmusa);
            // 			if (PK_Check_File(mapmusa))
            // 				break;
            // 			strcpy(mapmusa, "map.it");
            // 			PK_Load_EpisodeDir(mapmusa);
            // 			if (PK_Check_File(mapmusa))
            // 				break;
            // 			strcpy(mapmusa, "map.s3m");
            // 			PK_Load_EpisodeDir(mapmusa);
            // 			if (PK_Check_File(mapmusa))
            // 				break;
            // 			strcpy(mapmusa, "music/map.mp3");
            // 			if (PK_Check_File(mapmusa))
            // 				break;
            // 			strcpy(mapmusa, "music/map.ogg");
            // 			if (PK_Check_File(mapmusa))
            // 				break;
            // 			strcpy(mapmusa, "music/map.xm");
            // 			break;
            // 		} while (0);
            //
            // 		PisteSound_StartMusic(mapmusa);
            //
            // 		music_volume = settings.music_max_volume;
            //
            // 		going_to_game = false;
            //
            // 		PisteDraw2_FadeIn(PD_FADE_SLOW);
        }
        
        // Start menu
        if (this.game_next_screen === SCREEN.SCREEN_MENU) {
            // 		PK_UI_Change(UI_CURSOR);
            // 		if (settings.isWide)
            // 			PisteDraw2_SetXOffset(80);
            // 		else
            // 			PisteDraw2_SetXOffset(0);
            // 		PK_Search_Episode();
            //
            // 		if (!episode_started)
            // 		{
            // 			PisteDraw2_Image_Delete(kuva_tausta);
            // 			kuva_tausta = PisteDraw2_Image_Load("gfx/menu.bmp", true);
            // 			PisteSound_StartMusic("music/song09.xm"); //theme.xm
            // 			music_volume = settings.music_max_volume;
            // 		}
            // 		else
            // 		{
            // 			int w, h;
            // 			PisteDraw2_Image_GetSize(kuva_tausta, w, h);
            // 			if (w != screen_width)
            // 			{
            // 				PisteDraw2_Image_Delete(kuva_tausta);
            // 				kuva_tausta = PisteDraw2_Image_New(screen_width, screen_height);
            // 			}
            // 			PisteDraw2_Image_Snapshot(kuva_tausta); //TODO - take snapshot without text and cursor
            // 			PK_MenuShadow_Create(kuva_tausta, 640, 480, settings.isWide? 110 : 30);
            // 		}
            //
            // 		menunelio.left = 320 - 5;
            // 		menunelio.top = 240 - 5;
            // 		menunelio.right = 320 + 5;
            // 		menunelio.bottom = 240 + 5;
            //
            // 		PisteDraw2_ScreenFill(0);
            // 		menu_valittu_id = 1;
        }
        
        
        // Start pontuation
        if (this.game_next_screen === SCREEN.SCREEN_SCORING) {
            // 		PK_UI_Change(UI_CURSOR);
            // 		if (settings.isWide)
            // 			PisteDraw2_SetXOffset(80);
            // 		else
            // 			PisteDraw2_SetXOffset(0);
            // 		PisteDraw2_ScreenFill(0);
            //
            // 		PisteDraw2_Image_Delete(kuva_tausta);
            // 		kuva_tausta = PisteDraw2_Image_Load("gfx/menu.bmp", true);
            // 		PK_MenuShadow_Create(kuva_tausta, 640, 480, 30);
            //
            // 		jakso_uusi_ennatys = false;
            // 		jakso_uusi_ennatysaika = false;
            // 		episodi_uusi_ennatys = false;
            //
            // 		// Lasketaan pelaajan kokonaispisteet etuk�teen
            // 		uint temp_pisteet = 0;
            // 		temp_pisteet += jakso_pisteet;
            // 		temp_pisteet += timeout * 5;
            // 		temp_pisteet += PkEngine::Sprites->player->energy * 300;
            // 		for (int i = 0; i < MAX_GIFTS; i++)
            // 			if (PkEngine::Gifts->get(i) != -1)
            // 				temp_pisteet += PkEngine::Gifts->get_protot(i)->pisteet + 500;
            //
            // 		//if (jaksot[jakso_indeksi_nyt].lapaisty)
            // 		//if (jaksot[jakso_indeksi_nyt].jarjestys == jakso-1)
            // 		pisteet += temp_pisteet;
            //
            // 		if (uusinta)
            // 			pisteet -= temp_pisteet;
            //
            // 		fake_pisteet = 0;
            // 		pistelaskuvaihe = 0;
            // 		pistelaskudelay = 30;
            // 		bonuspisteet = 0,
            // 		aikapisteet = 0,
            // 		energiapisteet = 0,
            // 		esinepisteet = 0,
            // 		pelastuspisteet = 0;
            //
            // 		char pisteet_tiedosto[PE_PATH_SIZE] = "scores.dat";
            // 		int vertailun_tulos;
            //
            // 		/* Tutkitaan onko pelaajarikkonut kent�n piste- tai nopeusenn�tyksen */
            // 		vertailun_tulos = PK_EpisodeScore_Compare(jakso_indeksi_nyt, temp_pisteet, kartta->aika - timeout, false);
            // 		if (vertailun_tulos > 0)
            // 		{
            // 			PK_EpisodeScore_Save(pisteet_tiedosto);
            // 		}
            //
            // 		/* Tutkitaan onko pelaaja rikkonut episodin piste-enn�tyksen */
            // 		vertailun_tulos = PK_EpisodeScore_Compare(0, pisteet, 0, true);
            // 		if (vertailun_tulos > 0)
            // 			PK_EpisodeScore_Save(pisteet_tiedosto);
            //
            // 		music_volume = settings.music_max_volume;
            //
            // 		siirry_pistelaskusta_karttaan = false;
            //
            // 		PisteDraw2_FadeIn(PD_FADE_FAST);
        }
        
        // Start intro
        if (this.game_next_screen === SCREEN.SCREEN_INTRO) {
            console.debug('PK     - Initializing intro screen');
            // 		PK_UI_Change(UI_TOUCH_TO_START);
            // 		if (settings.isWide)
            // 			PisteDraw2_SetXOffset(80);
            // 		else
            // 			PisteDraw2_SetXOffset(0);
            // 		PisteDraw2_ScreenFill(0);
            //
            // TODO: Mover al principio principio
            // 		music_volume = settings.music_max_volume;
            
            this.introCounter = 0;
            this.siirry_pistelaskusta_karttaan = false;
            
            const introScreen = new IntroScreen(this);
            this.renderer.setNextScreen(introScreen);
            
            const oth = new MenuScreen(this);
            // this.renderer._stage.addChild(oth);
            // this.renderer.setNextScreen(oth);
        }
        
        // Start ending
        if (this.game_next_screen === SCREEN.SCREEN_END) {
            // 		PK_UI_Change(UI_TOUCH_TO_START);
            // 		if (settings.isWide)
            // 			PisteDraw2_SetXOffset(80);
            // 		else
            // 			PisteDraw2_SetXOffset(0);
            // 		PisteDraw2_ScreenFill(0);
            // 		PisteDraw2_Image_Delete(kuva_tausta);
            // 		kuva_tausta = PisteDraw2_Image_Load("gfx/ending.bmp", true);
            //
            // 		if (PisteSound_StartMusic("music/intro.xm") != 0)
            // 		{
            // 			PK2_error = true;
            // 			PK2_error_msg = "Can't load intro.xm";
            // 		}
            //
            // 		music_volume = settings.music_max_volume;
            //
            // 		loppulaskuri = 0;
            // 		siirry_lopusta_menuun = false;
            // 		episode_started = false;
            //
            // 		PisteDraw2_FadeIn(PD_FADE_FAST);
        }
        
        this.game_screen = this.game_next_screen;
        
        return 0;
    }
    
    private PK_MainScreen_Change__SCREEN_BASIC_FORMAT() {
        //this.PK_UI_Change(UI_MODE.UI_TOUCH_TO_START);
        // 		strcpy(pelaajan_nimi, tekstit->Hae_Teksti(PK_txt.player_default_name));
        // 		srand((unsigned)time(NULL));
        // 		if (!test_level)
        // 		{
        // 			strcpy(episodi, "");
        // 			strcpy(this.seuraava_kartta, "untitle1.map");
        // 		}
        
        this.jakso = 1;
        
        
        // TODO
        // PK2Kartta_Aseta_Ruudun_Mitat(screen_width, screen_height);
        
        // TODO
        // 		PkEngine::Particles = new PK2::Particle_System();
        // 		PkEngine::Sprites = new PK2::SpriteSystem();
        // 		PkEngine::Gifts = new PK2::GiftSystem();
        
        //PkEngine::camera_x = 0;
        //PkEngine::camera_y = 0;
        //PkEngine::dcamera_x = 0;
        //PkEngine::dcamera_y = 0;
        //PkEngine::dcamera_a = 0;
        //PkEngine::dcamera_b = 0;
        
        // TODO
        // if (!settings.isFiltered)
        // 	PisteDraw2_SetFilter(PD_FILTER_NEAREST);
        // if (settings.isFiltered)
        // 	PisteDraw2_SetFilter(PD_FILTER_BILINEAR);
        // PisteDraw2_FitScreen(settings.isFit);
        // PisteDraw2_FullScreen(settings.isFullScreen);
        // PisteDraw2_ChangeResolution(settings.isWide ? 800 : 640, 480);
        //
        // 		PisteDraw2_Image_Delete(kuva_peli); //Delete if there is a image allocated
        // 		kuva_peli = PisteDraw2_Image_Load("gfx/pk2stuff.bmp", false);
        //
        // 		PisteDraw2_Image_Delete(kuva_peli2); //Delete if there is a image allocated
        // 		kuva_peli = PisteDraw2_Image_Load("gfx/pk2stuff2.bmp", false);
        //
        // 		PisteDraw2_Image_Delete(kuva_peli);
        // 		kuva_peli = PisteDraw2_Image_Load("gfx/pk2stuff.bmp", false);
        //
        // 		PK_Load_Font();
        //
        // 		PkEngine::Sprites->clear();
        //
        // 		PK_Search_Episode();
        // 		PK_Start_Saves();
        // 		PK_Search_File();
        //
        // 		PisteDraw2_ScreenFill(0);
        
        //PisteLog_Kirjoita("  - Loading basic sound fx \n");
        
        // 		if ((kytkin_aani = PisteSound_LoadSFX("sfx/switch3.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find switch3.wav";
        // 		}
        //
        // 		if ((hyppy_aani = PisteSound_LoadSFX("sfx/jump4.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find jump4.wav";
        // 		}
        //
        // 		if ((loiskahdus_aani = PisteSound_LoadSFX("sfx/splash.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find splash.wav";
        // 		}
        //
        // 		if ((avaa_lukko_aani = PisteSound_LoadSFX("sfx/openlock.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find openlock.wav";
        // 		}
        //
        // 		if ((menu_aani = PisteSound_LoadSFX("sfx/menu2.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find menu2.wav";
        // 		}
        //
        // 		if ((ammuu_aani = PisteSound_LoadSFX("sfx/moo.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find moo.wav";
        // 		}
        //
        // 		if ((kieku_aani = PisteSound_LoadSFX("sfx/doodle.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find doodle.wav";
        // 		}
        //
        // 		if ((tomahdys_aani = PisteSound_LoadSFX("sfx/pump.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find pump.wav";
        // 		}
        //
        // 		if ((pistelaskuri_aani = PisteSound_LoadSFX("sfx/counter.wav")) == -1)
        // 		{
        // 			PK2_error = true;
        // 			PK2_error_msg = "Can't find counter.wav";
        // 		}
        
        //this.renderer.fadeIn(FADE.FADE_SLOW);
        
        //PisteLog_Kirjoita("  - Calculating tiles. \n");
        //this.calculateTiles();
        
        // 		PkEngine::Gifts->clean();
        //
        // 		//PisteLog_Kirjoita("  - Loading background picture \n");
        // 		PisteDraw2_Image_Delete(kuva_tausta);
        // 		kuva_tausta = PisteDraw2_Image_Load("gfx/menu.bmp", true);
        //
        // 		PK_Empty_Records();
        //
        // 		//PisteLog_Kirjoita("  - Loading saves \n");
        // 		PK_Search_Records("data/saves.dat");
        //
        // 		//PisteLog_Kirjoita("  - PisteSound sounds on \n");
        // 		//PisteSound_Aanet_Paalla(settings.aanet);
        //
        // 		//PisteLog_Kirjoita("- Initializing basic stuff completed \n");
    }
    
    //The game loop
    private PK_MainScreen(): void {
        
        if (this.game_next_screen !== this.game_screen) this.PK_MainScreen_Change();
        
        // this.PK_Updade_Mouse();
        
        switch (this.game_screen) {
            case SCREEN.SCREEN_GAME    :
                this.PK_MainScreen_InGame();
                break;
            case SCREEN.SCREEN_MENU    :
                this.PK_MainScreen_Menu();
                break;
            case SCREEN.SCREEN_MAP     :
                this.PK_MainScreen_Map();
                break;
            case SCREEN.SCREEN_SCORING :
                this.PK_MainScreen_ScoreCount();
                break;
            case SCREEN.SCREEN_INTRO   :
                this.PK_MainScreen_Intro();
                break;
            case SCREEN.SCREEN_END     :
                this.PK_MainScreen_End();
                break;
            default             :
                this.PK_Fade_Quit();
                break;
        }
        
        // Update music volume
        let update: boolean = false;
        if (this.music_volume !== this.music_volume_now)
            update = true;
        
        if (update) {
            if (this._settings.music_max_volume > 64)
                this._settings.music_max_volume = 64;
            
            if (this._settings.music_max_volume < 0)
                this._settings.music_max_volume = 0;
            
            if (this.music_volume > this._settings.music_max_volume)
                this.music_volume = this._settings.music_max_volume;
            
            if (this.music_volume_now < this.music_volume)
                this.music_volume_now++;
            
            if (this.music_volume_now > this.music_volume)
                this.music_volume_now--;
            
            if (this.music_volume_now > 64)
                this.music_volume_now = 64;
            
            if (this.music_volume_now < 0)
                this.music_volume_now = 0;
            
            // PisteSound_SetMusicVolume(music_volume_now);
        }
        
        // static bool wasPressed = false;
        
        let skipped: boolean = !this.skip_frame && this.doublespeed; // If is in double speed and don't skip this frame, so the last frame was skipped, and it wasn't drawn
        // if (PisteInput_Keydown(PI_ESCAPE) && key_delay === 0 && !skipped) { //Don't activate menu whith a not drawn screen
        //     if (test_level)
        //         PK_Fade_Quit();
        //     else {
        //         if (menu_nyt != MENU_MAIN || game_screen != SCREEN_MENU) {
        //             game_next_screen = SCREEN_MENU;
        //             menu_nyt = MENU_MAIN;
        //             degree_temp = _degree;
        //         } else if (game_screen == SCREEN_MENU && !wasPressed && PisteInput_Keydown(PI_ESCAPE) && menu_lue_kontrollit == 0) { // Just pressed escape in menu
        //             if (menu_valittu_id == menu_valinta_id - 1)
        //                 PK_Fade_Quit();
        //             else {
        //                 menu_valittu_id = menu_valinta_id - 1; // Set to "exit" option
        //                 //window_activated = false;
        //                 //PisteInput_ActivateWindow(false);
        //             }
        //         }
        //     }
        // }
        
        // wasPressed = PisteInput_Keydown(PI_ESCAPE);
        
    }
    
    private changeToIntro() {
        const screen = this._screens.get(SCREEN.SCREEN_INTRO);
        //  screen.on(PkScreen.EV_SUSPENDED, this.changeToMenu, this);
        //screen.on(PkScreen.EVT_SUSPENDED, this.changeToMap, this);
        (screen as IntroScreen).start();
        this.renderer.setActiveScreen(screen);
    }
    
    private async changeToMenu() {
        const screen = this._screens.get(SCREEN.SCREEN_MENU);
        await (screen as MenuScreen).showMainMenu(600);
        this.renderer.setActive(SCREEN.SCREEN_MENU);
    }
    
    private changeToMap() {
        const screen = this._screens.get(SCREEN.SCREEN_MAP);
        (screen as MapScreen).resume(500);
        this.renderer.setActiveScreen(screen);
    }
    
    private changeToGame(game: Game) {
        const screen = this._screens.get(SCREEN.SCREEN_GAME) as GameScreen;
        screen.display(game);
        screen.resume(500);
        this.renderer.setActive(SCREEN.SCREEN_GAME);
    }
    
    private async prepare(): Promise<void> {
    }
    
    private openEpisode() {
    
    }
    
    private async quit(ret: int): Promise<void> {
        await this._settings.save();
        // REPL this.PK_Unload();
        this._engine.destroy();
        if (!ret) console.log('Exited correctely\n');
        // exit(ret);
    }
    
    public tick(delta: number, time: number): void {
        this._engine.gt.add(this.tick.bind(this));
        
        //const diff = delta / 16; //--> 1pt every 10ms
        
        //for (let i = 0; i < diff; i++) {
        this._entropy.degree = 1 + this._entropy.degree % 360;
        // }
    }
    
    /**
     *
     * CPP: ~PK_Alusta_Tilat
     */
    private async _loadStuff(): Promise<void> {
        Log.d('[Pekka] Preparing game\'s stuff bitmap');
        const stuffBmp = await PkAssetTk.getBitmap(pathJoin(RESOURCES_PATH, 'gfx/pk2stuff.bmp'));
        stuffBmp.makeColorTransparent();
        await this._stuff.addBitmap(STUFF_CKEY, stuffBmp);
        
        Log.d('[Pekka] Loading basic sound fx');
        await this._stuff.addSound(SWITCH_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/switch3.wav')));
        await this._stuff.addSound(JUMP_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/jump4.wav')));
        await this._stuff.addSound(SPLASH_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/splash.wav')));
        await this._stuff.addSound(LOCK_OPEN_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/openlock.wav')));
        await this._stuff.addSound(MENU_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/menu2.wav')));
        await this._stuff.addSound(ammuu_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/moo.wav')));
        await this._stuff.addSound(kieku_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/doodle.wav')));
        await this._stuff.addSound(LAND_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/pump.wav')));
        await this._stuff.addSound(pistelaskuri_SOUND_CKEY, await PkAssetTk.getSound(pathJoin(RESOURCES_PATH, 'sfx/counter.wav')));
    }
    
    
    public async main(/*int argc, char *argv[]*/): Promise<void> {
        // 	char* test_path = NULL;
        // 	bool path_set = false;
        
        // 	for (int i = 1; i < argc; i++) {
        // 		if (strcmp(argv[i], "version") == 0) {
        // 			printf(PK2_VERSION);
        // 			printf("\n");
        // 			exit(0);
        // 		}
        // 		if (strcmp(argv[i], "dev") == 0) {
        // 			dev_mode = true;
        // 			continue;
        // 		}
        // 		if (strcmp(argv[i], "test") == 0) {
        // 			if (argc <= i + 1) {
        // 				printf("Please set a level to test\n");
        // 				exit(1);
        // 			}
        // 			else {
        // 				test_level = true;
        // 				test_path = argv[i + 1];
        // 				continue;
        // 			}
        // 		}
        // 		if (strcmp(argv[i], "_uri") == 0) {
        // 			if (argc <= i + 1) {
        // 				printf("Please set a _uri\n");
        // 				exit(1);
        // 			}
        // 			else {
        // 				printf("PK2    - Path set to %s\n", argv[i + 1]);
        // 				chdir(argv[i + 1]);
        // 				path_set = true;
        // 				continue;
        // 			}
        // 		}
        // 		if (strcmp(argv[i], "fps") == 0) {
        // 			show_fps = true;
        // 			continue;
        // 		}
        //
        // 	}
        
        Log.l('PK2 Started!');
        
        // Load settings
        this._settings = await PK2Settings.loadFromClient();
        Log.dg(['Settings', ...Object.entries(this._settings)]);
        
        this._engine = new PkEngine();
        this._engine.setDebug(this.dev_mode);
        this.renderer = this._engine.getRenderer();
        
        // Load language
        await this._loadLanguage();
        //if (!this.PK_Load_Language()) {
        // console.warn("PK2    - Could not find %s!\n",settings.kieli);
        // 		strcpy(settings.kieli,"english.txt");
        // 		if(!PK_Load_Language()){
        // 			printf("PK2    - Could not find the default language file!\n");
        // 			return 0;
        // 		}
        //}
        
        // Load permanent assets
        await this._loadStuff();
        
        // setup input
        this._engine.input.associateAction([kbAction(Key.ArrowLeft)], [InputAction.UI_PREV, InputAction.UI_LEFT]);
        this._engine.input.associateAction([kbAction(Key.ArrowRight)], [InputAction.UI_NEXT, InputAction.UI_RIGHT]);
        this._engine.input.associateAction([kbAction(Key.ArrowUp)], [InputAction.UI_UP]);
        this._engine.input.associateAction([kbAction(Key.ArrowDown)], [InputAction.UI_DOWN]);
        this._engine.input.associateAction([kbAction(Key.Enter), kbAction(' ')], [InputAction.UI_ACTUATE]);
        this._engine.input.associateAction([kbAction(Key.Escape)], [InputAction.ESCAPE]);
        this._engine.input.associateAction([kbAction(Key.Tab)], [InputAction.UI_NEXT]);
        
        this._engine.input.associateAction([kbAction(Key.ArrowLeft)], [InputAction.GAME_LEFT]);
        this._engine.input.associateAction([kbAction(Key.ArrowRight)], [InputAction.GAME_RIGHT]);
        this._engine.input.associateAction([kbAction(Key.ArrowUp)], [InputAction.GAME_JUMP]);
        this._engine.input.associateAction([kbAction(Key.ArrowDown)], [InputAction.GAME_CROUCH]);
        this._engine.input.associateAction([kbAction(Key.AltGraph)], [InputAction.GAME_WALK_SLOW]);
        this._engine.input.associateAction([kbAction(Key.Control)], [InputAction.GAME_ATTACK1]);
        this._engine.input.associateAction([kbAction(Key.Alt)], [InputAction.GAME_ATTACK2]);
        this._engine.input.associateAction([kbAction(Key.Tab)], [InputAction.GAME_GIFT_NEXT]);
        this._engine.input.associateAction([kbAction(' ')], [InputAction.GAME_GIFT_USE]);
        this._engine.input.associateAction([kbAction(Key.Delete)], [InputAction.GAME_SUICIDE]);
        this._engine.input.associateAction([kbAction('P')], [InputAction.GAME_PAUSE]);
        
        
        this._engine.gt.add(this.tick.bind(this));
        
        //
        await this.createScreens();
        
        
        // await this.load
        
        
        // this.PK_MainScreen_Change();
        
        
        // if (test_level) {
        //     game_next_screen = SCREEN.SCREEN_GAME;
        //     PK_Start_Test(test_path);
        // } else if (dev_mode) {
        //     game_next_screen = SCREEN.SCREEN_MENU;
        // } else {
        //this.game_next_screen = SCREEN.SCREEN_INTRO;
        // }
        
        // The game loop calls PK_MainScreen().
        this._engine.start(this.PK_MainScreen, this);
        
        //console.log('RENDER IS DISABLED');
        //this.changeToIntro();
        //this.changeToMenu();
        
        this.uiActionNewGame();
        
        // Open the requested map
        // const tmpEpisodeName = 'rooster island 1';
        //
        // const map = await PK2Map.loadFromFile(this, /*seuraava_kartta*/ pathJoin('episodes', tmpEpisodeName), 'level001.map');
        // // TODO try catch
        // // 		printf("PK2    - Error loading map '%s' at '%s'\n", this.seuraava_kartta, polku);
        // // 		return 1;
        // const game = new PK2Game(this, map);
        // await game.xChangeToGame();
        //
        // const minifn = (delta, time) => {
        //     this._engine.gt.add(minifn.bind(this));
        //
        //     const coef = delta / (1000 / PK2GAMELOOP);
        //
        //     game.gameLoop(1);
        // };
        //
        
        
        //this.renderer._stage.addChild(game.composition.getDrawable());
        // this._engine.gt.add(minifn.bind(this));
        
        // 	if(PK2_error){
        // 		printf("PK2    - Error!\n");
        // 		PisteUtils_Show_Error(PK2_error_msg);
        // 		quit(1);
        // 	}
    }
    
    public async uiActionNewGame() {
        await this._clearCurrentGame();
        
        this._game = await this._prepareNewGame();
        this.changeToGame(this._game);
        await this._game.start();
        
        const minifn = (delta, time) => {
            this._engine.gt.add(minifn.bind(this));
            //const coef = delta / (1000 / PK2GAMELOOP);
            this._game.gameLoop();
        };
        
        this._engine.gt.add(minifn.bind(this));
    }
    
    
    public uiActionSoundMenu() {
    
    }
    
    public async _clearCurrentGame(): Promise<void> {
    
    }
    
    public async _prepareNewGame(): Promise<Game> {
        Log.l('[Pekka] Preparing new game');
        
        this._episode = new Episode('rooster island 1', {
            community: null//'skypark2'
        });
        
        const map = await LevelMap.loadFromFile(this, pathJoin(this._episode.homePath, 'episodes', this._episode.name), 'level002.map');
        // TODO try catch
        // 		printf("PK2    - Error loading map '%s' at '%s'\n", this.seuraava_kartta, polku);
        // 		return 1;
        
        return new Game(this, this._episode, map);
    }
}