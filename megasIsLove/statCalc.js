var done = false;
var str=getStat();
var dex=getStat();
var con=getStat();
var intel=getStat();
var wis=getStat();
var charisma=getStat();
var allignment=getAllignment();
var race;
var clss;
var speed;
var hp=0;
var feats='';
var languages='';
var proficiencies='';
var initiative=0;
var skills=[];
var savingThrows=[];
for(var i=0;i<18;i++)skills[i]=false;
for(var i=0;i<6;i++)savingThrows[i]=false;
getRace();
getClass();
fixStats();
var ac=10+mod(dex);
done=true;

function getAllignment(){
	switch(parseInt(Math.random()*9)){
		case 0: return 'L-G';
		case 1: return 'N-G';
		case 2: return 'C-G';
		case 3: return 'L-N';
		case 4: return 'T-N';
		case 5: return 'C-N';
		case 6: return 'L-E';
		case 7: return 'N-E';
		case 8: return 'C-E';
		
	}
}

function getStat(){
	var total=0;
	var r1=parseInt(Math.random()*6)+1;
	var r2=parseInt(Math.random()*6)+1;
	var r3=parseInt(Math.random()*6)+1;
	var r4=parseInt(Math.random()*6)+1;
	var min = r1;
	if(r2<min){
		total+=min;
		min=r2;
	}
	else 
		total+=r2;
	if(r3<min){
		total+=min;
		min=r3;
	}
	else 
		total+=r3;
	if(r4<min){
		total+=min;
		min=r4;
	}
	else 
		total+=r4;
	return total;
	
}

function getRace(){
	switch(parseInt(Math.random()*9)){
		case 0:dwarf();break;
		case 1:elf();break;
		case 2:halfling();break;
		case 3:human();break;
		case 4:dragonborn();break;
		case 5:gnome();break;
		case 6:halfelf();break;
		case 7:halforc();break;
		case 8:tiefling();break;
	}
}

function dwarf(){
	race='Dwarf';
	speed=25;
	con+=2;
	feats='Darkvision\nDwarven Resilience\nDwarven Combat Training\nTool Proficiency\nStonecunning\n';
	languages='Common\nDwarvish\n';
	switch(parseInt(Math.random()*2)){
		case 0:mountainDwarf();break;
		case 1:hillDwarf();break;
	}
}

function mountainDwarf(){
	race+=' - Mountain';
	str+=2;
	feats+='Dwarven Armor Training\n';
}

function hillDwarf(){
	race+=' - Hill';
	wis+=1;
	feats+='Dwarven Toughness\n';
	hp+=1;
}

function elf(){
	race='Elf';
	dex+=2;
	speed=30;
	feats='Darkvision\nKeen Senses\nFey Ancestry\nTrance\n';
	languages='Common\nElvish\n';
	switch(parseInt(Math.random()*3)){
		case 0:woodElf();break;
		case 1:highElf();break;
		case 2:drow();break;
	}	
}

function woodElf(){
	race+=' - Wood';
	wis+=1;
	feats+='Elf Weapon Training\nFleet of Foot\nMask of the Wild\n';
}

function highElf(){
	race+=' - High';
	intel+=1;
	feats+='Elf Weapon Training\nCantrip\n';
	extraLanguage('Elvish');
}

function drow(){
	race +=' - Drow'; 
	charisma+=1;
	feats+='Superior Darkvision\nSunlight Sensitivity\nDrow Magic\nDrow Weapon Training\n';
}

function halfling(){
	race ='Halfling';
	dex+=2;
	speed=25;
	feats='Lucky\nBrave\nHalfling Nimbleness\n';
	languages='Common\nHalfling\n';
	switch(parseInt(Math.random()*2)){
		case 0:lightFoot();break;
		case 1:stout();break;
	}
}

function lightFoot(){
	race+= ' - Light';
	charisma+=1;
	feats+='Naturally Stealthy\n';
}

function stout(){
	race+= ' - Stout';
	con+=1;
	feats+='Stout Resilience\n';
}

