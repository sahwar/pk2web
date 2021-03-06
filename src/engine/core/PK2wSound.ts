//#########################
//PisteEngine - PisteSound
//by Janne Kivilahti from Piste Gamez
//#########################

import { RESOURCES_PATH } from '../../support/constants';
import { PkEngine } from './PkEngine';

// #define AUDIO_FREQ 44100

// const int MAX_SOUNDS = 300;

// int def_freq = 22050;
// int mus_volume = 100;
// int sfx_volume = 100;

export class PK2wSound {
    private readonly _engine: PkEngine;
    
    // Mix_Chunk* indexes[MAX_SOUNDS]; //The original chunks loaded
    // Uint8* freq_chunks[MIX_CHANNELS]; //The chunk allocated for each channel
    
    // Mix_Music* music = NULL;
    // char playingMusic[PE_PATH_SIZE] = "";
    private _music: HTMLAudioElement;
    private _musicUri: string;
    private _player: any;
    
    
    public constructor(engine: PkEngine) {
        this._engine = engine;
        
        XMPlayer.init();
    }
    
    // //Change the chunk frequency
    // int Change_Frequency(int index, int freq){
    // 	int channel;
    // 	SDL_AudioCVT cvt;
    //
    // 	SDL_BuildAudioCVT(&cvt, MIX_DEFAULT_FORMAT, 2, freq, MIX_DEFAULT_FORMAT, 2, def_freq);
    // 	if (cvt.needed) {
    // 		for(channel=0; channel<MIX_CHANNELS; channel++) //Find a free channel
    // 			if(!Mix_Playing(channel)) break;
    //
    // 		if(channel == MIX_CHANNELS) return -1;
    //
    // 		cvt.len = indexes[index]->alen;
    // 		cvt.buf = (Uint8*)SDL_malloc(cvt.len * cvt.len_mult);
    // 		if (cvt.buf == NULL) return -2;
    //
    // 		SDL_memcpy(cvt.buf, indexes[index]->abuf, indexes[index]->alen);
    // 		if(SDL_ConvertAudio(&cvt) < 0){
    // 			SDL_free(cvt.buf);
    // 			return -3;
    // 		}
    //
    // 		indexes[index]->abuf = cvt.buf;
    // 		indexes[index]->alen = cvt.len_cvt;
    //
    // 		if(freq_chunks[channel] != NULL) SDL_free(freq_chunks[channel]); //Don't ovewrite a allocated pointer
    // 		freq_chunks[channel] = cvt.buf; //Save the buffer to delete it after play
    //
    // 		return channel;
    // 	}
    // 	else return 1; // Dont need to change frequency
    // }
    //
    // int PisteSound_LoadSFX(char* filename){
    // 	int i = -1;
    // 	for(i=0;i<MAX_SOUNDS;i++)
    // 		if (indexes[i] == NULL){
    // 			indexes[i] = Mix_LoadWAV(filename);
    // 			break;
    // 		}
    // 	return i;
    // }
    // int PisteSound_PlaySFX(int index){
    // 	return PisteSound_PlaySFX(index, sfx_volume, 0, def_freq);
    // }
    // int PisteSound_PlaySFX(int index, int volume, int panoramic, int freq){
    // 	//panoramic from -10000 to 10000
    //
    // 	if(index == -1) return 1;
    // 	if(indexes[index] == NULL) return 2;
    //
    // 	volume = volume * 128 / 100;
    // 	indexes[index]->volume = volume;
    //
    // 	BYTE pan_left = 255; //TODO
    // 	BYTE pan_right = 255;
    //
    // 	//Save a backup of the parameter that will be ovewrited
    // 	Uint8* bkp_buf = indexes[index]->abuf;
    // 	Uint32 bkp_len = indexes[index]->alen;
    //
    // 	int channel;
    // 	if (freq != def_freq){
    // 		channel = Change_Frequency(index, freq);
    // 		if (channel < 0) // Error changing frequency
    // 			return channel;
    // 	} else channel = -1;
    //
    // 	Mix_SetPanning(channel, pan_left, pan_right);
    //
    // 	if(Mix_PlayChannel(channel, indexes[index], 0) == -1)
    // 		return -1;
    //
    // 	indexes[index]->abuf = bkp_buf;
    // 	indexes[index]->alen = bkp_len;
    //
    // 	return 0;
    // }
    // void PisteSound_SetSFXVolume(int volume){
    // 	sfx_volume = volume;
    // }
    // int PisteSound_FreeSFX(int index){
    // 	if(indexes[index] != NULL)
    // 		Mix_FreeChunk(indexes[index]);
    // 	indexes[index] = NULL;
    // 	return 0;
    // }
    // void PisteSound_ResetSFX(){
    // 	int i;
    // 	for(i=0;i<MAX_SOUNDS;i++)
    // 		PisteSound_FreeSFX(i);
    // }
    
