; Translation made with Translator 1.32 (http://www2.arnes.si/~sopjsimo/translator.html)
; $Translator:NL=%n:TB=%t
;
; To download user-contributed translations of this file, go to:
;   http://www.jrsoftware.org/files/istrans/
;
; Note: When translating this text, do not add periods (.) to the end of
; messages that didn't have them already, because on those messages Inno
; Setup adds the periods automatically (appending a period would result in
; two periods being displayed).
;
; ID: Danish.isl,v 5.5.3+ 2012/12/14 Thomas Vedel, thomas@veco.dk

[LangOptions]
LanguageName=Dansk
LanguageID=$0406
LanguageCodePage=1252

; If the language you are translating to requires special font faces or
; sizes, uncomment any of the following entries and change them accordingly.
;DialogFontName=MS Shell Dlg
;DialogFontSize=8
;DialogFontStandardHeight=13
;TitleFontName=Arial
;TitleFontSize=29
;WelcomeFontName=Arial
;WelcomeFontSize=12
;CopyrightFontName=Arial
;CopyrightFontSize=8

[Messages]
; *** Application titles
SetupAppTitle=Installationsguide
SetupWindowTitle=Installationsguide - %1
UninstallAppTitle=Afinstaller
UninstallAppFullTitle=Afinstallerer %1

; *** Misc. common
InformationTitle=Information
ConfirmTitle=Bekr�ft
ErrorTitle=Fejl

; *** SetupLdr messages
SetupLdrStartupMessage=Denne guide installerer %1. Forts�t?
LdrCannotCreateTemp=Kan ikke danne en midlertidig fil. Installationen afbrydes
LdrCannotExecTemp=Kan ikke udf�re et program i mappen til opbevaring af midlertidige filer. Installationen afbrydes

; *** Startup error messages
LastErrorMessage=%1.%n%nFejl %2: %3
SetupFileMissing=Filen %1 mangler i installations-mappen. Ret fejlen eller skaf en ny kopi af programmet.
SetupFileCorrupt=Installationsfilerne er �delagt. Skaf en ny kopi af installationsprogrammet.
SetupFileCorruptOrWrongVer=Installationsfilerne er �delagt, eller ogs� passer de ikke til denne version af installationen. Ret fejlen eller skaf en ny kopi af installationsprogrammet.
InvalidParameter=En ugyldig parameter blev angivet p� kommandolinjen:%n%n%1
SetupAlreadyRunning=Installationsprogrammet k�rer allerede.
WindowsVersionNotSupported=Programmet kan ikke anvendes p� den version af Windows som denne computer k�rer.
WindowsServicePackRequired=Dette program kr�ver %1 med Service Pack %2 eller senere.
NotOnThisPlatform=Programmet kan ikke anvendes p� %1.
OnlyOnThisPlatform=Programmet kan kun anvendes p� %1.
OnlyOnTheseArchitectures=Dette program kan kun installeres p� Windows-versioner som er designet til denne processortype:%n%n%1
MissingWOW64APIs=Den anvendte Windows-version indeholder ikke funktioner som er n�dvendige for at foretage en 64-bit installation. Du kan afhj�lpe problemet ved at installere Service Pack %1.
WinVersionTooLowError=Programmet kr�ver %1 version %2 eller nyere.
WinVersionTooHighError=Programmet kan ikke installeres p� %1 version %2 eller nyere.
AdminPrivilegesRequired=Du skal v�re logget p� som administrator for at kunne installere dette program.
PowerUserPrivilegesRequired=Du skal v�re logget p� som administrator eller v�re medlem af superbruger-gruppen for at kunne installere dette program.
SetupAppRunningError=Programmet %1 er aktivt.%n%nAfslut venligst f�rst programmet, og klik dern�st OK for at forts�tte, eller Annuller for at afbryde.
UninstallAppRunningError=Programmet %1 er aktivt.%n%nAfslut venligst f�rst programmet, og klik dern�st OK for at forts�tte, eller Annuller for at afbryde.

; *** Misc. errors
ErrorCreatingDir=Installationen kunne ikke oprette mappen "%1"
ErrorTooManyFilesInDir=Det kan ikke lade sig g�re at oprette en fil i mappen "%1" fordi mappen indeholder for mange filer

; *** Setup common messages
ExitSetupTitle=Afbryd installationen
ExitSetupMessage=Installationen er ikke f�rdiggjort. Hvis der afbrydes nu, vil programmet ikke blive installeret.%n%nInstallationsguiden skal k�res igen for at f�rdigg�re installationen.%n%nAfbryd installationen?
AboutSetupMenuItem=&Om installationsguiden...
AboutSetupTitle=Om installationsguiden
AboutSetupMessage=%1 version %2%n%3%n%n%1 hjemmeside:%n%4
AboutSetupNote=

; *** Buttons
TranslatorNote=
ButtonBack=< &Tilbage
ButtonNext=N�&ste >
ButtonInstall=&Installer
ButtonOK=&OK
ButtonCancel=&Afbryd
ButtonYes=&Ja
ButtonYesToAll=Ja til A&lle
ButtonNo=&Nej
ButtonNoToAll=Nej t&il Alle
ButtonFinish=&F�rdig
ButtonBrowse=&Gennemse...
ButtonWizardBrowse=G&ennemse...
ButtonNewFolder=&Opret Ny Mappe

; *** "Select Language" dialog messages
SelectLanguageTitle=V�lg installationssprog
SelectLanguageLabel=V�lg hvilket sprog der skal anvendes under installationen:

; *** Common wizard text
ClickNext=Klik N�ste for at forts�tte, eller Afbryd for at afslutte.
BeveledLabel=
BrowseDialogTitle=Udv�lg mappe
BrowseDialogLabel=V�lg en mappe fra nedenst�ende liste. Klik dern�st OK.
NewFolderName=Ny Mappe

; *** "Welcome" wizard page
WelcomeLabel1=Velkommen til [name] installationsguiden
WelcomeLabel2=Denne guide installerer [name/ver] p� computeren.%n%nDet anbefales at alle andre programmer afsluttes f�r der forts�ttes.

; *** "Password" wizard page
WizardPassword=Adgangskode
PasswordLabel1=Installationen er beskyttet med adgangskode.
PasswordLabel3=Indtast adgangskoden og klik N�ste for at forts�tte. Der skelnes mellem store og sm� bogstaver.
PasswordEditLabel=&Adgangskode:
IncorrectPassword=Adgangskoden er ikke korrekt. Pr�v igen, og husk at der skelnes mellem store og sm� bogstaver.

; *** "License Agreement" wizard page
WizardLicense=Licensaftale
LicenseLabel=L�s venligst den f�lgende information, som er vigtig, inden du forts�tter.
LicenseLabel3=L�s venligst licensaftalen. Du skal acceptere betingelserne i aftalen for at forts�tte installationen.
LicenseAccepted=Jeg &accepterer aftalen
LicenseNotAccepted=Jeg accepterer &ikke aftalen

; *** "Information" wizard pages
WizardInfoBefore=Information
InfoBeforeLabel=L�s f�lgende information inden du forts�tter.
InfoBeforeClickLabel=Tryk p� N�ste, n�r du er klar til at forts�tte installationen.
WizardInfoAfter=Information
InfoAfterLabel=L�s f�lgende information inden du forts�tter.
InfoAfterClickLabel=Tryk p� N�ste, n�r du er klar til at forts�tte installationen.

; *** "User Information" wizard page
WizardUserInfo=Brugerinformation
UserInfoDesc=Indtast dine oplysninger.
UserInfoName=&Brugernavn:
UserInfoOrg=&Organisation:
UserInfoSerial=&Serienummer:
UserInfoNameRequired=Du skal indtaste et navn.

; *** "Select Destination Directory" wizard page
WizardSelectDir=V�lg installationsmappe
SelectDirDesc=Hvor skal [name] installeres?
SelectDirLabel3=Guiden installerer [name] i f�lgende mappe.
SelectDirBrowseLabel=Klik N�ste for at forts�tte. Hvis du vil v�lge en anden mappe skal du klikke Gennemse.
DiskSpaceMBLabel=Der skal v�re mindst [mb] MB fri diskplads.
CannotInstallToNetworkDrive=Programmet kan ikke installeres p� et netv�rksdrev.
CannotInstallToUNCPath=Programmet kan ikke installeres til en UNC-sti.
InvalidPath=Du skal indtaste den komplette sti med drevangivelse; for eksempel:%n%nC:\APP%n%neller et UNC-stinavn p� formen:%n%n\\server\share
InvalidDrive=Drevet eller UNC-stien du valgte eksisterer ikke. V�lg venligst noget andet.
DiskSpaceWarningTitle=Ikke nok fri diskplads.
DiskSpaceWarning=Guiden kr�ver mindst %1 KB fri diskplads for at kunne foretage installationen, men det valgte drev har kun %2 KB diskplads tilg�ngelig.%n%nVil du installere alligevel?
DirNameTooLong=Mappens eller stiens navn er for langt.
InvalidDirName=Mappenavnet er ikke gyldigt.
BadDirName32=Navne p� mapper m� ikke indeholde nogen af f�lgende tegn:%n%n%1
DirExistsTitle=Mappen eksisterer
DirExists=Mappen:%n%n%1%n%neksisterer allerede. �nsker du at installere i denne mappe alligevel?
DirDoesntExistTitle=Mappen eksisterer ikke.
DirDoesntExist=Mappen:%n%n%1%n%neksisterer ikke. �nsker du at oprette denne mappe?

; *** "Select Components" wizard page
WizardSelectComponents=V�lg Komponenter
SelectComponentsDesc=Hvilke komponenter skal installeres?
SelectComponentsLabel2=V�lg de komponenter der skal installeres, og fjern markering fra dem der ikke skal installeres. Klik N�ste for at forts�tte.
FullInstallation=Komplet installation
; if possible don't translate 'Compact' as 'Minimal' (I mean 'Minimal' in your language)
CompactInstallation=Kompakt installation
CustomInstallation=Tilpasset installation
NoUninstallWarningTitle=Komponenterne er installeret
NoUninstallWarning=Installationen har konstateret at f�lgende komponenter allerede er installeret p� computeren:%n%n%1%n%nAt frav�lge komponenterne vil ikke fjerne dem.%n%nForts�t alligevel?
ComponentSize1=%1 KB
ComponentSize2=%1 MB
ComponentsDiskSpaceMBLabel=Det valgte kr�ver mindst [mb] MB fri plads p� harddisken.

; *** "Select Additional Tasks" wizard page
WizardSelectTasks=V�lg ekstra opgaver
SelectTasksDesc=Hvilke andre opgaver skal udf�res?
SelectTasksLabel2=V�lg hvilke ekstraopgaver der skal udf�res under installationen af [name] og klik p� N�ste.

; *** "Select Start Menu Folder" wizard page
WizardSelectProgramGroup=V�lg Start-menu mappe
SelectStartMenuFolderDesc=Hvor skal installationen oprette genveje til programmet?
SelectStartMenuFolderLabel3=Installationsguiden opretter genveje (ikoner) til programmet i f�lgende mappe i Start-menuen.
SelectStartMenuFolderBrowseLabel=Klik N�ste for at forts�tte. Hvis du vil v�lge en anden mappe skal du klikke Gennemse.
MustEnterGroupName=Du skal angive et mappenavn.
GroupNameTooLong=Mappens eller stiens navn er for langt.
InvalidGroupName=Mappenavnet er ikke gyldigt.
BadGroupName=Tegnene %1 m� ikke anvendes i navnet p� en programgruppe. Angiv andet navn.
NoProgramGroupCheck2=Opret &ingen programgruppe i Start-menuen

; *** "Ready to Install" wizard page
WizardReady=Klar til at installere
ReadyLabel1=Installationsguiden er nu klar til at installere [name] p� computeren.
ReadyLabel2a=Tryk p� Installer for at forts�tte med installationen, eller tryk p� Tilbage hvis du �nsker at se eller �ndre dine indstillinger.
ReadyLabel2b=Tryk p� Installer for at forts�tte med installationen.
ReadyMemoUserInfo=Oplysninger om brugeren:
ReadyMemoDir=Installationsmappe :
ReadyMemoType=Installationstype:
ReadyMemoComponents=Valgte komponenter:
ReadyMemoGroup=Start-menu mappe:
ReadyMemoTasks=Valgte ekstraopgaver:

; *** "Preparing to Install" wizard page
WizardPreparing=Klarg�r installationen
PreparingDesc=Installationsguiden klarg�r installationen af [name] p� din computer.
PreviousInstallNotCompleted=Den foreg�ende installation eller fjernelse af et program er ikke afsluttet. Du skal genstarte computeren for at afslutte den foreg�ende installation.%n%nEfter genstarten skal du k�re installationsguiden igen for at fuldf�re installationen af [name].
CannotContinue=Installationsguiden kan ikke forts�tte. Klik p� Fortryd for at afslutte.
ApplicationsFound=F�lgende programmer bruger filer som skal opdateres. Det anbefales at du giver installationsguiden lov til automatisk at lukke programmerne.
ApplicationsFound2=F�lgende programmer bruger filer som skal opdateres. Det anbefales at du giver installationsguiden lov til automatisk at lukke programmerne. Installationsguiden vil fors�ge at genstarte programmerne n�r installationen er afsluttet.
CloseApplications=&Luk programmerne automatisk
DontCloseApplications=Luk &ikke programmerne
ErrorCloseApplications=Installationsguiden kan ikke automatisk lukke alle programmerne. Det anbefales at du lukker alle programmer som bruger filer der skal opdateres, inden installationsguiden forts�tter.

; *** "Installing" wizard page
WizardInstalling=Installerer
InstallingLabel=Vent mens installationsguiden installerer [name] p� din computer.

; *** "Setup Completed" wizard page
FinishedHeadingLabel=Afslutter installation af [name]
FinishedLabelNoIcons=Installationsguiden har installeret [name] p� din computer.
FinishedLabel=Installationsguiden har installeret [name] p� din computer. Programmet kan startes ved at v�lge de oprettede genveje.
ClickFinish=Klik p� F�rdig for at afslutte installationsprogrammet.
FinishedRestartLabel=For at fuldf�re installationen af [name], skal din computer genstartes. Vil du genstarte computeren nu?
FinishedRestartMessage=For at fuldf�re installationen af [name], skal din computer genstartes.%n%nVil du genstarte computeren nu?
ShowReadmeCheck=Ja, jeg vil gerne l�se README filen
YesRadio=&Ja, genstart computeren nu
NoRadio=&Nej, jeg genstarter selv computeren senere
; used for example as 'Run MyProg.exe'
RunEntryExec=K�r %1
; used for example as 'View Readme.txt'
RunEntryShellExec=L�s %1

; *** "Setup Needs the Next Disk" stuff
ChangeDiskTitle=Installationsprogrammet skal bruge den n�ste disk(ette)
SelectDiskLabel2=Inds�t disk nr. %1 og klik OK.%n%nHvis filerne findes i en anden mappe s� indtast stien eller klik Gennemse.
PathLabel=&Stinavn:
FileNotInDir2=Filen "%1" findes ikke i "%2". Inds�t den rigtige disk eller v�lg en anden mappe.
SelectDirectoryLabel=Angiv placeringen af den n�ste disk.

; *** Installation phase messages
SetupAborted=Installationen blev ikke gennemf�rt.%n%nInstaller igen, hent programmet p� ny, eller kontakt producenten for hj�lp.
EntryAbortRetryIgnore=Klik Gentag for at fors�ge igen, Ignorer for at forts�tte alligevel, eller Afbryd for at annullere installationen.

; *** Installation status messages
StatusClosingApplications=Lukker programmer...
StatusCreateDirs=Opretter mapper...
StatusExtractFiles=Udpakker filer...
StatusCreateIcons=Opretter program-genveje...
StatusCreateIniEntries=Opretter INI-filer...
StatusCreateRegistryEntries=Opdaterer registrerings-databasen...
StatusRegisterFiles=Registrerer filer...
StatusSavingUninstall=Gemmer information om afinstallation...
StatusRunProgram=F�rdigg�r installation...
StatusRestartingApplications=Genstarter programmer...
StatusRollback=Fjerner programmet igen...

; *** Misc. errors
ErrorInternal2=Intern fejl: %1
ErrorFunctionFailedNoCode=%1 fejlede
ErrorFunctionFailed=%1 fejlede; kode %2
ErrorFunctionFailedWithMessage=%1 fejlede; kode %2.%n%3
ErrorExecutingProgram=Kan ikke udf�re filen:%n%1

; *** Registry errors
ErrorRegOpenKey=Fejl ved �bning af  registreringsn�gle:%n%1\%2
ErrorRegCreateKey=Fejl ved oprettelse af registreringsn�gle:%n%1\%2
ErrorRegWriteKey=Fejl ved skrivning til registreringsn�gle:%n%1\%2

; *** INI errors
ErrorIniEntry=Fejl ved oprettelse af variabel i INI-filen "%1".

; *** File copying errors
FileAbortRetryIgnore=Klik Gentag for at pr�ve igen, Ignorer for at springe filen over (kan normalt ikke anbefales) eller Afbryd for at afslutte installationen.
FileAbortRetryIgnore2=Klik Gentag for at pr�ve igen, Ignorer for at forts�tte alligevel (kan normalt ikke anbefales) eller Afbryd for at afslutte installationen.
SourceIsCorrupted=Kildefilen er beskadiget
SourceDoesntExist=Kildefilen "%1" findes ikke
ExistingFileReadOnly=Den eksisterende fil er markeret som skrivebeskyttet.%n%nKlik Gentag for at pr�ve igen (efter at du har fjernet skrivebeskyttelsen), Ignorer for at springe filen over eller Afbryd for at afslutte installationen.
ErrorReadingExistingDest=Der opsted en fejl ved fors�g p� at l�se den eksisterende fil:
FileExists=Filen eksisterer allerede.%n%nSkal Installationsguiden overskrive den?
ExistingFileNewer=Den eksisterende fil er nyere end den installation fors�ger at skrive. Det anbefales at beholde den eksisterende fil.%n%n Skal den eksisterende fil beholdes?
ErrorChangingAttr=Der opstod en fejl ved fors�g p� at �ndre attributter for den eksisterende fil:
ErrorCreatingTemp=En fejl opstod ved fors�g p� at oprette en fil i mappen:
ErrorReadingSource=En fejl opstod ved fors�g p� at l�se kildefilen:
ErrorCopying=En fejl opstod ved fors�g p� at kopiere en fil:
ErrorReplacingExistingFile=En fejl opstod ved fors�g p� at overskrive den eksisterende fil:
ErrorRestartReplace=Genstart/Erstat fejlede:
ErrorRenamingTemp=En fejl opstod ved fors�g p� at omd�be en fil i modtagemappen:
ErrorRegisterServer=Kan ikke registrere DLL/OCX: %1
ErrorRegSvr32Failed=RegSvr32 fejlede med exit kode %1
ErrorRegisterTypeLib=Kan ikke registrere typebiblioteket: %1

; *** Post-installation errors
ErrorOpeningReadme=Der opstod en fejl ved fors�g p� at �bne README filen.
ErrorRestartingComputer=Installationen kunne ikke genstarte computeren. Genstart venligst computeren manuelt.

; *** Uninstaller messages
UninstallNotFound=Filen "%1" eksisterer ikke. Afinstallationen kan ikke forts�tte.
UninstallOpenError=Filen "%1" kunne ikke �bnes. Kan ikke afinstallere
UninstallUnsupportedVer=Afinstallations-logfilen "%1" er i et format der ikke kan genkendes af denne version af afinstallations-programmet. Afinstallationen afbrydes
UninstallUnknownEntry=Der er en ukendt kommando (%1) i afinstallings-logfilen.
ConfirmUninstall=Er du sikker p� at %1 og alle tilh�rende komponenter skal fjernes fra computeren?
UninstallOnlyOnWin64=Denne installation kan kun fjernes p� 64-bit Windows-versioner
OnlyAdminCanUninstall=Programmet kan kun fjernes af en bruger med administrator-rettigheder.
UninstallStatusLabel=Vent venligst imens %1 fjernes.
UninstalledAll=%1 er fjernet uden fejl.
UninstalledMost=%1 Afinstallation er afsluttet.%n%nNogle filer kunne ikke fjernes. Fjern dem manuelt, hvis du ikke �nsker de skal blive liggende.
UninstalledAndNeedsRestart=For at afslutte afinstallation af %1 skal computeren genstartes.%n%nVil du genstarte nu?
UninstallDataCorrupted="%1" er beskadiget. Afinstallation kan ikke foretages

; *** Uninstallation phase messages
ConfirmDeleteSharedFileTitle=Fjern delt fil?
ConfirmDeleteSharedFile2=Systemet mener ikke l�ngere at f�lgende delte fil(er) benyttes. Skal den/de delte fil(er) fjernes under afinstallationen?%n%nHvis du er usikker s� v�lg Nej. Beholdes filen p� maskinen, vil den ikke g�re nogen skade, men hvis filen fjernes, selv om den stadig anvendes, bliver de programmer, der anvender filen, ustabile
SharedFileNameLabel=Filnavn:
SharedFileLocationLabel=Placering:
WizardUninstalling=Status for afinstallation
StatusUninstalling=Afinstallerer %1...

; *** Shutdown block reasons
ShutdownBlockReasonInstallingApp=Installerer %1.
ShutdownBlockReasonUninstallingApp=Afinstallerer %1.

[CustomMessages]
NameAndVersion=%1 version %2
AdditionalIcons=Ekstra ikoner:
CreateDesktopIcon=Lav ikon p� skrive&bordet
CreateQuickLaunchIcon=Lav &hurtigstart-ikon
ProgramOnTheWeb=%1 p� internettet
UninstallProgram=Afinstaller (fjern) %1
LaunchProgram=&K�r %1
AssocFileExtension=Sammen&k�d %1 med filtypen %2
AssocingFileExtension=Sammenk�der %1 med filtypen %2...
AutoStartProgramGroupDescription=Start:
AutoStartProgram=Start automatisk %1
AddonHostProgramNotFound=%1 blev ikke fundet i den mappe du angav.%n%n�nsker du alligevel at forts�tte?
