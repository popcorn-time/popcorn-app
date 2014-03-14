; *** Inno Setup version 5.5.3+ Hebrew messages (stilgar(at)divrei-tora.com) ***
;
;
;	Translated by s_h (s_h(at)enativ.com) (c) 2005
;

[LangOptions]
LanguageName=<05E2><05D1><05E8><05D9><05EA>
LanguageID=$040D
LanguageCodePage=1255
; If the language you are translating to requires special font faces or
; sizes, uncomment any of the following entries and change them accordingly.
;DialogFontName=
;DialogFontSize=8
WelcomeFontName=Tahoma
WelcomeFontSize=11
;TitleFontName=Arial
;TitleFontSize=29
;CopyrightFontName=Arial
;CopyrightFontSize=8
RightToLeft=yes

[Messages]

; *** Application titles
SetupAppTitle=�����
SetupWindowTitle=����� - %1
UninstallAppTitle=����
UninstallAppFullTitle=���� %1

; *** Misc. common
InformationTitle=����
ConfirmTitle=�����
ErrorTitle=�����

; *** SetupLdr messages
SetupLdrStartupMessage=����� �� ����� �� %1 �� �����. ��� ������ ������?
LdrCannotCreateTemp=����� ��� ����� ���� ����. ������ �����
LdrCannotExecTemp=�� ���� ����� ���� ������ ������. �� ���� ������ ������

; *** Startup error messages
LastErrorMessage=%1.%n%n����� %2: %3
SetupFileMissing=�� ���� ���� �� ����� %1 ������� ������. ��� ��� �� ����� �� ��� ��� �� ���� ��� �� ������.
SetupFileCorrupt=���� ������ ������. ��� ��� ������ �� ���� ��� �� ������.
SetupFileCorruptOrWrongVer=���� ������ ������, �� ����� ������ ������ �� �� ����� ������. ��� ��� �� ����� �� ���� �� ������ ������ ����.
InvalidParameter=����� ���� �� ���� ����� ������:%n%n%1
SetupAlreadyRunning=����� ���� ��� �����.
WindowsVersionNotSupported=����� �� ���� ����� ������ ������ ���.
WindowsServicePackRequired=������ ����� ����� ����� %1 ����� ������� %2 �� ����.
NotOnThisPlatform=����� �� �� ���� �� %1.
OnlyOnThisPlatform=����� �� ����� ����� �� %1.
OnlyOnTheseArchitectures=���� ������ ����� �� �� �� ������� �� '������' �������� ������������ ���� ���:%n%n%1
MissingWOW64APIs=������ �� '������' ���� ��� ���� �� ����� �� ������������� ������ ������ 64-���. ��� ���� ����� ��, ��� ���� ���� ����� %1.
WinVersionTooLowError=����� �� ������ %1 ����� ����� %2.
WinVersionTooHighError=�� ���� ������ ����� �� �� %1 ������ %2 �� ������ ����
AdminPrivilegesRequired=��� ���� ������ ����� ����� ��� ������ ����� ��.
PowerUserPrivilegesRequired=���� ������ ����� �����, �� ���� �� ����� '������ ��' ��� ������ ����� ��.
SetupAppRunningError=����� ������ ������ �� %1 ���� ����� ����.%n%n��� ���� �� �� ������� ���, ���� �� '�����' �����, �� '�����' ������.
UninstallAppRunningError=����� ����� ������ �� %1 ���� ����� ����.%n%n��� ���� �� �� ������� ���, ���� �� '�����' �����, �� '�����' ������.

; *** Misc. errors
ErrorCreatingDir=����� ������ �� ������ ����� �� ������ "%1"
ErrorTooManyFilesInDir=�� ���� ����� ���� ������ "%1" ���� ���� ����� ���� ��� �����

; *** Setup common messages
ExitSetupTitle=����� �������
ExitSetupMessage=������ ��� �� �������. �� ��� ���� �����, ������ �� ����� �� �����.%n%n�������� ������ �� ����� ������ ���� ��� ��� ����� �� ����� ������.%n%n��� ��� ���� ������� ����?
AboutSetupMenuItem=&����� ������...
AboutSetupTitle=����� ������
AboutSetupMessage=%1 �����  %2%n%3%n%n%1 �� ����:%n%4
AboutSetupNote=
TranslatorNote=�������

