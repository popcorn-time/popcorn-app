; ***************************************************************
; ***                                                         ***
; *** Inno Setup version 5.5.3+ Portuguese (Brazil) messages ***
; ***                                                         ***
; *** Original Author:                                        ***
; ***                                                         ***
; ***   Paulo Andre Rosa (parosa@gmail.com)                   ***
; ***                                                         ***
; *** Maintainer:                                             ***
; ***                                                         ***
; ***   Eduardo Mauro (emauro@acabit.com.br)                  ***
; ***                                                         ***
; *** Contributors:                                           ***
; ***                                                         ***
; ***   Felipe (felipefpl@ig.com.br)                          ***
; ***   Jeferson Oliveira (jefersonfoliveira@gmail.com)       ***
; ***                                                         ***
; ***************************************************************

; To download user-contributed translations of this file, go to:
;   http://www.jrsoftware.org/is3rdparty.php
;
; Note: When translating this text, do not add periods (.) to the end of
; messages that didn't have them already, because on those messages Inno
; Setup adds the periods automatically (appending a period would result in
; two periods being displayed).

[LangOptions]
; The following three entries are very important. Be sure to read and 
; understand the '[LangOptions] section' topic in the help file.
LanguageName=Portugu<00EA>s (Brasil)
LanguageID=$0416
LanguageCodePage=1252

; If the language you are translating to requires special font faces or
; sizes, uncomment any of the following entries and change them accordingly.
;DialogFontName=
;DialogFontSize=8
;WelcomeFontName=Verdana
;WelcomeFontSize=12
;TitleFontName=Arial
;TitleFontSize=29
;CopyrightFontName=Arial
;CopyrightFontSize=8

[Messages]

; *** Application titles
SetupAppTitle=Programa de Instala��o
SetupWindowTitle=%1 - Programa de Instala��o
UninstallAppTitle=Desinstalar
UninstallAppFullTitle=Desinstalar %1

; *** Misc. common
InformationTitle=Informa��o
ConfirmTitle=Confirma��o
ErrorTitle=Erro

; *** SetupLdr messages
SetupLdrStartupMessage=Este programa instalar� %1. Voc� quer continuar?
LdrCannotCreateTemp=N�o foi poss�vel criar um arquivo tempor�rio. Instala��o cancelada
LdrCannotExecTemp=N�o foi poss�vel executar um arquivo na pasta de arquivos tempor�rios. Instala��o cancelada

; *** Startup error messages
LastErrorMessage=%1.%n%nErro %2: %3
SetupFileMissing=O arquivo %1 n�o se encontra no diret�rio de instala��o. Por favor, corrija o problema ou obtenha uma nova c�pia do programa.
SetupFileCorrupt=Os arquivos de instala��o est�o corrompidos. Por favor, obtenha uma nova c�pia do programa.
SetupFileCorruptOrWrongVer=Os arquivos de instala��o est�o corrompidos ou s�o incompat�veis com esta vers�o do Instalador. Por favor, corrija o problema ou obtenha uma nova c�pia do programa.
InvalidParameter=Um par�metro inv�lido foi passado na linha de comando:%n%n%1
SetupAlreadyRunning=O programa de instala��o j� est� sendo executado.
WindowsVersionNotSupported=Este programa n�o suporta a vers�o do Windows instalada em seu computador.
WindowsServicePackRequired=Este programa necessita %1 Service Pack %2 ou posterior.
NotOnThisPlatform=Este programa n�o executar� no %1.
OnlyOnThisPlatform=Este programa deve ser executado no %1.
OnlyOnTheseArchitectures=Este programa s� pode ser instalado em vers�es do Windows projetadas para as seguintes arquiteturas de processador:%n%n%1
MissingWOW64APIs=A vers�o do Windows que voc� est� executando n�o inclui a funcionalidade requerida pelo Programa de Instala��o para realizar uma instala��o de 64 bits. Para corrigir este problema, por favor instale o Service Pack %1.
WinVersionTooLowError=Este programa requer %1 vers�o %2 ou posterior.
WinVersionTooHighError=Este programa n�o pode ser instalado em %1 vers�o %2 ou posterior.
AdminPrivilegesRequired=Voc� deve estar logado como um administrador para instalar este programa.
PowerUserPrivilegesRequired=Voc� deve estar logado como um administrador ou como membro do grupo Usu�rios Avan�ados para instalar este programa.
SetupAppRunningError=O Programa de Instala��o detectou que %1 est� sendo executado.%n%nPor favor, feche todas as inst�ncias do programa agora e clique em OK para continuar, ou em Cancelar para sair.
UninstallAppRunningError=O Desinstalador detectou que %1 est� em execu��o atualmente.%n%nPor favor, feche todas as inst�ncias dele agora, ent�o clique em OK para continuar, ou em Cancelar para sair.