function human(){
	race='Human';
	switch(parseInt(Math.random()*2)){
		case 0:variantHuman();break;
		case 1:
			str+=1;
			dex+=1;
			con+=1;
			wis+=1;
			intel+=1;
			charisma+=1;
	}
	speed=30;
	languages='Common\n';
	extraLanguage('Common');
}

function variantHuman(){
	var a=parseInt(Math.random()*6);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*6);
	}
		switch(a){
		case 0:str+=1;break;
		case 1:dex+=1;break;
		case 2:con+=1;break;
		case 3:intel+=1;break;
		case 4:wis+=1;break;
	}
	switch(b){
		case 0:str+=1;break;
		case 1:dex+=1;break;
		case 2:con+=1;break;
		case 3:intel+=1;break;
		case 4:wis+=1;break;
	}
	var sa=parseInt(Math.random()*18);
	skills[sa]=true;
	getFeat();
	
}

function dragonborn(){
	race='Dragonborn';
	str+=2;
	charisma+=1;
	speed=30;
	var anc;
	switch(parseInt(Math.random()*10)){
		case 0: anc='Black';break;
		case 1: anc='Blue';break;
		case 2: anc='Brass';break;
		case 3: anc='Bronze';break;
		case 4: anc='Copper';break;
		case 5: anc='Gold';break;
		case 6: anc='Green';break;
		case 7: anc='Red';break;
		case 8: anc='Silver';break;
		case 9: anc='White';break;
	}
	feats='Draconic Ancestry - '+anc+'\nBreath Weapon\nDamage Resistance\n';
	languages='Common\nDraconic\n';
}

function gnome(){
	race='Gnome';
	intel+=2;
	speed=25;
	feats='Gnome Cunning\nDarkvision\n';
	languages='Common\nGnomish\n';
	switch(parseInt(Math.random()*2)){
		case 0:forestGnome();break;
		case 1:rockGnome();break;
	}
}

function forestGnome(){
	race+=' - Forest';
	dex+=1;
	feats+='Natural Illusionist\nSpeak with small Beasts\n';
}

function rockGnome(){
	race+=' - Rock';
	con+=1;
	feats+='Artificers Lore\nTinker\n';
}

function halfelf(){
	race= 'Halfelf';
	charisma+=2;
	var a=parseInt(Math.random()*5);
	var b=a;
	while(b==a){
		b=parseInt(Math.random()*5);
	}
	switch(a){
		case 0:str+=1;break;
		case 1:dex+=1;break;
		case 2:con+=1;break;
		case 3:intel+=1;break;
		case 4:wis+=1;break;
	}
	switch(b){
		case 0:str+=1;break;
		case 1:dex+=1;break;
		case 2:con+=1;break;
		case 3:intel+=1;break;
		case 4:wis+=1;break;
	}
	speed=30;
	feats='Darkvision\nFey Ancestry\n';
	var sa=parseInt(Math.random()*18);
	var sb=sa;
	while(sa==sb){
		sb=parseInt(Math.random()*18);
	}
	skills[sa]=true;
	skills[sb]=true;
	languages='Common\nElvish\n';
	extraLanguage('Elvish');
}

function halforc(){
	race='Halforc';
	str+=2;
	con+=1;
	speed=30;
	skills[7]=true;
	feats='Darkvision\nRelentless Endurance\nSavage Attacks\n';
	languages='Common\nOrc\n';
}	
	
function tiefling(){
	race='Tiefling';
	intel+=1;
	charisma+=2;
	speed=30;
	feats='Darkvision\nHellish Resistance\nInfernal Legacy\n';
	languages='Common\nInfernal\n';
}	
	
function getClass(){
	switch(parseInt(Math.random()*12)){
		case 0:barbarian();break;
		case 1:bard();break;
		case 2:cleric();break;
		case 3:druid();break;
		case 4:fighter();break;
		case 5:monk();break;
		case 6:paladin();break;
		case 7:ranger();break;
		case 8:rogue();break;
		case 9:sorcerer();break;
		case 10:warlock();break;
		case 11:wizard();break;
	}
}
	