; *** Buttons
ButtonBack=< &�����
ButtonNext=&��� >
ButtonInstall=&����
ButtonOK=�����
ButtonCancel=�����
ButtonYes=&��
ButtonYesToAll=�� �&���
ButtonNo=&��
ButtonNoToAll=�&� ����
ButtonFinish=&����
ButtonBrowse=&����...
ButtonWizardBrowse=����...
ButtonNewFolder=&��� ����� ����

; *** "Select Language" dialog messages
SelectLanguageTitle=��� ��� �����
SelectLanguageLabel=��� �� ��� ������ �� ����� ������:

; *** Common wizard text
ClickNext=��� �� '���' ��� ������ ������ ������, �� '�����' ������.
BeveledLabel=
BrowseDialogTitle=��� �����
BrowseDialogLabel=��� ����� ������� ���� �� '�����'
NewFolderName=����� ����

; *** "Welcome" wizard page
WelcomeLabel1=������ ����� ������ ������ �� [name]
WelcomeLabel2=��� �� ����� ���� ����� ����� ����� [name/ver] �� �����.%n%n����� ������ �� �� �������� ������� ������ ���� ������.

; *** "Password" wizard page
WizardPassword=�����
PasswordLabel1=������ ����� ������.
PasswordLabel3=��� ��� �� ������, ���� �� '���' ��� ������. ������� �������, ���� ���� ��� ������ ����� �������.
PasswordEditLabel=&�����:
IncorrectPassword=������ ������ �����. ��� ��� ���.

; *** "License Agreement" wizard page
WizardLicense=����� �����
LicenseLabel=��� ��� �� ����� ����� ��� ���� ���� ������.
LicenseLabel3=��� ��� �� ����� ������ ���. ���� ���� �� ������ ������ �� ���� ���� ������.
LicenseAccepted=��� &���� �� �����
LicenseNotAccepted=��� &�� ���� �� �����

; *** "Information" wizard pages
WizardInfoBefore=����
InfoBeforeLabel=��� ��� �� ����� ����� ��� ���� ���� ������.
InfoBeforeClickLabel=������ ���� ������ ������, ��� �� '���'.
WizardInfoAfter=����
InfoAfterLabel=��� ��� �� ����� ����� ��� ���� ���� ������
InfoAfterClickLabel=������ ���� ������ ������, ��� �� '���'.

; *** "User Information" wizard page
WizardUserInfo=���� ������
UserInfoDesc=��� ��� �� ������.
UserInfoName=&�� �����:
UserInfoOrg=&������:
UserInfoSerial=&���� ������:
UserInfoNameRequired=���� ����� ��.

; *** "Select Destination Location" wizard page
WizardSelectDir=��� ��� ������
SelectDirDesc=���� ������ �� [name]?
SelectDirLabel3=����� ������ ����� �� [name] ���� ������� ����.
SelectDirBrowseLabel=�����, ��� �� '���'. �� ������ ����� ����� ���� ������, ��� �� '����'.
DiskSpaceMBLabel=������ ������ ����� [mb] MB �� ��� ���� ����.
CannotInstallToNetworkDrive=�� ���� ������ �� ������ �� ���� ���.
CannotInstallToUNCPath=�� ���� ������ �� ������ ����� UNC.
InvalidPath=���� ���� ���� ��� �� ��� �����; ������:%n%nC:\APP%n%n�� ���� UNC ������:%n%n\\server\share
InvalidDrive=����� �� ������� �-UNC ����� �� ������ �� ����� ������. ��� ��� ���� �� ������� �����.
DiskSpaceWarningTitle=��� ���� ���� �����
DiskSpaceWarning=���� ����� %1KB ��� ���� ���� ������, �� ����� ����� �� �� %2KB ������. ��� ������ ������ ����� ���?
DirNameTooLong=�� ������ �� ����� ���� ���
InvalidDirName=�� ������ ����� ����.
BadDirName32=�� ������ ���� ���� ����� ����� ���:%n%n%1
DirExistsTitle=������ �����
DirExists=������:%n%n%1%n%n��� �����. ��� ������ ������ ������ �� ��� ����?
DirDoesntExistTitle=������� ���� �����
DirDoesntExist=������:%n%n%1%n%n���� �����. ��� ������ ������ ������ ����� ����?

