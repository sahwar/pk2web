
//==================================================
//(#1) Filesystem
//==================================================

import { bool, int } from '@game/support/types';

class _ {
    private PK_Check_File(/*char *filename*/): bool { //TODO - If isn't Windows - List directory, set lower case, test, and change "char *filename".
        // 	struct stat st;
        // 	bool ret = (stat(filename, &st) == 0);
        // 	if(!ret) printf("PK2    - asked about non-existing file: %s\n", filename);
        // 	return ret;
        return true;
    }
    
    private PK_EpisodeScore_Start(): void {
        // 	for (let i=0;i<EPISODI_MAX_LEVELS;i++){
        // 		episodipisteet.best_score[i] = 0;
        // 		episodipisteet.best_time[i] = 0;
        // 		strcpy(episodipisteet.top_player[i]," ");
        // 		strcpy(episodipisteet.fastest_player[i]," ");
        // 	}
        //
        // 	episodipisteet.episode_top_score = 0;
        // 	strcpy(episodipisteet.episode_top_player," ");
    }
    
    private PK_EpisodeScore_Compare(/*int jakso, uint episteet, uint aika,  loppupisteet:bool*/): int {
        let paluu: int = 0;
        // 	if (!loppupisteet) {
        // 		if (episteet > episodipisteet.best_score[jakso]) {
        // 			strcpy(episodipisteet.top_player[jakso],pelaajan_nimi);
        // 			episodipisteet.best_score[jakso] = episteet;
        // 			jakso_uusi_ennatys = true;
        // 			paluu++;
        // 		}
        // 		if ((aika < episodipisteet.best_time[jakso] || episodipisteet.best_time[jakso] == 0) && kartta->aika > 0) {
        // 			strcpy(episodipisteet.fastest_player[jakso],pelaajan_nimi);
        // 			episodipisteet.best_time[jakso] = aika;
        // 			jakso_uusi_ennatysaika = true;
        // 			paluu++;
        // 		}
        // 	}
        // 	else {
        // 		if (episteet > episodipisteet.episode_top_score) {
        // 		    episodipisteet.episode_top_score = episteet;
        // 			strcpy(episodipisteet.episode_top_player,pelaajan_nimi);
        // 			episodi_uusi_ennatys = true;
        // 			paluu++;
        // 		}
        // 	}
        return paluu;
    }
    
    private PK_EpisodeScore_Open(/*char *filename*/): void {
        // 	PK_Load_EpisodeDir(filename);
        //
        // 	ifstream *tiedosto = new ifstream(filename, ios::binary);
        // 	char versio[4];
        //
        // 	if (tiedosto->fail()){
        // 		delete (tiedosto);
        // 		PK_EpisodeScore_Start();
        // 		return 1;
        // 	}
        //
        // 	tiedosto->read ((char *)versio, 4);
        //
        // 	if (strcmp(versio,"1.0") == 0) {
        // 		tiedosto->read ((char *)&episodipisteet, sizeof (episodipisteet));
        // 	}
        //
        // 	delete (tiedosto);
        //
        // 	return 0;
        // }
        // int  PK_EpisodeScore_Save(char *filename){
        // 	PK_Load_EpisodeDir(filename);
        //
        // 	ofstream *tiedosto = new ofstream(filename, ios::binary);
        // 	tiedosto->write ("1.0", 4);
        // 	tiedosto->write ((char *)&episodipisteet, sizeof (episodipisteet));
        // 	delete (tiedosto);
    }
    