function barbarian(){
	clss='Barbarian';
	proficiencies='Light Armor\nMedium Armor\nShields\nSimple Weapons\nMartial Weapons\n';
	hp=12+mod(con);
	savingThrows[0]=true;
	savingThrows[2]=true;
	feats+='Rage\nUnarmored Defence\n';
}	

function bard(){
	clss='Bard';
	proficiencies='Light Armor\nSimple Weapons\nHand Crossbow\nLongswords\nRapiers\nShortswords\n';
	savingThrows[1]=true;
	savingThrows[5]=true;
	for(var i=0;i<3;i++){
		var ran=parseInt(Math.random()*skills.length);
		while(skills[ran]){
			ran=parseInt(Math.random()*skills.length);
		}
		skills[ran]=true;
	}
	hp=8+mod(con);	
	feats+='Spellcasting\nBardic Inspiration\n';
}

function cleric(){
	clss='Cleric';
	feats+='Spellcasting\nDivine Domain\n';
	hp=8+mod(con);
	proficiencies='Light Armor\nMedium Armor\nShields\nSimple Weapons\n';
	savingThrows[4]=true;
	savingThrows[5]=true;
	var a=parseInt(Math.random()*5);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*5);
	}
	switch(a){
		case 0:skills[5]=true;break;
		case 1:skills[6]=true;break;
		case 2:skills[9]=true;break;
		case 3:skills[13]=true;break;
		case 4:skills[14]=true;break;
	}
	switch(b){
		case 0:skills[5]=true;break;
		case 1:skills[6]=true;break;
		case 2:skills[9]=true;break;
		case 3:skills[13]=true;break;
		case 4:skills[14]=true;break;
	}
}
	
function druid(){
	clss='Druid';
	feats+='Druidic\nSpellcasting\n';
	hp=8+mod(con);
	proficiencies='Light Armor\nMedium Armor\nShields\nClubs\nDaggers\nDarts\nJavelin\nMaces\nQuarterStaffs\nScimitars\nSickles\nSlings\nSpears\n';
	savingThrows[3]=true;
	savingThrows[4]=true;
	var a=parseInt(Math.random()*8);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*8);
	}
	switch(a){
		case 0:skills[1]=true;break;
		case 1:skills[2]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[9]=true;break;
		case 4:skills[10]=true;break;
		case 5:skills[11]=true;break;
		case 6:skills[14]=true;break;
		case 7:skills[17]=true;break;
	}
	switch(b){
		case 0:skills[1]=true;break;
		case 1:skills[2]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[9]=true;break;
		case 4:skills[10]=true;break;
		case 5:skills[11]=true;break;
		case 6:skills[14]=true;break;
		case 7:skills[17]=true;break;
	}
}	
	
function fighter(){
	clss='Fighter';
	feats+='Fighting Style\nSecond Wind\n';
	hp+=10+mod(con);
	switch(parseInt(Math.random()*6)){
		case 0: feats+='Archery\n';break;
		case 1: feats+='Defence\n';break;
		case 2: feats+='Dueling\n';break;
		case 3: feats+='Great Weapon Fighting\n';break;
		case 4: feats+='Protection\n';break;
		case 5: feats+='Two-Weapon Fighting\n';break;
	}
	proficiencies='All Armor\nShields\nSimple Weapons\nMartial Weapons\n';
	savingThrows[0]=true;
	savingThrows[2]=true;
	var a=parseInt(Math.random()*8);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*8);
	}
	switch(a){
		case 0:skills[0]=true;break;
		case 1:skills[1]=true;break;
		case 2:skills[3]=true;break;
		case 3:skills[5]=true;break;
		case 4:skills[6]=true;break;
		case 5:skills[7]=true;break;
		case 6:skills[11]=true;break;
		case 7:skills[17]=true;break;
	}
	switch(b){
		case 0:skills[0]=true;break;
		case 1:skills[1]=true;break;
		case 2:skills[3]=true;break;
		case 3:skills[5]=true;break;
		case 4:skills[6]=true;break;
		case 5:skills[7]=true;break;
		case 6:skills[11]=true;break;
		case 7:skills[17]=true;break;
	}
	
}	
	