; *** "Select Components" wizard page
WizardSelectComponents=��� ������
SelectComponentsDesc=���� ������ ������ ������?
SelectComponentsLabel2=��� �� ������� ������� ������; ��� �� ������ �������� ���� ��� ������ ������. ��� �� '���' ���� ���� ���� ������.
FullInstallation=����� ����
; if possible don't translate 'Compact' as 'Minimal' (I mean 'Minimal' in your language)
CompactInstallation=����� ������
CustomInstallation=����� ������ �����
NoUninstallWarningTitle=������ ������
NoUninstallWarning=����� ������ ����� �������� ����� ��� ������� �� �����:%n%n%1%n���� ������ ������� ��� �� ���� ���� ������.%n%n��� ������ ������ ��� ���?
ComponentSize1=%1 KB
ComponentSize2=%1 MB
ComponentsDiskSpaceMBLabel=������ ������� ������ ������ ����� [mb] MB ������ �� ���� ����.

; *** "Select Additional Tasks" wizard page
WizardSelectTasks=��� ������ ������
SelectTasksDesc=���� ������ ������ �� ����� ������ ����?
SelectTasksLabel2=��� �� ������� ������� ������� ������ ������ ���� ��� ����� [name], ����� ��� ��� �� '���'.

; *** "Select Start Menu Folder" wizard page
WizardSelectProgramGroup=��� ������ ������ '����'
SelectStartMenuFolderDesc=���� ���� �� ������ ���� ������?
SelectStartMenuFolderLabel3=����� ������ ����� ������ ��� ������ ������ ���� ������ �'����'.
SelectStartMenuFolderBrowseLabel=�����, ��� �� '���'. �� ������ ����� ����� ���� ������, ��� �� '����'.
MustEnterGroupName=��� ���� ����� �� �����.
GroupNameTooLong=�� ������ �� ����� ���� ���
InvalidGroupName=�� ������ ���� ��-����.
BadGroupName=�� ������ ���� ���� ����� ����� ���:%n%n%1
NoProgramGroupCheck2=&�� ����� ����� ������ '����'

; *** "Ready to Install" wizard page
WizardReady=���� ������
ReadyLabel1=����� ������ ����� ��� ������ �� [name] �� �����.
ReadyLabel2a=��� �� '����' ������ ������, �� '����' �� ������ ����� ������ �����.
ReadyLabel2b=��� �� '����' ��� ������ ������
ReadyMemoUserInfo=���� ������:
ReadyMemoDir=����� ���:
ReadyMemoType=��� ������:
ReadyMemoComponents=������ ������:
ReadyMemoGroup=����� ������ '����':
ReadyMemoTasks=������ ������ ������:

; *** "Preparing to Install" wizard page
WizardPreparing=������ ������
PreparingDesc=����� ������ ������� ������ [name] �� �����.
PreviousInstallNotCompleted=�����/���� ����� ���� �� ������. ���� ������ �� ����� ���� ��� �������.%n%n���� ����� ����� ����, ���� �� ����� ������ ��� ��� ������ �� [name].
CannotContinue=��� ������� ����� ������ ������ ������ ������. �� ��� '�����' ������.
ApplicationsFound=�������� ����� ����� ����� ������ ������� ������� �� ��� ����� ������. ����� ������ ������ ������ ����� ������� ��� ��������.
ApplicationsFound2=�������� ����� ����� ����� ������ ������� ������� �� ��� ����� ������. ����� ������ ������ ������ ����� ������� ��� ��������. ���� ������� ������, ������ ������ ���� ����� ���� �� ���� �������.
CloseApplications=&���� ������� ��������
DontCloseApplications=&�� ����� ������� ���
ErrorCloseApplications=��� ������ �� ����� ����� �� �������� ��������. ����� ������ ����� �� �� �������� �������� ������ ��������� �� ��� ������ ������ ���� ������.

