; *** Inno Setup version 5.5.3+ Norwegian (bokm�l) messages ***
;
; Note: When translating this text, do not add periods (.) to the end of
; messages that didn't have them already, because on those messages Inno
; Setup adds the periods automatically (appending a period would result in
; two periods being displayed).
;
; Norwegian translation by Eivind Bakkestuen
; E-mail: eivind@nexusdb.com
; Many thanks to the following people for language improvements and comments:
;
; Harald Habberstad, Frode Weum, Morten Johnsen,
; Tore Ottinsen, Kristian Hyllestad, Thomas Kelso, Jostein Christoffer Andersen
;
; $jrsoftware: issrc/Files/Languages/Norwegian.isl,v 1.15 2007/04/23 15:03:35 josander+ Exp $

[LangOptions]
LanguageName=Norsk
LanguageID=$0414
LanguageCodePage=1252

[Messages]

; *** Application titles
SetupAppTitle=Installasjon
SetupWindowTitle=Installere - %1
UninstallAppTitle=Avinstaller
UninstallAppFullTitle=%1 Avinstallere

; *** Misc. common
InformationTitle=Informasjon
ConfirmTitle=Bekreft
ErrorTitle=Feil

; *** SetupLdr messages
SetupLdrStartupMessage=Dette vil installere %1. Vil du fortsette?
LdrCannotCreateTemp=Kan ikke lage midlertidig fil, installasjonen er avbrutt
LdrCannotExecTemp=Kan ikke kj�re fil i den midlertidige mappen, installasjonen er avbrutt

; *** Startup error messages
LastErrorMessage=%1.%n%nFeil %2: %3
SetupFileMissing=Filen %1 mangler i installasjonskatalogen. Vennligst korriger problemet eller skaff deg en ny kopi av programmet.
SetupFileCorrupt=Installasjonsfilene er �delagte. Vennligst skaff deg en ny kopi av programmet.
SetupFileCorruptOrWrongVer=Installasjonsfilene er �delagte eller ikke kompatible med dette installasjonsprogrammet. Vennligst korriger problemet eller skaff deg en ny kopi av programmet.
InvalidParameter=Kommandolinjen hadde en ugyldig parameter:%n%n%1
SetupAlreadyRunning=Dette programmet kj�rer allerede.
WindowsVersionNotSupported=Dette programmet st�tter ikke Windows-versjonen p� denne maskinen.
WindowsServicePackRequired=Dette programmet krever %1 Service Pack %2 eller nyere.
NotOnThisPlatform=Dette programmet kj�rer ikke p� %1.
OnlyOnThisPlatform=Dette programmet kj�rer kun p� %1.
OnlyOnTheseArchitectures=Dette programmet kan kun installeres i Windows-versjoner som er beregnet p� f�lgende prossessorarkitekturer:%n%n%1
MissingWOW64APIs=Din Windows-versjon mangler funksjonalitet for at installasjonsprogrammet skal gj�re en 64-bits-installasjon. Installer Service Pack %1 for � rette p� dette.
WinVersionTooLowError=Dette programmet krever %1 versjon %2 eller senere.
WinVersionTooHighError=Dette programmet kan ikke installeres p� %1 versjon %2 eller senere.
AdminPrivilegesRequired=Administrator-rettigheter kreves for � installere dette programmet.
PowerUserPrivilegesRequired=Du m� v�re logget inn som administrator eller ha administrator-rettigheter n�r du installerer dette programmet.
SetupAppRunningError=Installasjonsprogrammet har funnet ut at %1 kj�rer.%n%nVennligst avslutt det n� og klikk deretter OK for � fortsette, eller Avbryt for � avslutte.
UninstallAppRunningError=Avinstallasjonsprogrammet har funnet ut at %1 kj�rer.%n%nVennligst avslutt det n� og klikk deretter OK for � fortsette, eller Avbryt for � avslutte.

; *** Misc. errors
ErrorCreatingDir=Installasjonsprogrammet kunne ikke lage mappen "%1"
ErrorTooManyFilesInDir=Kunne ikke lage en fil i mappen "%1" fordi den inneholder for mange filer

; *** Setup common messages
ExitSetupTitle=Avslutt installasjonen
ExitSetupMessage=Installasjonen er ikke ferdig. Programmet installeres ikke hvis du avslutter n�.%n%nDu kan installere programmet igjen senere hvis du vil.%n%nVil du avslutte?
AboutSetupMenuItem=&Om installasjonsprogrammet...
AboutSetupTitle=Om installasjonsprogrammet
AboutSetupMessage=%1 versjon %2%n%3%n%n%1 hjemmeside:%n%4
AboutSetupNote=
TranslatorNote=Norwegian translation maintained by Eivind Bakkestuen (eivind@nexusdb.com)