; *** Misc. errors
ErrorCreatingDir=O Programa de Instala��o foi incapaz de criar o diret�rio "%1"
ErrorTooManyFilesInDir=Incapaz de criar um arquivo no diret�rio "%1" porque ele cont�m arquivos demais

; *** Setup common messages
ExitSetupTitle=Sair do Programa de Instala��o
ExitSetupMessage=A Instala��o n�o foi conclu�da. Se voc� sair agora, o programa n�o ser� instalado.%n%nVoc� pode executar o Programa de instala��o novamente em outra hora, para concluir a instala��o.%n%nSair do Programa de Instala��o?
AboutSetupMenuItem=&Sobre o Programa de Instala��o...
AboutSetupTitle=Sobre o Programa de Instala��o
AboutSetupMessage=%1 vers�o %2%n%3%n%n%1 p�gina na internet:%n%4
AboutSetupNote=
TranslatorNote=

; *** Buttons
ButtonBack=< &Voltar
ButtonNext=&Avan�ar >
ButtonInstall=&Instalar
ButtonOK=OK
ButtonCancel=Cancelar
ButtonYes=&Sim
ButtonYesToAll=Sim para &Todos
ButtonNo=&N�o
ButtonNoToAll=N�&o para Todos
ButtonFinish=&Concluir
ButtonBrowse=&Procurar...
ButtonWizardBrowse=P&rocurar...
ButtonNewFolder=&Criar Nova Pasta

; *** "Select Language" dialog messages
SelectLanguageTitle=Selecionar Idioma do Programa de Instala��o
SelectLanguageLabel=Selecione o idioma a ser utilizado durante a instala��o:

; *** Common wizard text
ClickNext=Clique em Avan�ar para continuar, ou em Cancelar para sair do Programa de Instala��o.
BeveledLabel=
BrowseDialogTitle=Procurar Pasta
BrowseDialogLabel=Selecione uma pasta na lista abaixo e clique em OK.
NewFolderName=Nova Pasta

; *** "Welcome" wizard page
WelcomeLabel1=Bem-vindo ao Assistente de Instala��o de [name]
WelcomeLabel2=Este Assistente instalar� [name/ver] no seu computador.%n%n� recomendado que voc� feche todos os outros aplicativos antes de continuar.

; *** "Password" wizard page
WizardPassword=Senha
PasswordLabel1=Esta instala��o � protegida por senha.
PasswordLabel3=Por favor, forne�a a senha e clique em Avan�ar para continuar. As senhas diferenciam mai�sculas de min�sculas.
PasswordEditLabel=&Senha:
IncorrectPassword=A senha que voc� informou n�o � correta. Por favor, tente novamente.

; *** "License Agreement" wizard page
WizardLicense=Contrato de Licen�a de Uso
LicenseLabel=Por favor, leia as seguintes informa��es importantes antes de continuar.
LicenseLabel3=Por favor, leia o seguinte Contrato de Licen�a de Uso. Voc� deve aceitar os termos do Contrato antes de prosseguir com a instala��o.
LicenseAccepted=Eu aceito os termos do &Contrato
LicenseNotAccepted=Eu &n�o aceito os termos do Contrato

; *** "Information" wizard pages
WizardInfoBefore=Informa��o
InfoBeforeLabel=Por favor, leia as seguintes informa��es importantes antes de continuar.
InfoBeforeClickLabel=Quando voc� estiver pronto para continuar, clique em Avan�ar.
WizardInfoAfter=Informa��o
InfoAfterLabel=Por favor, leia as seguintes informa��es importantes antes de continuar.
InfoAfterClickLabel=Quando voc� estiver pronto para continuar, clique Avan�ar.

