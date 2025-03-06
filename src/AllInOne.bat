@Echo Off

:choice
cls
echo.
echo For file delete press:    	       1
echo.
echo For file copy press: 	  	       2
echo. 
echo For files rename:		       3
echo.
echo For txt files open press:	       4
echo.
echo For Folders structure and backup:      5
echo.
echo For Suspend/Resume analysis:           6
echo.
echo ****************************************
echo *************** Scripts ****************
echo ****************************************
echo.
echo For SCRIPTS read press:	      	       7
echo.
set /P c= 

if /I "%c%" EQU "1" goto :DELETE
if /I "%c%" EQU "2" goto :COPY
if /I "%c%" EQU "3" goto :RENAME
if /I "%c%" EQU "4" goto :OPEN
if /I "%c%" EQU "5" goto :Structure
if /I "%c%" EQU "6" goto :Schoice
if /I "%c%" EQU "7" goto :scripts
if /I "%c%" EQU "n" goto :new
if /I "%c%" EQU "e" goto :exit
if /I "%c%" EQU "E" goto :exit
goto :choice
:scripts
cls
echo.
echo ****************************************
echo *************** Scripts ****************
echo ****************************************
echo.
echo For load vs deflection press: 	       1
echo.
echo For CPRESS read press:	      	       2
echo.
echo For step name read press:	       3
echo.
echo For explicit energy ratio press:       4
echo.
echo For Piston/Bearing reaction press:     5
echo.
set /P c= 

if /I "%c%" EQU "1" goto :LvsU
if /I "%c%" EQU "2" goto :CPRESS
if /I "%c%" EQU "3" goto :StepName
if /I "%c%" EQU "4" goto :EnergyRatio
if /I "%c%" EQU "5" goto :Reactions
if /I "%c%" EQU "b" goto :choice
if /I "%c%" EQU "n" goto :new
if /I "%c%" EQU "e" goto :exit
if /I "%c%" EQU "E" goto :exit
goto :scripts
:new
goto :choice

:LvsU
cls
echo.
echo For load vs deflection press: 	       1
echo.
echo For LvsU DUCTCRT press	      	       2
echo.
echo For LvsU STATUS press:	       	       3
echo.
echo For LvsU HistoryOutput_Preload press:  4
echo.
set /P c= 

if /I "%c%" EQU "1" goto :LvsU_standard
if /I "%c%" EQU "2" goto :LvsU_DUCTCRT
if /I "%c%" EQU "3" goto :LvsU_STATUS
if /I "%c%" EQU "4" goto :HistoryOutput_Preload
if /I "%c%" EQU "b" goto :scripts
if /I "%c%" EQU "n" goto :new
if /I "%c%" EQU "e" goto :exit
if /I "%c%" EQU "E" goto :exit
goto :LvsU
:new
goto :choice

:LvsU_standard
cls
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\StandardLoadvsDeflection\PlotCurves_Standard_LvsU.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\StandardLoadvsDeflection\Standard_LvsU.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\StandardLoadvsDeflection\Run_Standard_LvsU.bat"
goto :LvsU

:HistoryOutput_Preload
cls
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\HistoryOutput_Preload\LoadDeflection_HOutput.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\HistoryOutput_Preload\PlotCurves.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\HistoryOutput_Preload\PythonButton.bat"
goto :LvsU

:LvsU_DUCTCRT
cls
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\CrackDetection_DUCTCRT_oneCrackSpot\LoadDeflection_DUCTCRT.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\CrackDetection_DUCTCRT_oneCrackSpot\PlotCurves_DUCTCRT.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\CrackDetection_DUCTCRT_oneCrackSpot\Run_DUCTCRT_LvsU.bat"
goto :LvsU

:LvsU_STATUS
cls
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\CrackDetection_STATUS_twoCrackSpots\CrackDetection.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\CrackDetection_STATUS_twoCrackSpots\PlotCurves_CrackDetection.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\LoadDeflection_txt_plus_Plot\CrackDetection_STATUS_twoCrackSpots\PythonButton_CrackDetection.bat"
goto :LvsU

:Structure
cls
echo.
echo Create folders structure:    	   1
echo.
echo Create backup: 	  	           2
echo.

goto :choice_3

:choice_3

set /P c= 

if /I "%c%" EQU "1" goto :CreateStructure
if /I "%c%" EQU "2" goto :Database
if /I "%c%" EQU "b" goto :choice
if /I "%c%" EQU "B" goto :choice
goto :choice_3
pause

