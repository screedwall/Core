<?php

declare(strict_types=1);
/**
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 5 2018
 *
 */

namespace MikoPBX\AdminCabinet\Config;

use MikoPBX\AdminCabinet\Providers\{AppMessagesProvider,
    AssetProvider,
    BeanstalkConnectionProvider,
    DispatcherProvider,
    ElementsProvider,
    FlashProvider,
    LanguageSelectorProvider,
    RouterProvider,
    SessionProvider,
    UrlProvider,
    ViewProvider,
    VoltProvider};
use MikoPBX\Common\Providers\{CDRDatabaseProvider,
    MainDatabaseProvider,
    ManagedCacheProvider,
    ModelsCacheProvider,
    ModelsMetadataProvider,
    ModulesDBConnectionsProvider,
    PBXConfModulesProvider,
    RegistryProvider,
    SessionReadOnlyProvider,
    TranslationProvider,
    LicenseProvider};
use Phalcon\Di\DiInterface;

class RegisterDIServices
{
    /**
     * Register dispatcher service provider
     *
     * @param \Phalcon\Di\DiInterface $di
     */
    public static function init(DiInterface $di): void
    {
        $adminCabinetProviders = [
            // Inject cache providers
            ManagedCacheProvider::class,
            ModelsCacheProvider::class,

            // Inject Database connections
            ModelsMetadataProvider::class,
            MainDatabaseProvider::class,
            ModulesDBConnectionsProvider::class,
            CDRDatabaseProvider::class,

            // Inject web
            DispatcherProvider::class,
            RouterProvider::class,
            UrlProvider::class,
            ViewProvider::class,
            VoltProvider::class,
            FlashProvider::class,
            ElementsProvider::class,
            AssetProvider::class,

            // Inject sessions
            SessionProvider::class,
            SessionReadOnlyProvider::class,

            // Inject Queue connection
            BeanstalkConnectionProvider::class,

            // Inject translation
            AppMessagesProvider::class,
            TranslationProvider::class,
            LanguageSelectorProvider::class,

            // Inject license
            LicenseProvider::class,

            // Inject PBX modules
            PBXConfModulesProvider::class,

            // Inject Registry
            RegistryProvider::class

        ];

        foreach ($adminCabinetProviders as $provider) {
            $di->register(new $provider());
        }

        // $di->set(
        //     'viewCache', function () use ($config) {
        //
        //     //Cache for one day
        //     $frontCache = new Output([
        //         'lifetime' => $config->adminApplication->debugMode ? 1 : 86400,
        //     ]);
        //
        //     //Set file cache
        //     $cache = new File($frontCache, [
        //         'cacheDir' => $config->adminApplication->cacheDir,
        //     ]);
        //
        //     return $cache;
        // }
        // );

    }
}