    private PK_Load_InfoText(): void { //TODO - Load info from different languages
        // 	PisteLanguage* temp;
        // 	char infofile[PE_PATH_SIZE] = "infosign.txt";
        // 	char otsikko[] = "info00";
        // 	int indeksi1, indeksi2, i;
        //
        // 	temp = new PisteLanguage();
        // 	PK_Load_EpisodeDir(infofile);
        //
        // 	if (PK_Check_File(infofile)){
        // 		if (temp->Read_File(infofile)){
        //
        // 			for (i = 0 ; i<19 ; i++){
        // 				if(i+1 >= 10) otsikko[4] = '1'; //Make "info" + itos(i)
        // 				otsikko[5] = '1' + (char)(i%10);
        //
        // 				indeksi1 = tekstit->Hae_Indeksi(otsikko);
        // 				indeksi2 = temp->Hae_Indeksi(otsikko);
        //
        // 				if (indeksi1 != -1 && indeksi2 != -1)
        // 					tekstit->Korvaa_Teksti(indeksi1,temp->Hae_Teksti(indeksi2));
        // 			}
        // 		}
        // 	}
        //
        // 	delete (temp);
    }
    
    
    // void PK_Load_EpisodeDir(char *tiedosto){
    // 	char uusi_tiedosto[255];
    //
    // 	strcpy(uusi_tiedosto, tyohakemisto);
    // 	strcat(uusi_tiedosto, "/episodes/");
    // 	strcat(uusi_tiedosto, episodi);
    // 	strcat(uusi_tiedosto, "/");
    // 	strcat(uusi_tiedosto, tiedosto);
    // 	strcpy(tiedosto, uusi_tiedosto);
    // }
    //
    // void PK_Search_File(){
    // 	int i=0;
    // 	char hakemisto[PE_PATH_SIZE];
    // 	char list[EPISODI_MAX_LEVELS][PE_PATH_SIZE];
    // 	for (int j = 0; j < EPISODI_MAX_LEVELS; j++)
    // 		memset(list[j], '\0', PE_PATH_SIZE);
    //
    // 	PK2Kartta *temp = new PK2Kartta();
    //
    // 	strcpy(hakemisto,"");
    // 	PK_Load_EpisodeDir(hakemisto);
    // 	jaksoja = PisteUtils_Scandir(".map", hakemisto, list, EPISODI_MAX_LEVELS);
    //
    // 	for (i=0;i<=jaksoja;i++){
    // 		strcpy(jaksot[i].tiedosto,list[i]);
    // 		if (temp->Lataa_Pelkat_Tiedot(hakemisto,jaksot[i].tiedosto) == 0){
    // 			strcpy(jaksot[i].nimi, temp->nimi);
    // 			jaksot[i].x = temp->x;//   142 + i*35;
    // 			jaksot[i].y = temp->y;// 270;
    // 			jaksot[i].jarjestys = temp->jakso;
    // 			jaksot[i].ikoni = temp->ikoni;
    // 		}
    // 	}
    //
    // 	PK2LEVEL jakso;
    //
    // 	bool lopeta = false;
    //
    // 	while (!lopeta){
    // 		lopeta = true;
    //
    // 		for (i=0;i<jaksoja;i++){
    // 			if (jaksot[i].jarjestys > jaksot[i+1].jarjestys){
    // 				jakso = jaksot[i];
    // 				jaksot[i] = jaksot[i+1];
    // 				jaksot[i+1] = jakso;
    // 				lopeta = false;
    // 			}
    // 		}
    // 	}
    // 	delete temp;
    // }
    //
    // //==================================================
    // //(#2) Save
    // //==================================================
    //
    // void PK_New_Game(){
    // 	pisteet = 0;
    // 	jakso = 1;
    // }
    // void PK_New_Save(){
    // 	timeout = kartta->aika;
    //
    // 	if (timeout > 0)
    // 		aikaraja = true;
    // 	else
    // 		aikaraja = false;
    //
    // 	lopetusajastin = 0;
    //
    // 	sekunti = TIME_FPS;
    // 	jakso_pisteet = 0;
    // 	peli_ohi = false;
    // 	jakso_lapaisty = false;
    // 	kytkin1 = 0;
    // 	kytkin2 = 0;
    // 	kytkin3 = 0;
    // 	kytkin_tarina = 0;
    // 	PkEngine::vibration = 0;
    //
    // 	paused = false;
    //
    // 	info_timer = 0;
    //
    // 	nakymattomyys = 0;
    // }
    // void PK_Start_Saves(){
    // 	for (int i=0;i<EPISODI_MAX_LEVELS;i++){
    // 		strcpy(jaksot[i].nimi,"");
    // 		strcpy(jaksot[i].tiedosto,"");
    // 		jaksot[i].x = 0;
    // 		jaksot[i].y = 0;
    // 		jaksot[i].jarjestys = -1;
    // 		jaksot[i].lapaisty = false;
    // 		jaksot[i].ikoni = 0;
    // 	}
    // }
    //
    // int PK_Alphabetical_Compare(char *a, char *b){
    // 	int apituus = strlen(a);
    // 	int bpituus = strlen(b);
    // 	int looppi = apituus;
    //
    // 	if (bpituus < apituus)
    // 		looppi = bpituus;
    //
    // 	PisteUtils_Lower(a);
    // 	PisteUtils_Lower(b);
    //
    // 	for (int i=0;i<looppi;i++){
    // 		if (a[i] < b[i])
    // 			return 2;
    // 		if (a[i] > b[i])
    // 			return 1;
    // 	}
    //
    // 	if (apituus > bpituus)
    // 		return 1;
    //
    // 	if (apituus < bpituus)
    // 		return 2;
    //
    // 	return 0;
    // }
    // int PK_Order_Episodes(){
    // 	char temp[PE_PATH_SIZE] = "";
    // 	bool tehty;
    //
    // 	if (episodi_lkm > 1) {
    //
    // 		for (int i = episodi_lkm-1 ; i>=0 ;i--) {
    //
    // 			tehty = true;
    //
    // 			//for (t=0;t<i;t++) {
    // 			for (int t=2 ; t<i+2 ; t++) {
    // 				if (PK_Alphabetical_Compare(episodit[t],episodit[t+1]) == 1) {
    // 					strcpy(temp, episodit[t]);
    // 					strcpy(episodit[t], episodit[t+1]);
    // 					strcpy(episodit[t+1], temp);
    // 					tehty = false;
    // 				}
    // 			}
    //
    // 			if (tehty)
    // 				return 0;
    // 		}
    // 	}
    //
    // 	return 0;
    // }
    // int PK_Search_Episode(){
    // 	int i;
    // 	char hakemisto[PE_PATH_SIZE];
    //
    // 	for (i=0;i<MAX_EPISODEJA;i++)
    // 		strcpy(episodit[i],"");
    //
    // 	strcpy(hakemisto,"episodes/");
    //
    // 	episodi_lkm = PisteUtils_Scandir("/", hakemisto, episodit, MAX_EPISODEJA) - 2;
    //
    // 	PK_Order_Episodes();
    //
    // 	return 0;
    // }
    // int PK_Empty_Records(){
    // 	for (int i = 0;i < MAX_SAVES;i++){
    // 		tallennukset[i].kaytossa = false;
    // 		strcpy(tallennukset[i].episodi," ");
    // 		strcpy(tallennukset[i].nimi,"empty");
    // 		tallennukset[i].jakso = 0;
    // 		tallennukset[i].pisteet = 0;
    // 		for (int j = 0;j < EPISODI_MAX_LEVELS;j++)
    // 			tallennukset[i].jakso_lapaisty[j] = false;
    // 	}
    //
    // 	return 0;
    // }
    // int PK_Search_Records(char *filename){
    // 	char versio[2];
    // 	char lkmc[8];
    // 	int lkm, i;
    //
    // 	ifstream *tiedosto = new ifstream(filename, ios::binary);
    //
    // 	if (tiedosto->fail()){
    // 		delete (tiedosto);
    // 		PK_Empty_Records();
    // 		return 1;
    // 	}
    //
    // 	PK_Empty_Records();
    //
    // 	tiedosto->read(versio,	sizeof(versio));
    //
    // 	if (strcmp(versio,"1")==0){
    // 		tiedosto->read(lkmc, sizeof(lkmc));
    // 		lkm = atoi(lkmc);
    //
    // 		for (i=0;i<lkm;i++)
    // 			tiedosto->read ((char *)&tallennukset[i], sizeof (tallennukset[i]));
    // 	}
    //
    // 	delete (tiedosto);
    //
    // 	return 0;
    // }
    // int PK_Save_All_Records(char *filename){
    // 	char versio[2] = "1";
    // 	char lkm[8];
    //
    // 	itoa(MAX_SAVES,lkm,10);
    //
    // 	ofstream *file = new ofstream(filename, ios::binary);
    // 	file->write(versio, sizeof(versio));
    // 	file->write(lkm,    sizeof(lkm));
    //
    // 	for (int i=0;i< MAX_SAVES;i++)
    // 		file->write((char *)&tallennukset[i], sizeof(tallennukset[i]));
    //
    // 	delete file;
    //
    // 	return 0;
    // }
    // int PK_Load_Records(int i){
    // 	if (strcmp(tallennukset[i].episodi," ")!=0) {
    //
    // 		strcpy(episodi,tallennukset[i].episodi);
    // 		strcpy(pelaajan_nimi, tallennukset[i].nimi);
    // 		jakso = tallennukset[i].jakso;
    // 		pisteet = tallennukset[i].pisteet;
    //
    // 		PK_Start_Saves();
    //
    // 		//for (int j = 0;j < EPISODI_MAX_LEVELS;j++)
    // 		//	jaksot[j].lapaisty = tallennukset[i].jakso_lapaisty[j];
    //
    // 		game_next_screen = SCREEN_MAP;
    // 		lataa_peli = i;
    // 		episode_started = false;
    //
    // 	}
    //
    // 	return 0;
    // }
    // int PK_Save_Records(int i){
    // 	tallennukset[i].kaytossa = true;
    // 	strcpy(tallennukset[i].episodi, episodi);
    // 	strcpy(tallennukset[i].nimi,pelaajan_nimi);
    // 	tallennukset[i].jakso = jakso;
    // 	tallennukset[i].pisteet = pisteet;
    //
    // 	for (int j = 0;j < EPISODI_MAX_LEVELS;j++)
    // 		tallennukset[i].jakso_lapaisty[j] = jaksot[j].lapaisty;
    //
    // 	PK_Save_All_Records("data/saves.dat");
    //
    // 	return 0;
    // }
    //
    // //==================================================
    // //(#3) Sounds
    // //==================================================
    //
    // void PK_Play_Sound(int aani, int voimakkuus, int x, int y, int freq, bool random_freq){
    // 	if (aani > -1 && settings.sfx_max_volume > 0 && voimakkuus > 0){
    // 		if (x < PkEngine::camera_x+screen_width && x > PkEngine::camera_x && y < PkEngine::camera_y+screen_height && y > PkEngine::camera_y){
    // 			voimakkuus = voimakkuus / (100 / settings.sfx_max_volume);
    //
    // 			if (voimakkuus > 100)
    // 				voimakkuus = 100;
    //
    // 			if (voimakkuus < 0)
    // 				voimakkuus = 0;
    //
    // 			int pan = PkEngine::camera_x + (screen_width / 2) - x;
    // 			pan *= -2;
    //
    // 			if (random_freq)
    // 				freq = freq + rand()%4000 - rand()%2000;
    //
    // 			int err = PisteSound_PlaySFX(aani,settings.sfx_max_volume, pan, freq);
    // 			if (err)
    // 				printf("PK2     - Error playing sound. Error %i\n", err);
    // 		}
    // 	}
    // }
    // void PK_Play_MenuSound(int aani, int voimakkuus){
    // 	if (aani > -1 && settings.sfx_max_volume > 0 && voimakkuus > 0){
    // 		voimakkuus = voimakkuus / (100 / settings.sfx_max_volume);
    //
    // 		if (voimakkuus > 100)
    // 			voimakkuus = 100;
    //
    // 		if (voimakkuus < 0)
    // 			voimakkuus = 0;
    //
    // 		int freq = 22050 + rand()%5000 - rand()%5000;
    //
    // 		int err = PisteSound_PlaySFX(aani, settings.sfx_max_volume, 0, freq);
    // 		if (err)
    // 			printf("PK2     - Error playing sound. Error %i\n", err);
    // 	}
    // }
    //
    //
    // void PK_Updade_Mouse(){
    
    // 		MOUSE hiiri = PisteInput_UpdateMouse(game_screen == SCREEN_MAP, settings.isFullScreen);
    // 		hiiri.x -= PisteDraw2_GetXOffset();
    //
    // 		if (hiiri.x < 0) hiiri.x = 0;
    // 		if (hiiri.y < 0) hiiri.y = 0;
    // 		if (hiiri.x > 640-19) hiiri.x = 640-19;
    // 		if (hiiri.y > 480-19) hiiri.y = 480-19;
    //
    // 		hiiri_x = hiiri.x;
    // 		hiiri_y = hiiri.y;
    
    // }
    
    
    // int PK_Clean_TileBuffer(){
    // 	BYTE *buffer = NULL;
    // 	uint leveys;
    // 	int x,y;
    //
    // 	PisteDraw2_DrawImage_Start(kartta->palikat_buffer,*&buffer,(uint &)leveys);
    // 	for (y=0;y<480;y++)
    // 		for(x=0;x<320;x++)
    // 			if (buffer[x+y*leveys] == 254)
    // 				buffer[x+y*leveys] = 255;
    // 	PisteDraw2_DrawImage_End(kartta->palikat_buffer);
    //
    // 	return 0;
    // }
    // int PK_MenuShadow_Create(int kbuffer, uint kleveys, int kkorkeus, int startx){
    // 	BYTE *buffer = NULL;
    // 	uint leveys;
    // 	BYTE vari,/* vari2, vari3,*/ vari32;
    // 	uint x, mx, my;
    // 	int y;
    // 	double kerroin;
    //
    //
    // 	if (PisteDraw2_DrawImage_Start(kbuffer,*&buffer,(uint &)leveys)==1)
    // 		return 1;
    //
    // 	if (kleveys > leveys)
    // 		kleveys = leveys;
    //
    // 	kkorkeus -= 2;
    // 	kleveys  -= 2;
    //
    // 	kleveys += startx - 30;
    //
    // 	kerroin = 3;//2.25;//2
    //
    // 	//for (y=0;y<kkorkeus;y++)
    // 	for (y=35;y<kkorkeus-30;y++)
    // 	{
    // 		my = (y)*leveys;
    // 		//for(x=0;x<kleveys;x++)
    // 		for(x=startx;x<kleveys-30;x++)
    // 		{
    // 			mx = x+my;
    // 			vari   = buffer[mx];
    //
    // 			vari32 = VARI_TURKOOSI;//(vari>>5)<<5;
    // 			vari %= 32;
    //
    // 			if (x == startx || x == kleveys-31 || y == 35 || y == kkorkeus-31)
    // 				vari = int((double)vari / (kerroin / 1.5));//1.25
    // 			else
    // 				vari = int((double)vari / kerroin);//1.25
    //
    // 			vari += vari32;
    //
    // 			buffer[mx] = vari;
    // 		}
    //
    // 		if (kerroin > 1.005)
    // 			kerroin = kerroin - 0.005;
    // 	}
    //
    // 	if (PisteDraw2_DrawImage_End(kbuffer)==1)
    // 		return 1;
    //
    // 	return 0;
    // }
    //
    // int PK_Draw_Transparent_Object(int lahde_buffer, uint lahde_x, uint lahde_y, uint lahde_leveys, uint lahde_korkeus,
    // 						 uint kohde_x, uint kohde_y, int pros, BYTE vari){
    // 	PD_RECT src = {lahde_x, lahde_y, lahde_leveys, lahde_korkeus};
    // 	PD_RECT dst = {kohde_x, kohde_y, lahde_leveys, lahde_korkeus};
    // 	PisteDraw2_Image_CutClipTransparent(lahde_buffer, src, dst, pros, vari);
    // 	return 0;
    // }
    //
    // void PK_Start_Info(char *text){
    // 	if (strcmp(text, info) != 0 || info_timer == 0) {
    //
    // 		strcpy(info, text);
    // 		info_timer = MAX_ILMOITUKSENNAYTTOAIKA;
    //
    // 	}
    // }
    