; *** "Installing" wizard page
WizardInstalling=�����
InstallingLabel=��� ���� ���� ������ ������ ������ �� [name] �� �����.

; *** "Setup Completed" wizard page
FinishedHeadingLabel=����� �� ����� [name]
FinishedLabelNoIcons=����� [name] �� ����� ������� ������.
FinishedLabel=����� [name] �� ����� ������� ������. ������ ������ ��� �� ������ ���� ������� ������.
ClickFinish=��� �� '����' ������.
FinishedRestartLabel=������ ������ �� [name], �� ����� ������ ������ ���� �� �����. ��� ������ ������� ���� �����?
FinishedRestartMessage=������ ������ �� [name], �� ����� ������ ������ ���� �� �����.%n%n��� ������ ������� ���� �����?
ShowReadmeCheck=��, ������ ����� �� ���� �-'��� ����'
YesRadio=&��, ���� ���� �� ����� �����
NoRadio=&��, ������ ���� ����� ����� ����
; used for example as 'Run MyProg.exe'
RunEntryExec=���� �� %1
; used for example as 'View Readme.txt'
RunEntryShellExec=��� %1

; *** "Setup Needs the Next Disk" stuff
ChangeDiskTitle=���� ����� ��� ����� ������
SelectDiskLabel2=��� ���� �� ���� ��' %1 ���� �� '�����'.%n%n�� ������ ��� ����� ������ ������ ���� ��� ������ ���, ��� ��� �� ����� ����� �� ��� �� '����'.
PathLabel=&����:
FileNotInDir2=����� "%1" �� ���� �"%2". ��� ���� �� ����� ����� �� ��� ����� ����.
SelectDirectoryLabel=��� ��� �� ������ �� ����� ���.

; *** Installation phase messages
SetupAborted=����� ������ �� �����.%n%n��� ��� �� ����� ����� �� ����� ������ ���.
EntryAbortRetryIgnore=��� �� '��� ���' ����� ���, '�����' ��� ������ ��� ���� �� '�����' ��� ���� �� ������.

; *** Installation status messages
StatusClosingApplications=���� �������...
StatusCreateDirs=���� ������...
StatusExtractFiles=����� �����...
StatusCreateIcons=���� ������ ���...
StatusCreateIniEntries=���� ������ INI...
StatusCreateRegistryEntries=���� ������ ����� ������...
StatusRegisterFiles=���� �����...
StatusSavingUninstall=���� ���� ������ ����� ������...
StatusRunProgram=����� �����...
StatusRestartingApplications=����� ������� ����...
StatusRollback=���� �������...

; *** Misc. errors
ErrorInternal2=����� ������: %1
ErrorFunctionFailedNoCode=%1 ����
ErrorFunctionFailed=%1 ����; ��� %2
ErrorFunctionFailedWithMessage=%1 ����; ��� %2.%n%3
ErrorExecutingProgram=����� ��� ����� ����� �� �����:%n%1

; *** Registry errors
ErrorRegOpenKey=����� ��� ����� ���� �����:%n%1\%2
ErrorRegCreateKey=����� ��� ����� ���� �����:%n%1\%2
ErrorRegWriteKey=����� ��� ����� ����� �����:%n%1\%2

; *** INI errors
ErrorIniEntry=����� ��� ����� ����� INI ����� "%1".