; *** "User Information" wizard page
WizardUserInfo=Informa��es do Usu�rio
UserInfoDesc=Por favor, insira suas informa��es.
UserInfoName=&Nome do Usu�rio:
UserInfoOrg=&Empresa:
UserInfoSerial=N�mero de &S�rie:
UserInfoNameRequired=Voc� deve informar um nome.

; *** "Select Destination Location" wizard page
WizardSelectDir=Selecione o Local de Destino
SelectDirDesc=Onde [name] deve ser instalado?
SelectDirLabel3=O Programa de Instala��o instalar� [name] na seguinte pasta.
SelectDirBrowseLabel=Para continuar, clique em Avan�ar. Se voc� deseja escolher uma pasta diferente, clique em Procurar.
DiskSpaceMBLabel=S�o necess�rios pelo menos [mb] MB de espa�o livre em disco.
CannotInstallToNetworkDrive=O programa de instala��o n�o pode fazer a instala��o em uma unidade de rede.
CannotInstallToUNCPath=O programa de instala��o n�o fazer a instala��o num caminhho de rede UNC.
InvalidPath=Voc� deve informar um caminho completo, incluindo a letra da unidade de disco; por exemplo:%n%nC:\APP%n%e n�o um caminho de rede UNC na forma:%n%n\\servidor\compartilhamento
InvalidDrive=A unidade de disco ou compartilhamento de rede UNC que voc� selecionou n�o existe ou n�o est� acess�vel. Por favor, selecione outro local.
DiskSpaceWarningTitle=Espa�o em Disco Insuficiente
DiskSpaceWarning=O Programa de Instala��o requer pelo menos %1 KB de espa�o livre, mas a unidade de disco selecionada tem apenas %2 KB dispon�veis.%n%nVoc� quer continuar assim mesmo?
DirNameTooLong=O nome da pasta ou caminho � muito longo.
InvalidDirName=O nome da pasta n�o � v�lido.
BadDirName32=Nomes de pastas n�o podem incluir quaisquer dos seguintes caracteres:%n%n%1
DirExistsTitle=A Pasta Existe
DirExists=A pasta:%n%n%1%n%nj� existe. Voc� quer instalar nesta pasta assim mesmo?
DirDoesntExistTitle=A Pasta N�o Existe
DirDoesntExist=A pasta:%n%n%1%n%nn�o existe. Voc� gostaria que a pasta fosse criada?

; *** "Select Components" wizard page
WizardSelectComponents=Selecionar Componentes
SelectComponentsDesc=Quais componentes devem ser instalados?
SelectComponentsLabel2=Selecione os componentes que voc� quer instalar; desmarque os componentes que voc� n�o quer instalar. Clique em Avan�ar quando estiver pronto para continuar.
FullInstallation=Instala��o completa
; if possible don't translate 'Compact' as 'Minimal' (I mean 'Minimal' in your language)
CompactInstallation=Instala��o compacta
CustomInstallation=Instala��o personalizada
NoUninstallWarningTitle=Componente Existe
NoUninstallWarning=O Programa de Instala��o detectou que os seguintes componentes j� est�o instalados em seu computador:%n%n%1%n%nDesmarcar estes componentes, n�o ir� desinstalar eles.%n%nVoc� quer continuar assim mesmo?
ComponentSize1=%1 KB
ComponentSize2=%1 MB
ComponentsDiskSpaceMBLabel=A sele��o atual requer pelo menos [mb] MB de espa�o em disco.

; *** "Select Additional Tasks" wizard page
WizardSelectTasks=Selecionar Tarefas Adicionais
SelectTasksDesc=Quais tarefas adicionais devem ser executadas?
SelectTasksLabel2=Selecione as tarefas adicionais que voc� deseja que o Programa de Instala��o execute enquanto instala [name] e clique em Avan�ar.

