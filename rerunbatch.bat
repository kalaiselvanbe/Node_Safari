echo ***************************************************************
echo *                        Rerun fails Execution                        *
echo ***************************************************************
set retryCount = 3
FOR %%i IN (1,2,retryCount) DO (echo "Running %%i instance" & call nightwatch node_modules/nightwatch/bin/runner.js --c nightwatch.conf.js --cucumberOpts.rerun=@rerun.txt
pause