function monk(){
	clss='Monk';
	feats+='Unarmored Defense\nMartial Arts\n';
	hp=8+mod(con);
	proficiencies='Simple Weapons\nShortswords\n';
	savingThrows[0]=true;
	savingThrows[1]=true;
	var a=parseInt(Math.random()*6);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*6);
	}
	switch(a){
		case 0:skills[0]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[7]=true;break;
		case 4:skills[14]=true;break;
		case 5:skills[16]=true;break;
	}
	switch(b){
		case 0:skills[0]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[7]=true;break;
		case 4:skills[14]=true;break;
		case 5:skills[16]=true;break;
	}
}	

function paladin(){
	clss = 'Paladin';
	feats+='Divine Sense\nLay on Hands\n';
	hp=10+mod(con);
	proficiencies='All Armor\nShields\nSimple Weapons\nMartial Weapons\n';
	savingThrows[4]=true;
	savingThrows[5]=true;
	var a=parseInt(Math.random()*6);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*6);
	}
	switch(a){
		case 0:skills[3]=true;break;
		case 1:skills[6]=true;break;
		case 2:skills[7]=true;break;
		case 3:skills[9]=true;break;
		case 4:skills[13]=true;break;
		case 5:skills[14]=true;break;
	}
	switch(b){
		case 0:skills[3]=true;break;
		case 1:skills[6]=true;break;
		case 2:skills[7]=true;break;
		case 3:skills[9]=true;break;
		case 4:skills[13]=true;break;
		case 5:skills[14]=true;break;
	}
}
	
function ranger(){
	clss='Ranger';
	feats+='Favored Enemy\nNatural Explorer\n';
	hp=10+mod(con);
	proficiencies='Light Armor\nMedium Armor\nShields\nSimple Weapons\n';
	savingThrows[0]=true;
	savingThrows[1]=true;
	var a=parseInt(Math.random()*8);
	var b=a;
	var c=a;
	while(a==b){
		b=parseInt(Math.random()*8);
	}
	while(a==c||b==c){
		c=parseInt(Math.random()*8);
	}
	switch(a){
		case 0:skills[1]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[8]=true;break;
		case 4:skills[10]=true;break;
		case 5:skills[11]=true;break;
		case 6:skills[16]=true;break;
		case 7:skills[17]=true;break;
	}
	switch(b){
		case 0:skills[1]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[8]=true;break;
		case 4:skills[10]=true;break;
		case 5:skills[11]=true;break;
		case 6:skills[16]=true;break;
		case 7:skills[17]=true;break;
	}
	switch(c){
		case 0:skills[1]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[8]=true;break;
		case 4:skills[10]=true;break;
		case 5:skills[11]=true;break;
		case 6:skills[16]=true;break;
		case 7:skills[17]=true;break;
	}
}	
	