; *** "Select Start Menu Folder" wizard page
WizardSelectProgramGroup=Selecionar a Pasta do Menu Iniciar
SelectStartMenuFolderDesc=Onde o Programa de Instala��o deve colocar os atalhos do programa?
SelectStartMenuFolderLabel3=O Programa de Instala��o ir� criar os atalhos do programa na seguinte pasta do Menu Iniciar.
SelectStartMenuFolderBrowseLabel=Clique em Avan�ar para continuar. Se voc� quiser escolher outra pasta, clique em Procurar.
MustEnterGroupName=Voc� deve informar um nome de pasta.
GroupNameTooLong=O nome da pasta ou caminho � muito longo.
InvalidGroupName=O nome da pasta n�o � v�lido.
BadGroupName=O nome da pasta n�o pode incluir quaisquer dos seguintes caracteres:%n%n%1
NoProgramGroupCheck2=&N�o criar uma pasta no Menu Iniciar

; *** "Ready to Install" wizard page
WizardReady=Pronto para Instalar
ReadyLabel1=O Programa de Instala��o est� pronto para come�ar a instala��o de [name] no seu computador.
ReadyLabel2a=Clique Instalar para iniciar a instala��o, ou clique em Voltar se voc� quer revisar ou alterar alguma configura��o.
ReadyLabel2b=Clique em Instalar para iniciar a instala��o.
ReadyMemoUserInfo=Dados do Usu�rio:
ReadyMemoDir=Local de destino:
ReadyMemoType=Tipo de Instala��o:
ReadyMemoComponents=Componentes selecionados:
ReadyMemoGroup=Pasta do Menu Iniciar:
ReadyMemoTasks=Tarefas adicionais:

; *** "Preparing to Install" wizard page
WizardPreparing=Preparando para Instalar
PreparingDesc=O Programa de Instala��o est� se preparando para instalar [name] no seu computador.
PreviousInstallNotCompleted=A instala��o/remo��o de um programa anterior n�o foi conclu�da. Voc� precisar� reiniciar seu computador para finaliz�-la.%n%nAp�s reiniciar o computador, execute novamente o Programa de Instala��o para concluir a instala��o de [name].
CannotContinue=O Programa de Instala��o n�o pode continuar. Por favor, clique em Cancelar para sair.
ApplicationsFound=As seguintes aplica��es estao usando arquivos que necessitam ser atualizados pelo programa de instala��o. � recomend�vel que voc� permita que o programa da instala��o encerre automaticamente estas aplica��es.
ApplicationsFound2=As seguintes aplica��es est�o usandos arquivos que necessitam ser atualizados pelo programa de instala��o. � recomend�vel que voc� permita que o programa da instala��o encerre automaticamente estas aplica��es. Ap�s a instala��o estar completa, o programa de instala��o tentar� iniciar novamente as aplica��es.
CloseApplications=&Automaticamente encerre as aplica��es
DontCloseApplications=&N�o encerre as aplica��es
ErrorCloseApplications=O instalador foi incapaz de fechar automaticamente todos os aplicativos. � recomendado que voc� feche todos os aplicativos usando os arquivos que precisam ser atualizados pelo Instalador antes de continuar.

; *** "Installing" wizard page
WizardInstalling=Instalando
InstallingLabel=Por favor, aguarde enquanto o Programa de Instala��o instala [name] no seu computador.

; *** "Setup Completed" wizard page
FinishedHeadingLabel=Finalizando o Assistente de Instala��o de [name]
FinishedLabelNoIcons=O Programa de Instala��o finalizou a instala��o de [name] no seu computador.
FinishedLabel=O Programa de Instala��o terminou de instalar [name] no seu computador. O programa pode ser iniciado clicando nos �cones instalados.
ClickFinish=Clique em Concluir para sair do Programa de Instala��o.
FinishedRestartLabel=Para concluir a instala��o de [name], o Programa de Instala��o deve reiniciar o computador. Voc� gostaria de reiniciar agora?
FinishedRestartMessage=Para concluir a instala��o de [name], o Programa de Instala��o deve reiniciar o computador.%n%nVoc� gostaria de reiniciar agora?
ShowReadmeCheck=Sim, eu quero visualizar o arquivo LEIA-ME
YesRadio=&Sim, reiniciar o computador agora
NoRadio=&N�o, eu vou reiniciar o computador depois
; used for example as 'Run MyProg.exe'
RunEntryExec=Executar %1
; used for example as 'View Readme.txt'
RunEntryShellExec=Visualizar %1

