<?php
/**
 * Copyright © MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Alexey Portnov, 7 2020
 */

namespace MikoPBX\Core\Workers;
require_once 'Globals.php';
use Exception;
use MikoPBX\Core\System\{Storage, Util};


class WorkerRemoveOldRecords extends WorkerBase
{
    protected int $maxProc=1;

    public function start($argv): void
    {
        $varEtcDir = $this->di->getShared('config')->path('core.varEtcDir');
        $filename   = "{$varEtcDir}/storage_device";
        if (file_exists($filename)) {
            $mount_point = file_get_contents($filename);
        } else {
            exit(0);
        }
        $out = [];
        $busyboxPath = Util::which('busybox');
        $mountPath = Util::which('mount');
        $grepPath = Util::which('grep');
        $awkPath = Util::which('awk');
        $headPath = Util::which('head');
        Util::mwExec("{$mountPath} | {$busyboxPath} {$grepPath} {$mount_point} | {$busyboxPath} {$awkPath} '{print $1}' | {$headPath} -n 1", $out);
        $dev = implode('', $out);

        $s          = new Storage();
        $MIN_SPACE  = 100; // MB
        $free_space = $s->getFreeSpace($dev);
        if ($free_space > $MIN_SPACE) {
            // Очистка диска не требуется.
            exit(0);
        }
        $monitor_dir = Storage::getMonitorDir();
        $out         = [];
        //$count_dir   = 1;
        $busyboxPath = Util::which('busybox');
        $sortPath = Util::which('sort');
        $findPath = Util::which('find');
        $awkPath = Util::which('awk');
        $headPath = Util::which('head');
        Util::mwExec(
            "{$findPath} {$monitor_dir}*/*/*  -maxdepth 0 -type d  -printf '%T+ %p\n' 2> /dev/null | {$sortPath} | {$headPath} -n 10 | {$busyboxPath} {$awkPath} '{print $2}'",
            $out
        );
        foreach ($out as $dir_info) {
            if ( ! is_dir($dir_info)) {
                echo 'error';
                continue;
            }
            $free_space = $s->getFreeSpace($dev);
            if ($free_space > $MIN_SPACE) {
                // Очистка диска не требуется.
                break;
            }
            $busyboxPath = Util::which('busybox');
            $rmPath = Util::which('rm');
            Util::mwExec("{$busyboxPath} {$rmPath} -rf {$dir_info}");
        }
    }
}

// Start worker process
$workerClassname = WorkerRemoveOldRecords::class;
if (isset($argv) && count($argv) > 1) {
    cli_set_process_title($workerClassname);
    try {
        $worker = new $workerClassname();
        $worker->start($argv);
    } catch (Exception $e) {
        global $errorLogger;
        $errorLogger->captureException($e);
        Util::sysLogMsg("{$workerClassname}_EXCEPTION", $e->getMessage());
    }
}