function rogue(){
	clss='Rogue';
	feats+='Expertise\nSneak Attack\nThieves Cant\n';
	hp=8+mod(con);
	proficiencies='Light Armor\nSimple Weapons\nHand Crossbow\nLongswords\nRapiers\nShortswords\n';
	savingThrows[1]=true;
	savingThrows[3]=true;
	var a=parseInt(Math.random()*11);
	var b=a;
	var c=a;
	var d=a;
	while(a==b){
		b=parseInt(Math.random()*11);
	}
	while(a==c||b==c){
		c=parseInt(Math.random()*11);
	}
	while(a==d||b==d||c==d){
		d=parseInt(Math.random()*11);
	}
	switch(a){
		case 0:skills[0]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[4]=true;break;
		case 3:skills[6]=true;break;
		case 4:skills[7]=true;break;
		case 5:skills[8]=true;break;
		case 6:skills[11]=true;break;
		case 7:skills[12]=true;break;
		case 8:skills[13]=true;break;
		case 9:skills[16]=true;break;
		case 10:skills[15]=true;break;
	}
	switch(b){
		case 0:skills[0]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[4]=true;break;
		case 3:skills[6]=true;break;
		case 4:skills[7]=true;break;
		case 5:skills[8]=true;break;
		case 6:skills[11]=true;break;
		case 7:skills[12]=true;break;
		case 8:skills[13]=true;break;
		case 9:skills[16]=true;break;
		case 10:skills[15]=true;break;
	}
	switch(c){
		case 0:skills[0]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[4]=true;break;
		case 3:skills[6]=true;break;
		case 4:skills[7]=true;break;
		case 5:skills[8]=true;break;
		case 6:skills[11]=true;break;
		case 7:skills[12]=true;break;
		case 8:skills[13]=true;break;
		case 9:skills[16]=true;break;
		case 10:skills[15]=true;break;
	}
	switch(d){
		case 0:skills[0]=true;break;
		case 1:skills[3]=true;break;
		case 2:skills[4]=true;break;
		case 3:skills[6]=true;break;
		case 4:skills[7]=true;break;
		case 5:skills[8]=true;break;
		case 6:skills[11]=true;break;
		case 7:skills[12]=true;break;
		case 8:skills[13]=true;break;
		case 9:skills[16]=true;break;
		case 10:skills[15]=true;break;
	}
}	
	
function sorcerer(){
	clss='Sorcerer';
	feats+='Spellcasting\nSorcerous Origin\n';
	hp=6+mod(con);
	proficiencies='Daggers\nDarts\nSlings\nQuarterStaffs\nLight Crossbows\n';
	savingThrows[2]=true;
	savingThrows[5]=true;
	var a=parseInt(Math.random()*6);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*6);
	}
	switch(a){
		case 0:skills[2]=true;break;
		case 1:skills[4]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[7]=true;break;
		case 4:skills[13]=true;break;
		case 5:skills[14]=true;break;
	}
	switch(b){
		case 0:skills[3]=true;break;
		case 1:skills[6]=true;break;
		case 2:skills[7]=true;break;
		case 3:skills[9]=true;break;
		case 4:skills[13]=true;break;
		case 5:skills[14]=true;break;
	}
}	
	
function warlock(){
	clss='Warlock';
	feats+='Otherwordly Pardon\nPact Magic\n';
	hp=8+mod(con);
	proficiencies='Light Armor\nSimple Weapons\n';
	savingThrows[4]=true;
	savingThrows[5]=true;
	var a=parseInt(Math.random()*6);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*6);
	}
	switch(a){
		case 0:skills[2]=true;break;
		case 1:skills[4]=true;break;
		case 2:skills[5]=true;break;
		case 3:skills[7]=true;break;
		case 4:skills[8]=true;break;
		case 5:skills[10]=true;break;
		case 6:skills[14]=true;break;
	}
	switch(b){
		case 0:skills[2]=true;break;
		case 1:skills[4]=true;break;
		case 2:skills[5]=true;break;
		case 3:skills[7]=true;break;
		case 4:skills[8]=true;break;
		case 5:skills[10]=true;break;
		case 6:skills[14]=true;break;
	}	
}	