; *** "Setup Needs the Next Disk" stuff
ChangeDiskTitle=O Programa de Instala��o Precisa do Pr�ximo Disco
SelectDiskLabel2=Por favor, insira o Disco %1 e clique em OK.%n%nSe os arquivos deste disco est�o numa pasta diferente da indicada abaixo, informe o caminho correto ou clique em Procurar.
PathLabel=&Caminho:
FileNotInDir2=O arquivo "%1" n�o p�de ser encontrado em "%2". Por favor, insira o disco correto ou escolha outra pasta.
SelectDirectoryLabel=Por favor, informe o local do pr�ximo disco.

; *** Installation phase messages
SetupAborted=A instala��o n�o foi conclu�da.%n%nPor favor, corrija o problema e execute novamente o Programa de Instala��o.
EntryAbortRetryIgnore=Clique Repetir para tentar novamente, Ignorar para continuar assim mesmo, or Cancelar para cancelar a instala��o.

; *** Installation status messages
StatusClosingApplications=Encerrando aplica��es...
StatusCreateDirs=Criando diret�rios...
StatusExtractFiles=Extraindo arquivos...
StatusCreateIcons=Criando atalhos...
StatusCreateIniEntries=Criando entradas INI...
StatusCreateRegistryEntries=Criando entradas no Registro...
StatusRegisterFiles=Registrando arquivos...
StatusSavingUninstall=Salvando informa��es de desinstala��o...
StatusRunProgram=Finalizando a instala��o...
StatusRestartingApplications=Reiniciando applica��es...
StatusRollback=Desfazendo as altera��es efetuadas...

; *** Misc. errors
ErrorInternal2=Erro interno: %1
ErrorFunctionFailedNoCode=%1 falhou
ErrorFunctionFailed=%1 falhou; c�digo %2
ErrorFunctionFailedWithMessage=%1 falhou; c�digo %2.%n%3
ErrorExecutingProgram=N�o foi poss�vel executar o arquivo:%n%1

; *** Registry errors
ErrorRegOpenKey=Erro ao abrir a chave do registro:%n%1\%2
ErrorRegCreateKey=Erro ao criar a chave do registro:%n%1\%2
ErrorRegWriteKey=Erro ao escrever na chave do registro:%n%1\%2

; *** INI errors
ErrorIniEntry=Erro ao criar entrada INI no arquivo "%1".

; *** File copying errors
FileAbortRetryIgnore=Clique em Repetir para tentar novamente, em Ignorar para ignorar este arquivo (n�o recomendado) ou em Cancelar para cancelar a instala��o.
FileAbortRetryIgnore2=Clique em Repetir para tentar novamente, em Ignorar para ignorar este arquivo (n�o recomendado) ou em Cancelar para cancelar a instala��o.
SourceIsCorrupted=O arquivo de origem est� corrompido
SourceDoesntExist=O arquivo de origem "%1" n�o existe
ExistingFileReadOnly=O arquivo existente est� marcado como somente leitura.%n%nClique em Repetir para remover o atributo de somente leitura e tentar novamente, em Ignorar para ignorar este arquivo, ou em Anular para cancelar a instala��o.
ErrorReadingExistingDest=Ocorreu um erro ao tentar ler o arquivo existente:
FileExists=O arquivo j� existe.%n%nVoc� quer que o Programa de Instala��o sobrescreva o arquivo?
ExistingFileNewer=O arquivo j� existente � mais recente do que o arquivo que o Programa de Instala��o est� tentando instalar. Recomenda-se que voc� mantenha o arquivo existente.%n%nVoc� quer manter o arquivo existente?
ErrorChangingAttr=Ocorreu um erro ao tentar modificar os atributos do arquivo existente:
ErrorCreatingTemp=Ocorreu um erro ao tentar criar um arquivo nao diret�rio de destino:
ErrorReadingSource=Ocorreu um erro ao tentar ler o arquivo de origem:
ErrorCopying=Ocorreu um erro ao tentar copiar um arquivo:
ErrorReplacingExistingFile=Ocorreu um erro ao tentar substituir o arquivo existente:
ErrorRestartReplace=Reiniciar/Substituir falhou:
ErrorRenamingTemp=Ocorreu um erro ao tentar renomear um arquivo no diret�rio de destino:
ErrorRegisterServer=N�o foi poss�vel registrar a DLL/OCX: %1
ErrorRegSvr32Failed=RegSvr32 falhou com o c�digo de sa�da %1
ErrorRegisterTypeLib=N�o foi poss�vel registrar a biblioteca de tipos: %1

