<?php
/**
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 5 2018
 *
 */

namespace MikoPBX\Common\Models;

use Phalcon\Validation;
use Phalcon\Validation\Validator\Uniqueness as UniquenessValidator;

/**
 * Class Storage
 *
 * @method static mixed findFirstByUniqid(array|string|int $parameters = null)
 * @package MikoPBX\Common\Models
 */
class Storage extends ModelsBase
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    public $id;

    /**
     * @Column(type="string", nullable=true)
     */
    public $name = null;

    /**
     * @Column(type="string", nullable=true)
     */
    public $device = null;

    /**
     * @Column(type="string", nullable=true)
     */
    public $mountpoint = null;

    /**
     * @Column(type="string", nullable=true)
     */
    public $uniqid = null;

    /**
     * @Column(type="string", nullable=true)
     */
    public ?string $filesystemtype = null;

    /**
     * @Column(type="integer", nullable=true)
     */
    public ?string $media = null;

    /**
     * @Column(type="integer", nullable=true)
     */
    public ?string $persistence = null;

    /**
     * @Column(type="integer", nullable=true)
     */
    public ?string $astlogs = null;

    /**
     * @Column(type="integer", nullable=true)
     */
    public ?string $voicemailarchive = null;


    /**
     * @Column(type="integer", nullable=true)
     */
    public ?string $syslog = null;

    /**
     * @Column(type="integer", nullable=true)
     */
    public $check_when_booting = null;

    public function initialize(): void
    {
        $this->setSource('m_Storage');
        parent::initialize();
    }

    public function validation(): bool
    {
        $validation = new Validation();
        $validation->add(
            'device',
            new UniquenessValidator(
                [
                    'message' => $this->t("mo_ThisDeviceNotUniqueForStorageModels"),
                ]
            )
        );
        $validation->add(
            'uniqid',
            new UniquenessValidator(
                [
                    'message' => $this->t("mo_ThisUniqidNotUniqueForStorageModels"),
                ]
            )
        );

        return $this->validate($validation);
    }

}