function wizard(){
	clss='Wizard';
	hp=6+mod(con);
	proficiencies='Daggers\nDarts\nSlings\nQuarterStaffs\nLight Crossbows\n';
	savingThrows[3]=true;
	savingThrows[4]=true;
	var a=parseInt(Math.random()*6);
	var b=a;
	while(a==b){
		b=parseInt(Math.random()*6);
	}
	switch(a){
		case 0:skills[2]=true;break;
		case 1:skills[5]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[7]=true;break;
		case 4:skills[9]=true;break;
		case 5:skills[14]=true;break;
	}
	switch(b){
		case 0:skills[2]=true;break;
		case 1:skills[5]=true;break;
		case 2:skills[6]=true;break;
		case 3:skills[7]=true;break;
		case 4:skills[9]=true;break;
		case 5:skills[14]=true;break;
	}
}
function extraLanguage(currRace){
	var el=currRace;
	while(el==currRace){
		switch(parseInt(Math.random()*14)){
			case 0: el='Dwarvish';break;
			case 1: el='Elvish';break;
			case 2: el='Draconic';break;
			case 3: el='Deep';break;
			case 4: el='Infernal';break;
			case 5: el='Elemental';break;
			case 6: el='Gnomish';break;
			case 7: el='Goblin';break;
			case 8: el='Halfling';break;
			case 9: el='Giant';break;
			case 10: el='Sylvan';break;
			case 11: el='Celestial';break;
			case 12: el='Orc';break;
			case 13: el='Undercommon';break;
		}
	}
	languages+=el+'\n';
}

function getFeat(){
	switch(parseInt(Math.random()*42)){
		case 0:alertFeat();break;
		case 1:athlete();break;
		case 2:actor();break;
		case 3:charger();break;
		case 4:crossbowExpert();break;
		case 5:defensiveDuelist();break;
		case 6:dualWielder();break;
		case 7:dungeonDelver();break;
		case 8:durable();break;
		case 9:elementalAdept();break;
		case 10:grappler();break;
		case 11:greatWeaponMaster();break;
		case 12:healer();break;
		case 13:heavilyArmored();break;
		case 14:heavyArmorMaster();break;
		case 15:inspiringLeader();break;
		case 16:keenMind();break;
		case 17:lightlyArmored();break;
		case 18:linguist();break;
		case 19:lucky();break;
		case 20:mageSlayer();break;
		case 21:mageInitiate();break;
		case 22:martialAdept();break;
		case 23:mediumArmorMaster();break;
		case 24:mobile();break;
		case 25:moderatelyArmored();break;
		case 26:mountedCombatant();break;
		case 27:observant();break;
		case 28:polearmMaster();break;
		case 29:resilient();break;
		case 30:ritualCaster();break;
		case 31:savageAttacker();break;
		case 32:sentinel();break;
		case 33:sharpShooter();break;
		case 34:shieldMaster();break;
		case 35:skilled();break;
		case 36:skulker();break;
		case 37:spellSniper();break;
		case 38:tavernBrawler();break;
		case 39:tough();break;
		case 40:warCaster();break;
		case 41:weaponMaster();break;
	}
}