    /** @deprecated use {@link playMusic} */
    public PisteSound_StartMusic(uri: string) {
        return this.playMusic(uri);
    }
    
    public async playMusic(uri: string): Promise<void> {
        // TODO: Dudoso
        if (this._musicUri === uri) return;
        
        try {
            this._music = new Audio(RESOURCES_PATH + uri);
            await this._music.play();
        } catch (err) {
            console.warn(`PS     - Can\'t play "${ uri }"`);
            console.warn(err);
            
            this._musicUri = null;
            return;
        }
        
        // if (music == NULL) {
        //     printf('PS     - Music load error: %s\n', Mix_GetError());
        //     return -1;
        // }
        // if (Mix_PlayMusic(music, -1) == -1) {
        //     printf('PS     - Music play error: %s\n', Mix_GetError());
        //     return -1;
        // }
        
        this._musicUri = uri;
        
        console.log(`PS     - Loaded "${ uri }"`);
        
    }
    
    public async playXM(uri: string) {
        XMPlayer.stop();
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', RESOURCES_PATH + uri, true);
            req.responseType = 'arraybuffer';
            req.onreadystatechange = (aEvt) => {
                if (req.readyState === 4) {
                    if (req.status !== 200) {
                        return reject();
                    }
                    
                    XMPlayer.load(req.response);
                    XMPlayer.play();
                    resolve();
                }
            };
            req.send();
        });
    }
    
    // void PisteSound_SetMusicVolume(int volume){
    // 	Mix_VolumeMusic(volume * 128 / 100);
    // 	mus_volume = volume;
    // }
    
    public setMusicVolume(v: number) {
        //this._music.volume = v;
    }
    
    public getMusicVolume() {
        return this._music.volume;
    }
    
    public stopMusic(): void {
        try {
            this._music.pause();
            this._music = null;
            this._musicUri = null;
        } catch (err) {
        }
    }
    
    //
    // int PisteSound_Start(){
    // 	if(Mix_OpenAudio(AUDIO_FREQ, MIX_DEFAULT_FORMAT, 2, 4096) < 0){
    // 		printf("PS     - Unable to init Mixer: %s\n", Mix_GetError());
    // 		return -1;
    // 	}
    //
    // 	Mix_Init(MIX_INIT_MOD || MIX_INIT_MP3 || MIX_INIT_OGG);
    // 	return 0;
    // }
    // int PisteSound_Update(){
    // 	for(int i=0;i<MIX_CHANNELS;i++)
    // 		if(!Mix_Playing(i) && freq_chunks[i] != NULL){
    // 				SDL_free(freq_chunks[i]); //Make sure that all allocated chunks will be deleted after playing
    // 				freq_chunks[i] = NULL;
    // 		}
    // 		return 0;
    // }
    // int PisteSound_End(){
    // 	PisteSound_ResetSFX();
    //
    // 	if(music != NULL) Mix_FreeMusic(music);
    // 	music = NULL;
    //
    // 	Mix_CloseAudio();
    // 	return 0;
    // }
}