    // //==================================================
    // //(#4) Text
    // //==================================================
    //
    
    //
    // void PK_Fadetext_New(int fontti, char *teksti, uint x, uint y, uint ajastin, bool ui){
    // 	fadetekstit[fadeteksti_index].fontti = fontti;
    // 	strcpy(fadetekstit[fadeteksti_index].teksti,teksti);
    // 	fadetekstit[fadeteksti_index].x = x;
    // 	fadetekstit[fadeteksti_index].y = y;
    // 	fadetekstit[fadeteksti_index].ajastin = ajastin;
    // 	fadetekstit[fadeteksti_index].ui = ui;
    // 	fadeteksti_index++;
    //
    // 	if (fadeteksti_index >= MAX_FADETEKSTEJA)
    // 		fadeteksti_index = 0;
    // }
    // int  PK_Fadetext_Draw(){
    // 	int pros;
    // 	int x, y;
    //
    // 	for (int i=0; i<MAX_FADETEKSTEJA; i++)
    // 		if (fadetekstit[i].ajastin > 0){
    // 			if (fadetekstit[i].ajastin > 50)
    // 				pros = 100;
    // 			else
    // 				pros = fadetekstit[i].ajastin * 2;
    //
    // 			x = fadetekstit[i].ui ? fadetekstit[i].x : fadetekstit[i].x - PkEngine::camera_x;
    // 			y = fadetekstit[i].ui ? fadetekstit[i].y : fadetekstit[i].y - PkEngine::camera_y;
    //
    // 			if (settings.lapinakyvat_objektit && pros < 100)
    // 				PisteDraw2_Font_WriteAlpha(fadetekstit[i].fontti, fadetekstit[i].teksti, x, y, pros);
    // 			else
    // 				PisteDraw2_Font_Write(fadetekstit[i].fontti, fadetekstit[i].teksti, x, y);
    //
    // 		}
    // 	return 0;
    // }
    // void PK_Fadetext_Update(){
    // 	for (int i=0;i<MAX_FADETEKSTEJA;i++)
    // 		if (fadetekstit[i].ajastin > 0){
    // 			fadetekstit[i].ajastin--;
    //
    // 			if (fadetekstit[i].ajastin%2 == 0)
    // 				fadetekstit[i].y--;
    //
    // 			if (fadetekstit[i].x < PkEngine::camera_x || fadetekstit[i].x > PkEngine::camera_x + screen_width ||
    // 				fadetekstit[i].y < PkEngine::camera_y || fadetekstit[i].y > PkEngine::camera_y + screen_height)
    // 				if(!fadetekstit[i].ui) fadetekstit[i].ajastin = 0;
    // 		}
    // }
    //
    
    // int PK_Draw_Cursor(int x,int y){
    // 	return 0;
    // }
    
    // int  PK_Draw_Menu_BoolBox(int x, int y, bool muuttuja, bool active){
    // 	PD_RECT img_src, img_dst = {(uint)x,(uint)y,0,0};
    //
    // 	if(muuttuja) img_src = {504,124,31,31};
    // 	else img_src = {473,124,31,31};
    //
    // 	if(active){
    // 		PisteDraw2_Image_CutClip(kuva_peli,img_src,img_dst);
    // 	} else{
    // 		PisteDraw2_Image_CutClipTransparent(kuva_peli,img_src,img_dst,50);
    // 		return false;
    // 	}
    //
    // 	if (hiiri_x > x && hiiri_x < x+30 && hiiri_y > y && hiiri_y < y+31){
    // 		if ((PisteInput_Hiiri_Vasen() || PisteInput_Keydown(PI_SPACE) || PisteInput_Ohjain_Nappi(PI_PELIOHJAIN_1,PI_OHJAIN_NAPPI_1))
    // 			&& key_delay == 0){
    //
    // 			PK_Play_MenuSound(menu_aani, 100);
    // 			key_delay = 20;
    // 			return true;
    // 		}
    // 	}
    //
    // 	return false;
    // }
    // int  PK_Draw_Menu_BackNext(int x, int y){
    // 	int val = 45;
    //
    // 	int randx = rand()%3 - rand()%3;
    // 	int randy = rand()%3 - rand()%3;
    //
    // 	if (menu_valittu_id == menu_valinta_id)
    // 		PisteDraw2_Image_CutClip(kuva_peli,x+randx,y+randy,566,124,566+31,124+31);
    // 	else
    // 		PisteDraw2_Image_CutClip(kuva_peli,x,y,566,124,566+31,124+31);
    //
    // 	if (menu_valittu_id == menu_valinta_id+1)
    // 		PisteDraw2_Image_CutClip(kuva_peli,x+val+randx,y+randy,535,124,535+31,124+31);
    // 	else
    // 		PisteDraw2_Image_CutClip(kuva_peli,x+val,y,535,124,535+31,124+31);
    //
    // 	if ((hiiri_x > x && hiiri_x < x+30 && hiiri_y > y && hiiri_y < y+31) || (menu_valittu_id == menu_valinta_id)){
    // 		if ((PisteInput_Hiiri_Vasen() || PisteInput_Keydown(PI_SPACE) || PisteInput_Ohjain_Nappi(PI_PELIOHJAIN_1,PI_OHJAIN_NAPPI_1))
    // 			&& key_delay == 0){
    // 			PK_Play_MenuSound(menu_aani, 100);
    // 			key_delay = 20;
    // 			return 1;
    // 		}
    // 	}
    //
    // 	x += val;
    //
    // 	if ((hiiri_x > x && hiiri_x < x+30 && hiiri_y > y && hiiri_y < y+31) || (menu_valittu_id == menu_valinta_id+1)){
    // 		if ((PisteInput_Hiiri_Vasen() || PisteInput_Keydown(PI_SPACE) || PisteInput_Ohjain_Nappi(PI_PELIOHJAIN_1,PI_OHJAIN_NAPPI_1))
    // 			&& key_delay == 0){
    // 			PK_Play_MenuSound(menu_aani, 100);
    // 			key_delay = 20;
    // 			return 2;
    // 		}
    // 	}
    //
    // 	menu_valinta_id += 2;
    //
    // 	return 0;
    // }
    //
    