; *** Buttons
ButtonBack=< &Tilbake
ButtonNext=&Neste >
ButtonInstall=&Installer
ButtonOK=OK
ButtonCancel=Avbryt
ButtonYes=&Ja
ButtonYesToAll=Ja til &alle
ButtonNo=&Nei
ButtonNoToAll=N&ei til alle
ButtonFinish=&Ferdig
ButtonBrowse=&Bla gjennom...
ButtonWizardBrowse=&Bla gjennom...
ButtonNewFolder=&Lag ny mappe

; *** "Select Language" dialog messages
SelectLanguageTitle=Velg installasjonsspr�k
SelectLanguageLabel=Velg spr�ket som skal brukes under installasjonen:

; *** Common wizard text
ClickNext=Klikk p� Neste for � fortsette, eller Avbryt for � avslutte installasjonen.
BeveledLabel=
BrowseDialogTitle=Bla etter mappe
BrowseDialogLabel=Velg en mappe fra listen nedenfor, klikk deretter OK.
NewFolderName=Ny mappe

; *** "Welcome" wizard page
WelcomeLabel1=Velkommen til installasjonsprogrammet for [name].
WelcomeLabel2=Dette vil installere [name/ver] p� din maskin.%n%nDet anbefales at du avslutter alle programmer som kj�rer f�r du fortsetter.

; *** "Password" wizard page
WizardPassword=Passord
PasswordLabel1=Denne installasjonen er passordbeskyttet.
PasswordLabel3=Vennligst oppgi ditt passord og klikk p� Neste for � fortsette. Sm� og store bokstaver behandles ulikt.
PasswordEditLabel=&Passord:
IncorrectPassword=Det angitte passordet er feil, vennligst pr�v igjen.

; *** "License Agreement" wizard page
WizardLicense=Lisensbetingelser
LicenseLabel=Vennligst les f�lgende viktig informasjon f�r du fortsetter.
LicenseLabel3=Vennligst les f�lgende lisensbetingelser. Du m� godta innholdet i lisensbetingelsene f�r du fortsetter med installasjonen.
LicenseAccepted=Jeg &aksepterer lisensbetingelsene
LicenseNotAccepted=Jeg aksepterer &ikke lisensbetingelsene

; *** "Information" wizard pages
WizardInfoBefore=Informasjon
InfoBeforeLabel=Vennligst les f�lgende viktige informasjon f�r du fortsetter.
InfoBeforeClickLabel=Klikk p� Neste n�r du er klar til � fortsette.
WizardInfoAfter=Informasjon
InfoAfterLabel=Vennligst les f�lgende viktige informasjon f�r du fortsetter.
InfoAfterClickLabel=Klikk p� Neste n�r du er klar til � fortsette.

; *** "User Information" wizard page
WizardUserInfo=Brukerinformasjon
UserInfoDesc=Vennligst angi informasjon.
UserInfoName=&Brukernavn:
UserInfoOrg=&Organisasjon:
UserInfoSerial=&Serienummer:
UserInfoNameRequired=Du m� angi et navn.

; *** "Select Destination Directory" wizard page
WizardSelectDir=Velg mappen hvor filene skal installeres:
SelectDirDesc=Hvor skal [name] installeres?
SelectDirLabel3=Installasjonsprogrammet vil installere [name] i f�lgende mappe.
SelectDirBrowseLabel=Klikk p� Neste for � fortsette. Klikk p� Bla gjennom hvis du vil velge en annen mappe.
DiskSpaceMBLabel=Programmet krever minst [mb] MB med diskplass.
CannotInstallToNetworkDrive=Kan ikke installere p� en nettverksstasjon.
CannotInstallToUNCPath=Kan ikke installere p� en UNC-bane. Du m� tilordne nettverksstasjonen hvis du vil installere i et nettverk.
InvalidPath=Du m� angi en full bane med stasjonsbokstav, for eksempel:%n%nC:\APP%n%Du kan ikke bruke formen:%n%n\\server\share
InvalidDrive=Den valgte stasjonen eller UNC-delingen finnes ikke, eller er ikke tilgjengelig. Vennligst velg en annen
DiskSpaceWarningTitle=For lite diskplass
DiskSpaceWarning=Installasjonprogrammet krever minst %1 KB med ledig diskplass, men det er bare %2 KB ledig p� den valgte stasjonen.%n%nvil du fortsette likevel?
DirNameTooLong=Det er for langt navn p� mappen eller banen.
InvalidDirName=Navnet p� mappen er ugyldig.
BadDirName32=Mappenavn m� ikke inneholde noen av f�lgende tegn:%n%n%1
DirExistsTitle=Eksisterende mappe
DirExists=Mappen:%n%n%1%n%nfinnes allerede. Vil du likevel installere der?
DirDoesntExistTitle=Mappen eksisterer ikke
DirDoesntExist=Mappen:%n%n%1%n%nfinnes ikke. Vil du at den skal lages?