:CreateStructure
cls
set a=A_Reference
set b=B_Input
set c=C_Calculations
set d=D_Output
set g=Corespondence
MD %a%
MD %b%
MD %c%
MD %d%
MD %g%
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\RunAll_inp.exe"
MOVE "Corespondence" "B_Input\"
MOVE "RunAll_inp.exe" "C_Calculations\"

goto :exit

:Database
cls
echo.
set /P "s=Name for new container folder: "
echo.
set a=A_Reference
set b=B_Input
set c=C_Calculations
set d=D_Output
set desdir=\\Emea\dfs\GLW\Groups\CAE\E3C\9) CAE database
set desdir_doc=\\Emea\dfs\GLW\Groups\CAE\E3C\1) FEAREPORTS\FEA_Reports_2019\A_INTERNAL_WORD
set desdir_pdf=\\Emea\dfs\GLW\Groups\CAE\E3C\1) FEAREPORTS\FEA_Reports_2019\B_REQUESTORS_PDF
MD %s%
MD %s%\%a%
MD %s%\%b%
MD %s%\%c%
MD %s%\%d%

XCOPY /r /d /i /s /y /q "%a%\*.*" %s%\%a%
XCOPY /r /d /i /s /y /q "%b%\*.*" %s%\%b%

XCOPY /r /d /i /s /y /q "%c%\*.txt" %s%\%c%
XCOPY /r /d /i /s /y /q "%c%\*.dat" %s%\%c%
XCOPY /r /d /i /s /y /q "%c%\*.inp" %s%\%c%
XCOPY /r /d /i /s /y /q "%c%\*.inc" %s%\%c%
XCOPY /r /d /i /s /y /q "%c%\*.msg" %s%\%c%
XCOPY /r /d /i /s /y /q "%c%\*.sta" %s%\%c%

XCOPY /r /d /i /s /y /q "%d%\*.*" %s%\%d%

cls
echo " All files, except *.odb, has been coppied to %s% directory"
echo.
XCOPY /r /d /i /s /y /q "%a%\*.*" "%desdir%\%s%\%a%"
XCOPY /r /d /i /s /y /q "%b%\*.*" "%desdir%\%s%\%b%"

XCOPY /r /d /i /s /y /q "%c%\*.txt" "%desdir%\%s%\%c%"
XCOPY /r /d /i /s /y /q "%c%\*.dat" "%desdir%\%s%\%c%"
XCOPY /r /d /i /s /y /q "%c%\*.inp" "%desdir%\%s%\%c%"
XCOPY /r /d /i /s /y /q "%c%\*.inc" "%desdir%\%s%\%c%"
XCOPY /r /d /i /s /y /q "%c%\*.msg" "%desdir%\%s%\%c%"
XCOPY /r /d /i /s /y /q "%c%\*.sta" "%desdir%\%s%\%c%"

XCOPY /r /d /i /s /y /q "%d%\*.*" "%desdir%\%s%\%d%"
XCOPY /r /d /i /s /y /q "%d%\*.docx" "%desdir_doc%"
XCOPY /r /d /i /s /y /q "%d%\*.pdf" "%desdir_pdf%"

cls
echo " All backup files, has been coppied to %desdir%\%s% directory "
echo.
timeout /t 12
goto :exit

:DELETE
cls
echo.
echo Type "1" if You want to delete only not relevant files
echo.
echo Type "2" if You want to delete specified ext. files
echo.
echo Type "3" if You want to delete all *.odb files in all subdirectories
echo.
echo Type "9" if You want to delete all analysis files
echo.
echo Type "b" if You want to back to main
echo.
goto :choice_2

:choice_2

set /P c= 

if /I "%c%" EQU "1" goto :Hasiok
if /I "%c%" EQU "9" goto :WsioDelete
if /I "%c%" EQU "2" goto :DeleteOne
if /I "%c%" EQU "3" goto :OdbDelete
if /I "%c%" EQU "0" goto :ALLOdbDelete
if /I "%c%" EQU "b" goto :choice
if /I "%c%" EQU "B" goto :choice
goto :choice2
pause

:COPY
cls
echo.
set [a=[*]]
set [b=[pdf]]
set /P "a= Copy file that contain a word: "
set /P "b= Set extension: "
set /P "c= set destination path: "
For /R %%G in (*%a%*.%b%) do COPY "%%G" %c%
goto :choice

:DeleteOne
cls
echo.
set /P "a= del file that contain a word: "
set /P "b=set the extension: "
For /R %%G IN (*%a%*.%b%) do DEL "%%G"
echo.
echo If You want ot back to main just type "b"
echo.
set /P b=
if /I "%b%" EQU "b" goto :choice
goto :DeleteOne