; *** File copying errors
FileAbortRetryIgnore=��� �� '��� ���' ��� ����� ���, '�����' ��� ���� �� ����� ��� (�� �����), �� '�����' ��� ���� �� ������.
FileAbortRetryIgnore2=��� �� '��� ���' ��� ����� ���, '�����' ��� ������ ��� ���� (�� �����), �� '�����' ��� ���� �� ������.
SourceIsCorrupted=���� ����� ����
SourceDoesntExist=���� ����� "%1" ���� ����
ExistingFileReadOnly=����� ����� ����� ����� ������ ����.%n%n��� �� '��� ���' ��� ������ �� ����� ������ ���� ������ ���, '�����' ��� ���� �� ���� ��, �� '�����' ��� ���� �� ������.
ErrorReadingExistingDest=����� ��� ����� ����� �� ����� �����:
FileExists=����� ��� ����.%n%n��� ������ ������ ������ ����� ����?
ExistingFileNewer=����� ����� ��� ���� ������ ������ ������ ���� ������. ������� ��� ������ �� ����� �����.%n%n��� ������ ����� �� ����� �����?
ErrorChangingAttr=����� ��� ����� ����� �������� �� ����� �����:
ErrorCreatingTemp=����� ��� ����� ����� ���� ������� ����:
ErrorReadingSource=����� ��� ����� ���� �����:
ErrorCopying=����� ��� ����� ����:
ErrorReplacingExistingFile=����� ��� ����� ������ �� ����� �����:
ErrorRestartReplace=��� �-RestartReplace:
ErrorRenamingTemp=����� ��� ����� ����� �� ���� ������� ����:
ErrorRegisterServer=����� ��� ����� DLL/OCX: %1
ErrorRegSvr32Failed=RegSvr32 ��� �� ��� ����� %1
ErrorRegisterTypeLib=�� ���� ����� �� ������ ������: %1

; *** Post-installation errors
ErrorOpeningReadme=����� ������ ����� ���� '��� ����'.
ErrorRestartingComputer=����� ������ �� ������ ������ ���� �� �����. ��� ��� ��� �����.

; *** Uninstaller messages
UninstallNotFound=����� "%1" �� ����. �� ���� ������ ������.
UninstallOpenError=�� ���� ����� �� ����� "%1". �� ���� ������ ������.
UninstallUnsupportedVer=���� ����� ����� "%1" ��� ������ ����� ����� �"� ����� �� �� ����� �����. �� ���� ������ ������ �����
UninstallUnknownEntry=����� �� ����� (%1) ����� ������ �����.
ConfirmUninstall=��� ��� ���� ������� ����� ������� �� %1 ��� �� ������� �������?
UninstallOnlyOnWin64=����� �� ����� ����� ����� �� �� '������' ������ 64-���.
OnlyAdminCanUninstall=�� ����� ��� ������ ����� ���� ����� ����� ��.
UninstallStatusLabel=��� ���� ��� �%1 ����� ������.
UninstalledAll=%1 ����� ������ ������.
UninstalledMost=���� %1 �������.%n%n���� ������ �� ����� �"� ������, �� ���� ������ �����.
UninstalledAndNeedsRestart=��� ������ �� ����� ����� �� %1, ���� ������ ���� �� �����.%n%n��� ������ ������� ���� �����?
UninstallDataCorrupted=����� "%1" ����. �� ���� ������ ������ ������

; *** Uninstallation phase messages
ConfirmDeleteSharedFileTitle=��� ����� �� ���� �����?
ConfirmDeleteSharedFile2=������ ������ �� ����� ������ ��� ���� ������ ��� �� ��� �� �����. ��� ����� �� ����� ������?%n%n�� ���� ������ ������ ������� ����� �� ���� ����, ������ �� ������ ��� ���� ������. �� ���� ����, ��� '��'. ����� ����� �� ����� �� ����.
SharedFileNameLabel=�� �����:
SharedFileLocationLabel=�����:
WizardUninstalling=��� ����� �����
StatusUninstalling=���� �� %1...

; *** Shutdown block reasons
ShutdownBlockReasonInstallingApp=����� %1.
ShutdownBlockReasonUninstallingApp=���� %1.

; The custom messages below aren't used by Setup itself, but if you make
; use of them in your scripts, you'll want to translate them.

[CustomMessages]

NameAndVersion=%1 ����� %2
AdditionalIcons=�������� ������:
CreateDesktopIcon=��� ����� ��� �� &����� ������
CreateQuickLaunchIcon=��� ������ ����� ����� ������
ProgramOnTheWeb=%1 ����
UninstallProgram=��� �� %1
LaunchProgram=���� %1
AssocFileExtension=&��� �� %1 �� ����� ����� %2
AssocingFileExtension=���� �� %1 �� ����� ����� %2
AutoStartProgramGroupDescription=����� ��������:
AutoStartProgram=���� �������� %1
AddonHostProgramNotFound=%1 �� ���� ������ �����.%n%n��� ���� ������ ��� ���?