; *** "Select Components" wizard page
WizardSelectComponents=Velg komponenter
SelectComponentsDesc=Hvilke komponenter skal installeres?
SelectComponentsLabel2=Velg komponentene du vil installere; velg bort de komponentene du ikke vil installere. N�r du er klar, klikker du p� Neste for � fortsette.
FullInstallation=Full installasjon
; if possible don't translate 'Compact' as 'Minimal' (I mean 'Minimal' in your language)
CompactInstallation=Kompakt installasjon
CustomInstallation=Egendefinert installasjon
NoUninstallWarningTitle=Komponenter eksisterer
NoUninstallWarning=Installasjonsprogrammet har funnet ut at f�lgende komponenter allerede er p� din maskin:%n%n%1%n%nDisse komponentene avinstalleres ikke selv om du ikke velger dem.%n%nVil du likevel fortsette?
ComponentSize1=%1 KB
ComponentSize2=%1 MB
ComponentsDiskSpaceMBLabel=Valgte alternativer krever minst [mb] MB med diskplass.

; *** "Select Additional Tasks" wizard page
WizardSelectTasks=Velg tilleggsoppgaver
SelectTasksDesc=Hvilke tilleggsoppgaver skal utf�res?
SelectTasksLabel2=Velg tilleggsoppgavene som skal utf�res mens [name] installeres, klikk deretter p� Neste.

; *** "Select Start Menu Folder" wizard page
WizardSelectProgramGroup=Velg mappe p� start-menyen
SelectStartMenuFolderDesc=Hvor skal installasjonsprogrammet plassere snarveiene?
SelectStartMenuFolderLabel3=Installasjonsprogrammet vil opprette snarveier p� f�lgende startmeny-mappe.
SelectStartMenuFolderBrowseLabel=Klikk p� Neste for � fortsette. Klikk p� Bla igjennom hvis du vil velge en annen mappe.
MustEnterGroupName=Du m� skrive inn et mappenavn.
GroupNameTooLong=Det er for langt navn p� mappen eller banen.
InvalidGroupName=Navnet p� mappen er ugyldig.
BadGroupName=Mappenavnet m� ikke inneholde f�lgende tegn:%n%n%1
NoProgramGroupCheck2=&Ikke legg til mappe p� start-menyen

; *** "Ready to Install" wizard page
WizardReady=Klar til � installere
ReadyLabel1=Installasjonsprogrammet er n� klar til � installere [name] p� din maskin.
ReadyLabel2a=Klikk Installer for � fortsette, eller Tilbake for � se p� eller forandre instillingene.
ReadyLabel2b=Klikk Installer for � fortsette.
ReadyMemoUserInfo=Brukerinformasjon:
ReadyMemoDir=Installer i mappen:
ReadyMemoType=Installasjonstype:
ReadyMemoComponents=Valgte komponenter:
ReadyMemoGroup=Programgruppe:
ReadyMemoTasks=Tilleggsoppgaver:

; *** "Preparing to Install" wizard page
WizardPreparing=Forbereder installasjonen
PreparingDesc=Installasjonsprogrammet forbereder installasjon av [name] p� den maskin.
PreviousInstallNotCompleted=Installasjonen/fjerningen av et tidligere program ble ikke ferdig. Du m� starte maskinen p� nytt.%n%nEtter omstarten m� du kj�re installasjonsprogrammet p� nytt for � fullf�re installasjonen av [name].
CannotContinue=Installasjonsprogrammet kan ikke fortsette. Klikk p� Avbryt for � avslutte.
ApplicationsFound=Disse applikasjonene bruker filer som vil oppdateres av installasjonen. Det anbefales � la installasjonen automatisk avslutte disse applikasjonene.
ApplicationsFound2=Disse applikasjonene bruker filer som vil oppdateres av installasjonen. Det anbefales � la installasjonen automatisk avslutte disse applikasjonene. Installasjonen vil pr�ve � starte applikasjonene p� nytt etter at installasjonen er avsluttet.
CloseApplications=Lukk applikasjonene &automatisk
DontCloseApplications=&Ikke lukk applikasjonene
ErrorCloseApplications=Installasjonsprogrammet kunne ikke lukke alle applikasjonene &automatisk. Det anbefales � lukke alle applikasjoner som bruker filer som installasjonsprogrammet trenger � oppdatere f�r du fortsetter installasjonen.