:OdbDelete
cls
echo.
echo All *.odb files will be deleted in all subdirectories
For /R %%G IN (*.odb) do DEL /P "%%G"
exit
:ALLOdbDelete
echo Type "DELETE" to delete all *.odb in subdirectories
echo.
set /P c= 

if /I "%c%" EQU "DELETE" goto :ALLOdbDeleteCONFIRMED

goto :choice2
pause
:ALLOdbDeleteCONFIRMED
cls
echo.
echo All *.odb files will be deleted in all subdirectories
For /R %%G IN (*.odb) do DEL  "%%G"
exit

:RENAME
cls
setlocal enableDelayedExpansion
set /p "string1=Enter the sequence to be replaced : "
set /p "string2=Enter the new sequence  : "

for %%G in (*%string1%*.*) do (
  set "filename=%%G" 
  ren "!filename!" "!filename:%string1%=%string2%!"
)
goto choice

:OPEN
cls
echo.
set /P "find=Open .txt files that contains a word: "
set /P "ext=type the extension: "
for /R %%a in (*%find%*.%ext%) do %%a
goto :choice

:Hasiok
cls
For /R %%G IN (*.res) do  DEL "%%G"
For /R %%G IN (*.sim) do  DEL "%%G"
For /R %%G IN (*.mdl) do  DEL "%%G"
For /R %%G IN (*.prt) do  DEL "%%G"
For /R %%G IN (*.stt) do  DEL "%%G"
For /R %%G IN (*.1.SMABulk) do  DEL "%%G"
For /R %%G IN (*.1.SMAFocus) do  DEL "%%G"
For /R %%G IN (*.SMAFocus) do  DEL "%%G"
For /R %%G IN (*.SMABulk) do  DEL "%%G"
For /R %%G IN (*.par) do  DEL "%%G"
For /R %%G IN (*.pes) do  DEL "%%G"
For /R %%G IN (*.cid) do  DEL "%%G"
For /R %%G IN (*.lck) do  DEL "%%G"
For /R %%G IN (*.pac) do  DEL "%%G"
For /R %%G IN (*.sel) do  DEL "%%G"
For /R %%G IN (*.abq) do  DEL "%%G"
For /R %%G IN (*.odb_f) do  DEL "%%G"
For /R %%G IN (*.023) do  DEL "%%G"
For /R %%G IN (*.tmp) do  DEL "%%G"
For /R %%G IN (*.pmg) do  DEL "%%G"
For /R %%G IN (*.RPY) do  DEL "%%G"
For /R %%G IN (*.inp~) do  DEL "%%G"
For /R %%G IN (*.inc~) do  DEL "%%G"
For /R %%G IN (*.py~) do  DEL "%%G"
echo.
echo All mentioned data were deleted through all subfolders
echo.
timeout /t 0
goto :choice

:WsioDelete
cls
timeout /t 5
For /R %%G IN (*.res) do  DEL "%%G"
For /R %%G IN (*.sim) do  DEL "%%G"
For /R %%G IN (*.mdl) do  DEL "%%G"
For /R %%G IN (*.pmg) do  DEL "%%G"
For /R %%G IN (*.prt) do  DEL "%%G"
For /R %%G IN (*.stt) do  DEL "%%G"
For /R %%G IN (*.1.SMABulk) do  DEL "%%G"
For /R %%G IN (*.1.SMAFocus) do  DEL "%%G"
For /R %%G IN (*.SMAFocus) do  DEL "%%G"
For /R %%G IN (*.SMABulk) do  DEL "%%G"
For /R %%G IN (*.cid) do  DEL "%%G"
For /R %%G IN (*.lck) do  DEL "%%G"
For /R %%G IN (*.odb_f) do  DEL "%%G"
For /R %%G IN (*.odb) do  DEL "%%G"
For /R %%G IN (*.dat) do  DEL "%%G"
For /R %%G IN (*.pac) do  DEL "%%G"
For /R %%G IN (*.sel) do  DEL "%%G"
For /R %%G IN (*.abq) do  DEL "%%G"
For /R %%G IN (*.msg) do  DEL "%%G"
For /R %%G IN (*.msg.*) do  DEL "%%G"
For /R %%G IN (*.swp) do  DEL "%%G"
rem For /R %%G IN (*~*) do  DEL "%%G"
For /R %%G IN (*.simlog*) do  DEL "%%G"
For /R %%G IN (*.sta) do  DEL "%%G"
For /R %%G IN (*.par) do  DEL "%%G"
For /R %%G IN (*.pes) do  DEL "%%G"
For /R %%G IN (*.023) do  DEL "%%G"
For /R %%G IN (*.txt) do  DEL "%%G"
For /R %%G IN (*.png) do  DEL "%%G"
For /R %%G IN (*.tmp) do  DEL "%%G"
For /R %%G IN (*.com) do  DEL "%%G"
For /R %%G IN (*.RPY) do  DEL "%%G"