function alertFeat(){
	initiative+=5;
	feats+='Alert\n';

}
function athlete(){
	switch(parseInt(Math.random()*2)){
		case 0:str+=1;break;
		case 1:dex+=1;break;
	}
	feats+='Athlete\n';
}
function actor(){
	charisma+=1;
	feats+='Actor\n';
}
function charger(){
	feats+='Charger\n';
}
function crossbowExpert(){
	feats+='Crossbow Expert\n';
}
function defensiveDuelist(){
	feats+='Defensive Duelist\n';
}
function dualWielder(){
	feats+='Dual Wielder';
}
function dungeonDelver(){
	feats+='Dungeon Delver\n';
}
function durable(){
	con+=1;
	feats+='Durable\n';
}
function elementalAdept(){
	feats+='Elemental Adept';
	switch(parseInt(Math.random()*5)){
		case 0:feats+=' - acid\n';break;
		case 1:feats+=' - cold\n';break;
		case 2:feats+=' - fire\n';break;
		case 3:feats+=' - lightning\n';break;
		case 4:feats+=' - thunder\n';break;
	}
}
function grappler(){
	feats+='Grappler\n';
}
function greatWeaponMaster(){
	feats+='Great Weapon Master\n';
}
function healer(){
	feats+='Healer\n';
}
function heavilyArmored(){
	feats+='Heavily Armored\n';
	str+=1;
}
function heavyArmorMaster(){
	feats+='Heavily Armor Master\n';
	str+=1;	
}
function inspiringLeader(){
	feats+='Inspiring Leader\n';
}
function keenMind(){
	feats+='keenMind\n';
	intel+=1;
}
function lightlyArmored(){
	feats+='Lightly Armored\n';
	str+=1;
}
function linguist(){
	feats+='Linguist\n';
	extraLanguage('Common');
	extraLanguage('Common');
	extraLanguage('Common');
}
function lucky(){
	feats+='Lucky\n';
}
function mageSlayer(){
	feats+='Mage Slayer\n';
}
function mageInitiate(){
	feats+='Mage Initiate\n';
}
function martialAdept(){
	feats+='MartialAdept\n';
}
function mediumArmorMaster(){
	feats+='Medium Armor Master\n';
}
function mobile(){
	feats+='Mobile\n';
	speed+=10;
}
function moderatelyArmored(){
	feats+='Moderately Armored\n';
	switch(parseInt(Math.random()*2)){
		case 0:str+=1;break;
		case 1:dex+=1;break;
	}
}
function mountedCombatant(){
	feats+='Mounted Combatant\n';
}
function observant(){
	switch(parseInt(Math.random()*2)){
		case 0:wis+=1;break;
		case 1:intel+=1;break;
	}
	feats+='Observant\n';
}
function polearmMaster(){
	feats+='Polearm Master\n';
}
function resilient(){
	feats+='Resilient\n';
	switch(parseInt(Math.random()*6)){
		case 0:str+=1;savingThrows[0]=true;break;
		case 1:dex+=1;savingThrows[1]=true;break;
		case 2:con+=1;savingThrows[2]=true;break;
		case 3:intel+=1;savingThrows[3]=true;break;
		case 4:wis+=1;savingThrows[4]=true;break;
		case 5:charisma+=1;savingThrows[5]=true;break;
	}
}
function ritualCaster(){
	feats+='Ritual Caster\n';
}
function savageAttacker(){
	feats+='Savage Attacker\n';
}
function sentinel(){
	feats+='Sentinel\n';
}
function sharpShooter(){
	feats+='Sharpshooter\n';
}
function shieldMaster(){
	feats+='Shield Master\n';
}
function skilled(){
	feats+='Skilled\n';
	for(var i=0;i<3;i++){
		var ran=parseInt(Math.random()*skills.length);
		while(skills[ran]){
			ran=parseInt(Math.random()*skills.length);
		}
		skills[ran]=true;
	}
}
function skulker(){
	feats+='Skulker\n';
}
function spellSniper(){
	feats+='Spell Sniper\n';
}
function tough(){
	feats+='Tough\n';
}
function warCaster(){
	feats+='War Caster\n';
}
function weaponMaster(){
	switch(parseInt(Math.random()*2)){
		case 0:str+=1;break;
		case 1:dex+=1;break;
	}
	feats+='Weapon Master\n';
}




function reroll(){
	done=false;
	str=getStat();
	dex=getStat();
	con=getStat();
	intel=getStat();
	wis=getStat();
	charisma=getStat();
	allignment=getAllignment();
	race;
	clss;
	speed;
	hp=0;
	feats='';
	languages='';
	proficiencies='';
	initiative=0;
	skills=[];
	savingThrows=[];
	for(var i=0;i<18;i++)skills[i]=false;
	for(var i=0;i<6;i++)savingThrows[i]=false;
	getRace();
	getClass();
	fixStats();
	ac=10+mod(dex);
	done=true;
}

function fixStats(){
	if(str>20)str=20;
	if(dex>20)dex=20;
	if(con>20)con=20;
	if(intel>20)intel=20;
	if(wis>20)wis=20;
	if(charisma>20)charisma=20;
	
}

function mod(stat){
	return Math.floor((stat-10)/2);
}

function print(){
	console.log(race+'\n'+clss+'\n'+'str = '+str+'\ndex = ' +dex+ '\ncon = ' +con+ '\nint = ' +intel+ '\nwis = ' +wis+ '\nchar = ' +charisma+'\n'+feats);
}