; *** "Installing" wizard page
WizardInstalling=Installerer
InstallingLabel=Vennligst vent mens [name] installeres p� din maskin.

; *** "Setup Completed" wizard page
FinishedHeadingLabel=Fullf�rer installasjonsprogrammet for [name]
FinishedLabelNoIcons=[name] er installert p� din maskin.
FinishedLabel=[name] er installert p� din maskin. Programmet kan kj�res ved at du klikker p� ett av de installerte ikonene.
ClickFinish=Klikk Ferdig for � avslutte installasjonen.
FinishedRestartLabel=Maskinen m� startes p� nytt for at installasjonen skal fullf�res. Vil du starte p� nytt n�?
FinishedRestartMessage=Maskinen m� startes p� nytt for at installasjonen skal fullf�res.%n%nVil du starte p� nytt n�?
ShowReadmeCheck=Ja, jeg vil se p� LESMEG-filen
YesRadio=&Ja, start maskinen p� nytt n�
NoRadio=&Nei, jeg vil starte maskinen p� nytt senere
; used for example as 'Run MyProg.exe'
RunEntryExec=Kj�r %1
; used for example as 'View Readme.txt'
RunEntryShellExec=Se p� %1

; *** "Setup Needs the Next Disk" stuff
ChangeDiskTitle=Trenger neste diskett
SelectDiskLabel2=Vennligst sett inn diskett %1 og klikk OK.%n%nHvis filene p� finnes et annet sted enn det som er angitt nedenfor, kan du skrive inn korrekt bane eller klikke p� Bla Gjennom.
PathLabel=&Bane:
FileNotInDir2=Finner ikke filen "%1" i "%2". Vennligst sett inn riktig diskett eller velg en annen mappe.
SelectDirectoryLabel=Vennligst angi hvor den neste disketten er.

; *** Installation phase messages
SetupAborted=Installasjonen ble avbrutt.%n%nVennligst korriger problemet og pr�v igjen.
EntryAbortRetryIgnore=Klikk Pr�v igjen for � fors�ke p� nytt, Ignorer for � fortsette eller Avslutt for � avslutte installasjonen.

; *** Installation status messages
StatusClosingApplications=Lukker applikasjoner...
StatusCreateDirs=Lager mapper...
StatusExtractFiles=Pakker ut filer...
StatusCreateIcons=Lager programikoner...
StatusCreateIniEntries=Lager INI-instillinger...
StatusCreateRegistryEntries=Lager innstillinger i registeret...
StatusRegisterFiles=Registrerer filer...
StatusSavingUninstall=Lagrer info for avinstallering...
StatusRunProgram=Gj�r ferdig installasjonen...
StatusRestartingApplications=Restarter applikasjoner...
StatusRollback=Tilbakestiller forandringer...

; *** Misc. errors
ErrorInternal2=Intern feil %1
ErrorFunctionFailedNoCode=%1 gikk galt
ErrorFunctionFailed=%1 gikk galt; kode %2
ErrorFunctionFailedWithMessage=%1 gikk galt; kode %2.%n%3
ErrorExecutingProgram=Kan ikke kj�re filen:%n%1

; *** Registry errors
ErrorRegOpenKey=Feil under �pning av registern�kkel:%n%1\%2
ErrorRegCreateKey=Feil under laging av registern�kkel:%n%1\%2
ErrorRegWriteKey=Feil under skriving til registern�kkel:%n%1\%2

; *** INI errors
ErrorIniEntry=Feil under laging av innstilling i filen "%1".

