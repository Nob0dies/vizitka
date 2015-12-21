<?php
/**
 * Created by PhpStorm.
 * User: evgonchar
 * Date: 20.12.2015
 * Time: 15:21
 */

require_once("Form.php");

$inputs = array(
    [
        "name" => "name",
        "required" => true,
    ],
    [
        "name" => "mail",
        "required" => true,
    ],
    [
        "name" => "massage",
        "required" => true,
    ],
    [
        "name" => "cod",
        "required" => true,
    ],
);

$form = new Form( $inputs );
$form->sendAjaxResponse();