    // int PK_Draw_Menu_Name(){
    // 	int mx; //Text cursor
    // 	char merkki;
    // 	bool hiiri_alueella = false;
    // 	int nameSize = (int)strlen(pelaajan_nimi);
    //
    // 	PK_Draw_Menu_Square(90, 150, 640-90, 480-100, 224);
    //
    // 	if (hiiri_x > 180 && hiiri_x < 180+15*20 && hiiri_y > 255 && hiiri_y < 255+18)
    // 		hiiri_alueella = true; //Mouse is in text
    //
    // 	if (hiiri_alueella && PisteInput_Hiiri_Vasen() && key_delay == 0){
    // 		nimiedit = true;
    // 		menu_name_index = (hiiri_x - 180)/15; //Set text cursor with the mouse
    // 		key_delay = 10;
    // 	}
    //
    // 	if (nimiedit && key_delay == 0){
    //
    // 		if (PisteInput_Keydown(PI_LEFT)) {
    // 			menu_name_index--;
    // 			key_delay = 8;
    // 		}
    //
    // 		if (PisteInput_Keydown(PI_RIGHT)) {
    // 			menu_name_index++;
    // 			key_delay = 8;
    // 		}
    // 	}
    //
    // 	if (menu_name_index >= 20)
    // 		menu_name_index = 19;
    //
    // 	if (menu_name_index >= nameSize)
    // 		menu_name_index = nameSize;
    //
    // 	if (menu_name_index < 0)
    // 		menu_name_index = 0;
    //
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.playermenu_type_name),180,224);
    //
    // 	PisteDraw2_ScreenFill(180-2,255-2,180+19*15+4,255+18+4,0);
    // 	PisteDraw2_ScreenFill(180,255,180+19*15,255+18,50);
    //
    // 	if (nimiedit) { //Draw text cursor
    // 		mx = menu_name_index*15 + 180 + rand()%2; //Text cursor x
    // 		PisteDraw2_ScreenFill(mx-2, 254, mx+6+3, 254+20+3, 0);
    // 		PisteDraw2_ScreenFill(mx-1, 254, mx+6, 254+20, 96+16);
    // 		PisteDraw2_ScreenFill(mx+4, 254, mx+6, 254+20, 96+8);
    // 	}
    //
    // 	PK_WavetextSlow_Draw(pelaajan_nimi,fontti2,180,255);
    // 	PisteDraw2_Font_WriteAlpha(fontti3,pelaajan_nimi,180,255,15);
    //
    // 	merkki = PisteInput_Lue_Nappaimisto();
    //
    // 	if (PisteInput_Ohjain_Nappi(PI_PELIOHJAIN_1,PI_OHJAIN_NAPPI_1) && key_delay == 0 && nimiedit) {
    // 		nimiedit = false;
    // 	}
    //
    // 	if (merkki != '\0' && (merkki != menu_name_last_mark || key_delay == 0) && nimiedit && nameSize < 19) {
    // 		menu_name_last_mark = merkki; // Don't write the same letter many times
    // 		key_delay = 15;
    //
    // 		for(int c = nameSize; c > menu_name_index; c--)
    // 			pelaajan_nimi[c] = pelaajan_nimi[c-1];
    //
    // 		pelaajan_nimi[menu_name_index] = merkki;
    // 		menu_name_index++;
    // 	}
    //
    // 	if (key_delay == 0){
    // 		if (PisteInput_Keydown(PI_DELETE)) {
    // 			for (int c=menu_name_index;c<19;c++)
    // 				pelaajan_nimi[c] = pelaajan_nimi[c+1];
    // 			pelaajan_nimi[19] = '\0';
    // 			key_delay = 10;
    // 		}
    //
    // 		if (PisteInput_Keydown(PI_BACK) && menu_name_index != 0) {
    // 			for (int c=menu_name_index-1;c<19;c++)
    // 				pelaajan_nimi[c] = pelaajan_nimi[c+1];
    // 			pelaajan_nimi[19] = '\0';
    // 			if(pelaajan_nimi[menu_name_index] == '\0') pelaajan_nimi[menu_name_index-1] = '\0';
    // 			menu_name_index--;
    // 			key_delay = 10;
    // 		}
    //
    // 		if (PisteInput_Keydown(PI_RETURN) && pelaajan_nimi[0] != '\0') {
    // 			key_delay = 10;
    // 			merkki = '\0';
    // 			nimiedit = false;
    // 			menu_valittu_id = 1;
    // 		}
    // 	}
    //
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.playermenu_continue),180,300)) {
    // 		menu_nyt = MENU_EPISODES;
    // 		menu_name_index = 0;
    // 		nimiedit = false;
    // 		menu_valittu_id = menu_valinta_id = 1;
    //
    // 		if (episodi_lkm == 1) {
    // 			strcpy(episodi,episodit[2]);
    // 			game_next_screen = SCREEN_MAP;
    // 			episode_started = false;
    // 			PK_New_Game();
    // 		}
    // 	}
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.playermenu_clear),340,300)) {
    // 		memset(pelaajan_nimi,'\0',sizeof(pelaajan_nimi));
    // 		menu_name_index = 0;
    // 	}
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_exit),180,400)) {
    // 		menu_nyt = MENU_MAIN;
    // 		menu_name_index = 0;
    // 		nimiedit = false;
    // 	}
    //
    // 	return 0;
    // }
    // int PK_Draw_Menu_Load(){
    // 	int my = 0, vali = 0;
    // 	char tpaikka[100];
    // 	char jaksoc[8];
    // 	char ind[4];
    //
    // 	PK_Draw_Menu_Square(40, 70, 640-40, 410, 70);
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.loadgame_title),50,90);
    // 	PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.loadgame_info),50,110);
    // 	my = -20;
    //
    // 	for ( int i = 0; i < MAX_SAVES; i++ ) {
    // 		itoa(i+1,ind,10);
    // 		strcpy(tpaikka,ind);
    // 		strcat(tpaikka,". ");
    //
    // 		strcat(tpaikka,tallennukset[i].nimi);
    //
    // 		if (PK_Draw_Menu_Text(true,tpaikka,100,150+my))
    // 			PK_Load_Records(i);
    //
    // 		if (strcmp(tallennukset[i].episodi," ")!=0) {
    // 			vali = 0;
    // 			vali = PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.loadgame_episode),400,150+my);
    // 			vali += PisteDraw2_Font_Write(fontti1,tallennukset[i].episodi,400+vali,150+my);
    // 			vali = 0;
    // 			vali += PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.loadgame_level),400+vali,160+my);
    // 			itoa(tallennukset[i].jakso,jaksoc,10);
    // 			vali += PisteDraw2_Font_Write(fontti1,jaksoc,400+vali,160+my);
    // 		}
    //
    // 		my += 22;
    // 	}
    //
    // 	my += 20;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_return),180,400))
    // 		menu_nyt = MENU_MAIN;
    //
    // 	return 0;
    // }
    // int PK_Draw_Menu_Save(){
    // 	int my = 0, vali = 0;
    // 	char tpaikka[100];
    // 	char jaksoc[8];
    // 	char ind[4];
    //
    // 	PK_Draw_Menu_Square(40, 70, 640-40, 410, 224);
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.savegame_title),50,90);
    // 	PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.savegame_info),50,110);
    // 	my = -20;
    //
    // 	for (int i=0;i<MAX_SAVES;i++)
    // 	{
    // 		itoa(i+1,ind,10);
    // 		strcpy(tpaikka,ind);
    // 		strcat(tpaikka,". ");
    //
    // 		strcat(tpaikka,tallennukset[i].nimi);
    //
    // 		if (PK_Draw_Menu_Text(true,tpaikka,100,150+my))
    // 			PK_Save_Records(i);
    //
    // 		if (strcmp(tallennukset[i].episodi," ")!=0)
    // 		{
    // 			vali = 0;
    // 			vali = PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.savegame_episode),400,150+my);
    // 			vali += PisteDraw2_Font_Write(fontti1,tallennukset[i].episodi,400+vali,150+my);
    // 			vali = 0;
    // 			vali += PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.savegame_level),400+vali,160+my);
    // 			itoa(tallennukset[i].jakso,jaksoc,10);
    // 			vali += PisteDraw2_Font_Write(fontti1,jaksoc,400+vali,160+my);
    // 		}
    //
    // 		my += 22;
    // 	}
    //
    // 	my += 20;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_return),180,400))
    // 		menu_nyt = MENU_MAIN;
    //
    // 	return 0;
    // }
    // int PK_Draw_Menu_Graphics(){
    // 	bool wasFullScreen, wasFiltered, wasFit, wasWide;
    // 	int my = 150;
    // 	static bool moreOptions = false;
    //
    // 	PK_Draw_Menu_Square(40, 70, 640-40, 410, 224);
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.gfx_title),50,90);
    //
    // 	if(moreOptions){
    // 		wasFullScreen = settings.isFullScreen;
    // 		wasFiltered = settings.isFiltered;
    // 		wasFit = settings.isFit;
    // 		wasWide = settings.isWide;
    //
    // 		if (settings.isFullScreen){
    // 			if (PK_Draw_Menu_Text(true,"fullscreen mode is on",180,my)){
    // 				settings.isFullScreen = false;
    // 			}
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,"fullscreen mode is off",180,my)){
    // 				settings.isFullScreen = true;
    // 			}
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.isFullScreen, true)) {
    // 			settings.isFullScreen = !settings.isFullScreen;
    // 		}
    // 		my += 30;
    //
    // 		if (settings.isFiltered){
    // 			if (PK_Draw_Menu_Text(true,"bilinear filter is on",180,my)){
    // 				settings.isFiltered = false;
    // 			}
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,"bilinear filter is off",180,my)){
    // 				settings.isFiltered = true;
    // 			}
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.isFiltered, true)) {
    // 			settings.isFiltered = !settings.isFiltered;
    // 		}
    // 		my += 30;
    //
    // 		if (settings.isFit){
    // 			if (PK_Draw_Menu_Text(true,"screen fit is on",180,my)){
    // 				settings.isFit = false;
    // 			}
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,"screen fit is off",180,my)){
    // 				settings.isFit = true;
    // 			}
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.isFit, true)) {
    // 			settings.isFit = !settings.isFit;
    // 		}
    // 		my += 30;
    //
    // 		bool res_active = true;
    //
    // 		if (settings.isWide) {
    // 			if (PK_Draw_Menu_Text(res_active,"screen size 800x480", 180, my)) {
    // 				settings.isWide = false;
    // 			}
    // 		}
    // 		else {
    // 			if (PK_Draw_Menu_Text(res_active,"screen size 640x480", 180, my)) {
    // 				settings.isWide = true;
    // 			}
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.isWide, res_active)) {
    // 			settings.isWide = !settings.isWide;
    // 		}
    // 		my += 30;
    //
    // 		//Can add more options here
    //
    // 		if(wasFullScreen != settings.isFullScreen) // If fullscreen changes
    // 			PisteDraw2_FullScreen(settings.isFullScreen);
    //
    // 		if(wasFiltered && !settings.isFiltered) // If filter changes
    // 			PisteDraw2_SetFilter(PD_FILTER_NEAREST);
    // 		if(!wasFiltered && settings.isFiltered)
    // 			PisteDraw2_SetFilter(PD_FILTER_BILINEAR);
    //
    // 		if(wasFit != settings.isFit) // If fit changes
    // 			PisteDraw2_FitScreen(settings.isFit);
    //
    // 		if (wasWide != settings.isWide) {
    // 			screen_width = settings.isWide ? 800 : 640;
    // 			PK2Kartta_Aseta_Ruudun_Mitat(screen_width, screen_height);
    // 			PisteDraw2_ChangeResolution(screen_width,screen_height);
    //
    // 			if(episode_started)
    // 				PisteDraw2_ImageFill(kuva_tausta, 0);
    //
    // 			if (settings.isWide) PisteDraw2_SetXOffset(80);
    // 			else PisteDraw2_SetXOffset(0);
    // 		}
    //
    // 		if (PK_Draw_Menu_Text(true,"back",100,360)){
    // 			moreOptions = false;
    // 			menu_valittu_id = 0; //Set menu cursor to 0
    // 		}
    //
    // 	}
    // 	else {
    //
    // 		if (settings.lapinakyvat_objektit){
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_tfx_on),180,my))
    // 				settings.lapinakyvat_objektit = false;
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_tfx_off),180,my))
    // 				settings.lapinakyvat_objektit = true;
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.lapinakyvat_objektit, true)) {
    // 			settings.lapinakyvat_objektit = !settings.lapinakyvat_objektit;
    // 		}
    // 		my += 30;
    //
    //
    // 		if (settings.lapinakyvat_menutekstit){
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_tmenus_on),180,my))
    // 				settings.lapinakyvat_menutekstit = false;
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_tmenus_off),180,my))
    // 				settings.lapinakyvat_menutekstit = true;
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.lapinakyvat_menutekstit, true)) {
    // 			settings.lapinakyvat_menutekstit = !settings.lapinakyvat_menutekstit;
    // 		}
    // 		my += 30;
    //
    //
    // 		if (settings.nayta_tavarat){
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_items_on),180,my))
    // 				settings.nayta_tavarat = false;
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_items_off),180,my))
    // 				settings.nayta_tavarat = true;
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.nayta_tavarat, true)) {
    // 			settings.nayta_tavarat = !settings.nayta_tavarat;
    // 		}
    // 		my += 30;
    //
    //
    // 		if (settings.saa_efektit){
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_weather_on),180,my))
    // 				settings.saa_efektit = false;
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_weather_off),180,my))
    // 				settings.saa_efektit = true;
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.saa_efektit, true)) {
    // 			settings.saa_efektit = !settings.saa_efektit;
    // 		}
    // 		my += 30;
    //
    //
    // 		if (settings.tausta_spritet){
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_bgsprites_on),180,my))
    // 				settings.tausta_spritet = false;
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_bgsprites_off),180,my))
    // 				settings.tausta_spritet = true;
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, settings.tausta_spritet, true)) {
    // 			settings.tausta_spritet = !settings.tausta_spritet;
    // 		}
    // 		my += 30;
    //
    //
    // 		if (doublespeed){
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_speed_double),180,my))
    // 				doublespeed = false;
    // 		} else{
    // 			if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.gfx_speed_normal),180,my))
    // 				doublespeed = true;
    // 		}
    // 		if (PK_Draw_Menu_BoolBox(100, my, doublespeed, true)) {
    // 			doublespeed = !doublespeed;
    // 		}
    // 		my += 30;
    //
    //
    // 	}
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_return),180,400)){
    // 		menu_nyt = MENU_MAIN;
    // 		moreOptions = false;
    // 	}
    //
    // 	return 0;
    // }
    // int PK_Draw_Menu_Sounds(){
    // 	int my = 0;
    //
    // 	PK_Draw_Menu_Square(40, 70, 640-40, 410, 224);
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.sound_title),50,90);
    // 	my += 20;
    //
    // 	PisteDraw2_ScreenFill(404,224+my,404+settings.sfx_max_volume,244+my,0);
    // 	PisteDraw2_ScreenFill(400,220+my,400+settings.sfx_max_volume,240+my,81);
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.sound_sfx_volume),180,200+my);
    // 	my += 20;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.sound_less),180,200+my))
    // 		if (settings.sfx_max_volume > 0)
    // 			settings.sfx_max_volume -= 5;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.sound_more),180+8*15,200+my))
    // 		if (settings.sfx_max_volume < 100)
    // 			settings.sfx_max_volume += 5;
    //
    // 	if (settings.sfx_max_volume < 0)
    // 		settings.sfx_max_volume = 0;
    //
    // 	if (settings.sfx_max_volume > 100)
    // 		settings.sfx_max_volume = 100;
    //
    // 	my+=40;
    //
    // 	PisteDraw2_ScreenFill(404,224+my,404+int(settings.music_max_volume*1.56),244+my,0);
    // 	PisteDraw2_ScreenFill(400,220+my,400+int(settings.music_max_volume*1.56),240+my,112);
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.sound_music_volume),180,200+my);
    // 	my += 20;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.sound_less),180,200+my))
    // 		if (settings.music_max_volume > 0)
    // 			settings.music_max_volume -= 4;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.sound_more),180+8*15,200+my))
    // 		if (settings.music_max_volume < 64)
    // 			settings.music_max_volume += 4;
    //
    // 	if (settings.music_max_volume < 0)
    // 		settings.music_max_volume = 0;
    //
    // 	if (settings.music_max_volume > 64)
    // 		settings.music_max_volume = 64;
    //
    // 	music_volume = settings.music_max_volume;
    //
    // 	my += 20;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_return),180,400))
    // 		menu_nyt = MENU_MAIN;
    //
    // 	return 0;
    // }
    // int PK_Draw_Menu_Controls(){
    // 	int my = 0;
    //
    // 	PK_Draw_Menu_Square(40, 70, 640-40, 410, 224);
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_title),50,90);
    //
    // 	my = 40;
    //
    // 	if (menu_lue_kontrollit > 0){
    // 		PisteDraw2_ScreenFill(299,74+my+menu_lue_kontrollit*20,584,94+my+menu_lue_kontrollit*20,0);
    // 		PisteDraw2_ScreenFill(295,70+my+menu_lue_kontrollit*20,580,90+my+menu_lue_kontrollit*20,50);
    // 	}
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_moveleft),100,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_moveright),100,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_jump),100,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_duck),100,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_walkslow),100,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_eggattack),100,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_doodleattack),100,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.controls_useitem),100,90+my);my+=20;
    //
    // 	my = 40;
    // 	PisteDraw2_Font_Write(fontti2,PisteInput_KeyName(settings.control_left),310,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,PisteInput_KeyName(settings.control_right),310,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,PisteInput_KeyName(settings.control_jump),310,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,PisteInput_KeyName(settings.control_down),310,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,PisteInput_KeyName(settings.control_walk_slow),310,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,PisteInput_KeyName(settings.control_attack1),310,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,PisteInput_KeyName(settings.control_attack2),310,90+my);my+=20;
    // 	PisteDraw2_Font_Write(fontti2,PisteInput_KeyName(settings.control_open_gift),310,90+my);my+=20;
    //
    // 	/*
    // 	if (hiiri_x > 310 && hiiri_x < 580 && hiiri_y > 130 && hiiri_y < my-20){
    // 		menu_lue_kontrollit = (hiiri_y - 120) / 20;
    //
    // 		if (menu_lue_kontrollit < 0 || menu_lue_kontrollit > 8)
    // 			menu_lue_kontrollit = 0;
    // 		else
    // 			key_delay = 25;
    //
    //
    // 	}*/
    //
    // 	if (menu_lue_kontrollit == 0){
    // 		if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.controls_edit),100,90+my))
    // 			menu_lue_kontrollit = 1;
    // 			menu_valittu_id = 0; //Set menu cursor to 0
    // 	}
    //
    // 	my += 30;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.controls_kbdef),100,90+my)){
    // 		settings.control_left      = PI_LEFT;
    // 		settings.control_right     = PI_RIGHT;
    // 		settings.control_jump      = PI_UP;
    // 		settings.control_down      = PI_DOWN;
    // 		settings.control_walk_slow = PI_RALT;
    // 		settings.control_attack1   = PI_RCONTROL;
    // 		settings.control_attack2   = PI_RSHIFT;
    // 		settings.control_open_gift = PI_SPACE;
    // 		menu_lue_kontrollit = 0;
    // 		menu_valittu_id = 0;
    // 	}
    //
    // 	my += 20;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.controls_gp4def),100,90+my)){
    // 		settings.control_left      = PI_OHJAIN1_VASEMMALLE;
    // 		settings.control_right     = PI_OHJAIN1_OIKEALLE;
    // 		settings.control_jump      = PI_OHJAIN1_YLOS;
    // 		settings.control_down      = PI_OHJAIN1_ALAS;
    // 		settings.control_walk_slow = PI_OHJAIN1_NAPPI2;
    // 		settings.control_attack1   = PI_OHJAIN1_NAPPI1;
    // 		settings.control_attack2   = PI_OHJAIN1_NAPPI3;
    // 		settings.control_open_gift = PI_OHJAIN1_NAPPI4;
    // 		menu_lue_kontrollit = 0;
    // 		menu_valittu_id = 0;
    // 	}
    //
    // 	my += 20;
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.controls_gp6def),100,90+my)){
    // 		settings.control_left      = PI_OHJAIN1_VASEMMALLE;
    // 		settings.control_right     = PI_OHJAIN1_OIKEALLE;
    // 		settings.control_jump      = PI_OHJAIN1_YLOS;//PI_OHJAIN1_NAPPI1;
    // 		settings.control_down      = PI_OHJAIN1_ALAS;
    // 		settings.control_walk_slow = PI_OHJAIN1_NAPPI2;
    // 		settings.control_attack1   = PI_OHJAIN1_NAPPI1;
    // 		settings.control_attack2   = PI_OHJAIN1_NAPPI4;
    // 		settings.control_open_gift = PI_OHJAIN1_NAPPI6;
    // 		menu_lue_kontrollit = 0;
    // 		menu_valittu_id = 0;
    // 	}
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_return),180,400)){
    // 		menu_nyt = MENU_MAIN;
    // 		menu_lue_kontrollit = 0;
    // 		menu_valittu_id = 0;
    // 	}
    //
    // 	BYTE k = 0;
    //
    // 	if (key_delay == 0 && menu_lue_kontrollit > 0){
    // 		k = PisteInput_GetKey();
    //
    // 		if (k != 0){
    // 			switch(menu_lue_kontrollit){
    // 				case 1 : settings.control_left      = k; break;
    // 				case 2 : settings.control_right     = k; break;
    // 				case 3 : settings.control_jump      = k; break;
    // 				case 4 : settings.control_down      = k; break;
    // 				case 5 : settings.control_walk_slow = k; break;
    // 				case 6 : settings.control_attack1   = k; break;
    // 				case 7 : settings.control_attack2   = k; break;
    // 				case 8 : settings.control_open_gift = k; break;
    // 				default: PK_Play_MenuSound(ammuu_aani,100); break;
    // 			}
    //
    // 			key_delay = 20;
    // 			menu_lue_kontrollit++;
    // 		}
    //
    // 		if (menu_lue_kontrollit > 8) {
    // 			menu_lue_kontrollit = 0;
    // 			menu_valittu_id = 0;
    // 		}
    // 	}
    //
    // 	my += 20;
    //
    // 	return 0;
    // }
    // int PK_Draw_Menu_Episodes(){
    // 	int my = 0;
    //
    // 	PK_Draw_Menu_Square(110, 130, 640-110, 450, 224);
    //
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.episodes_choose_episode),50,90);
    // 	my += 80;
    //
    // 	if (episodi_lkm-2 > 10) {
    // 		char luku[20];
    // 		int vali = 90;
    // 		int x = 50,//500,
    // 			y = 50;//300;
    // 		//vali += PisteDraw2_Font_Write(fontti1,"page:",x,y+40);
    // 		itoa(episodisivu+1,luku,10);
    // 		vali += PisteDraw2_Font_Write(fontti1,luku,x+vali,y+20);
    // 		vali += PisteDraw2_Font_Write(fontti1,"/",x+vali,y+20);
    // 		itoa((episodi_lkm/10)+1,luku,10);
    // 		vali += PisteDraw2_Font_Write(fontti1,luku,x+vali,y+20);
    //
    // 		int nappi = PK_Draw_Menu_BackNext(x,y);
    //
    // 		if (nappi == 1 && episodisivu > 0)
    // 			episodisivu--;
    //
    // 		if (nappi == 2 && (episodisivu*10)+10 < episodi_lkm)
    // 			episodisivu++;
    // 	}
    //
    // 	for (int i=(episodisivu*10)+2;i<(episodisivu*10)+12;i++){
    // 		if (strcmp(episodit[i],"") != 0){
    // 			if (PK_Draw_Menu_Text(true,episodit[i],220,90+my)){
    // 				strcpy(episodi,episodit[i]);
    // 				PK_Load_InfoText();
    // 				game_next_screen = SCREEN_MAP;
    // 				episode_started = false;
    // 				PK_New_Game();
    // 				//PisteDraw2_FadeIn(PD_FADE_NORMAL);
    // 			}
    // 			my += 20;
    // 		}
    // 	}
    //
    // 	/* sivu / kaikki */
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_return),180,400)){
    // 		menu_nyt = MENU_MAIN;
    // 		my += 20;
    // 	}
    // 	PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.episodes_get_more),140,440);
    //
    // 	return 0;
    // }
    // int PK_Draw_Menu_Language(){
    // 	int my = 0;
    // 	int i;
    //
    // 	PK_Draw_Menu_Square(110, 130, 640-110, 450, 224);
    //
    // 	PisteDraw2_Font_Write(fontti2,"select a language:",50,100);
    //
    //
    // 	for (i=0;i<10;i++){
    // 		if(PK_Draw_Menu_Text(true,langmenulist[i],150,150+my)){
    // 			//printf("Selected %s\n",langmenulist[i]);
    // 			strcpy(settings.kieli,langmenulist[i]);
    // 			PK_Load_Language();
    // 		}
    // 		my += 20;
    // 	}
    // 	my+=180;
    //
    //
    // 	int direction;
    // 	if(totallangs>10){
    // 		direction = PK_Draw_Menu_BackNext(400,my-20);
    // 		if(direction == 1){
    // 			if(langlistindex>0){
    //
    // 				for(i=9;i>0;i--)
    // 					strcpy(langmenulist[i],langmenulist[i-1]);
    // 				strcpy(langmenulist[0],langlist[langlistindex-1]);
    // 				langlistindex--;
    // 			}
    // 		}
    // 		if(direction == 2){
    // 			if(langlistindex<totallangs-10){
    //
    // 				for(i=0;i<9;i++)
    // 					strcpy(langmenulist[i],langmenulist[i+1]);
    // 				strcpy(langmenulist[9],langlist[langlistindex+10]);
    // 				langlistindex++;
    // 			}
    // 		}
    // 	}
    // 	my+=20;
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_return),130,my)){
    // 		menu_nyt = MENU_MAIN;
    // 	}
    //
    // 	return 0;
    // }
    //
    
    // int PK_Draw_Map_Button(int x, int y, int t){
    // 	int paluu = 0;
    //
    // 	t = t * 25;
    //
    // 	int vilkku = 50 + (int)(sin_table[_degree%360]*2);
    //
    // 	if (vilkku < 0)
    // 		vilkku = 0;
    //
    // 	if (hiiri_x > x && hiiri_x < x+17 && hiiri_y > y && hiiri_y < y+17){
    // 		if (key_delay == 0 && (PisteInput_Hiiri_Vasen() || PisteInput_Keydown(PI_SPACE)
    // 													    || PisteInput_Ohjain_Nappi(PI_PELIOHJAIN_1,PI_OHJAIN_NAPPI_1))){
    // 			key_delay = 30;
    // 			return 2;
    // 		}
    //
    // 		if (t == 25)
    // 			PK_Draw_Transparent_Object(kuva_peli, 247, 1, 25, 25, x-2, y-2, 60, 96);
    // 		if (t == 0)
    // 			PK_Draw_Transparent_Object(kuva_peli, 247, 1, 25, 25, x-4, y-4, 60, 32);
    // 		if (t == 50)
    // 			PK_Draw_Transparent_Object(kuva_peli, 247, 1, 25, 25, x-4, y-4, 60, 64);
    //
    // 		paluu = 1;
    // 	}
    //
    // 	if (t == 25)
    // 		PK_Draw_Transparent_Object(kuva_peli, 247, 1, 25, 25, x-2, y-2, vilkku, 96);
    //
    // 	if (((_degree/45)+1)%4==0 || t==0)
    // 		PisteDraw2_Image_CutClip(kuva_peli,x,y,1+t,58,23+t,80);
    //
    // 	return paluu;
    // }
    
    // int PK_Draw_Map(){
    // 	char luku[20];
    // 	int vali = 20;
    //
    // 	PisteDraw2_ScreenFill(0);
    // 	PisteDraw2_Image_Clip(kuva_tausta, 0, 0);
    //
    // 	PisteDraw2_Font_Write(fontti4,episodi,100+2,72+2);
    // 	PisteDraw2_Font_Write(fontti2,episodi,100,72);
    //
    // 	PisteDraw2_Font_Write(fontti4,tekstit->Hae_Teksti(PK_txt.map_total_score),100+2,92+2);
    // 	vali = PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.map_total_score),100,92);//250,80
    // 	ltoa(pisteet,luku,10);
    // 	PisteDraw2_Font_Write(fontti4,luku,100+vali+2+15,92+2);
    // 	PisteDraw2_Font_Write(fontti2,luku,100+vali+15,92);
    //
    // 	if (episodipisteet.episode_top_score > 0) {
    // 		vali = PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.map_episode_best_player),360,72);
    // 		PisteDraw2_Font_Write(fontti1,episodipisteet.episode_top_player,360+vali+10,72);
    // 		vali = PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.map_episode_hiscore),360,92);
    // 		ltoa(episodipisteet.episode_top_score,luku,10);
    // 		PisteDraw2_Font_Write(fontti2,luku,360+vali+15,92);
    // 	}
    //
    // 	vali = PisteDraw2_Font_Write(fontti1,tekstit->Hae_Teksti(PK_txt.map_next_level),100,120);
    // 	ltoa(jakso,luku,10);
    // 	PisteDraw2_Font_Write(fontti1,luku,100+vali+15,120);
    //
    // 	//PK_Particles_Draw();
    //
    // 	if (jaksoja == 0) {
    // 		PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.episodes_no_maps),180,290);
    // 	}
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.mainmenu_return),100,430)){
    // 		game_next_screen = SCREEN_MENU;
    // 		menu_nyt = MENU_MAIN;
    // 	}
    //
    // 	int nuppi_x = 0, nuppi_y = 0;
    // 	int tyyppi = 0;
    // 	int paluu;
    // 	int min = 0, sek = 0;
    // 	int ikoni;
    // 	int sinx = 0, cosy = 0;
    // 	int pekkaframe = 0;
    //
    // 	int njakso = jaksoja;
    // 	for (int i=1;i<=jaksoja;i++)
    // 		if (!jaksot[i].lapaisty && jaksot[i].jarjestys < njakso)
    // 			njakso = jaksot[i].jarjestys; // Find the first unclear level
    // 	if(jakso < njakso)
    // 		jakso = njakso;
    //
    // 	for (int i=0;i<=jaksoja;i++) {
    // 		if (strcmp(jaksot[i].nimi,"")!=0 && jaksot[i].jarjestys > 0) {
    // 			tyyppi = 0;							//0 harmaa
    // 			if (jaksot[i].jarjestys == jakso)
    // 				tyyppi = 1;						//1 vihre�
    // 			if (jaksot[i].jarjestys > jakso)
    // 				tyyppi = 2;						//2 oranssi
    // 			if (jaksot[i].lapaisty)
    // 				tyyppi = 0;
    //
    // 			if (jaksot[i].x == 0)
    // 				jaksot[i].x = 142+i*30;
    //
    // 			if (jaksot[i].y == 0)
    // 				jaksot[i].y = 270;
    //
    // 			ikoni = jaksot[i].ikoni;
    //
    // 			//PisteDraw2_Image_Clip(kuva_peli,jaksot[i].x-4,jaksot[i].y-4-30,1+(ikoni*27),452,27+(ikoni*27),478);
    // 			PisteDraw2_Image_CutClip(kuva_peli,jaksot[i].x-9,jaksot[i].y-14,1+(ikoni*28),452,28+(ikoni*28),479);
    //
    // 			if (tyyppi==1) {
    // 				sinx = (int)(sin_table[_degree%360]/2);
    // 				cosy = (int)(cos_table[_degree%360]/2);
    // 				pekkaframe = 28*((_degree%360)/120);
    // 				PisteDraw2_Image_CutClip(kuva_peli,jaksot[i].x+sinx-12,jaksot[i].y-17+cosy,157+pekkaframe,46,181+pekkaframe,79);
    // 			}
    //
    // 			paluu = PK_Draw_Map_Button(jaksot[i].x-5, jaksot[i].y-10, tyyppi);
    //
    // 			// if clicked
    // 			if (paluu == 2) {
    // 				if (tyyppi != 2 || dev_mode) {
    // 					strcpy(this.seuraava_kartta,jaksot[i].tiedosto);
    // 					jakso_indeksi_nyt = i;
    // 					going_to_game = true;
    // 					PisteDraw2_FadeOut(PD_FADE_SLOW);
    // 					music_volume = 0;
    // 					PK_Play_MenuSound(kieku_aani,90);
    // 				}
    // 				else
    // 					PK_Play_MenuSound(ammuu_aani,100);
    // 			}
    //
    // 			itoa(jaksot[i].jarjestys,luku,10);
    // 			PisteDraw2_Font_Write(fontti1,luku,jaksot[i].x-12+2,jaksot[i].y-29+2);
    //
    // 			if (paluu > 0) {
    //
    // 				int info_x = 489+3, info_y = 341-26;
    //
    // 				PisteDraw2_Image_CutClip(kuva_peli,info_x-3,info_y+26,473,0,607,121);
    // 				PisteDraw2_Font_Write(fontti1,jaksot[i].nimi,info_x,info_y+30);
    //
    // 				if (episodipisteet.best_score[i] > 0) {
    // 					PisteDraw2_Font_WriteAlpha(fontti1,tekstit->Hae_Teksti(PK_txt.map_level_best_player),info_x,info_y+50,75);
    // 					PisteDraw2_Font_Write(fontti1,episodipisteet.top_player[i],info_x,info_y+62);
    // 					vali = 8 + PisteDraw2_Font_WriteAlpha(fontti1,tekstit->Hae_Teksti(PK_txt.map_level_hiscore),info_x,info_y+74,75);
    // 					ltoa(episodipisteet.best_score[i],luku,10);
    // 					PisteDraw2_Font_Write(fontti1,luku,info_x+vali,info_y+75);
    // 				}
    //
    // 				if (episodipisteet.best_time[i] > 0) {
    // 					PisteDraw2_Font_WriteAlpha(fontti1,tekstit->Hae_Teksti(PK_txt.map_level_fastest_player),info_x,info_y+98,75);
    // 					PisteDraw2_Font_Write(fontti1,episodipisteet.fastest_player[i],info_x,info_y+110);
    //
    // 					vali = 8 + PisteDraw2_Font_WriteAlpha(fontti1,tekstit->Hae_Teksti(PK_txt.map_level_best_time),info_x,info_y+122,75);
    // 					min = episodipisteet.best_time[i]/60;
    // 					sek = episodipisteet.best_time[i]%60;
    //
    // 					itoa(min,luku,10);
    // 					vali += PisteDraw2_Font_Write(fontti1,luku,info_x+vali,info_y+122);
    // 					vali += PisteDraw2_Font_Write(fontti1,":",info_x+vali,info_y+122);
    // 					itoa(sek,luku,10);
    // 					PisteDraw2_Font_Write(fontti1,luku,info_x+vali,info_y+122);
    // 				}
    // 			}
    // 		}
    // 	}
    //
    // 	PK_Draw_Cursor(hiiri_x,hiiri_y);
    //
    // 	return 0;
    // }
    //
    // int PK_Draw_ScoreCount(){
    // 	char luku[20];
    // 	int vali = 20;
    // 	int my = 0, x, y;
    // 	int kuutio, aste;
    // 	int	vari = 0, kerroin;
    //
    // 	PisteDraw2_ScreenFill(0);
    // 	PisteDraw2_Image_Clip(kuva_tausta, 0, 0);
    //
    // 	for (aste=0;aste<18;aste++) {
    //
    // 		kerroin = (int)(cos_table[(_degree+aste*3)%180]);
    //
    // 		x = (int)(sin_table[(_degree+aste*10)%360]*2)+kerroin;
    // 		y = (int)(cos_table[(_degree+aste*10)%360]*2);//10 | 360 | 2
    // 		//PisteDraw2_Image_Clip(kuva_peli,320+x,240+y,157,46,181,79);
    // 		kuutio = (int)(sin_table[(_degree+aste*3)%360]);
    // 		if (kuutio < 0) kuutio = -kuutio;
    //
    // 		PisteDraw2_ScreenFill(320-x,240-y,320-x+kuutio,240-y+kuutio,VARI_TURKOOSI+8);
    // 	}
    // 	for (aste=0;aste<18;aste++) {
    //
    // 		x = (int)(sin_table[(_degree+aste*10)%360]*3);
    // 		y = (int)(cos_table[(_degree+aste*10)%360]*3);//10 | 360 | 3
    // 		//PisteDraw2_Image_Clip(kuva_peli,320+x,240+y,157,46,181,79);
    // 		kuutio = (int)(sin_table[(_degree+aste*2)%360])+18;
    // 		if (kuutio < 0) kuutio = -kuutio;//0;//
    // 		if (kuutio > 100) kuutio = 100;
    //
    // 		//PisteDraw2_ScreenFill(320+x,240+y,320+x+kuutio,240+y+kuutio,VARI_TURKOOSI+10);
    // 		PK_Draw_Transparent_Object(kuva_peli, 247, 1, 25, 25, 320+x, 240+y, kuutio, 32);
    // 	}
    //
    // 	PisteDraw2_Font_Write(fontti4,tekstit->Hae_Teksti(PK_txt.score_screen_title),100+2,72+2);
    // 	PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_title),100,72);
    // 	PisteDraw2_Font_Write(fontti4,tekstit->Hae_Teksti(PK_txt.score_screen_level_score),100+2,102+2);
    // 	vali = PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_level_score),100,102);//250,80
    // 	fake_pisteet = bonuspisteet + aikapisteet + energiapisteet + esinepisteet + pelastuspisteet;
    // 	ltoa(fake_pisteet,luku,10);
    // 	PisteDraw2_Font_Write(fontti4,luku,400+2,102+2);
    // 	PisteDraw2_Font_Write(fontti2,luku,400,102);
    // 	my = 0;
    //
    // 	PisteDraw2_Font_Write(fontti4,tekstit->Hae_Teksti(PK_txt.score_screen_bonus_score),100+2,192+2+my);
    // 	vali = PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_bonus_score),100,192+my);
    // 	ltoa(bonuspisteet,luku,10);
    // 	PisteDraw2_Font_Write(fontti4,luku,400+2,192+2+my);
    // 	PisteDraw2_Font_Write(fontti2,luku,400,192+my);
    // 	my += 30;
    //
    // 	PisteDraw2_Font_Write(fontti4,tekstit->Hae_Teksti(PK_txt.score_screen_time_score),100+2,192+2+my);
    // 	vali = PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_time_score),100,192+my);
    // 	ltoa(aikapisteet,luku,10);
    // 	PisteDraw2_Font_Write(fontti4,luku,400+2,192+2+my);
    // 	PisteDraw2_Font_Write(fontti2,luku,400,192+my);
    // 	my += 30;
    //
    // 	PisteDraw2_Font_Write(fontti4,tekstit->Hae_Teksti(PK_txt.score_screen_energy_score),100+2,192+2+my);
    // 	vali = PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_energy_score),100,192+my);
    // 	ltoa(energiapisteet,luku,10);
    // 	PisteDraw2_Font_Write(fontti4,luku,400+2,192+2+my);
    // 	PisteDraw2_Font_Write(fontti2,luku,400,192+my);
    // 	my += 30;
    //
    // 	PisteDraw2_Font_Write(fontti4,tekstit->Hae_Teksti(PK_txt.score_screen_item_score),100+2,192+2+my);
    // 	vali = PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_item_score),100,192+my);
    // 	ltoa(esinepisteet,luku,10);
    // 	PisteDraw2_Font_Write(fontti4,luku,400+2,192+2+my);
    // 	PisteDraw2_Font_Write(fontti2,luku,400,192+my);
    // 	my += 30;
    //
    // 	x = 110;
    // 	y = 192 + my;
    //
    // 	for (int i = 0; i < MAX_GIFTS; i++)
    // 		if (PkEngine::Gifts->get(i) != -1)	{
    // 			//PK2Sprite_Prototyyppi* prot = PkEngine::Gifts->get_protot(i);
    // 			PkEngine::Gifts->draw(i, x, y);
    // 			//prot->Piirra(x - prot->leveys/2, y - prot->korkeus / 2, 0);
    // 			x += 38;
    // 		}
    //
    // 	my += 10;
    //
    // 	if (pistelaskuvaihe >= 4){
    // 		PisteDraw2_Font_Write(fontti4,tekstit->Hae_Teksti(PK_txt.score_screen_total_score),100+2,192+2+my);
    // 		vali = PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_total_score),100,192+my);//250,80
    // 		ltoa(pisteet,luku,10);
    // 		PisteDraw2_Font_Write(fontti4,luku,400+2,192+2+my);
    // 		PisteDraw2_Font_Write(fontti2,luku,400,192+my);
    // 		my += 25;
    //
    // 		if (jakso_uusi_ennatys) {
    // 			PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_new_level_hiscore),100+rand()%2,192+my+rand()%2);
    // 			my += 25;
    // 		}
    // 		if (jakso_uusi_ennatysaika) {
    // 			PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_new_level_best_time),100+rand()%2,192+my+rand()%2);
    // 			my += 25;
    // 		}
    // 		if (episodi_uusi_ennatys) {
    // 			PisteDraw2_Font_Write(fontti2,tekstit->Hae_Teksti(PK_txt.score_screen_new_episode_hiscore),100+rand()%2,192+my+rand()%2);
    // 			my += 25;
    // 		}
    // 	}
    //
    // 	if (PK_Draw_Menu_Text(true,tekstit->Hae_Teksti(PK_txt.score_screen_continue),100,430)){
    // 		music_volume = 0;
    // 		siirry_pistelaskusta_karttaan = true;
    // 		PisteDraw2_FadeOut(PD_FADE_SLOW);
    // 		//game_next_screen = SCREEN_MAP;
    // 	}
    //
    // 	PK_Draw_Cursor(hiiri_x,hiiri_y);
    //
    // 	return 0;
    // }
    //
    // int PK_Draw_Intro_Text(char *teksti, int fontti, int x, int y, uint alkuaika, uint loppuaika){
    // 	int pros = 100;
    // 	if (this.introCounter > alkuaika && this.introCounter < loppuaika) {
    //
    // 		if (this.introCounter - alkuaika < 100)
    // 			pros = this.introCounter - alkuaika;
    //
    // 		if (loppuaika - this.introCounter < 100)
    // 			pros = loppuaika - this.introCounter;
    //
    // 		if (pros > 0) {
    // 			if (pros < 100)
    // 				PisteDraw2_Font_WriteAlpha(fontti,teksti,x,y,pros);
    // 			else
    // 				PisteDraw2_Font_Write(fontti,teksti,x,y);
    // 		}
    //
    // 	}
    // 	return 0;
    // }
    
    // int PK_Draw_EndGame_Image(int x, int y, int tyyppi, int plus, int rapytys){
    // 	int frm = 0;
    // 	int yk = 0;
    //
    // 	if (tyyppi == 1){ // Pekka
    // 		frm = 1;
    // 		if ((_degree/10)%10==rapytys) frm = 0;
    // 		yk = (int)sin_table[(_degree%360)];
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x+3,y+56, 4, 63, 29, 69);
    // 		if (yk < 0){
    // 			y+=yk;
    // 			frm = 2;
    // 		}
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x,y, 1+frm*35, 1, 32+frm*35, 59);
    // 	}
    //
    // 	if (tyyppi == 2){ // kana (katse oikealle)
    // 		frm = 0;
    // 		if ((_degree/10)%10==rapytys) frm = 1;
    // 		yk = (int)cos_table[((_degree+plus)%360)];
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x+3,y+36, 4, 63, 29, 69);
    // 		if (yk < 0) {
    // 			y+=yk;
    // 			frm = 2;
    // 		}
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x,y, 106+frm*37, 1, 139+frm*37, 38);
    // 	}
    //
    // 	if (tyyppi == 3){ // kana (katse vasemmalle)
    // 		frm = 0;
    // 		if ((_degree/10)%10==rapytys) frm = 1;
    // 		yk = (int)cos_table[((_degree+plus)%360)];
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x+3,y+36, 4, 63, 29, 69);
    // 		if (yk < 0) {
    // 			y+=yk;
    // 			frm = 2;
    // 		}
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x,y, 106+frm*37, 41, 139+frm*37, 77);
    // 	}
    //
    // 	if (tyyppi == 4){ // pikkukana (katse oikealle)
    // 		frm = 0;
    // 		if ((_degree/10)%10==rapytys) frm = 1;
    // 		yk = (int)sin_table[(((_degree*2)+plus)%360)];
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x+3,y+27, 4, 63, 29, 69);
    // 		if (yk < 0) {
    // 			y+=yk;
    // 			frm = 2;
    // 		}
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x,y, 217+frm*29, 1, 243+frm*29, 29);
    // 	}
    //
    // 	if (tyyppi == 5){ // pikkukana (katse vasemmalle)
    // 		frm = 0;
    // 		if ((_degree/10)%10==rapytys) frm = 1;
    // 		yk = (int)sin_table[(((_degree*2)+plus)%360)];
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x,y+27, 4, 63, 29, 69);
    // 		if (yk < 0) {
    // 			y+=yk;
    // 			frm = 2;
    // 		}
    // 		PisteDraw2_Image_CutClip(kuva_tausta,x,y, 217+frm*29, 33, 243+frm*29, 61);
    // 	}
    //
    // 	return 0;
    // }
    // int PK_Draw_EndGame(){
    //
    // 	uint onnittelut_alku	= 300;
    // 	uint onnittelut_loppu	= onnittelut_alku + 1000;
    // 	uint the_end_alku		= onnittelut_loppu + 80;
    // 	uint the_end_loppu		= the_end_alku + 3000;
    //
    // 	PisteDraw2_ScreenFill(0);
    // 	PisteDraw2_Image_CutClip(kuva_tausta,320-233/2,240-233/2, 6, 229, 239, 462);
    //
    // 	PK_Draw_EndGame_Image(345, 244, 3, 30, 2);
    // 	PK_Draw_EndGame_Image(276, 230, 2, 50, 3);
    // 	PK_Draw_EndGame_Image(217, 254, 4, 0, 4);
    //
    // 	PK_Draw_EndGame_Image(305, 240, 1, 0, 1);
    //
    // 	PK_Draw_EndGame_Image(270, 284, 2, 20, 1);
    // 	PK_Draw_EndGame_Image(360, 284, 5, 60, 2);
    //
    // 	if (loppulaskuri > onnittelut_alku) {
    // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.end_congratulations), fontti2, 220, 380, onnittelut_alku, onnittelut_loppu);
    // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.end_chickens_saved), fontti1, 220, 402, onnittelut_alku+30, onnittelut_loppu+30);
    // 	}
    // 	if (loppulaskuri > the_end_alku) {
    // 		PK_Draw_Intro_Text(tekstit->Hae_Teksti(PK_txt.end_the_end), fontti2, 280, 190, the_end_alku, the_end_loppu);
    // 	}
    //
    // 	return 0;
    // }
    
    //
    // //==================================================
    // //(#15) Main frames
    // //==================================================
    
    // //==================================================
    // //(#16) Process Functions
    // //==================================================
    //
    // void PK_Start_Test(const char* arg){
    // 	if (arg == NULL) return;
    //
    // 	char buffer[PE_PATH_SIZE];
    // 	int sepindex;
    //
    // 	strcpy(buffer, arg);
    // 	for (sepindex = 0; sepindex < PE_PATH_SIZE; sepindex++)
    // 		if(buffer[sepindex]=='/') break;
    //
    // 	strcpy(episodi, buffer); episodi[sepindex] = '\0';
    // 	strcpy(this.seuraava_kartta, buffer + sepindex + 1);
    //
    // 	printf("PK2    - testing episode '%s' level '%s'\n", episodi, this.seuraava_kartta);
    //
    // 	PK_Load_InfoText();
    // 	PK_New_Game();
    // }
    
}