; *** File copying errors
FileAbortRetryIgnore=Klikk Pr�v igjen for � fors�ke p� nytt, Ignorer for � overse denne filen (anbefales ikke) eller Avslutt for � stoppe installasjonen.
FileAbortRetryIgnore2=Klikk Pr�v igjen for � fors�ke p� nytt, Ignorer for � fortsette uansett (anbefales ikke) eller Avslutt for � stoppe installasjonen.
SourceIsCorrupted=Kildefilen er �delagt
SourceDoesntExist=Kildefilen "%1" finnes ikke
ExistingFileReadOnly=Den eksisterende filen er skrivebeskyttet.%n%nKlikk Pr�v igjen for � fjerne skrivebeskyttelsen og pr�ve p� nytt, Ignorer for � hoppe over denne filen, eller Avslutt for � stoppe installasjonen.
ErrorReadingExistingDest=En feil oppsto under lesing av den eksisterende filen:
FileExists=Filen eksisterer allerede.%n%nVil du overskrive den?
ExistingFileNewer=Den eksisterende filen er nyere enn den som blir fors�kt installert. Det anbefales at du beholder den eksisterende filen.%n%nVil du beholde den eksisterende filen?
ErrorChangingAttr=En feil oppsto da attributtene ble fors�kt forandret p� den eksisterende filen:
ErrorCreatingTemp=En feil oppsto under fors�ket p� � lage en fil i m�l-mappen:
ErrorReadingSource=En feil oppsto under fors�ket p� � lese kildefilen:
ErrorCopying=En feil oppsto under fors�k p� � kopiere en fil:
ErrorReplacingExistingFile=En feil oppsto under fors�ket p� � erstatte den eksisterende filen:
ErrorRestartReplace=RestartReplace gikk galt:
ErrorRenamingTemp=En feil oppsto under omd�ping av fil i m�l-mappen:
ErrorRegisterServer=Kan ikke registrere DLL/OCX: %1
ErrorRegSvr32Failed=RegSvr32 gikk galt med avslutte kode %1
ErrorRegisterTypeLib=Kan ikke registrere typebiblioteket: %1

; *** Post-installation errors
ErrorOpeningReadme=En feil oppsto under fors�ket p� � �pne LESMEG-filen.
ErrorRestartingComputer=Installasjonsprogrammet kunne ikke starte maskinen p� nytt. Vennligst gj�r dette manuelt.

; *** Uninstaller messages
UninstallNotFound=Filen "%1" finnes ikke. Kan ikke avinstallere.
UninstallOpenError=Filen "%1" kunne ikke �pnes. Kan ikke avinstallere.
UninstallUnsupportedVer=Kan ikke avinstallere. Avinstallasjons-loggfilen "%1" har et format som ikke gjenkjennes av denne versjonen av avinstallasjons-programmet
UninstallUnknownEntry=Et ukjent parameter (%1) ble funnet i Avinstallasjons-loggfilen
ConfirmUninstall=Er du sikker p� at du helt vil fjerne %1 og alle tilh�rende komponenter?
UninstallOnlyOnWin64=Denne installasjonen kan bare uf�res p� 64-bit Windows.
OnlyAdminCanUninstall=Denne installasjonen kan bare avinstalleres av en bruker med Administrator-rettigheter.
UninstallStatusLabel=Vennligst vent mens %1 fjernes fra maskinen.
UninstalledAll=Avinstallasjonen av %1 var vellykket
UninstalledMost=Avinstallasjonen av %1 er ferdig.%n%nEnkelte elementer kunne ikke fjernes. Disse kan fjernes manuelt.
UninstalledAndNeedsRestart=Du m� starte maskinen p� nytt for � fullf�re installasjonen av %1.%n%nVil du starte p� nytt n�?
UninstallDataCorrupted="%1"-filen er �delagt. Kan ikke avinstallere.

; *** Uninstallation phase messages
ConfirmDeleteSharedFileTitle=Fjerne delte filer?
ConfirmDeleteSharedFile2=Systemet indikerer at den f�lgende filen ikke lengre brukes av andre programmer. Vil du at avinstalleringsprogrammet skal fjerne den delte filen?%n%nHvis andre programmer bruker denne filen, kan du risikere at de ikke lengre vil virke som de skal. Velg Nei hvis du er usikker. Det vil ikke gj�re noen skade hvis denne filen ligger p� din maskin.
SharedFileNameLabel=Filnavn:
SharedFileLocationLabel=Plassering:
WizardUninstalling=Avinstallerings-status:
StatusUninstalling=Avinstallerer %1...

; *** Shutdown block reasons
ShutdownBlockReasonInstallingApp=Installerer %1.
ShutdownBlockReasonUninstallingApp=Avinstallerer %1.

; The custom messages below aren't used by Setup itself, but if you make
; use of them in your scripts, you'll want to translate them.

[CustomMessages]

NameAndVersion=%1 versjon %2
AdditionalIcons=Ekstra-ikoner:
CreateDesktopIcon=Lag ikon p� &skrivebordet
CreateQuickLaunchIcon=Lag et &Hurtigstarts-ikon
ProgramOnTheWeb=%1 p� nettet
UninstallProgram=Avinstaller %1
LaunchProgram=Kj�r %1
AssocFileExtension=&Koble %1 med filetternavnet %2
AssocingFileExtension=Kobler %1 med filetternavnet %2...
AutoStartProgramGroupDescription=Oppstart:
AutoStartProgram=Start %1 automatisk
AddonHostProgramNotFound=%1 ble ikke funnet i katalogen du valgte.%n%nVil du fortsette likevel?