echo.
echo All mentioned data were deleted through all subfolders
echo.
timeout /t 0
exit

:EXIT
exit
:Reactions
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\Reactions\Plot_PP_RG_Reactions.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\Reactions\PP_RG_Reactions.py"
cls
call abaqus python PP_RG_Reactions.py
call python Plot_PP_RG_Reactions.py
goto :choice
:CPRESS
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\CPress_Read.py"
:CP_one 
cls
call abaqus 			        python CPRESS_Read.py
IF NOT %ERRORLEVEL% == 0 GOTO :CP_two
goto :writeTXT
:CP_two
cls
call C:\SIMULIA\Abaqus\6.14-5\code\bin\abq6145.exe 		python CPRESS_Read.py
IF NOT %ERRORLEVEL% == 0 GOTO :CP_three
goto :writeTXT
:CP_three 
cls
call C:\SIMULIA\CAE\2016\win_b64\code\bin\ABQLauncher.exe       python CPRESS_Read.py
IF NOT %ERRORLEVEL% == 0 GOTO :writeTXT
goto :writeTXT
:writeTXT
for %%i in (*.txt) do %%i
goto :choice

:StepName
XCOPY /Y "\\glw4019a\RUN\PatrykBatog\StepName.py"
:SN_one 
cls
call abaqus     			python StepName.py
IF NOT %ERRORLEVEL% == 0 GOTO :SN_two
pause
echo.
goto :choice
:SN_two
cls
call C:\SIMULIA\Abaqus\6.14-5\code\bin\abq6145.exe 		python StepName.py
IF NOT %ERRORLEVEL% == 0 GOTO :SN_three
pause
echo.
goto :choice
:SN_three
cls
call C:\SIMULIA\CAE\2016\win_b64\code\bin\ABQLauncher.exe       python StepName.py
IF NOT %ERRORLEVEL% == 0 GOTO :SN_four
pause
echo.
goto :choice
:SN_four
cls
call C:\SIMULIA\Abaqus\Commands\abaqus.bat			python StepName.py
pause
echo.
goto :choice
exit

:EnergyRatio
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\EnergyRatio_Explicit\InternalKinetic_EnergyRatio.py"
XCOPY /Y "\\emea\dfs\GLW\Groups\CAE\E3C\3) CAE Tools\Scripts\EnergyRatio_Explicit\EnergyPlot.py"
cls
call abaqus      python InternalKinetic_EnergyRatio.py
call python      EnergyPlot.py
exit
:Schoice
cls
for /r %%f in (*.cid) do (set cidName=%%f)
for /f "delims=" %%x in (%cidName%) do set variable=%%x

set host=%variable:~0,8%
set port=%variable:~9,5%

echo Host:%host%
echo Port:%port%
echo.
echo To suspend analysis press     	       1
echo.
echo To resume analysis press     	       2
echo.
set /P c= 

if /I "%c%" EQU "1" goto :Suspend
if /I "%c%" EQU "2" goto :Resume
if /I "%c%" EQU "3" goto :Pro
timeout /t 5
goto :Schoice


:Suspend
cls
echo Host:%host%
echo Port:%port%
C:\SIMULIA\CAE\2016\win_b64\code\bin\ABQLauncher.exe suspend host=%host% port=%port%
goto :Schoice

:Resume
cls
echo Host:%host%
echo Port:%port%
C:\SIMULIA\CAE\2016\win_b64\code\bin\ABQLauncher.exe Resume host=%host% port=%port%
goto :Schoice

:Pro
cls
set /P "host=Type GLW number of station You want to affect: "
set /P "port=Type port number(read from *.cid file in analysis directory): "
echo %host%
echo %port%
goto :ProChoice

:ProChoice
echo.
echo To suspend analysis press     	       1
echo.
echo To resume analysis press     	       2

set /P c= 

if /I "%c%" EQU "1" goto :ProSuspend
if /I "%c%" EQU "2" goto :ProResume
goto :Pro

:ProSuspend
cls
echo Host:%host%
echo Port:%port%
C:\SIMULIA\CAE\2016\win_b64\code\bin\ABQLauncher.exe suspend host=%host% port=%port%
goto :ProChoice

:ProResume
cls
echo Host:%host%
echo Port:%port%
C:\SIMULIA\CAE\2016\win_b64\code\bin\ABQLauncher.exe Resume host=%host% port=%port%
goto :ProChoice