; *** Post-installation errors
ErrorOpeningReadme=Ocorreu um erro ao tentar abrir o arquivo LEIA-ME.
ErrorRestartingComputer=O Programa de Instala��o n�o conseguiu reiniciar o computador. Por favor, reinicie o computador manualmente.

; *** Uninstaller messages
UninstallNotFound=O arquivo "%1" n�o existe. N�o � poss�vel desinstalar.
UninstallOpenError=O arquivo "%1" n�o pode ser aberto. N�o � poss�vel desinstalar
UninstallUnsupportedVer=O arquivo de log de desinstala��o "%1" est� num formato n�o reconhecido por esta vers�o do desinstalador. N�o � poss�vel desinstalar
UninstallUnknownEntry=Foi encontrada uma entrada desconhecida (%1) no arquivo de log de desinstala��o
ConfirmUninstall=Voc� tem certeza que deseja remover completamente %1 e todos os seus componentes?
UninstallOnlyOnWin64=Esta instala��o n�o pode ser desinstalada em Windows 64 bits.
OnlyAdminCanUninstall=Esta instala��o s� pode ser desinstalada por usu�rios com direitos administrativos.
UninstallStatusLabel=Por favor, aguarde enquanto %1 � removido do seu computador.
UninstalledAll=%1 foi removido com sucesso do seu computador.
UninstalledMost=A desinstala��o de %1 foi conclu�da.%n%nAlguns elementos n�o puderam ser removidos. Estes podem ser removidos manualmente.
UninstalledAndNeedsRestart=Para concluir a desinstala��o de %1, o computador deve ser reiniciado.%n%nVoc� quer que o computador seja reiniciado agora?
UninstallDataCorrupted=O arquivo "%1" est� corrompido. N�o � poss�vel desinstalar

; *** Uninstallation phase messages
ConfirmDeleteSharedFileTitle=Remover Arquivo Compartilhado?
ConfirmDeleteSharedFile2=O sistema indica que o seguinte arquivo compartilhado n�o est� mais em uso por nenhum outro programa. Voc� quer que a desinstala��o remova este arquivo compartilhado?%n%nSe ainda houver programas utilizando este arquivo e ele for removido, esses programas poder�o n�o funcionar corretamente. Se voc� n�o tem certeza, escolha N�o. Manter o arquivo no seu computador n�o trar� preju�zo algum.
SharedFileNameLabel=Nome do arquivo:
SharedFileLocationLabel=Local:
WizardUninstalling=Status da Desinstala��o
StatusUninstalling=Desinstalando %1...

; *** Shutdown block reasons
ShutdownBlockReasonInstallingApp=Instalando %1.
ShutdownBlockReasonUninstallingApp=Removendo %1.

; The custom messages below aren't used by Setup itself, but if you make
; use of them in your scripts, you'll want to translate them.

[CustomMessages]

NameAndVersion=%1 vers�o %2
AdditionalIcons=�cones adicionais:
CreateDesktopIcon=Criar um �cone na �rea de &Trabalho
CreateQuickLaunchIcon=Criar um �cone na &Barra de Inicializa��o R�pida
ProgramOnTheWeb=%1 na Internet
UninstallProgram=Desinstalar %1
LaunchProgram=Executar %1
AssocFileExtension=Associar %1 com a e&xtens�o de arquivo %2
AssocingFileExtension=Associando %1 com a extens�o de arquivo...
AutoStartProgramGroupDescription=Startup:
AutoStartProgram=Iniciar automaticamente %1
AddonHostProgramNotFound=%1 n�o p�de ser localizado na pasta que voc� selecionou.%n%nVoc� deseja continuar assim mesmo?
